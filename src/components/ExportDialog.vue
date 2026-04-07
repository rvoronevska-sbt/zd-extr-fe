<script setup>
import { ref } from 'vue';
import { buildExportParams, exportTicketsCsv } from '@/services/ticketApi';
import { useTableStore } from '@/stores/tableStore';

const USE_MOCKED = import.meta.env.VITE_USE_MOCKED_DATA === 'true';

const visible = defineModel('visible', { default: false });

const tableStore = useTableStore();

const sortedOptions = (key) => [...(tableStore.filterOptions?.[key] ?? [])].sort((a, b) => String(a).localeCompare(String(b)));

// ── Local export filters (independent from table filters) ──
const exportFromDate = ref(null);
const exportToDate = ref(null);
const exportBrand = ref([]);
const exportTopic = ref([]);
const exportVipLevel = ref([]);
const exportCsatScore = ref(null);
const exportSentiment = ref(null);

const isExporting = ref(false);

function resetExportFilters() {
    exportFromDate.value = null;
    exportToDate.value = null;
    exportBrand.value = [];
    exportTopic.value = [];
    exportVipLevel.value = [];
    exportCsatScore.value = null;
    exportSentiment.value = null;
}

async function doExport() {
    isExporting.value = true;
    try {
        const params = buildExportParams({
            startDate: exportFromDate.value,
            endDate: exportToDate.value,
            brand: exportBrand.value,
            topic: exportTopic.value,
            vip_level: exportVipLevel.value,
            csat_score: exportCsatScore.value,
            sentiment: exportSentiment.value
        });
        await exportTicketsCsv(params);
        visible.value = false;
    } catch (err) {
        console.error('CSV export failed:', err);
    } finally {
        isExporting.value = false;
    }
}
</script>

<template>
    <Dialog v-model:visible="visible" header="Export to CSV" :style="{ width: '36rem' }" modal :closable="!isExporting" aria-label="Export filters dialog">
        <div class="flex flex-col gap-4">
            <!-- Date range -->
            <div>
                <label class="block font-medium mb-2">Date Range</label>
                <div class="flex flex-col sm:flex-row gap-2">
                    <DatePicker v-model="exportFromDate" placeholder="From (≥)" dateFormat="mm/dd/yy" showIcon class="w-full" />
                    <DatePicker v-model="exportToDate" placeholder="To (<)" dateFormat="mm/dd/yy" showIcon class="w-full" />
                </div>
            </div>

            <!-- Brand -->
            <div>
                <label class="block font-medium mb-2">Brand</label>
                <MultiSelect v-model="exportBrand" :options="sortedOptions('brand')" placeholder="Any Brand" display="chip" :filter="true" showClear class="w-full" />
            </div>

            <!-- Topic -->
            <div>
                <label class="block font-medium mb-2">Topic</label>
                <MultiSelect v-model="exportTopic" :options="sortedOptions('topic')" placeholder="Any Topic" display="chip" :filter="true" showClear class="w-full" />
            </div>

            <!-- VIP Level -->
            <div>
                <label class="block font-medium mb-2">VIP Level</label>
                <MultiSelect v-model="exportVipLevel" :options="sortedOptions('vip_level')" placeholder="Any VIP Level" display="chip" :filter="true" showClear class="w-full" />
            </div>

            <!-- CSAT Score -->
            <div>
                <label class="block font-medium mb-2">CSAT Score</label>
                <Select v-model="exportCsatScore" :options="sortedOptions('csat_score')" placeholder="Any CSAT Score" showClear class="w-full" />
            </div>

            <!-- Sentiment -->
            <div>
                <label class="block font-medium mb-2">Sentiment</label>
                <Select v-model="exportSentiment" :options="sortedOptions('sentiment')" placeholder="Any Sentiment" showClear class="w-full" />
            </div>
        </div>

        <template #footer>
            <div class="flex justify-between w-full">
                <Button label="Reset Filters" icon="pi pi-filter-slash" text @click="resetExportFilters()" :disabled="isExporting" aria-label="Reset export filters" />
                <div class="flex gap-2">
                    <Button label="Cancel" icon="pi pi-times" outlined @click="visible = false" :disabled="isExporting" aria-label="Cancel export" />
                    <Button label="Export" icon="pi pi-download" @click="doExport()" :loading="isExporting" aria-label="Start CSV export" />
                </div>
            </div>
        </template>
    </Dialog>
</template>
