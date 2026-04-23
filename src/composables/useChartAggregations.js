import { useTableStore } from '@/stores/tableStore';
import { computed } from 'vue';

const USE_MOCKED = import.meta.env.VITE_USE_MOCKED_DATA === 'true';

/**
 * Derives Chart.js-ready datasets from topic stats.
 * Mock mode: reads from tableStore.mockedTopicStats (client-side aggregation).
 * API mode: reads from tableStore.topicChartData (server response from /api/topic-chart-data/).
 */
export function useTopicCharts() {
    const store = useTableStore();

    const chartArrays = computed(() => {
        const top = USE_MOCKED ? store.mockedTopicStats : (store.topicChartData?.topics ?? []);

        const labels = new Array(top.length);
        const totals = new Array(top.length);
        const negatives = new Array(top.length);
        const percents = new Array(top.length);

        for (let i = 0; i < top.length; i++) {
            const s = top[i];
            labels[i] = s.topic;
            totals[i] = s.total;
            negatives[i] = s.negative;
            // Keep numeric (rounded to 1 decimal) so Chart.js can autoscale
            // and format tooltips consistently — `toFixed` returns a string,
            // which bypasses some of Chart.js' numeric code paths.
            percents[i] = Math.round((s.percent_negative ?? 0) * 10) / 10;
        }

        return { labels, totals, negatives, percents };
    });

    const barDataTotalNegative = computed(() => ({
        labels: chartArrays.value.labels,
        datasets: [
            { label: 'Total Chats', backgroundColor: '#3b82f6', data: chartArrays.value.totals },
            { label: 'Negative Chats', backgroundColor: '#f47214', data: chartArrays.value.negatives }
        ]
    }));

    const lineDataPercent = computed(() => ({
        labels: chartArrays.value.labels,
        datasets: [
            {
                label: '% Negative Chats',
                data: chartArrays.value.percents,
                borderColor: '#f47214',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                tension: 0.4,
                fill: true
            }
        ]
    }));

    const hasChartData = computed(() => chartArrays.value.labels.length > 0);

    return { barDataTotalNegative, lineDataPercent, hasChartData };
}
