import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref, shallowRef } from 'vue';
import { NEGATIVE_SENTIMENTS } from '@/config/mockedEnums';
import { logger } from '@/utils/logger';
import { normalizeFilterOptions } from '@/utils/normalization';
import {
    buildFilterOptionsParams,
    buildNarrowedFilterOptionsParams,
    buildStatsParams,
    buildTopicChartParams,
    buildVipCsatParams,
    fetchFilterOptions,
    fetchTicketStats,
    fetchTopicChartData,
    fetchVipCsatData
} from '@/services/ticketApi';

// O(1) lookup instead of Array.includes O(n) — called per row (mock mode only)
const NEGATIVE_SET = new Set(NEGATIVE_SENTIMENTS);

// Compliance regex patterns (shared with useMockedStatsAggregation logic)
const COMPLIANCE_OK_RE = /compliance[:\s]+ok/i;
const COMPLIANCE_ISSUE_RE = /compliance[:\s]+issue/i;
const COMPLIANCE_WORD_RE = /compliance/i;

export const useTableStore = defineStore('table', () => {
    // ════════════════════════════════════════════════════════════════════
    //  MOCK MODE — client-side filtered data + aggregations
    // ════════════════════════════════════════════════════════════════════
    const mockedFilteredTickets = shallowRef([]);

    function setMockedFilteredTickets(rows) {
        mockedFilteredTickets.value = rows || [];
    }

    const mockedTopicStats = computed(() => {
        const stats = {};

        mockedFilteredTickets.value.forEach((c) => {
            const topic = c.topic || 'Unknown';
            if (!stats[topic]) {
                stats[topic] = { total: 0, negative: 0 };
            }
            stats[topic].total++;
            if (NEGATIVE_SET.has(c.sentiment?.toLowerCase())) {
                stats[topic].negative++;
            }
        });

        return Object.entries(stats)
            .map(([topic, counts]) => ({
                topic,
                total: counts.total,
                negative: counts.negative,
                percent_negative: counts.total > 0 ? (counts.negative / counts.total) * 100 : 0
            }))
            .sort((a, b) => b.total - a.total);
    });

    // ════════════════════════════════════════════════════════════════════
    //  API MODE — server response containers
    // ════════════════════════════════════════════════════════════════════
    const filterOptions = ref(null);
    const narrowedFilterOptions = ref(null);
    const stats = ref(null);
    const topicChartData = ref(null);
    const vipCsatData = ref(null);

    // Reactive snapshot of the current filter params as extracted by
    // `useTicketFilters.extractFilterParams`. Pushed by `useTicketTableData`
    // after every filter mutation; read by lazy-loaded widgets (ChartDoc,
    // VipTableDoc) so they can fire their own fetches when scrolled into view.
    const currentFilterParams = ref(null);
    function setCurrentFilterParams(params) {
        currentFilterParams.value = params;
    }

    // Loading flag backed by a counter. Two overlapping calls (e.g. the user
    // rapidly toggles between ticketid and non-ticketid filters, triggering
    // both `fetchCoreAggregations` and `fetchFilterOptionsOnly` back-to-back)
    // could otherwise see the faster one flip the flag to `false` while the
    // slower is still running. Counter-backed: `true` iff at least one group
    // fetch is in flight.
    const isAggregationsLoading = ref(false);
    let _aggregationLoadCount = 0;
    function incrementAggregationLoading() {
        _aggregationLoadCount++;
        isAggregationsLoading.value = true;
    }
    function decrementAggregationLoading() {
        if (_aggregationLoadCount > 0) _aggregationLoadCount--;
        if (_aggregationLoadCount === 0) isAggregationsLoading.value = false;
    }

    // Per-fetch generation counters. A group-level counter wasn't enough:
    // inner writes happen before Promise.allSettled resolves, so a slow
    // older fetch could overwrite fresher data. Each endpoint now guards
    // its own write with its own counter.
    let filterOptionsGeneration = 0;
    let narrowedFilterOptionsGeneration = 0;
    let statsGeneration = 0;
    let topicChartGeneration = 0;
    let vipCsatGeneration = 0;

    /** FULL options — date-range only, for active field dropdowns.
     *  Case-insensitive fields (`vip_level`, `sentiment`, `csat_score`) are
     *  lowercased + deduped via `normalizeFilterOptions` so the dropdown
     *  matches the lowercased values on ticket rows and outgoing filter params. */
    async function fetchFilterOptionsFromApi(filters) {
        const generation = ++filterOptionsGeneration;
        try {
            const data = await fetchFilterOptions(buildFilterOptionsParams(filters));
            if (generation !== filterOptionsGeneration) return;
            filterOptions.value = normalizeFilterOptions(data);
        } catch (err) {
            if (generation === filterOptionsGeneration) {
                logger.error('fetchFilterOptionsFromApi failed:', err?.message || err);
            }
            // Swallow — callers run via Promise.allSettled and don't need the rejection.
        }
    }

    /** NARROWED options — date-range + attribute filters, for inactive field dropdowns. */
    async function fetchNarrowedFilterOptions(filters) {
        const generation = ++narrowedFilterOptionsGeneration;
        try {
            const data = await fetchFilterOptions(buildNarrowedFilterOptionsParams(filters));
            if (generation !== narrowedFilterOptionsGeneration) return;
            narrowedFilterOptions.value = normalizeFilterOptions(data);
        } catch (err) {
            if (generation === narrowedFilterOptionsGeneration) {
                logger.error('fetchNarrowedFilterOptions failed:', err?.message || err);
            }
        }
    }

    async function fetchStats(filters) {
        const generation = ++statsGeneration;
        try {
            const data = await fetchTicketStats(buildStatsParams(filters));
            if (generation !== statsGeneration) return;
            stats.value = data;
        } catch (err) {
            if (generation === statsGeneration) {
                logger.error('fetchStats failed:', err?.message || err);
            }
        }
    }

    async function fetchTopicChart(filters) {
        const generation = ++topicChartGeneration;
        try {
            const data = await fetchTopicChartData(buildTopicChartParams(filters));
            if (generation !== topicChartGeneration) return;
            topicChartData.value = data;
        } catch (err) {
            if (generation === topicChartGeneration) {
                logger.error('fetchTopicChart failed:', err?.message || err);
            }
        }
    }

    async function fetchVipCsat(filters) {
        const generation = ++vipCsatGeneration;
        try {
            const data = await fetchVipCsatData(buildVipCsatParams(filters));
            if (generation !== vipCsatGeneration) return;
            vipCsatData.value = data;
        } catch (err) {
            if (generation === vipCsatGeneration) {
                logger.error('fetchVipCsat failed:', err?.message || err);
            }
        }
    }

    /**
     * Fetches ONLY filter-options endpoints (full + narrowed). Used for ticketid lookups
     * where stats/chart/vip are computed client-side from the single ticket.
     */
    async function fetchFilterOptionsOnly(filters) {
        incrementAggregationLoading();
        try {
            await Promise.allSettled([fetchFilterOptionsFromApi(filters), fetchNarrowedFilterOptions(filters)]);
        } finally {
            decrementAggregationLoading();
        }
    }

    /**
     * Populate stats / topicChartData / vipCsatData from a single normalized ticket.
     * Used when the user filters by ticketid — the backend doesn't honor the ticketid
     * query param on aggregation endpoints, so we compute the aggregation shapes
     * client-side to keep the charts/stats/VIP widgets in sync with the table.
     *
     * Bumps `topicChartGeneration` / `vipCsatGeneration` so any in-flight
     * widget-initiated fetch (from ChartDoc / VipTableDoc's lazy path) is
     * discarded when it returns — otherwise the broader backend response
     * would overwrite this single-ticket override.
     */
    function setSingleTicketAggregations(ticket) {
        // Invalidate any in-flight widget fetch first, so even a stats/null
        // short-circuit correctly cancels pending writes.
        topicChartGeneration++;
        vipCsatGeneration++;
        statsGeneration++;

        if (!ticket) {
            stats.value = null;
            topicChartData.value = null;
            vipCsatData.value = null;
            return;
        }

        const csat = ticket.csat_score?.toLowerCase() || '';
        const sentiment = ticket.sentiment?.toLowerCase() || '';
        const vip = ticket.vip_level?.toLowerCase() || '';
        const summary = ticket.summary || '';
        const isNegative = NEGATIVE_SET.has(sentiment);
        const isRated = csat === 'good' || csat === 'bad';

        // ── Stats (shape matches /api/ticket-stats/) ──
        stats.value = {
            total_tickets: 1,
            csat: {
                good: csat === 'good' ? 1 : 0,
                bad: csat === 'bad' ? 1 : 0,
                unoffered: csat === 'unoffered' ? 1 : 0
            },
            sentiment: {
                positive: sentiment === 'positive' ? 1 : 0,
                very_positive: sentiment === 'very positive' ? 1 : 0,
                neutral: sentiment === 'neutral' ? 1 : 0,
                negative: sentiment === 'negative' ? 1 : 0,
                very_negative: sentiment === 'very negative' ? 1 : 0
            },
            brands_count: ticket.brand && ticket.brand !== 'none' ? 1 : 0,
            vip: {
                platinum: vip === 'platinum' ? 1 : 0,
                diamond: vip === 'diamond' ? 1 : 0,
                gold: vip === 'gold' ? 1 : 0,
                silver: vip === 'silver' ? 1 : 0,
                bronze: vip === 'bronze' ? 1 : 0
            },
            compliance: {
                ok: COMPLIANCE_OK_RE.test(summary) ? 1 : 0,
                issue: COMPLIANCE_ISSUE_RE.test(summary) ? 1 : 0,
                missing: !COMPLIANCE_WORD_RE.test(summary) ? 1 : 0
            },
            unrated_tickets: csat === 'unoffered' ? 1 : 0
        };

        // ── Topic chart (shape matches /api/topic-chart-data/) ──
        topicChartData.value = {
            topics: [
                {
                    topic: ticket.topic || 'Unknown',
                    total: 1,
                    negative: isNegative ? 1 : 0,
                    percent_negative: isNegative ? 100 : 0
                }
            ]
        };

        // ── VIP CSAT (shape matches /api/vip-csat-data/) ──
        // Render ONLY the ticket's segment row instead of all 7 — otherwise an
        // unoffered ticket would display identical 0/0/0 cells across every segment
        // and the user couldn't tell which VIP tier the ticket belongs to.
        // The `TOTAL` row is still rendered by useApiVipAggregation from the `totals` field.
        const ts = ticket.timestamp instanceof Date ? ticket.timestamp : new Date(ticket.timestamp);
        const dayStart = new Date(ts);
        dayStart.setHours(0, 0, 0, 0);
        const dateKey = dayStart.toISOString().split('T')[0];
        const segment = vip || 'none';
        const cell = {
            good: csat === 'good' ? 1 : 0,
            bad: csat === 'bad' ? 1 : 0,
            rated: isRated ? 1 : 0
        };

        vipCsatData.value = {
            segments: [segment],
            dates: [dateKey],
            data: { [segment]: { [dateKey]: { ...cell } } },
            totals: { [dateKey]: { ...cell } }
        };
    }

    /**
     * Fetches the always-visible aggregations (filter options × 2 + stats).
     * Topic chart and VIP CSAT are fetched by their owner widgets
     * (ChartDoc / VipTableDoc) when they scroll into view — see decision #13
     * in Key Architecture Decisions, CLAUDE.md.
     * Accepts raw filter object from extractFilterParams() — each endpoint builds its own params.
     */
    async function fetchCoreAggregations(filters) {
        incrementAggregationLoading();
        try {
            await Promise.allSettled([fetchFilterOptionsFromApi(filters), fetchNarrowedFilterOptions(filters), fetchStats(filters)]);
        } finally {
            decrementAggregationLoading();
        }
    }

    return {
        // Mock mode
        mockedFilteredTickets,
        setMockedFilteredTickets,
        mockedTopicStats,

        // API mode
        filterOptions,
        narrowedFilterOptions,
        stats,
        topicChartData,
        vipCsatData,
        currentFilterParams,
        setCurrentFilterParams,
        isAggregationsLoading,
        fetchFilterOptionsFromApi,
        fetchNarrowedFilterOptions,
        fetchStats,
        fetchTopicChart,
        fetchVipCsat,
        fetchCoreAggregations,
        fetchFilterOptionsOnly,
        setSingleTicketAggregations
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTableStore, import.meta.hot));
}
