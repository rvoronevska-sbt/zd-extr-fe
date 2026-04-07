import { applyMockedTicketFilters } from '@/utils/mockedTicketFilters';

import mockedTicketSummaries from './mocked-ticket-summaries.json';

export const mockedTicketService = {
    async getMockedTicketSummaries(params = {}) {
        return mockedPaginatedResponse(mockedTicketSummaries, params);
    },

    async getMockedTicketById(ticketId) {
        return mockedTicketSummaries.find((t) => t.ticketid === ticketId) || null;
    }
};

async function mockedPaginatedResponse(allData, params) {
    const filteredData = applyMockedTicketFilters(allData, {
        globalFilter: params.globalFilter,
        brand: params.brand,
        topic: params.topic,
        vip_level: params.vip_level,
        customer_email: params.customer_email,
        agent_email: params.agent_email,
        _chatTagsString: params._chatTagsString,
        csat_score: params.csat_score,
        sentiment: params.sentiment,
        sentiment_reason: params.sentiment_reason,
        chat_transcript: params.chat_transcript,
        email_transcript: params.email_transcript,
        summary: params.summary,
        startDate: params.startDate,
        endDate: params.endDate
    });

    const total = filteredData.length;
    const page = Math.max(1, params.page || 1);
    const limit = Math.max(1, params.limit || 5);
    const start = (page - 1) * limit;
    const paginated = filteredData.slice(start, start + limit);

    await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 600));

    return { data: paginated, total, page, limit };
}
