import { computed, onMounted, onUnmounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useTicketDataStore } from '@/stores/ticketData';
import { useTableStore } from '@/stores/tableStore';
import { useAuthStore } from '@/stores/auth';
import { useFacetedFilterOptions } from '@/composables/useFacetedFilterOptions';
import { useCsvExport } from '@/composables/useCsvExport';
import { applyMockedTicketFilters } from '@/utils/mockedTicketFilters';
import { maskEmail } from '@/utils/stringUtils';
import { buildTicketListParams, buildExportParams, exportTicketsCsv } from '@/services/ticketApi';
import { formatDate } from '@/utils/dateUtils';
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
    const authStore = useAuthStore();
    const { isLoading } = storeToRefs(ticketDataStore);
    const isAdmin = computed(() => authStore.hasRole('admin'));

    // ════════════════════════════════════════════════════════════════════
    //  MOCK MODE — client-side filtering, pagination, faceted options
    // ════════════════════════════════════════════════════════════════════
    let mockedFilteredTickets;
    let mockedPaginatedTickets;
    let mockedTotalRecords;
    let availableTopics, availableBrands, availableVipLevels, availableCustomerEmails, availableAgentEmails, availableChatTags, availableSentiments, availableCsatScores;

    if (USE_MOCKED) {
        const { mockedFullProcessedTickets } = storeToRefs(ticketDataStore);

        mockedFilteredTickets = computed(() => {
            const params = extractFilterParams();
            if (import.meta.env.DEV) {
                console.group('[useTicketTableData] mocked mode — extractFilterParams()');
                console.log('Multiselects:', { brand: params.brand, topic: params.topic, vip_level: params.vip_level, customer_email: params.customer_email, agent_email: params.agent_email, _chatTagsString: params._chatTagsString });
                console.log('Single-selects:', { csat_score: params.csat_score, sentiment: params.sentiment });
                console.log('Text:', { globalFilter: params.globalFilter, ticketid: params.ticketid, sentiment_reason: params.sentiment_reason, chat_transcript: params.chat_transcript, email_transcript: params.email_transcript, summary: params.summary });
                console.log('Dates:', { startDate: params.startDate, endDate: params.endDate, startedAtStart: params.startedAtStart, startedAtEnd: params.startedAtEnd, updatedAtStart: params.updatedAtStart, updatedAtEnd: params.updatedAtEnd });
                console.groupEnd();
            }
            return applyMockedTicketFilters(mockedFullProcessedTickets.value, params);
        });

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

    async function fetchData() {
        if (USE_MOCKED) return;

        const filterParams = extractFilterParams();
        if (import.meta.env.DEV) {
            console.group('[useTicketTableData] API mode — fetchData()');
            console.log('Multiselects:', { brand: filterParams.brand, topic: filterParams.topic, vip_level: filterParams.vip_level, customer_email: filterParams.customer_email, agent_email: filterParams.agent_email, _chatTagsString: filterParams._chatTagsString });
            console.log('Single-selects:', { csat_score: filterParams.csat_score, sentiment: filterParams.sentiment });
            console.log('Text:', { globalFilter: filterParams.globalFilter, ticketid: filterParams.ticketid, sentiment_reason: filterParams.sentiment_reason, chat_transcript: filterParams.chat_transcript, email_transcript: filterParams.email_transcript, summary: filterParams.summary });
            console.log('Dates:', { startDate: filterParams.startDate, endDate: filterParams.endDate });
            console.log('Pagination:', { page: lazyParams.value.page, limit: lazyParams.value.limit, sortField: lazyParams.value.sortField, sortOrder: lazyParams.value.sortOrder });
            console.groupEnd();
        }

        const listParams = buildTicketListParams(filterParams, {
            page: lazyParams.value.page,
            rows: lazyParams.value.limit,
            sortField: lazyParams.value.sortField,
            sortOrder: lazyParams.value.sortOrder
        });

        await Promise.all([ticketDataStore.fetchTickets(listParams), tableStore.fetchAllAggregations(filterParams)]);
    }

    function debouncedFetchData() {
        if (USE_MOCKED) return;
        clearTimeout(fetchDataDebounceTimer);
        fetchDataDebounceTimer = setTimeout(() => {
            lazyParams.value.page = 1;
            fetchData();
        }, FILTER_DEBOUNCE_MS);
    }

    // Watch filter changes in API mode — debounced.
    // Skip the first emission to avoid duplicating the onMounted fetch.
    if (!USE_MOCKED) {
        watch(
            () => JSON.stringify(extractFilterParams()),
            () => {
                if (!initialFetchDone) return;
                debouncedFetchData();
            },
            { deep: false }
        );
    }

    // ════════════════════════════════════════════════════════════════════
    //  UNIFIED — data bindings that work in both modes
    // ════════════════════════════════════════════════════════════════════

    const rawTableData = computed(() => {
        if (USE_MOCKED) return mockedPaginatedTickets?.value ?? [];
        return ticketDataStore.tickets;
    });

    // SECURITY: UI-only masking — real emails are still in API responses and Pinia state.
    // Remove once backend implements server-side masking (see CLAUDE.md "Backend requirement").
    const tableData = computed(() => {
        const rows = rawTableData.value;
        if (isAdmin.value || !rows.length) return rows;
        return rows.map((row) => ({ ...row, customer_email: maskEmail(row.customer_email) }));
    });

    const totalRecords = computed(() => {
        if (USE_MOCKED) return mockedTotalRecords?.value ?? 0;
        return ticketDataStore.totalCount;
    });

    // Faceted filter options — API mode:
    //   Active filter field  → FULL options from /api/ticket-filter-options/ (date-range only)
    //   Inactive filter fields → NARROWED options from /api/ticket-filter-options/ (date-range + attribute filters)
    if (!USE_MOCKED) {
        const sorted = (obj, key) => [...(obj?.[key] ?? [])].sort((a, b) => String(a).localeCompare(String(b)));

        /**
         * Smart computed: if this field has an active selection, show full options
         * (so the user can deselect). Otherwise, show narrowed options.
         */
        const smartOptions = (apiKey, filterKey) => computed(() => {
            const filterVal = filters.value[filterKey]?.value;
            const isActive = Array.isArray(filterVal) ? filterVal.length > 0 : filterVal != null && filterVal !== '';

            if (isActive) {
                const opts = sorted(tableStore.filterOptions, apiKey);
                if (import.meta.env.DEV) console.log(`[useTicketTableData] API dropdown "${apiKey}": ${opts.length} options (FULL — field is active)`);
                return opts;
            }

            const opts = sorted(tableStore.narrowedFilterOptions, apiKey);
            if (import.meta.env.DEV) console.log(`[useTicketTableData] API dropdown "${apiKey}": ${opts.length} options (NARROWED — from filtered time period)`);
            return opts;
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
    const { exportToCSV } = USE_MOCKED
        ? useCsvExport(dataTableRef, mockedFilteredTickets, formatDate)
        : {
              exportToCSV: async () => {
                  const params = buildExportParams(extractFilterParams());
                  await exportTicketsCsv(params);
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
        await ticketDataStore.lazyInit();
        if (!USE_MOCKED) {
            await tableStore.fetchAllAggregations(extractFilterParams());
            initialFetchDone = true;
        }
    });

    // ── Cleanup — cancel pending debounce timer on unmount ──
    onUnmounted(() => {
        if (fetchDataDebounceTimer) clearTimeout(fetchDataDebounceTimer);
    });

    return {
        isLoading, isAdmin, maskEmail,
        tableData, totalRecords,
        availableTopics, availableBrands, availableVipLevels,
        availableCustomerEmails, availableAgentEmails, availableChatTags,
        availableSentiments, availableCsatScores,
        exportToCSV,
        onPage, onSort, onFilter,
        setQuickDateFilter, clearFilter
    };
}
