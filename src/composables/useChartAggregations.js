import { useTableStore } from '@/stores/tableStore';
import { computed } from 'vue';

export function useTopicCharts() {
    const store = useTableStore();

    const labels = computed(() => store.chartLabels);

    const barDataTotalNegative = computed(() => ({
        labels: labels.value,
        datasets: [
            {
                label: 'Total Chats',
                backgroundColor: '#3b82f6',
                data: store.totalChatsData
            },
            {
                label: 'Negative Chats',
                backgroundColor: '#f47214',
                data: store.negativeChatsData
            }
        ]
    }));

    const barDataNegativeOnly = computed(() => ({
        labels: labels.value,
        datasets: [
            {
                label: 'Negative Chats',
                backgroundColor: '#f47214',
                data: store.negativeChatsData
            }
        ]
    }));

    const lineDataPercent = computed(() => ({
        labels: labels.value,
        datasets: [
            {
                label: '% Negative Chats',
                data: store.percentNegativeData,
                borderColor: '#f47214',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                tension: 0.4,
                fill: true
            }
        ]
    }));

    const hasChartData = computed(() => labels.value.length > 0);

    return {
        barDataTotalNegative,
        barDataNegativeOnly,
        lineDataPercent,
        hasChartData
    };
}
