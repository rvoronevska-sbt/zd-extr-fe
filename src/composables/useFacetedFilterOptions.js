import { computed } from 'vue';
import { applyMockedTicketFilters } from '@/utils/mockedTicketFilters';

/**
 * Derives faceted multiselect options from the full ticket dataset.
 * Each available* ref applies all active filters EXCEPT its own field,
 * so the dropdown only shows values that exist in the currently narrowed data.
 *
 * Performance: base-filtered dataset is computed once, then a SINGLE-PASS
 * bitmask loop collects all 7 facet sets simultaneously — replaces the
 * previous 7× applyMockedTicketFilters calls with one O(n) iteration.
 *
 * @param {Ref<Object>} filters  - The filters ref from TableDoc
 * @param {Ref<Array>}  tickets  - fullProcessedTickets from useTicketDataStore
 */
export function useFacetedFilterOptions(filters, tickets) {
    // All non-multiselect filter params (date, text, single-select)
    const baseFilterParams = computed(() => ({
        globalFilter: filters.value.global?.value || '',
        ticketid: filters.value.ticketid?.value,
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
    }));

    // All currently active multiselect values
    const activeMultiselects = computed(() => ({
        topic: filters.value.topic?.value ?? [],
        brand: filters.value.brand?.value ?? [],
        vip_level: filters.value.vip_level?.value ?? [],
        customer_email: filters.value.customer_email?.value ?? [],
        agent_email: filters.value.agent_email?.value ?? [],
        _chatTagsString: filters.value._chatTagsString?.value ?? []
    }));

    // Step 1: Apply base (non-multiselect) filters once — shared by all facets
    const baseFiltered = computed(() => {
        console.group('[useFacetedFilterOptions] baseFilterParams (non-multiselect)');
        console.log(baseFilterParams.value);
        console.groupEnd();
        console.group('[useFacetedFilterOptions] activeMultiselects');
        console.log(activeMultiselects.value);
        console.groupEnd();
        return applyMockedTicketFilters(tickets.value, baseFilterParams.value);
    });

    // Step 2: Single-pass bitmask aggregation — replaces separate filter passes
    //
    // Bit positions: topic=1, brand=2, vip_level=4, customer_email=8, agent_email=16, _chatTagsString=32
    // ALL_PASS = 0b111111 = 63
    //
    // For each row, compute which multiselect filters it passes (bitmask).
    // A row's value belongs in facet X's dropdown if the row passes all
    // OTHER multiselects — i.e. (mask | bitForX) === ALL_PASS.
    const ALL_PASS = 63;

    const facetedResult = computed(() => {
        const data = baseFiltered.value;
        const ms = activeMultiselects.value;

        // Pre-compute filter lookup structures (once, outside the loop)
        const topicSet = ms.topic.length ? new Set(ms.topic) : null;
        const brandSet = ms.brand.length ? new Set(ms.brand) : null;
        const vipSet = ms.vip_level.length ? new Set(ms.vip_level) : null;
        const custEmailLower = ms.customer_email.length ? ms.customer_email.map((e) => e.toLowerCase()) : null;
        const agentEmailLower = ms.agent_email.length ? ms.agent_email.map((e) => e.toLowerCase()) : null;
        const tagsSet = ms._chatTagsString.length ? new Set(ms._chatTagsString) : null;

        const topics = new Set();
        const brands = new Set();
        const vipLevels = new Set();
        const customerEmails = new Set();
        const agentEmails = new Set();
        const chatTags = new Set();
        const sentiments = new Set();
        const csatScores = new Set();

        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            let mask = 0;

            // Test each multiselect filter for this row
            if (!topicSet || topicSet.has(row.topic)) mask |= 1;
            if (!brandSet || brandSet.has(row.brand)) mask |= 2;
            if (!vipSet || vipSet.has(row.vip_level)) mask |= 4;
            if (!custEmailLower || (row.customer_email && custEmailLower.some((e) => row.customer_email.toLowerCase().includes(e)))) mask |= 8;
            if (!agentEmailLower || (row.agent_email && agentEmailLower.some((e) => row.agent_email.toLowerCase().includes(e)))) mask |= 16;
            if (!tagsSet || row.chat_tags?.some((t) => tagsSet.has(t))) mask |= 32;

            // Collect facet values — row qualifies for facet X if all OTHER filters pass
            if ((mask | 1) === ALL_PASS && row.topic) topics.add(row.topic);
            if ((mask | 2) === ALL_PASS && row.brand) brands.add(row.brand);
            if ((mask | 4) === ALL_PASS && row.vip_level) vipLevels.add(row.vip_level);
            if ((mask | 8) === ALL_PASS && row.customer_email) customerEmails.add(row.customer_email);
            if ((mask | 16) === ALL_PASS && row.agent_email) agentEmails.add(row.agent_email);
            if ((mask | 32) === ALL_PASS && row.chat_tags) {
                for (const tag of row.chat_tags) chatTags.add(tag);
            }

            // Sentiment & CSAT: not cross-filtered — need all multiselects to pass
            if (mask === ALL_PASS) {
                if (row.sentiment) sentiments.add(row.sentiment);
                if (row.csat_score) csatScores.add(row.csat_score);
            }
        }

        const sortFn = (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' });

        const result = {
            topics: [...topics].sort(sortFn),
            brands: [...brands].sort(sortFn),
            vipLevels: [...vipLevels].sort(sortFn),
            customerEmails: [...customerEmails].sort(sortFn),
            agentEmails: [...agentEmails].sort(sortFn),
            chatTags: [...chatTags].sort(sortFn),
            sentiments: [...sentiments].sort(sortFn),
            csatScores: [...csatScores].sort(sortFn)
        };

        console.group('[useFacetedFilterOptions] faceted results (dropdown options)');
        console.log('baseFiltered rows:', data.length);
        console.log('topics:', result.topics.length, result.topics);
        console.log('brands:', result.brands.length, result.brands);
        console.log('vipLevels:', result.vipLevels.length, result.vipLevels);
        console.log('customerEmails:', result.customerEmails.length);
        console.log('agentEmails:', result.agentEmails.length);
        console.log('chatTags:', result.chatTags.length, result.chatTags);
        console.log('sentiments:', result.sentiments.length, result.sentiments);
        console.log('csatScores:', result.csatScores.length, result.csatScores);
        console.groupEnd();

        return result;
    });

    // Thin computed wrappers — read from the single cached result
    const availableTopics = computed(() => facetedResult.value.topics);
    const availableBrands = computed(() => facetedResult.value.brands);
    const availableVipLevels = computed(() => facetedResult.value.vipLevels);
    const availableCustomerEmails = computed(() => facetedResult.value.customerEmails);
    const availableAgentEmails = computed(() => facetedResult.value.agentEmails);
    const availableChatTags = computed(() => facetedResult.value.chatTags);
    const availableSentiments = computed(() => facetedResult.value.sentiments);
    const availableCsatScores = computed(() => facetedResult.value.csatScores);

    return {
        availableTopics,
        availableBrands,
        availableVipLevels,
        availableCustomerEmails,
        availableAgentEmails,
        availableChatTags,
        availableSentiments,
        availableCsatScores
    };
}
