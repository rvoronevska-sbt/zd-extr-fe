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
        res.push(new Date(cur));
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
        dateValues.forEach((date) => {
            const dateKey = date.toISOString().split('T')[0];
            const s = group.perDate[dateKey];
            row[`good_${dateKey}`] = s.good;
            row[`bad_${dateKey}`] = s.bad;
            row[`rated_${dateKey}`] = s.rated;
            row[`csat_${dateKey}`] = s.csat;
        });
        return row;
    });
}

function buildTotalsRow(vipStats, dateValues) {
    const totalRow = { segment: 'TOTAL' };
    dateValues.forEach((date) => {
        const dateKey = date.toISOString().split('T')[0];
        let good = 0,
            bad = 0,
            rated = 0;
        Object.values(vipStats).forEach((group) => {
            const s = group.perDate[dateKey];
            good += s.good;
            bad += s.bad;
            rated += s.rated;
        });
        totalRow[`good_${dateKey}`] = good;
        totalRow[`bad_${dateKey}`] = bad;
        totalRow[`rated_${dateKey}`] = rated;
        totalRow[`csat_${dateKey}`] = rated > 0 ? ((good / rated) * 100).toFixed(2) + '%' : '—';
    });
    return totalRow;
}

const groupedData = computed(() => {
    if (!filteredTickets.value.length) return [];
    const dateKeys = dates.value.map((d) => d.toISOString().split('T')[0]);
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
        None: 'segment-none',
        Normal: 'segment-normal',
        Bronze: 'segment-bronze',
        Silver: 'segment-silver',
        Gold: 'segment-gold',
        Platinum: 'segment-platinum',
        Diamond: 'segment-diamond',
        TOTAL: 'segment-total'
    };
    return map[segment] || '';
}

function getCsatClass(csat) {
    if (!csat || csat === '—') return 'csat-none';
    const val = parseFloat(csat);
    if (val >= CSAT_HIGH_THRESHOLD) return 'csat-high';
    if (val >= CSAT_MID_THRESHOLD) return 'csat-mid';
    return 'csat-low';
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
                    <div :class="getSegmentRowClass(data.segment)" class="p-8 dark:text-[var(--surface-ground)]">{{ data.segment }}</div>
                </template>
            </Column>

            <!-- Dynamic columns – one set per date -->
            <Column v-for="date in dates" :key="date.toISOString()" :header="formatDate(date)" style="min-width: 140px; text-align: center; vertical-align: text-bottom; padding: 0">
                <template #body="{ data }">
                    <div class="grid grid-cols-1 gap-0 text-sm p-0">
                        <div class="border-b border-solid border-(--p-datatable-body-cell-border-color)" :class="data[`csat_${date.toISOString().split('T')[0]}`] !== '—' ? 'bg-yellow-100 dark:text-[var(--surface-ground)]' : ''">
                            CSAT: {{ data[`csat_${date.toISOString().split('T')[0]}`] }}
                        </div>
                        <div class="border-b border-solid border-(--p-datatable-body-cell-border-color)">Good rates: {{ data[`good_${date.toISOString().split('T')[0]}`] }}</div>
                        <div class="border-b border-solid border-(--p-datatable-body-cell-border-color)">Bad rates: {{ data[`bad_${date.toISOString().split('T')[0]}`] }}</div>
                        <div>Rated: {{ data[`rated_${date.toISOString().split('T')[0]}`] }}</div>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style lang="scss" scoped>
.vip-table {
    :deep(.p-datatable) {
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
            background: var(--surface-200);
        }

        .p-datatable-tbody > tr > td {
            border-bottom-color: var(--text-color);
        }
    }
}

.segment-normal {
    background-color: #e6ffe6;
}
.segment-bronze {
    background-color: #fff3e0;
}
.segment-silver {
    background-color: #e3f2fd;
}
.segment-gold {
    background-color: #fffde7;
}
.segment-platinum {
    background-color: #f3e5f5;
}
.segment-diamond {
    background-color: #f5f5f5;
}
.segment-none {
    background-color: #fafafa;
}
</style>
