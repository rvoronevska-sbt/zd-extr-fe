import mockTicketSummaries from '@/services/mock-ticket-summaries.json';
import { ref } from 'vue';

let isInitialized = false;
let initPromise = null;

export function useArrayMultiSelects() {
    const allChatTags = ref([]);
    const allTopics = ref([]);
    const allBrands = ref([]);
    const allVipLevels = ref([]);
    const allCustomerEmails = ref([]);
    const allAgentEmails = ref([]);

    const fullProcessedTickets = ref([]);

    const toArray = (value) => {
        if (Array.isArray(value)) return value;
        if (value == null) return [];
        if (typeof value === 'string') return value.trim() ? [value.trim()] : [];
        if (typeof value === 'number') return [String(value)];
        return [];
    };

    // Helper: replace empty string with "none" (or '-' / '—')
    const emptyToNone = (value) => {
        if (typeof value === 'string') {
            const trimmed = value.trim();
            return trimmed === '' ? 'none' : trimmed;
        }
        return value ?? 'none'; // null/undefined → none
    };

    // Initialize function - processes mock data into structured format
    const initialize = () => {
        const tagSet = new Set();
        const topicSet = new Set();
        const brandSet = new Set();
        const vipSet = new Set();
        const custEmailSet = new Set();
        const agentEmailSet = new Set();

        const processed = mockTicketSummaries.map((customer) => {
            const tags = toArray(customer.chat_tags).filter((t) => typeof t === 'string' && t.trim());

            // Collect uniques (use original values for dropdowns)
            tags.forEach((tag) => tagSet.add(tag.trim()));
            toArray(customer.topic).forEach((v) => v?.trim() && topicSet.add(v.trim()));
            toArray(customer.brand).forEach((v) => v?.trim() && brandSet.add(v.trim()));
            toArray(customer.vip_level).forEach((v) => v?.trim() && vipSet.add(v.trim()));
            toArray(customer.customer_email).forEach((v) => v?.trim() && custEmailSet.add(v.trim()));
            toArray(customer.agent_email).forEach((v) => v?.trim() && agentEmailSet.add(v.trim()));

            return {
                ...customer,
                timestamp: new Date(customer.timestamp),
                // Apply empty → "none" to display fields
                topic: emptyToNone(customer.topic),
                brand: emptyToNone(customer.brand),
                vip_level: emptyToNone(customer.vip_level),
                customer_email: emptyToNone(customer.customer_email),
                agent_email: emptyToNone(customer.agent_email),
                csat_score: emptyToNone(customer.csat_score),
                sentiment: emptyToNone(customer.sentiment),
                summary: emptyToNone(customer.summary),
                chat_transcript: emptyToNone(customer.chat_transcript),
                email_transcript: emptyToNone(customer.email_transcript),
                _chatTagsString: tags
                    .map((t) => t.trim().toLowerCase())
                    .sort()
                    .join(', ')
            };
        });

        const sortInsensitive = (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' });

        allChatTags.value = [...tagSet].sort(sortInsensitive);
        allTopics.value = [...topicSet].sort(sortInsensitive);
        allBrands.value = [...brandSet].sort(sortInsensitive);
        allVipLevels.value = [...vipSet].sort(sortInsensitive);
        allCustomerEmails.value = [...custEmailSet].sort(sortInsensitive);
        allAgentEmails.value = [...agentEmailSet].sort(sortInsensitive);

        fullProcessedTickets.value = processed;
    };

    // Lazy initialization - only initialize on first use
    const lazyInit = () => {
        if (isInitialized) return Promise.resolve();
        
        // Return same promise if already in progress
        if (initPromise) return initPromise;
        
        initPromise = Promise.resolve().then(() => {
            if (!isInitialized) {
                initialize();
                isInitialized = true;
            }
        });
        
        return initPromise;
    };

    const getPaginatedTickets = (page, limit) => {
        lazyInit();  // Ensure data is initialized before returning
        const start = (page - 1) * limit;
        return fullProcessedTickets.value.slice(start, start + limit);
    };

    // Auto-initialize on first instantiation (non-blocking)
    lazyInit();

    return {
        allChatTags,
        allTopics,
        allBrands,
        allVipLevels,
        allCustomerEmails,
        allAgentEmails,
        fullProcessedTickets,
        getPaginatedTickets,
        _lazyInit: lazyInit  // Export for components that need explicit control
    };
}
