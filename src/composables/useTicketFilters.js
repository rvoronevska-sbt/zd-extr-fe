import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { computed, ref, watch } from 'vue';

export const PAGE_SIZE_DEFAULT = 5;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
export const FILTER_DEBOUNCE_MS = 300;

const todayStart = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
};

// End of the current day (exclusive). Used for "Today" and other quick filters
// so the full current calendar day is always included, regardless of clock time.
const tomorrowStart = () => {
    const d = new Date();
    d.setHours(24, 0, 0, 0);
    return d;
};

function createInitialFilters() {
    return {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        timestamp: {
            operator: FilterOperator.AND,
            constraints: [
                { value: todayStart(), matchMode: FilterMatchMode.DATE_AFTER },
                { value: tomorrowStart(), matchMode: FilterMatchMode.DATE_BEFORE }
            ]
        },
        started_at: {
            operator: FilterOperator.AND,
            constraints: [
                { value: null, matchMode: FilterMatchMode.DATE_AFTER },
                { value: null, matchMode: FilterMatchMode.DATE_BEFORE }
            ]
        },
        updated_at: {
            operator: FilterOperator.AND,
            constraints: [
                { value: null, matchMode: FilterMatchMode.DATE_AFTER },
                { value: null, matchMode: FilterMatchMode.DATE_BEFORE }
            ]
        },
        ticketid: { value: null, matchMode: FilterMatchMode.EQUALS },
        topic: { value: [], matchMode: 'containsAny' },
        brand: { value: [], matchMode: 'containsAny' },
        vip_level: { value: [], matchMode: 'containsAny' },
        customer_email: { value: [], matchMode: 'containsAny' },
        agent_email: { value: [], matchMode: 'containsAny' },
        csat_score: { value: null, matchMode: FilterMatchMode.EQUALS },
        _chatTagsString: { value: [], matchMode: 'containsAny' },
        chat_transcript: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email_transcript: { value: null, matchMode: FilterMatchMode.CONTAINS },
        sentiment: { value: null, matchMode: FilterMatchMode.EQUALS },
        sentiment_reason: { value: null, matchMode: FilterMatchMode.CONTAINS },
        summary: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
}

export function useTicketFilters() {
    const filters = ref(createInitialFilters());

    const lazyParams = ref({
        page: 1,
        limit: PAGE_SIZE_DEFAULT,
        sortField: 'timestamp',
        sortOrder: -1
    });

    const activeQuickFilter = ref('today');

    // ── Extract flat filter params from PrimeVue filter model ──
    function extractFilterParams() {
        return {
            globalFilter: filters.value.global?.value || '',
            ticketid: filters.value.ticketid?.value,
            brand: filters.value.brand?.value ?? [],
            topic: filters.value.topic?.value ?? [],
            vip_level: filters.value.vip_level?.value ?? [],
            customer_email: filters.value.customer_email?.value ?? [],
            agent_email: filters.value.agent_email?.value ?? [],
            _chatTagsString: filters.value._chatTagsString?.value ?? [],
            csat_score: filters.value.csat_score?.value,
            sentiment: filters.value.sentiment?.value,
            sentiment_reason: filters.value.sentiment_reason?.value,
            chat_transcript: filters.value.chat_transcript?.value,
            email_transcript: filters.value.email_transcript?.value,
            summary: filters.value.summary?.value,
            startDate: filters.value.timestamp?.constraints?.[0]?.value,
            endDate: filters.value.timestamp?.constraints?.[1]?.value,
            startedAtStart: filters.value.started_at?.constraints?.[0]?.value,
            startedAtEnd: filters.value.started_at?.constraints?.[1]?.value,
            updatedAtStart: filters.value.updated_at?.constraints?.[0]?.value,
            updatedAtEnd: filters.value.updated_at?.constraints?.[1]?.value
        };
    }

    // ── Date computed getters/setters for template v-model ──
    const dateComputed = (field, index) =>
        computed({
            get: () => filters.value[field]?.constraints?.[index]?.value ?? null,
            set: (val) => {
                if (filters.value[field]?.constraints?.[index]) filters.value[field].constraints[index].value = val;
            }
        });

    const fromDate = dateComputed('timestamp', 0);
    const toDate = dateComputed('timestamp', 1);
    const startedAtFrom = dateComputed('started_at', 0);
    const startedAtTo = dateComputed('started_at', 1);
    const updatedAtFrom = dateComputed('updated_at', 0);
    const updatedAtTo = dateComputed('updated_at', 1);

    // ── Keep date-filter constraints as [DATE_AFTER, DATE_BEFORE] ──
    // PrimeVue's "Clear" button inside the filter menu popover replaces the
    // constraints array with a single empty constraint, which causes the "To"
    // DatePicker to disappear and an "+ Add Rule" button to appear. This watcher
    // restores the 2-constraint shape immediately so both pickers stay visible.
    const ensureDateConstraints = (field) => {
        const filter = filters.value[field];
        if (!filter?.constraints) return;
        if (filter.constraints.length >= 2) return;
        const expected = [FilterMatchMode.DATE_AFTER, FilterMatchMode.DATE_BEFORE];
        while (filter.constraints.length < 2) {
            const idx = filter.constraints.length;
            filter.constraints.push({ value: null, matchMode: expected[idx] });
        }
    };

    watch(() => filters.value.timestamp?.constraints?.length, () => ensureDateConstraints('timestamp'));
    watch(() => filters.value.started_at?.constraints?.length, () => ensureDateConstraints('started_at'));
    watch(() => filters.value.updated_at?.constraints?.length, () => ensureDateConstraints('updated_at'));

    // ── Quick date filter — modifies state only, caller handles fetch ──
    function applyQuickDateFilter(period) {
        if (activeQuickFilter.value === period) {
            activeQuickFilter.value = null;
            if (filters.value?.timestamp?.constraints) {
                filters.value.timestamp.constraints[0].value = null;
                filters.value.timestamp.constraints[1].value = null;
            }
            return;
        }

        activeQuickFilter.value = period;
        const start = new Date();
        // End = tomorrow 00:00 (exclusive) so the full current day is always included,
        // regardless of what time the user clicks the quick filter.
        const end = tomorrowStart();

        if (period === 'today') {
            start.setHours(0, 0, 0, 0);
        } else if (period === 'week') {
            start.setDate(start.getDate() - 7);
            start.setHours(0, 0, 0, 0);
        } else if (period === 'month') {
            start.setMonth(start.getMonth() - 1);
            start.setHours(0, 0, 0, 0);
        } else if (period === '2 months') {
            start.setMonth(start.getMonth() - 2);
            start.setHours(0, 0, 0, 0);
        } else if (period === '3 months') {
            start.setMonth(start.getMonth() - 3);
            start.setHours(0, 0, 0, 0);
        }

        if (filters.value?.timestamp?.constraints) {
            filters.value.timestamp.constraints[0].value = start;
            filters.value.timestamp.constraints[1].value = end;
        }

        lazyParams.value.page = 1;
    }

    // ── Reset all filters — modifies state only, caller handles fetch ──
    function resetFilters() {
        filters.value = createInitialFilters();
        filters.value.timestamp.constraints[0].value = null;
        filters.value.timestamp.constraints[1].value = null;
        activeQuickFilter.value = null;
        lazyParams.value.page = 1;
        lazyParams.value.limit = PAGE_SIZE_DEFAULT;
    }

    return {
        filters,
        lazyParams,
        activeQuickFilter,
        extractFilterParams,
        fromDate,
        toDate,
        startedAtFrom,
        startedAtTo,
        updatedAtFrom,
        updatedAtTo,
        applyQuickDateFilter,
        resetFilters
    };
}
