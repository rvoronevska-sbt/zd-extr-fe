import { computed } from 'vue';
import { useTableStore } from '@/stores/tableStore';
import { VIP_SEGMENT_ORDER as SEGMENT_ORDER } from '@/config/enums';

/**
 * Aggregates filtered tickets into a per-VIP-segment, per-date CSAT table.
 * Returns reactive computeds for the VIP table component.
 */
export function useVipAggregation() {
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
            const vip = ticket.vip_level.toLowerCase();
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

    const hasVipData = computed(() => filteredTickets.value.some((t) => t.vip_level && t.vip_level !== 'none'));

    return {
        filteredTickets,
        dateRange,
        dates,
        groupedData,
        hasVipData
    };
}
