import { computed } from 'vue';
import { useTableStore } from '@/stores/tableStore';
import { VIP_TIERS } from '@/config/enums';

// Precompile regex patterns — avoids recompilation per ticket
const COMPLIANCE_OK_RE = /compliance[:\s]+ok/i;
const COMPLIANCE_ISSUE_RE = /compliance[:\s]+issue/i;
const COMPLIANCE_WORD_RE = /compliance/i;

/**
 * Single-pass aggregation over filteredTickets for the stats widget.
 * Returns raw counts and percentages — the component maps these to card definitions.
 */
export function useStatsAggregation() {
    const tableStore = useTableStore();

    const vipLevels = new Set(VIP_TIERS);

    const aggregation = computed(() => {
        let csatGood = 0,
            csatBad = 0;
        let negSentiment = 0,
            veryNegSentiment = 0;
        let unratedTickets = 0;
        let vipPlatinum = 0,
            vipGold = 0,
            vipOther = 0;
        let complianceOk = 0,
            complianceIssue = 0,
            complianceMissing = 0;
        const brandSet = new Set();

        for (const t of tableStore.filteredTickets) {
            const csat = t.csat_score?.toLowerCase();
            const sentiment = t.sentiment?.toLowerCase();
            const vip = t.vip_level?.toLowerCase();
            const summary = t.summary || '';

            if (csat === 'good') csatGood++;
            else if (csat === 'bad') csatBad++;
            else if (csat === 'unoffered') unratedTickets++;

            if (sentiment === 'negative') negSentiment++;
            else if (sentiment === 'very negative') veryNegSentiment++;

            if (t.brand && t.brand !== 'none') brandSet.add(t.brand);

            if (vipLevels.has(vip)) {
                if (vip === 'platinum' || vip === 'diamond') vipPlatinum++;
                else if (vip === 'gold') vipGold++;
                else vipOther++;
            }

            if (COMPLIANCE_OK_RE.test(summary)) complianceOk++;
            else if (COMPLIANCE_ISSUE_RE.test(summary)) complianceIssue++;
            if (!COMPLIANCE_WORD_RE.test(summary)) complianceMissing++;
        }

        const totalTickets = tableStore.filteredTickets.length;
        const ratedTickets = csatGood + csatBad;
        const pctCsat = ratedTickets > 0 ? ((csatGood / ratedTickets) * 100).toFixed(1) : '0';
        const pctSentiment = totalTickets > 0 ? (((negSentiment + veryNegSentiment) / totalTickets) * 100).toFixed(1) : '0';
        const pctUnratedTickets = totalTickets > 0 ? ((unratedTickets / totalTickets) * 100).toFixed(1) : '0';
        const pctComplianceOk = totalTickets > 0 ? ((complianceOk / totalTickets) * 100).toFixed(1) : '0';
        const vipTotal = vipPlatinum + vipGold + vipOther;

        return {
            totalTickets,
            csatGood,
            csatBad,
            ratedTickets,
            pctCsat,
            negSentiment,
            veryNegSentiment,
            pctSentiment,
            unratedTickets,
            pctUnratedTickets,
            brandCount: brandSet.size,
            vipPlatinum,
            vipGold,
            vipTotal,
            complianceOk,
            complianceIssue,
            complianceMissing,
            pctComplianceOk
        };
    });

    return { aggregation };
}
