import api from '@/services/authApi';
import { ref } from 'vue';
import { emptyToNone, normalizeTranscript } from '@/utils/normalization';
import { getCachedTickets, setCachedTickets, isCacheStale } from '@/services/ticketCache';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// ── Module-level cache (shared across ALL component instances) ──
let isInitialized = false;
let initPromise = null;

const fullProcessedTickets = ref([]);
const isLoading = ref(false);
const fetchError = ref(null);

// ── Fields that get emptyToNone normalization (short categorical fields) ──
const NORMALIZE_FIELDS = ['topic', 'brand', 'vip_level', 'customer_email', 'agent_email', 'csat_score', 'sentiment'];

// ── Long-text fields cleaned via normalizeTranscript ──
const LONG_TEXT_FIELDS = ['summary', 'chat_transcript', 'email_transcript'];

// ── Helpers ──
const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (value == null) return [];
    if (typeof value === 'string') return value.trim() ? [value.trim()] : [];
    if (typeof value === 'number') return [String(value)];
    return [];
};

// ── Process raw records into the shape the table expects ──
function processRecords(rawData) {
    fullProcessedTickets.value = rawData.map((ticket) => {
        const tags = toArray(ticket.chat_tags).filter((t) => typeof t === 'string' && t.trim());

        const normalized = Object.fromEntries(NORMALIZE_FIELDS.map((field) => [field, emptyToNone(ticket[field])]));
        const longText = Object.fromEntries(LONG_TEXT_FIELDS.map((field) => [field, normalizeTranscript(ticket[field])]));

        return {
            ...ticket,
            ...normalized,
            ...longText,
            timestamp: new Date(ticket.timestamp),
            _chatTagsString: tags
                .map((t) => t.trim().toLowerCase())
                .sort()
                .join(', ')
        };
    });
}

// ── Fetch from API and store raw data in IDB ──
async function fetchAndCache() {
    const response = await api.get('/api/ticket-summaries/');
    const raw = Array.isArray(response.data) ? response.data : (response.data.results ?? []);
    processRecords(raw);
    // Write to IDB in the background — don't block the UI on IDB writes
    setCachedTickets(raw).catch((err) => console.warn('IDB write failed:', err));
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
                processRecords(mockData);
                isInitialized = true;
                return;
            }

            // ── 1. Try IDB cache first ──
            const cached = await getCachedTickets().catch(() => null);

            if (cached?.data?.length) {
                // Serve cached data immediately — UI renders at once
                processRecords(cached.data);
                isLoading.value = false;
                isInitialized = true;

                if (isCacheStale(cached)) {
                    // Cache is old — silently refresh in background
                    refreshInBackground();
                }
                return;
            }

            // ── 2. No cache — full API fetch (first ever visit) ──
            await fetchAndCache();
            isInitialized = true;
        } catch (err) {
            fetchError.value = err;
            isInitialized = false; // allow retry on next call
            console.error('useTicketData: failed to load tickets', err);
        } finally {
            isLoading.value = false;
            initPromise = null;
        }
    })();

    return initPromise;
}

export function useTicketData() {
    return {
        fullProcessedTickets,
        isLoading,
        fetchError,
        _lazyInit: lazyInit
    };
}
