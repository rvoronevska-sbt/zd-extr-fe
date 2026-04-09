/**
 * Applies all ticket filter criteria to a dataset.
 * Mock-mode only: used by TableDoc (client-side computed)
 * and mockedTicketService (mock data pagination).
 *
 * Performance: single-pass loop with early-exit `continue` — no intermediate
 * arrays. Filter values are pre-computed outside the loop so each iteration
 * is a cheap comparison chain.
 *
 * @param {Array} data - Array of ticket objects (processed or raw)
 * @param {Object} params - Flat filter params (all optional, safe to omit)
 * @returns {Array} New filtered array (original is not mutated)
 */
export function applyMockedTicketFilters(data, params = {}) {
    const {
        globalFilter = '',
        ticketid = null,
        brand = [],
        topic = [],
        vip_level = [],
        customer_email = [],
        agent_email = [],
        _chatTagsString = [],
        csat_score = null,
        sentiment = null,
        sentiment_reason = null,
        chat_transcript = null,
        email_transcript = null,
        summary = null,
        startDate = null,
        endDate = null,
        startedAtStart = null,
        startedAtEnd = null,
        updatedAtStart = null,
        updatedAtEnd = null
    } = params;

    // Pre-compute filter values once (outside the loop)
    const globalLower = globalFilter?.trim().toLowerCase() || '';
    const ticketIdStr = ticketid ? String(ticketid).trim() : '';
    const brandSet = brand.length ? new Set(brand) : null;
    const vipSet = vip_level.length ? new Set(vip_level) : null;
    const custEmailLower = customer_email.length ? customer_email.map((e) => e.toLowerCase()) : null;
    const agentEmailLower = agent_email.length ? agent_email.map((e) => e.toLowerCase()) : null;
    const hasTags = _chatTagsString.length > 0;
    const csatVal = csat_score || '';
    const sentimentLower = sentiment?.trim().toLowerCase() || '';
    const topicSet = topic.length ? new Set(topic) : null;
    const sentimentReasonLower = sentiment_reason?.toLowerCase() || '';
    const chatTranscriptLower = chat_transcript?.toLowerCase() || '';
    const emailTranscriptLower = email_transcript?.toLowerCase() || '';
    const summaryLower = summary?.toLowerCase() || '';
    const startMs = startDate ? new Date(startDate).getTime() : 0;
    const endMs = endDate ? new Date(endDate).getTime() : 0;
    const startedAtStartMs = startedAtStart ? new Date(startedAtStart).getTime() : 0;
    const startedAtEndMs = startedAtEnd ? new Date(startedAtEnd).getTime() : 0;
    const updatedAtStartMs = updatedAtStart ? new Date(updatedAtStart).getTime() : 0;
    const updatedAtEndMs = updatedAtEnd ? new Date(updatedAtEnd).getTime() : 0;

    // DEBUG: log filter values received
    console.group('[mockedTicketFilters] applyMockedTicketFilters called');
    console.log('Total input rows:', data.length);
    console.log('Multiselects:', { brand, topic, vip_level, customer_email, agent_email, _chatTagsString });
    console.log('Single-selects:', { csat_score: csatVal, sentiment: sentimentLower });
    console.log('Text filters:', { globalFilter: globalLower, ticketid: ticketIdStr, sentiment_reason: sentimentReasonLower, chat_transcript: chatTranscriptLower, email_transcript: emailTranscriptLower, summary: summaryLower });
    console.log('Date ranges:', { startDate, endDate, startedAtStart, startedAtEnd, updatedAtStart, updatedAtEnd });
    console.groupEnd();

    const result = [];

    for (let i = 0; i < data.length; i++) {
        const item = data[i];

        // Global search — build _mockedSearchIndex lazily on first global filter use
        if (globalLower) {
            if (!item._mockedSearchIndex) {
                item._mockedSearchIndex = [
                    String(item.ticketid || ''),
                    item.topic || '',
                    item.brand || '',
                    item.vip_level || '',
                    item.customer_email || '',
                    item.agent_email || '',
                    item.csat_score || '',
                    item.sentiment || '',
                    item.sentiment_reason || '',
                    item.summary || '',
                    item.chat_transcript || '',
                    item.email_transcript || '',
                    item._chatTagsString || ''
                ]
                    .join('\0')
                    .toLowerCase();
            }
            if (!item._mockedSearchIndex.includes(globalLower)) continue;
        }

        // Ticket ID — exact match
        if (ticketIdStr && String(item.ticketid) !== ticketIdStr) continue;

        // Multi-select filters
        if (brandSet && !brandSet.has(item.brand)) continue;
        if (vipSet && !vipSet.has(item.vip_level)) continue;

        if (custEmailLower) {
            const val = item.customer_email?.toLowerCase();
            if (!val || !custEmailLower.some((e) => val.includes(e))) continue;
        }

        if (agentEmailLower) {
            const val = item.agent_email?.toLowerCase();
            if (!val || !agentEmailLower.some((e) => val.includes(e))) continue;
        }

        if (hasTags && !_chatTagsString.some((tag) => item.chat_tags?.includes(tag))) continue;

        // Single-value exact filters
        if (csatVal && item.csat_score !== csatVal) continue;
        if (sentimentLower && item.sentiment?.trim().toLowerCase() !== sentimentLower) continue;

        // Text contains filters
        if (topicSet && !topicSet.has(item.topic)) continue;
        if (sentimentReasonLower && !item.sentiment_reason?.toLowerCase().includes(sentimentReasonLower)) continue;
        if (chatTranscriptLower && !item.chat_transcript?.toLowerCase().includes(chatTranscriptLower)) continue;
        if (emailTranscriptLower && !item.email_transcript?.toLowerCase().includes(emailTranscriptLower)) continue;
        if (summaryLower && !item.summary?.toLowerCase().includes(summaryLower)) continue;

        // Date range — item.timestamp is already a Date object from processTicket
        if (startMs && item.timestamp.getTime() < startMs) continue;
        if (endMs && item.timestamp.getTime() >= endMs) continue;

        // started_at date range
        if (startedAtStartMs && (!item.started_at || item.started_at.getTime() < startedAtStartMs)) continue;
        if (startedAtEndMs && (!item.started_at || item.started_at.getTime() >= startedAtEndMs)) continue;

        // updated_at date range
        if (updatedAtStartMs && (!item.updated_at || item.updated_at.getTime() < updatedAtStartMs)) continue;
        if (updatedAtEndMs && (!item.updated_at || item.updated_at.getTime() >= updatedAtEndMs)) continue;

        result.push(item);
    }

    return result;
}
