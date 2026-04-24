import { computed, onMounted, onUnmounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useTicketDataStore } from '@/stores/ticketData';
import { useTableStore } from '@/stores/tableStore';
import { useFacetedFilterOptions } from '@/composables/useFacetedFilterOptions';
import { useCsvExport } from '@/composables/useCsvExport';
import { applyMockedTicketFilters } from '@/utils/mockedTicketFilters';
import { buildTicketListParams, buildExportParams, exportTicketsCsv } from '@/services/ticketApi';
import { formatDate } from '@/utils/dateUtils';
import { logger } from '@/utils/logger';
import { PAGE_SIZE_DEFAULT, FILTER_DEBOUNCE_MS } from '@/composables/useTicketFilters';

const USE_MOCKED = import.meta.env.VITE_USE_MOCKED_DATA === 'true';

/**
 * Dual-mode data pipeline for the ticket DataTable.
 * Handles: data fetching, pagination events, faceted filter options,
 * CSV export, and wraps quick-date / clear-filter with fetch triggers.
 *
 * @param {Object} filterState — return value of useTicketFilters()
 * @param {import('vue').Ref} dataTableRef — template ref for the DataTable (mock CSV export)
 */
export function useTicketTableData(filterState, dataTableRef) {
    const { filters, lazyParams, extractFilterParams, resetFilters, applyQuickDateFilter } = filterState;

    const tableStore = useTableStore();
    const ticketDataStore = useTicketDataStore();
    const { isLoading } = storeToRefs(ticketDataStore);

    // ════════════════════════════════════════════════════════════════════
    //  MOCK MODE — client-side filtering, pagination, faceted options
    // ════════════════════════════════════════════════════════════════════
    let mockedFilteredTickets;
    let mockedPaginatedTickets;
    let mockedTotalRecords;
    let availableTopics, availableBrands, availableVipLevels, availableCustomerEmails, availableAgentEmails, availableChatTags, availableSentiments, availableCsatScores;

    if (USE_MOCKED) {
        const { mockedFullProcessedTickets } = storeToRefs(ticketDataStore);

        mockedFilteredTickets = computed(() => applyMockedTicketFilters(mockedFullProcessedTickets.value, extractFilterParams()));

        mockedPaginatedTickets = computed(() => {
            const start = (lazyParams.value.page - 1) * lazyParams.value.limit;
            return mockedFilteredTickets.value.slice(start, start + lazyParams.value.limit);
        });

        mockedTotalRecords = computed(() => mockedFilteredTickets.value.length);

        const faceted = useFacetedFilterOptions(filters, mockedFullProcessedTickets);
        availableTopics = faceted.availableTopics;
        availableBrands = faceted.availableBrands;
        availableVipLevels = faceted.availableVipLevels;
        availableCustomerEmails = faceted.availableCustomerEmails;
        availableAgentEmails = faceted.availableAgentEmails;
        availableChatTags = faceted.availableChatTags;
        availableSentiments = faceted.availableSentiments;
        availableCsatScores = faceted.availableCsatScores;

        // Sync filtered data to tableStore for charts/stats/VIP
        watch(
            mockedFilteredTickets,
            (newFiltered) => {
                tableStore.setMockedFilteredTickets(newFiltered);
                lazyParams.value.page = 1;
            },
            { immediate: true }
        );
    }

    // ════════════════════════════════════════════════════════════════════
    //  API MODE — server-side filtering, pagination, aggregations
    // ════════════════════════════════════════════════════════════════════
    let fetchDataDebounceTimer = null;
    let initialFetchDone = false;
    // Filter changes that arrive while the initial load is still pending get
    // swallowed by the `!initialFetchDone` guard below. This flag replays them
    // once the initial fetch resolves so the user doesn't end up looking at
    // stale data they typed over.
    let pendingFilterChange = false;

    async function fetchData() {
        if (USE_MOCKED) return;

        const filterParams = extractFilterParams();
        const listParams = buildTicketListParams(filterParams, {
            page: lazyParams.value.page,
            rows: lazyParams.value.limit,
            sortField: lazyParams.value.sortField,
            sortOrder: lazyParams.value.sortOrder
        });

        // Publish the fresh filter snapshot so lazy-loaded widgets (ChartDoc,
        // VipTableDoc) can re-fetch if they're already mounted and visible.
        tableStore.setCurrentFilterParams(filterParams);

        if (filterParams.ticketid) {
            // ticketid lookup — backend doesn't honor ticketid on stats/chart/vip endpoints.
            // Fetch the single ticket + filter-options only, then compute aggregations client-side.
            await Promise.all([ticketDataStore.fetchTickets(listParams), tableStore.fetchFilterOptionsOnly(filterParams)]);
            tableStore.setSingleTicketAggregations(ticketDataStore.tickets[0] ?? null);
        } else {
            await Promise.all([ticketDataStore.fetchTickets(listParams), tableStore.fetchCoreAggregations(filterParams)]);

            // Edge case: the user applied a filter that isn't honored by the aggregation
            // endpoints (e.g. customer_email, topic, brand on /api/vip-csat-data/) so the
            // list endpoint narrowed down to 1 ticket but stats/chart/vip still reflect the
            // broader dataset. Override with single-ticket aggregations so all widgets stay
            // consistent with the main table.
            if (ticketDataStore.totalCount === 1 && ticketDataStore.tickets.length === 1) {
                tableStore.setSingleTicketAggregations(ticketDataStore.tickets[0]);
            }
        }
    }

    function debouncedFetchData() {
        if (USE_MOCKED) return;
        clearTimeout(fetchDataDebounceTimer);
        fetchDataDebounceTimer = setTimeout(() => {
            lazyParams.value.page = 1;
            fetchData();
        }, FILTER_DEBOUNCE_MS);
    }

    // Watch filter state directly (deep) — cheaper and more idiomatic than
    // stringifying on every tick. If a change arrives before the initial
    // load finishes, remember it so we can flush once initialFetchDone flips.
    if (!USE_MOCKED) {
        watch(
            filters,
            () => {
                if (!initialFetchDone) {
                    pendingFilterChange = true;
                    return;
                }
                debouncedFetchData();
            },
            { deep: true }
        );
    }

    // ════════════════════════════════════════════════════════════════════
    //  UNIFIED — data bindings that work in both modes
    // ════════════════════════════════════════════════════════════════════

    // Customer emails are masked SERVER-SIDE for non-admin users (backend returns
    // "*****" or a similar placeholder). The frontend just renders whatever the API
    // returns — no client-side masking pass.
    const tableData = computed(() => {
        if (USE_MOCKED) return mockedPaginatedTickets?.value ?? [];
        return ticketDataStore.tickets;
    });

    const totalRecords = computed(() => {
        if (USE_MOCKED) return mockedTotalRecords?.value ?? 0;
        return ticketDataStore.totalCount;
    });

    // Faceted filter options — API mode:
    //   Active filter field  → FULL options from /api/ticket-filter-options/ (date-range only)
    //   Inactive filter fields → NARROWED options from /api/ticket-filter-options/ (date-range + attribute filters)
    if (!USE_MOCKED) {
        // Pin locale to 'en' with base sensitivity so the sort order is stable
        // across user locales (default `localeCompare` would flip e.g. dotted
        // vs. dotless `i` ordering between `en` and `tr`).
        const sorted = (obj, key) => [...(obj?.[key] ?? [])].sort((a, b) => String(a).localeCompare(String(b), 'en', { sensitivity: 'base' }));

        /**
         * Smart computed: if this field has an active selection, show full options
         * (so the user can deselect). Otherwise, show narrowed options.
         */
        const smartOptions = (apiKey, filterKey) =>
            computed(() => {
                const filterVal = filters.value[filterKey]?.value;
                const isActive = Array.isArray(filterVal) ? filterVal.length > 0 : filterVal != null && filterVal !== '';
                const source = isActive ? tableStore.filterOptions : tableStore.narrowedFilterOptions;
                return sorted(source, apiKey);
            });

        availableTopics = smartOptions('topic', 'topic');
        availableBrands = smartOptions('brand', 'brand');
        availableVipLevels = smartOptions('vip_level', 'vip_level');
        availableCustomerEmails = smartOptions('customer_email', 'customer_email');
        availableAgentEmails = smartOptions('agent_email', 'agent_email');
        availableChatTags = smartOptions('chat_tags', '_chatTagsString');
        availableSentiments = smartOptions('sentiment', 'sentiment');
        availableCsatScores = smartOptions('csat_score', 'csat_score');
    }

    // ── Export ──
    // Disabled whenever any filter the export endpoint does not honor is active.
    // The endpoint accepts timestamp range + brand/topic/vip_level/csat_score/sentiment
    // + agent_email/customer_email/chat_tags. Any other active filter would produce
    // a CSV that doesn't match the visible table.
    const isExportDisabled = computed(() => {
        if (USE_MOCKED) return false;
        const p = extractFilterParams();
        return (
            !!p.ticketid ||
            !!p.globalFilter ||
            !!p.sentiment_reason ||
            !!p.chat_transcript ||
            !!p.email_transcript ||
            !!p.summary ||
            !!p.startedAtStart ||
            !!p.startedAtEnd ||
            !!p.updatedAtStart ||
            !!p.updatedAtEnd
        );
    });

    const { exportToCSV } = USE_MOCKED
        ? useCsvExport(dataTableRef, mockedFilteredTickets, formatDate)
        : {
              exportToCSV: async () => {
                  if (isExportDisabled.value) return;
                  try {
                      const params = buildExportParams(extractFilterParams());
                      await exportTicketsCsv(params);
                  } catch (err) {
                      logger.error('CSV export failed:', err);
                  }
              }
          };

    // ── Event handlers ──
    function onPage(event) {
        lazyParams.value.page = event?.page ? event.page + 1 : 1;
        lazyParams.value.limit = event?.rows || PAGE_SIZE_DEFAULT;
        if (!USE_MOCKED) fetchData();
    }

    function onSort(event) {
        if (!USE_MOCKED && event?.sortField) {
            lazyParams.value.sortField = event.sortField;
            lazyParams.value.sortOrder = event.sortOrder ?? -1;
            // Reset to page 1 — sorting while on page N shows a misleading
            // slice of the newly-ordered results.
            lazyParams.value.page = 1;
            fetchData();
        }
    }

    function onFilter() {
        lazyParams.value.page = 1;
        if (!USE_MOCKED) debouncedFetchData();
    }

    // ── Wrapped filter actions (state change + fetch) ──
    function setQuickDateFilter(period) {
        applyQuickDateFilter(period);
    }

    function clearFilter() {
        resetFilters();
    }

    // ── Init ──
    onMounted(async () => {
        if (USE_MOCKED) {
            await ticketDataStore.lazyInit();
            return;
        }

        // Pull the filter snapshot ONCE and thread it through the list prefetch
        // (inside lazyInit) and the core aggregation fetch. Previously the two
        // paths built params from different sources, producing a transient
        // "stats show N but table shows N-1" on first paint. Topic chart and
        // VIP CSAT fetches are owned by their widgets and fire when scrolled
        // into view — see decision #13 in Key Architecture Decisions, CLAUDE.md.
        const filterParams = extractFilterParams();
        tableStore.setCurrentFilterParams(filterParams);
        await Promise.all([ticketDataStore.lazyInit(filterParams), tableStore.fetchCoreAggregations(filterParams)]);
        initialFetchDone = true;

        // Flush any filter change the user made while the initial fetch was
        // still in flight — otherwise the change is silently dropped.
        if (pendingFilterChange) {
            pendingFilterChange = false;
            debouncedFetchData();
        }
    });

    // ── Cleanup — cancel pending debounce timer on unmount ──
    onUnmounted(() => {
        if (fetchDataDebounceTimer) clearTimeout(fetchDataDebounceTimer);
    });

    return {
        isLoading,
        tableData,
        totalRecords,
        availableTopics,
        availableBrands,
        availableVipLevels,
        availableCustomerEmails,
        availableAgentEmails,
        availableChatTags,
        availableSentiments,
        availableCsatScores,
        exportToCSV,
        isExportDisabled,
        onPage,
        onSort,
        onFilter,
        setQuickDateFilter,
        clearFilter
    };
}
