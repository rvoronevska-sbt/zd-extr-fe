<script setup>
import { computed } from 'vue';
import { useStatsAggregation } from '@/composables/useStatsAggregation';

const { aggregation } = useStatsAggregation();

const stats = computed(() => {
    const a = aggregation.value;
    return [
        { title: 'Total Tickets', icon: 'pi pi-ticket', color: 'primary', summaryValue: a.totalTickets, primaryDetails: a.totalTickets, secondaryDetails: 'tickets in total' },
        { title: 'CSAT Score', icon: 'pi pi-star', color: 'yellow-500', summaryValue: a.pctCsat + '%', primaryDetails: `${a.csatGood} good`, secondaryDetails: `· ${a.csatBad} bad rated` },
        {
            title: 'Negative Sentiment',
            icon: 'pi pi-face-smile',
            color: 'red-500',
            summaryValue: a.pctSentiment + '%',
            primaryDetails: `${a.veryNegSentiment} very negative`,
            secondaryDetails: `· ${a.negSentiment} negative`
        },
        { title: 'Unrated Tickets', icon: 'pi pi-minus-circle', color: 'gray-500', summaryValue: a.unratedTickets, primaryDetails: a.unratedTickets, secondaryDetails: `${a.pctUnratedTickets}% of all tickets unoffered` },
        { title: 'Active Brands', icon: 'pi pi-building', color: 'blue-500', summaryValue: a.brandCount, primaryDetails: a.brandCount, secondaryDetails: 'brands across all tickets' },
        { title: 'VIP Tickets', icon: 'pi pi-crown', color: 'purple-500', summaryValue: a.vipTotal, primaryDetails: `${a.vipPlatinum} platinum/diamond`, secondaryDetails: `· ${a.vipGold} gold` },
        { title: 'Compliance OK', icon: 'pi pi-check-circle', color: 'green-500', summaryValue: a.complianceOk, primaryDetails: `${a.pctComplianceOk}%`, secondaryDetails: 'of all tickets compliant' },
        {
            title: 'Compliance Issues',
            icon: 'pi pi-exclamation-triangle',
            color: 'orange-500',
            summaryValue: a.complianceIssue,
            primaryDetails: `${a.complianceMissing} missing`,
            secondaryDetails: 'no compliance data'
        }
    ];
});
</script>

<template>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3" v-for="stat in stats" :key="stat.title">
        <div class="stats-widget-cards card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="capitalize block text-muted-color font-medium mb-4">{{ stat.title }}</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                        {{ stat.summaryValue }}
                    </div>
                </div>
                <div class="stats-icon-box flex items-center justify-center rounded-border w-10 h-10">
                    <i :class="stat.icon" class="text-xl"></i>
                </div>
            </div>
            <span class="text-primary font-medium">{{ stat.primaryDetails }}</span>
            <span class="text-muted-color ml-2">{{ stat.secondaryDetails }}</span>
        </div>
    </div>
</template>
