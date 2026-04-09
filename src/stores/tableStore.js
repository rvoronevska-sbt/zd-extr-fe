import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref, shallowRef } from 'vue';
import { NEGATIVE_SENTIMENTS } from '@/config/mockedEnums';

// O(1) lookup instead of Array.includes O(n) — called per row (mock mode only)
const NEGATIVE_SET = new Set(NEGATIVE_SENTIMENTS);

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

    // Loading states for aggregation endpoints
    const isAggregationsLoading = ref(false);

    /** FULL options — date-range only, for active field dropdowns. */
    async function fetchFilterOptionsFromApi(filters) {
        const { buildFilterOptionsParams, fetchFilterOptions } = await import('@/services/ticketApi');
        const params = buildFilterOptionsParams(filters);
        console.group('[tableStore] fetchFilterOptionsFromApi (FULL — date only)');
        console.log('Params:', params);
        filterOptions.value = await fetchFilterOptions(params);
        console.log('topics:', filterOptions.value?.topic?.length, '| brands:', filterOptions.value?.brand?.length, '| vipLevels:', filterOptions.value?.vip_level?.length, '| sentiments:', filterOptions.value?.sentiment?.length, '| csatScores:', filterOptions.value?.csat_score?.length);
        console.groupEnd();
    }

    /** NARROWED options — date-range + attribute filters, for inactive field dropdowns. */
    async function fetchNarrowedFilterOptions(filters) {
        const { buildNarrowedFilterOptionsParams, fetchFilterOptions } = await import('@/services/ticketApi');
        const params = buildNarrowedFilterOptionsParams(filters);
        console.group('[tableStore] fetchNarrowedFilterOptions (NARROWED — date + attributes)');
        console.log('Params:', params);
        narrowedFilterOptions.value = await fetchFilterOptions(params);
        console.log('topics:', narrowedFilterOptions.value?.topic?.length, '| brands:', narrowedFilterOptions.value?.brand?.length, '| vipLevels:', narrowedFilterOptions.value?.vip_level?.length, '| sentiments:', narrowedFilterOptions.value?.sentiment?.length, '| csatScores:', narrowedFilterOptions.value?.csat_score?.length);
        console.groupEnd();
    }

    async function fetchStats(filters) {
        const { buildStatsParams, fetchTicketStats } = await import('@/services/ticketApi');
        stats.value = await fetchTicketStats(buildStatsParams(filters));
    }

    async function fetchTopicChart(filters) {
        const { buildTopicChartParams, fetchTopicChartData: apiFetch } = await import('@/services/ticketApi');
        topicChartData.value = await apiFetch(buildTopicChartParams(filters));
    }

    async function fetchVipCsat(filters) {
        const { buildVipCsatParams, fetchVipCsatData: apiFetch } = await import('@/services/ticketApi');
        vipCsatData.value = await apiFetch(buildVipCsatParams(filters));
    }

    /**
     * Fetches all aggregation endpoints in parallel.
     * Accepts raw filter object from extractFilterParams() — each endpoint builds its own params.
     */
    async function fetchAllAggregations(filters) {
        isAggregationsLoading.value = true;
        try {
            const results = await Promise.allSettled([fetchFilterOptionsFromApi(filters), fetchNarrowedFilterOptions(filters), fetchStats(filters), fetchTopicChart(filters), fetchVipCsat(filters)]);
            results.forEach((result, i) => {
                if (result.status === 'rejected') {
                    const names = ['filterOptions', 'narrowedFilterOptions', 'stats', 'topicChartData', 'vipCsatData'];
                    console.error(`Failed to fetch ${names[i]}:`, result.reason?.message || result.reason);
                }
            });
        } finally {
            isAggregationsLoading.value = false;
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
        isAggregationsLoading,
        fetchFilterOptionsFromApi,
        fetchNarrowedFilterOptions,
        fetchStats,
        fetchTopicChart,
        fetchVipCsat,
        fetchAllAggregations
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTableStore, import.meta.hot));
}
