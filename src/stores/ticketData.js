import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import api from '@/services/authApi';
import { emptyToNone } from '@/utils/normalization';
import { getCachedTickets, setCachedTickets, isCacheStale } from '@/services/ticketCache';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

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

// ── Process a single raw ticket into the shape the table expects ──
function processTicket(ticket) {
    const tags = toArray(ticket.chat_tags).filter((t) => typeof t === 'string' && t.trim());
    const normalized = Object.fromEntries(NORMALIZE_FIELDS.map((field) => [field, emptyToNone(ticket[field])]));
    // Extract category prefix before "|" (e.g. "Deposits | Conversation with..." → "Deposits")
    if (normalized.topic && normalized.topic !== 'none') {
        const idx = normalized.topic.indexOf('|');
        if (idx !== -1) normalized.topic = normalized.topic.substring(0, idx).trim();
    }
    const chatTagsString = tags
        .map((t) => t.trim().toLowerCase())
        .sort()
        .join(', ');

    // Long-text fields: store raw values — normalizeTranscript runs on-demand when displayed
    const processed = {
        ...ticket,
        ...normalized,
        timestamp: new Date(ticket.timestamp),
        started_at: ticket.started_at ? new Date(ticket.started_at) : null,
        updated_at: ticket.updated_at ? new Date(ticket.updated_at) : null,
        _chatTagsString: chatTagsString
    };

    return processed;
}

// ── Yield to the browser event loop between processing batches ──
// scheduler.yield() (Chrome 129+) resumes immediately after yielding with high priority;
// setTimeout fallback adds ~1ms per batch but is universally supported.
function yieldToMain() {
    if (typeof scheduler !== 'undefined' && typeof scheduler.yield === 'function') {
        return scheduler.yield();
    }
    return new Promise((resolve) => setTimeout(resolve, 0));
}

// ── Process raw records in batches to keep main-thread tasks under 50ms ──
// 30k tickets / 150 per batch = 200 batches, each ~30ms → TBT drops to near-zero.
const PROCESS_BATCH_SIZE = 150;

export const useTicketDataStore = defineStore('ticketData', () => {
    const fullProcessedTickets = shallowRef([]);
    const isLoading = ref(false);
    const fetchError = ref(null);

    // Non-reactive init tracking — scoped to this store instance
    let isInitialized = false;
    let initPromise = null;

    async function processRecords(rawData) {
        const result = new Array(rawData.length);
        for (let i = 0; i < rawData.length; i += PROCESS_BATCH_SIZE) {
            const end = Math.min(i + PROCESS_BATCH_SIZE, rawData.length);
            for (let j = i; j < end; j++) {
                result[j] = processTicket(rawData[j]);
            }
            if (end < rawData.length) {
                await yieldToMain();
            }
        }
        fullProcessedTickets.value = result;
    }

    // ── Fetch from API, process, and store processed data in IDB ──
    async function fetchAndCache() {
        const response = await api.get('/api/ticket-summaries/');
        const raw = Array.isArray(response.data) ? response.data : (response.data.results ?? []);
        await processRecords(raw);
        // Write processed data to IDB — subsequent loads skip processRecords entirely
        setCachedTickets(fullProcessedTickets.value).catch((err) => console.warn('IDB write failed:', err));
    }

    // ── Background refresh: re-fetches silently, updates reactive state when done ──
    async function refreshInBackground() {
        try {
            await fetchAndCache();
        } catch (err) {
            console.warn('Background refresh failed (non-fatal):', err);
        }
    }

    // ── Single fetch — runs once, result shared across all component instances ──
    async function lazyInit() {
        if (isInitialized) return;
        if (initPromise) return initPromise;

        initPromise = (async () => {
            isLoading.value = true;
            fetchError.value = null;
            try {
                if (USE_MOCK) {
                    const { default: mockData } = await import('@/services/mock-ticket-summaries.json');
                    await processRecords(mockData);
                    isInitialized = true;
                    return;
                }

                // ── 1. Try IDB cache first (stores processed data — no re-processing needed) ──
                const cached = await getCachedTickets().catch(() => null);

                if (cached?.data?.length) {
                    // Restore Date objects — IDB serializes them to strings
                    for (let i = 0; i < cached.data.length; i++) {
                        const t = cached.data[i];
                        if (t.timestamp && !(t.timestamp instanceof Date)) t.timestamp = new Date(t.timestamp);
                        if (t.started_at && !(t.started_at instanceof Date)) t.started_at = new Date(t.started_at);
                        if (t.updated_at && !(t.updated_at instanceof Date)) t.updated_at = new Date(t.updated_at);
                    }
                    fullProcessedTickets.value = cached.data;
                    isLoading.value = false;
                    isInitialized = true;

                    if (isCacheStale(cached)) {
                        // Cache is old — silently refresh in background
                        refreshInBackground().catch((err) => console.warn('Background refresh failed:', err));
                    }
                    return;
                }

                // ── 2. No cache — full API fetch (first ever visit) ──
                await fetchAndCache();
                isInitialized = true;
            } catch (err) {
                fetchError.value = err;
                isInitialized = false; // allow retry on next call
                console.error('useTicketDataStore: failed to load tickets', err);
            } finally {
                isLoading.value = false;
                initPromise = null;
            }
        })();

        return initPromise;
    }

    return {
        fullProcessedTickets,
        isLoading,
        fetchError,
        lazyInit
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTicketDataStore, import.meta.hot));
}
