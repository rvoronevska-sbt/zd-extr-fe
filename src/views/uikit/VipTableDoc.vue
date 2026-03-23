<script setup>
import { useTableStore } from '@/stores/tableStore';
import { computed } from 'vue';
import { formatDate } from '@/utils/dateUtils';
import { VIP_SEGMENT_ORDER as SEGMENT_ORDER } from '@/config/enums';

const CSAT_HIGH_THRESHOLD = 80; // % — green
const CSAT_MID_THRESHOLD = 50; // % — yellow; below this is red

const tableStore = useTableStore();

const filteredTickets = computed(() => tableStore.filteredTickets || []);

const dateRange = computed(() => {
    if (!filteredTickets.value.length) return { start: null, end: null };

    let min = new Date(filteredTickets.value[0].timestamp);
    let max = new Date(filteredTickets.value[0].timestamp);

    for (let i = 1; i < filteredTickets.value.length; i++) {
        const ts = new Date(filteredTickets.value[i].timestamp);
        if (ts < min) min = ts;
        if (ts > max) max = ts;
    }

    min.setHours(0, 0, 0, 0);
    max.setHours(23, 59, 59, 999);

    return { start: min, end: max };
});

const dates = computed(() => {
    if (!dateRange.value.start) return [];
    const res = [];
    let cur = new Date(dateRange.value.start);
    while (cur <= dateRange.value.end) {
        const d = new Date(cur);
        res.push({ date: d, key: d.toISOString().split('T')[0] });
        cur.setDate(cur.getDate() + 1);
    }
    return res;
});

function initVipStats(dateKeys) {
    const vipStats = {};
    SEGMENT_ORDER.forEach((vip) => {
        vipStats[vip] = {
            segment: vip.charAt(0).toUpperCase() + vip.slice(1),
            perDate: Object.fromEntries(dateKeys.map((k) => [k, { good: 0, bad: 0, rated: 0 }]))
        };
    });
    return vipStats;
}

function aggregateTickets(vipStats, tickets) {
    tickets.forEach((ticket) => {
        const vip = (ticket.vip_level || 'none').toLowerCase();
        const ts = new Date(ticket.timestamp);
        ts.setHours(0, 0, 0, 0);
        const dateKey = ts.toISOString().split('T')[0];
        const bucket = vipStats[vip]?.perDate[dateKey];
        if (!bucket) return;
        const csat = ticket.csat_score?.toLowerCase();
        if (csat === 'good') bucket.good++;
        if (csat === 'bad') bucket.bad++;
        if (csat === 'good' || csat === 'bad') bucket.rated++;
    });
}

function calcCsatPercentages(vipStats) {
    Object.values(vipStats).forEach((group) => {
        Object.values(group.perDate).forEach((stats) => {
            stats.csat = stats.rated > 0 ? ((stats.good / stats.rated) * 100).toFixed(2) + '%' : '—';
        });
    });
}

function buildRows(vipStats, dateValues) {
    return SEGMENT_ORDER.filter((vip) => vipStats[vip]).map((vip) => {
        const group = vipStats[vip];
        const row = { segment: group.segment };
        dateValues.forEach(({ key }) => {
            const s = group.perDate[key];
            row[`good_${key}`] = s.good;
            row[`bad_${key}`] = s.bad;
            row[`rated_${key}`] = s.rated;
            row[`csat_${key}`] = s.csat;
        });
        return row;
    });
}

function buildTotalsRow(vipStats, dateValues) {
    const totalRow = { segment: 'TOTAL' };
    dateValues.forEach(({ key }) => {
        let good = 0,
            bad = 0,
            rated = 0;
        Object.values(vipStats).forEach((group) => {
            const s = group.perDate[key];
            good += s.good;
            bad += s.bad;
            rated += s.rated;
        });
        totalRow[`good_${key}`] = good;
        totalRow[`bad_${key}`] = bad;
        totalRow[`rated_${key}`] = rated;
        totalRow[`csat_${key}`] = rated > 0 ? ((good / rated) * 100).toFixed(2) + '%' : '—';
    });
    return totalRow;
}

const groupedData = computed(() => {
    if (!filteredTickets.value.length) return [];
    const dateKeys = dates.value.map((d) => d.key);
    const vipStats = initVipStats(dateKeys);
    aggregateTickets(vipStats, filteredTickets.value);
    calcCsatPercentages(vipStats);
    const rows = buildRows(vipStats, dates.value);
    rows.push(buildTotalsRow(vipStats, dates.value));
    return rows;
});

// Show the table only when there are filtered tickets that have a meaningful VIP level
const hasVipData = computed(() => filteredTickets.value.some((t) => t.vip_level && t.vip_level !== 'none'));

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
                Aggregated from <strong>{{ tableStore.filteredTickets?.length || 0 }}</strong> filtered tickets (date range: {{ dateRange.start ? formatDate(dateRange.start) : '—' }} to {{ dateRange.end ? formatDate(dateRange.end) : '—' }})
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
