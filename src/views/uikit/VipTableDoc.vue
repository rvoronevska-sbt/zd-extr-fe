<script setup>
import { useVipAggregation } from '@/composables/useVipAggregation';
import { formatDate } from '@/utils/dateUtils';

const CSAT_HIGH_THRESHOLD = 80; // % — green
const CSAT_MID_THRESHOLD = 50; // % — yellow; below this is red

const { filteredTickets, dateRange, dates, groupedData, hasVipData } = useVipAggregation();

function getSegmentRowClass(segment) {
    const map = {
        None: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100',
        Normal: 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
        Bronze: 'bg-orange-200 text-orange-900 dark:bg-orange-900 dark:text-orange-100',
        Silver: 'bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-100',
        Gold: 'bg-yellow-200 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100',
        Platinum: 'bg-violet-100 text-violet-900 dark:bg-purple-900 dark:text-violet-100',
        Diamond: 'bg-cyan-100 text-cyan-900 dark:bg-cyan-900 dark:text-cyan-100',
        TOTAL: 'bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-100'
    };
    return map[segment] || '';
}

function getCsatClass(csat) {
    if (!csat || csat === '—') return '';
    const val = parseFloat(csat);
    if (val >= CSAT_HIGH_THRESHOLD) return 'bg-green-100 text-green-800 font-semibold dark:bg-green-900 dark:text-green-300';
    if (val >= CSAT_MID_THRESHOLD) return 'bg-yellow-100 text-yellow-800 font-semibold dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 font-semibold dark:bg-red-900 dark:text-red-300';
}
</script>

<template>
    <div v-if="filteredTickets.length > 0 && hasVipData" class="vip-table card mt-8">
        <!-- Info banner – matches TableDoc pattern -->
        <div class="dt-info-card card mb-8 p-4">
            <p class="inline-block dt-info-p rounded-xl py-2 px-3">
                Aggregated from <strong>{{ filteredTickets.length }}</strong> filtered tickets (date range: {{ dateRange.start ? formatDate(dateRange.start) : '—' }} to {{ dateRange.end ? formatDate(dateRange.end) : '—' }})
            </p>
        </div>

        <DataTable
            :value="groupedData"
            rowGroupMode="rowspan"
            groupRowsBy="segment"
            sortMode="false"
            sortField="segment"
            :sortOrder="1"
            tableStyle="min-width: 50rem; text-align: center;"
            showGridlines
            responsiveLayout="scroll"
            :pt="{
                table: { class: 'w-full text-sm text-gray-700 dark:text-gray-300' },
                thead: { class: 'bg-gray-100 dark:bg-gray-700' },
                tbody: { class: '' },
                column: { root: { class: 'border-r last:border-r-0' } } // optional per-column tweaks
            }"
        >
            <Column header="Customer Segment" field="segment" :sortable="false" style="min-width: 180px; font-weight: bold; text-align: center; padding: 0">
                <template #body="{ data }">
                    <div :class="getSegmentRowClass(data.segment)" class="p-8">{{ data.segment }}</div>
                </template>
            </Column>

            <!-- Dynamic columns – one set per date -->
            <Column v-for="{ date, key } in dates" :key="key" :header="formatDate(date)" style="min-width: 140px; text-align: center; vertical-align: text-bottom; padding: 0">
                <template #body="{ data }">
                    <div class="grid grid-cols-1 gap-0 text-sm p-0">
                        <div class="border-b border-solid border-(--p-datatable-body-cell-border-color)" :class="getCsatClass(data[`csat_${key}`])">CSAT: {{ data[`csat_${key}`] }}</div>
                        <div class="border-b border-solid border-(--p-datatable-body-cell-border-color)">✓ Good rates: {{ data[`good_${key}`] }}</div>
                        <div class="border-b border-solid border-(--p-datatable-body-cell-border-color)">✗ Bad rates: {{ data[`bad_${key}`] }}</div>
                        <div>Rated: {{ data[`rated_${key}`] }}</div>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style lang="scss" scoped>
/* ── DataTable overrides (can't be done via Tailwind — need :deep for PrimeVue internals) ── */
.vip-table :deep(.p-datatable) {
    .p-datatable-thead > tr > th {
        background-color: var(--primary-50);
        color: var(--primary-800);
        font-weight: 600;
        padding: 12px !important;
        border-bottom-color: var(--text-color);
        .p-datatable-column-header-content {
            justify-content: center;
        }
    }

    .p-datatable-tbody > tr:last-child {
        font-weight: bold;
    }

    .p-datatable-tbody > tr > td {
        border-bottom-color: var(--text-color);
    }
}
</style>
