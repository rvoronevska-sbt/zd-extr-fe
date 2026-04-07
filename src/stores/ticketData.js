import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import { emptyToNone } from '@/utils/normalization';

const USE_MOCKED = import.meta.env.VITE_USE_MOCKED_DATA === 'true';

// ── Fields that get emptyToNone normalization (short categorical fields) ──
const NORMALIZE_FIELDS = ['topic', 'brand', 'vip_level', 'customer_email', 'agent_email', 'csat_score', 'sentiment'];

// ── Helpers ──
const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (value == null) return [];
    if (typeof value === 'string') return value.trim() ? [value.trim()] : [];
    if (typeof value === 'number') return [String(value)];
    return [];
};

// ── Process a single raw ticket into the shape the table expects (mock mode) ──
function mockedProcessTicket(ticket) {
    const tags = toArray(ticket.chat_tags).filter((t) => typeof t === 'string' && t.trim());
    const normalized = Object.fromEntries(NORMALIZE_FIELDS.map((field) => [field, emptyToNone(ticket[field])]));
    // TODO (future): The backend should provide the proper clean topic category name.
    // Once the backend is updated, remove this topic prefix extraction.
    if (normalized.topic && normalized.topic !== 'none') {
        const idx = normalized.topic.indexOf('|');
        if (idx !== -1) normalized.topic = normalized.topic.substring(0, idx).trim();
    }
    const chatTagsString = tags
        .map((t) => t.trim().toLowerCase())
        .sort()
        .join(', ');

    return {
        ...ticket,
        ...normalized,
        timestamp: new Date(ticket.timestamp),
        started_at: ticket.started_at ? new Date(ticket.started_at) : null,
        updated_at: ticket.updated_at ? new Date(ticket.updated_at) : null,
        _chatTagsString: chatTagsString
    };
}

/**
 * Normalize an API response record — applies emptyToNone to categorical fields
 * and converts date strings to Date objects. The server does NOT normalize empty values.
 * TODO (future): topic prefix extraction may still be needed until backend provides clean names.
 */
function normalizeApiRecord(ticket) {
    const normalized = Object.fromEntries(NORMALIZE_FIELDS.map((field) => [field, emptyToNone(ticket[field])]));
    return {
        ...ticket,
        ...normalized,
        timestamp: ticket.timestamp ? new Date(ticket.timestamp) : null,
        started_at: ticket.started_at ? new Date(ticket.started_at) : null,
        updated_at: ticket.updated_at ? new Date(ticket.updated_at) : null
    };
}

// ── Yield to the browser event loop between processing batches ──
function yieldToMain() {
    if (typeof scheduler !== 'undefined' && typeof scheduler.yield === 'function') {
        return scheduler.yield();
    }
    return new Promise((resolve) => setTimeout(resolve, 0));
}

const PROCESS_BATCH_SIZE = 150;

export const useTicketDataStore = defineStore('ticketData', () => {
    // ── Shared state ──
    const isLoading = ref(false);
    const fetchError = ref(null);

    // ── Mock-mode state ──
    const mockedFullProcessedTickets = shallowRef([]);

    // ── API-mode state ──
    const tickets = shallowRef([]);
    const totalCount = ref(0);

    // Non-reactive init tracking
    let isInitialized = false;
    let initPromise = null;

    // ════════════════════════════════════════════════════════════════════
    //  MOCK MODE — existing client-side logic (loads all data, IDB cache)
    // ════════════════════════════════════════════════════════════════════

    async function mockedProcessRecords(rawData) {
        const result = new Array(rawData.length);
        for (let i = 0; i < rawData.length; i += PROCESS_BATCH_SIZE) {
            const end = Math.min(i + PROCESS_BATCH_SIZE, rawData.length);
            for (let j = i; j < end; j++) {
                result[j] = mockedProcessTicket(rawData[j]);
            }
            if (end < rawData.length) {
                await yieldToMain();
            }
        }
        mockedFullProcessedTickets.value = result;
    }

    async function mockedFetchAndCache() {
        const { default: api } = await import('@/services/authApi');
        const response = await api.get('/api/ticket-conversation-summaries/');
        const raw = Array.isArray(response.data) ? response.data : (response.data.results ?? []);
        await mockedProcessRecords(raw);
        const { setCachedTickets } = await import('@/services/mockedTicketCache');
        setCachedTickets(mockedFullProcessedTickets.value).catch((err) => console.warn('IDB write failed:', err));
    }

    async function mockedRefreshInBackground() {
        try {
            await mockedFetchAndCache();
        } catch (err) {
            console.warn('Background refresh failed (non-fatal):', err);
        }
    }

    async function mockedLazyInit() {
        isLoading.value = true;
        fetchError.value = null;
        try {
            const { default: mockData } = await import('@/services/mocked-ticket-summaries.json');
            await mockedProcessRecords(mockData);
            isInitialized = true;
            return;
        } catch (err) {
            // If mock data not available, try IDB + API fallback
            try {
                const { getCachedTickets, isCacheStale } = await import('@/services/mockedTicketCache');
                const cached = await getCachedTickets().catch(() => null);

                if (cached?.data?.length) {
                    for (let i = 0; i < cached.data.length; i++) {
                        const t = cached.data[i];
                        if (t.timestamp && !(t.timestamp instanceof Date)) t.timestamp = new Date(t.timestamp);
                        if (t.started_at && !(t.started_at instanceof Date)) t.started_at = new Date(t.started_at);
                        if (t.updated_at && !(t.updated_at instanceof Date)) t.updated_at = new Date(t.updated_at);
                    }
                    mockedFullProcessedTickets.value = cached.data;
                    isLoading.value = false;
                    isInitialized = true;

                    if (isCacheStale(cached)) {
                        mockedRefreshInBackground().catch((e) => console.warn('Background refresh failed:', e));
                    }
                    return;
                }

                await mockedFetchAndCache();
                isInitialized = true;
            } catch (innerErr) {
                fetchError.value = innerErr;
                isInitialized = false;
                console.error('useTicketDataStore: failed to load tickets (mock mode)', innerErr);
            }
        } finally {
            isLoading.value = false;
        }
    }

    // ════════════════════════════════════════════════════════════════════
    //  API MODE — server-side pagination, per-request data fetching
    // ════════════════════════════════════════════════════════════════════

    async function fetchTickets(params) {
        isLoading.value = true;
        fetchError.value = null;
        try {
            const { fetchTicketList } = await import('@/services/ticketApi');
            const data = await fetchTicketList(params) ?? {};
            const raw = Array.isArray(data) ? data : data.results || [];
            tickets.value = raw.map(normalizeApiRecord);
            totalCount.value = Array.isArray(data) ? raw.length : data.count || 0;
        } catch (err) {
            fetchError.value = err;
            console.error('useTicketDataStore: fetchTickets failed', err);
        } finally {
            isLoading.value = false;
        }
    }

    async function fetchTicketById(ticketId) {
        const { fetchTicketDetail } = await import('@/services/ticketApi');
        const data = await fetchTicketDetail(ticketId);
        return normalizeApiRecord(data);
    }

    async function apiLazyInit() {
        isLoading.value = true;
        fetchError.value = null;
        try {
            const { buildTicketListParams, fetchTicketList } = await import('@/services/ticketApi');
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const params = buildTicketListParams({ startDate: today, endDate: new Date() }, { page: 1, rows: 5, sortField: 'timestamp', sortOrder: -1 });
            const data = await fetchTicketList(params) ?? {};
            const raw = Array.isArray(data) ? data : data.results || [];
            tickets.value = raw.map(normalizeApiRecord);
            totalCount.value = Array.isArray(data) ? raw.length : data.count || 0;
            isInitialized = true;
        } catch (err) {
            fetchError.value = err;
            isInitialized = false;
            console.error('useTicketDataStore: apiLazyInit failed', err);
        } finally {
            isLoading.value = false;
        }
    }

    // ════════════════════════════════════════════════════════════════════
    //  SHARED — lazyInit dispatches to the correct mode
    // ════════════════════════════════════════════════════════════════════

    async function lazyInit() {
        if (isInitialized) return;
        if (initPromise) return initPromise;

        initPromise = (USE_MOCKED ? mockedLazyInit() : apiLazyInit()).finally(() => {
            initPromise = null;
        });

        return initPromise;
    }

    return {
        // Shared
        isLoading,
        fetchError,
        lazyInit,

        // Mock mode
        mockedFullProcessedTickets,

        // API mode
        tickets,
        totalCount,
        fetchTickets,
        fetchTicketById
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTicketDataStore, import.meta.hot));
}
