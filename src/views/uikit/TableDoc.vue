<script setup>
import { FilterService } from '@primevue/core/api';
import { computed, ref } from 'vue';

import { formatDate } from '@/utils/dateUtils';
import TranscriptDialog from '@/components/TranscriptDialog.vue';
import { useTicketFilters, PAGE_SIZE_OPTIONS } from '@/composables/useTicketFilters';
import { useTranscriptDialog } from '@/composables/useTranscriptDialog';
import { useTicketTableData } from '@/composables/useTicketTableData';

const USE_MOCKED = import.meta.env.VITE_USE_MOCKED_DATA === 'true';

// Custom filter for MultiSelect (mock mode only, harmless in API mode)
FilterService.register('containsAny', (value, filter) => {
    if (!filter?.length) return true;
    if (!value) return false;
    const anyInRow = value.split(', ').map((t) => t.trim());
    return filter.some((selected) => anyInRow.includes(selected));
});

const dataTable = ref(null);

// ── Composables ──
const filterState = useTicketFilters();
const { filters, lazyParams, activeQuickFilter, fromDate, toDate, startedAtFrom, startedAtTo, updatedAtFrom, updatedAtTo } = filterState;

const dateColumns = [
    { header: 'Started At', field: 'started_at', from: startedAtFrom, to: startedAtTo },
    { header: 'Updated At', field: 'updated_at', from: updatedAtFrom, to: updatedAtTo }
];

const transcriptColumns = [
    { header: 'Chat Transcript', field: 'chat_transcript', hasField: 'has_chat_transcript', dialogType: 'Chat', minWidth: '12rem' },
    { header: 'Email Transcript', field: 'email_transcript', hasField: 'has_email_transcript', dialogType: 'Email', minWidth: '13rem' }
];

const { dialog, openDialog } = useTranscriptDialog();

const {
    isLoading,
    tableData,
    totalRecords,
    availableTopics,
    availableBrands,
    availableVipLevels,
    availableCustomerEmails,
    availableAgentEmails,
    availableChatTags,
    availableSentiments,
    availableCsatScores,
    exportToCSV,
    isExportDisabled,
    onPage,
    onSort,
    onFilter,
    setQuickDateFilter,
    clearFilter
} = useTicketTableData(filterState, dataTable);

const emailColumns = computed(() => [
    { header: 'Customer Email', field: 'customer_email', options: availableCustomerEmails?.value ?? [] },
    { header: 'Agent Email', field: 'agent_email', options: availableAgentEmails?.value ?? [] }
]);
</script>

<template>
    <div class="data-table card mt-8 mb-8">
        <!-- Info card -->
        <div class="dt-info-card card mb-8 p-4!">
            <p class="inline-block dt-info-p rounded-xl py-2 px-3 m-0!" v-if="totalRecords > 0">
                Showing <strong>{{ totalRecords }}</strong> filtered {{ totalRecords > 1 ? 'tickets' : 'ticket' }}.
            </p>
            <p class="inline-block dt-info-p rounded-xl py-2 px-3 m-0!" v-else>No tickets found.</p>
            <p class="inline-block p-tag-info rounded-xl py-2 px-3 mb-0! mt-2! lg:ml-2! lg:mt-0!" v-if="totalRecords > 0">
                Tip: For best visualization of the exported ticket data in Excel, use Data > Get Data > From Text/CSV. Save the export as a .xlsx file to retain formatting.
            </p>
        </div>

        <DataTable
            ref="dataTable"
            :value="tableData"
            :lazy="true"
            :totalRecords="totalRecords"
            :rows="lazyParams.limit"
            :loading="isLoading"
            paginator
            :rowsPerPageOptions="PAGE_SIZE_OPTIONS"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            :paginatorPosition="'both'"
            v-model:filters="filters"
            filterDisplay="menu"
            :globalFilterFields="
                USE_MOCKED
                    ? ['ticketid', 'topic', 'brand', 'vip_level', 'customer_email', 'agent_email', 'csat_score', '_chatTagsString', 'chat_transcript', 'email_transcript', 'sentiment', 'sentiment_reason', 'summary']
                    : ['ticketid', 'topic', 'brand', 'vip_level', 'customer_email', 'agent_email', 'csat_score', 'sentiment', 'sentiment_reason', 'summary']
            "
            responsiveLayout="scroll"
            showGridlines
            @page="onPage"
            @sort="onSort"
            @filter="onFilter"
        >
            <!-- Header with quick filters, clear, export, global search -->
            <template #header>
                <div class="flex justify-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear all filters" outlined @click="clearFilter()" aria-label="Clear all filters" />
                    <div class="flex flex-wrap gap-3 items-center">
                        <!-- Quick date filters -->
                        <div class="flex gap-2">
                            <Button :class="`dt-period-filters ${activeQuickFilter === 'today' ? 'dt-period-active' : ''}`" label="Today" icon="pi pi-calendar" outlined size="small" @click="setQuickDateFilter('today')" aria-label="Filter by today" />
                            <Button :class="`dt-period-filters ${activeQuickFilter === 'week' ? 'dt-period-active' : ''}`" label="Last 7 Days" outlined size="small" @click="setQuickDateFilter('week')" aria-label="Filter by last 7 days" />
                            <Button :class="`dt-period-filters ${activeQuickFilter === 'month' ? 'dt-period-active' : ''}`" label="Last Month" outlined size="small" @click="setQuickDateFilter('month')" aria-label="Filter by last 30 days" />
                            <Button :class="`dt-period-filters ${activeQuickFilter === '2 months' ? 'dt-period-active' : ''}`" label="Last 2 Months" outlined size="small" @click="setQuickDateFilter('2 months')" aria-label="Filter by last 2 months" />
                            <Button :class="`dt-period-filters ${activeQuickFilter === '3 months' ? 'dt-period-active' : ''}`" label="Last 3 Months" outlined size="small" @click="setQuickDateFilter('3 months')" aria-label="Filter by last 3 months" />
                        </div>
                    </div>
                    <Button
                        type="button"
                        icon="pi pi-download"
                        label="Export to CSV"
                        outlined
                        :disabled="isExportDisabled"
                        :title="isExportDisabled ? 'CSV export is not available with the current filters — only date range, brand, topic, VIP level, CSAT, and sentiment are supported' : ''"
                        @click="exportToCSV()"
                        aria-label="Export filtered results to CSV"
                    />
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText name="global-search" v-model="filters.global.value" placeholder="Global Search" />
                    </IconField>
                </div>
            </template>

            <template #empty>No tickets found.</template>
            <template #loading>Loading tickets... Please wait.</template>

            <Column header="Date" filterField="timestamp" :showFilterMatchModes="false" :showFilterOperator="false" :showAddButton="false" dataType="date" filterMenuClass="my-date-filter-menu" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ formatDate(data.timestamp) }}
                </template>
                <template #filter>
                    <div class="flex flex-col sm:flex-row gap-2 p-2">
                        <DatePicker v-model="fromDate" placeholder="From (≥)" dateFormat="mm/dd/yy" showIcon />
                        <DatePicker v-model="toDate" placeholder="To (<)" dateFormat="mm/dd/yy" showIcon />
                    </div>
                </template>
            </Column>

            <Column
                v-for="col in dateColumns"
                :key="col.field"
                :header="col.header"
                :filterField="col.field"
                :showFilterMatchModes="false"
                :showFilterOperator="false"
                :showAddButton="false"
                dataType="date"
                filterMenuClass="my-date-filter-menu"
                style="min-width: 15rem"
            >
                <template #body="{ data }">
                    {{ data[col.field] ? formatDate(data[col.field], 'en-US', true) : '—' }}
                </template>
                <template #filter>
                    <div class="flex flex-col sm:flex-row gap-2 p-2">
                        <DatePicker v-model="col.from.value" placeholder="From (≥)" dateFormat="mm/dd/yy" showIcon />
                        <DatePicker v-model="col.to.value" placeholder="To (<)" dateFormat="mm/dd/yy" showIcon />
                    </div>
                </template>
            </Column>

            <Column header="Topic" filterField="topic" :showFilterMatchModes="false" style="min-width: 15rem">
                <template #body="{ data }">
                    <div class="flex flex-wrap gap-1">
                        <Tag :value="data.topic" severity="warn" />
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect v-model="filterModel.value" :options="availableTopics" placeholder="Filter by Topic" display="chip" :filter="true" showClear @change="filterCallback()" />
                </template>
            </Column>

            <Column header="Ticket ID" field="ticketid" :showFilterMatchModes="false" filterField="ticketid" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.ticketid }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Filter by Ticket ID" />
                </template>
            </Column>

            <Column header="Brand" filterField="brand" :showFilterMatchModes="false" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="flex flex-wrap gap-1">
                        <Tag :value="data.brand" />
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect v-model="filterModel.value" :options="availableBrands" placeholder="Filter by Brand" display="chip" :filter="true" showClear @change="filterCallback()" />
                </template>
            </Column>

            <Column header="VIP Level" filterField="vip_level" :showFilterMatchModes="false" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex flex-wrap gap-1">
                        <Tag :value="data.vip_level" severity="info" />
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect v-model="filterModel.value" :options="availableVipLevels" placeholder="Filter by VIP Level" display="chip" :filter="true" showClear @change="filterCallback()" />
                </template>
            </Column>

            <Column v-for="col in emailColumns" :key="col.field" :header="col.header" :filterField="col.field" :showFilterMatchModes="false" style="min-width: 18rem">
                <template #body="{ data }">
                    {{ data[col.field] === 'none' ? '—' : data[col.field] }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect v-model="filterModel.value" :options="col.options" :placeholder="`Filter by ${col.header}`" display="chip" :filter="true" showClear @change="filterCallback()" />
                </template>
            </Column>

            <Column header="CSAT Score" field="csat_score" filterField="csat_score" :showFilterMatchModes="false" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag :value="data.csat_score" severity="contrast" />
                </template>
                <template #filter="{ filterModel }">
                    <Select v-model="filterModel.value" :options="availableCsatScores" placeholder="Filter by CSAT Score" showClear>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" />
                        </template>
                    </Select>
                </template>
            </Column>

            <Column header="Chat Tags" filterField="_chatTagsString" :showFilterMatchModes="false" style="min-width: 30rem">
                <template #body="{ data }">
                    <div class="flex flex-wrap gap-1">
                        <Tag v-for="tag in data.chat_tags" :key="tag" :value="tag" severity="secondary" />
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect v-model="filterModel.value" :options="availableChatTags" placeholder="Filter by Chat Tag" display="chip" :filter="true" showClear @change="filterCallback()">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" />
                        </template>
                    </MultiSelect>
                </template>
            </Column>

            <Column v-for="col in transcriptColumns" :key="col.field" :header="col.header" :field="col.field" :filterField="col.field" :showFilterMatchModes="false" :style="{ minWidth: col.minWidth }">
                <template #body="{ data }">
                    <template v-if="USE_MOCKED">
                        <Button
                            v-if="data[col.field]"
                            label="View"
                            icon="pi pi-external-link"
                            @click="openDialog(col.dialogType, data[col.field], data.timestamp)"
                            size="small"
                            severity="info"
                            rounded
                            :aria-label="`View ${col.header.toLowerCase()}`"
                        />
                        <span v-else>—</span>
                    </template>
                    <template v-else>
                        <Button
                            v-if="data[col.hasField]"
                            label="View"
                            icon="pi pi-external-link"
                            @click="openDialog(col.dialogType, data.ticketid, data.timestamp)"
                            size="small"
                            severity="info"
                            rounded
                            :aria-label="`View ${col.header.toLowerCase()}`"
                        />
                        <span v-else>—</span>
                    </template>
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Filter by keywords" />
                </template>
            </Column>

            <Column header="Sentiment" field="sentiment" filterField="sentiment" :showFilterMatchModes="false" style="min-width: 4rem">
                <template #body="{ data }">
                    <Tag :value="data.sentiment" severity="help" />
                </template>
                <template #filter="{ filterModel }">
                    <Select v-model="filterModel.value" :options="availableSentiments" placeholder="Filter by Sentiment" showClear>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" />
                        </template>
                    </Select>
                </template>
            </Column>

            <Column header="Sentiment Reason" field="sentiment_reason" filterField="sentiment_reason" :showFilterMatchModes="false" style="min-width: 14rem">
                <template #body="{ data }">
                    {{ data.sentiment_reason || '—' }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Filter by keywords" />
                </template>
            </Column>

            <Column header="Summary" field="summary" filterField="summary" :showFilterMatchModes="false" style="min-width: 45rem">
                <template #body="{ data }">
                    {{ data.summary || '—' }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Filter by keywords" />
                </template>
            </Column>
        </DataTable>

        <TranscriptDialog v-model="dialog" />
    </div>
</template>

<style lang="scss">
.p-datatable-mask.p-overlay-mask {
    background-color: var(--p-surface-100) !important;
    color: var(--text-color);
}

.app-dark .p-datatable-mask.p-overlay-mask {
    background-color: var(--p-surface-950) !important;
}

.p-datatable-frozen-tbody {
    font-weight: 700;
}

.p-datatable-scrollable .p-frozen-column {
    font-weight: 700;
}

/* Scoped or global */
.my-date-filter-menu {
    /* Example: make it wider */
    width: 320px !important;

    /* Optional: hide extra rule wrappers if PrimeVue still renders them */
    .p-datatable-filter-rule-list > .p-datatable-filter-rule > *:not(.flex):not(.p-datatable-filter-buttonbar) {
        display: none !important;
    }

    /* Hide the second DatePicker in the first rule ("To" in "after") */
    .p-datatable-filter-rule:nth-child(1) .p-datepicker:nth-child(2) {
        display: none !important;
    }

    /* Hide the first DatePicker in the second rule ("From" in "before") */
    .p-datatable-filter-rule:nth-child(2) .p-datepicker:nth-child(1) {
        display: none !important;
    }
}
</style>
