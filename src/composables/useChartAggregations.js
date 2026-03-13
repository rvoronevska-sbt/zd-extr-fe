import { useTableStore } from '@/stores/tableStore';
import { computed } from 'vue';

// Chrome's canvas max width is 32,767px; at 48px/bar that's ~682 bars max.
// Cap at 100 for performance and readability — topicStats is already sorted by total desc.
const TOP_TOPICS_LIMIT = 100;

export function useTopicCharts() {
    const store = useTableStore();

    // Slice to top N topics (already sorted by total desc in the store)
    const topStats = computed(() => store.topicStats.slice(0, TOP_TOPICS_LIMIT));

    const labels = computed(() => topStats.value.map((s) => s.topic));
    const totalChatsData = computed(() => topStats.value.map((s) => s.total));
    const negativeChatsData = computed(() => topStats.value.map((s) => s.negative));
    const percentNegativeData = computed(() => topStats.value.map((s) => s.percentNegative.toFixed(1)));

    const barDataTotalNegative = computed(() => ({
        labels: labels.value,
        datasets: [
            { label: 'Total Chats', backgroundColor: '#3b82f6', data: totalChatsData.value },
            { label: 'Negative Chats', backgroundColor: '#f47214', data: negativeChatsData.value }
        ]
    }));

    const barDataNegativeOnly = computed(() => ({
        labels: labels.value,
        datasets: [
            { label: 'Negative Chats', backgroundColor: '#f47214', data: negativeChatsData.value }
        ]
    }));

    const lineDataPercent = computed(() => ({
        labels: labels.value,
        datasets: [
            {
                label: '% Negative Chats',
                data: percentNegativeData.value,
                borderColor: '#f47214',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                tension: 0.4,
                fill: true
            }
        ]
    }));

    const hasChartData = computed(() => labels.value.length > 0);
    const totalTopicCount = computed(() => store.topicStats.length);

    return {
        barDataTotalNegative,
        barDataNegativeOnly,
        lineDataPercent,
        hasChartData,
        totalTopicCount
    };
}
