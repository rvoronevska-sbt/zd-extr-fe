import api from '@/services/authApi';

/** Format a Date as a local ISO-8601 string (avoids UTC shift from native .toISOString()). */
function toLocalISOString(date) {
    const pad = (n, len = 2) => String(n).padStart(len, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}Z`;
}

/** Comma-join an array for multi-value query params. Returns undefined if empty. */
function joinMulti(arr) {
    return arr?.length ? arr.join(',') : undefined;
}

// ════════════════════════════════════════════════════════════════════
//  Shared helpers for building filter params
// ════════════════════════════════════════════════════════════════════

/** Timestamp date range (used by all endpoints). */
function addTimestampParams(params, filters) {
    if (filters.startDate) params.timestamp_gte = toLocalISOString(filters.startDate);
    if (filters.endDate) params.timestamp_lt = toLocalISOString(filters.endDate);
}

/** started_at / updated_at date ranges (list + export only). */
function addExtendedDateParams(params, filters) {
    if (filters.startedAtStart) params.started_at_gte = toLocalISOString(filters.startedAtStart);
    if (filters.startedAtEnd) params.started_at_lt = toLocalISOString(filters.startedAtEnd);
    if (filters.updatedAtStart) params.updated_at_gte = toLocalISOString(filters.updatedAtStart);
    if (filters.updatedAtEnd) params.updated_at_lt = toLocalISOString(filters.updatedAtEnd);
}

/** All multi-value attribute filters (brand, topic, vip_level, agent_email, customer_email, chat_tags). */
function addAllAttributeFilters(params, filters) {
    const brand = joinMulti(filters.brand);
    if (brand) params.brand = brand;

    const topic = joinMulti(filters.topic);
    if (topic) params.topic = topic;

    const vipLevel = joinMulti(filters.vip_level);
    if (vipLevel) params.vip_level = vipLevel;

    const agentEmail = joinMulti(filters.agent_email);
    if (agentEmail) params.agent_email = agentEmail;

    const customerEmail = joinMulti(filters.customer_email);
    if (customerEmail) params.customer_email = customerEmail;

    const chatTags = joinMulti(filters._chatTagsString);
    if (chatTags) params.chat_tags = chatTags;

    if (filters.csat_score) params.csat_score = filters.csat_score;
    if (filters.sentiment) params.sentiment = filters.sentiment;
}

/** Text-contains filters as booleans (true if user typed anything). List + export only. */
function addBooleanContainsFilters(params, filters) {
    if (filters.summary) params.summary_contains = true;
    if (filters.chat_transcript) params.chat_transcript_contains = true;
    if (filters.email_transcript) params.email_transcript_contains = true;
}

// ════════════════════════════════════════════════════════════════════
//  Param builders
// ════════════════════════════════════════════════════════════════════

/**
 * GET /api/ticket-conversation-summaries/
 * Full filter set: pagination, ordering, all dates, all attributes,
 * search, ticketid, sentiment_reason, boolean contains filters.
 */
export function buildTicketListParams(filters = {}, lazyParams = {}) {
    const params = {};

    addTimestampParams(params, filters);
    addExtendedDateParams(params, filters);
    addAllAttributeFilters(params, filters);

    // Pagination
    if (lazyParams.page > 0) params.page = lazyParams.page;
    if (lazyParams.rows > 0) params.page_size = lazyParams.rows;

    // Sorting — prefix with "-" for descending
    if (lazyParams.sortField) {
        params.ordering = lazyParams.sortOrder === -1 ? `-${lazyParams.sortField}` : lazyParams.sortField;
    }

    // Global search
    if (filters.globalFilter) params.search = filters.globalFilter;

    // Text-contains as booleans
    addBooleanContainsFilters(params, filters);

    // Sentiment reason (text, not boolean)
    if (filters.sentiment_reason) params.sentiment_reason = filters.sentiment_reason;

    // Ticket ID exact match
    if (filters.ticketid) params.ticketid = filters.ticketid;

    return params;
}

/**
 * GET /api/ticket-filter-options/
 * Timestamp + attribute filters only (no started_at/updated_at).
 */
export function buildFilterOptionsParams(filters = {}) {
    const params = {};
    addTimestampParams(params, filters);
    addAllAttributeFilters(params, filters);
    return params;
}

/**
 * GET /api/ticket-stats/
 * Timestamp + all attribute filters.
 */
export function buildStatsParams(filters = {}) {
    const params = {};
    addTimestampParams(params, filters);
    addAllAttributeFilters(params, filters);
    return params;
}

/**
 * GET /api/topic-chart-data/
 * Timestamp + brand, topic, vip_level, csat_score, sentiment only.
 * Does NOT accept: agent_email, customer_email, chat_tags, started_at, updated_at.
 */
export function buildTopicChartParams(filters = {}) {
    const params = {};
    addTimestampParams(params, filters);

    const brand = joinMulti(filters.brand);
    if (brand) params.brand = brand;

    const topic = joinMulti(filters.topic);
    if (topic) params.topic = topic;

    const vipLevel = joinMulti(filters.vip_level);
    if (vipLevel) params.vip_level = vipLevel;

    if (filters.csat_score) params.csat_score = filters.csat_score;
    if (filters.sentiment) params.sentiment = filters.sentiment;

    return params;
}

/**
 * GET /api/vip-csat-data/
 * Timestamp + vip_level, csat_score only.
 * Does NOT accept: brand, topic, agent_email, customer_email, chat_tags, sentiment.
 */
export function buildVipCsatParams(filters = {}) {
    const params = {};
    addTimestampParams(params, filters);

    const vipLevel = joinMulti(filters.vip_level);
    if (vipLevel) params.vip_level = vipLevel;

    if (filters.csat_score) params.csat_score = filters.csat_score;

    return params;
}

/**
 * GET /api/ticket-summaries/export/
 * Same filters as the list endpoint, but no pagination.
 */
export function buildExportParams(filters = {}) {
    const params = {};

    addTimestampParams(params, filters);
    addExtendedDateParams(params, filters);
    addAllAttributeFilters(params, filters);

    // Global search
    if (filters.globalFilter) params.search = filters.globalFilter;

    // Text-contains as booleans
    addBooleanContainsFilters(params, filters);

    // Sentiment reason (text, not boolean)
    if (filters.sentiment_reason) params.sentiment_reason = filters.sentiment_reason;

    // Ticket ID exact match
    if (filters.ticketid) params.ticketid = filters.ticketid;

    return params;
}

// ════════════════════════════════════════════════════════════════════
//  API calls
// ════════════════════════════════════════════════════════════════════

/**
 * GET /api/ticket-conversation-summaries/
 * Paginated, filtered, sorted ticket list.
 * Does NOT return chat_transcript / email_transcript text —
 * returns has_chat_transcript / has_email_transcript booleans instead.
 */
export async function fetchTicketList(params) {
    console.log('[ticketApi] fetchTicketList request params:', params);
    const response = await api.get('/api/ticket-conversation-summaries/', { params });
    const data = response.data;
    const rows = Array.isArray(data) ? data.length : (data.results?.length ?? 'N/A');
    const count = Array.isArray(data) ? data.length : (data.count ?? 'N/A');
    console.log('[ticketApi] fetchTicketList response — rows received:', rows, '| total count:', count);
    return data;
}

/**
 * GET /api/ticket-summaries/{ticketid}/
 * Single ticket detail INCLUDING chat_transcript and email_transcript text.
 */
export async function fetchTicketDetail(ticketId) {
    const response = await api.get(`/api/ticket-summaries/${ticketId}/`);
    console.log('[ticketApi] fetchTicketDetail response:', response.data);
    return response.data;
}

/**
 * GET /api/ticket-filter-options/
 * Returns distinct values for each filter dropdown.
 * Response shape: { topic: [...], brand: [...], vip_level: [...], ... }
 */
export async function fetchFilterOptions(params) {
    console.log('[ticketApi] fetchFilterOptions request params:', params);
    const response = await api.get('/api/ticket-filter-options/', { params });
    console.log('[ticketApi] fetchFilterOptions response:', response.data);
    return response.data;
}

/**
 * GET /api/ticket-stats/
 * Aggregated statistics for the dashboard StatsWidget.
 */
export async function fetchTicketStats(params) {
    console.log('[ticketApi] fetchTicketStats request params:', params);
    const response = await api.get('/api/ticket-stats/', { params });
    console.log('[ticketApi] fetchTicketStats response:', response.data);
    return response.data;
}

/**
 * GET /api/topic-chart-data/
 * Topic-level aggregation for charts.
 * Returns { topics: [{ topic, total, negative, percent_negative }] }
 */
export async function fetchTopicChartData(params) {
    console.log('[ticketApi] fetchTopicChartData request params:', params);
    const response = await api.get('/api/topic-chart-data/', { params });
    console.log('[ticketApi] fetchTopicChartData response:', response.data);
    return response.data;
}

/**
 * GET /api/vip-csat-data/
 * VIP segment × date CSAT grid.
 * Returns { segments, dates, data, totals }
 */
export async function fetchVipCsatData(params) {
    console.log('[ticketApi] fetchVipCsatData request params:', params);
    const response = await api.get('/api/vip-csat-data/', { params });
    console.log('[ticketApi] fetchVipCsatData response:', response.data);
    return response.data;
}

/**
 * GET /api/ticket-summaries/export/
 * Streaming CSV export of all filtered tickets (ignores page/page_size).
 * Triggers a browser download.
 */
export async function exportTicketsCsv(params) {
    const response = await api.get('/api/ticket-summaries/export/', {
        params,
        responseType: 'blob'
    });

    const contentDisposition = response.headers['content-disposition'];
    const filenameStarMatch = contentDisposition?.match(/filename\*=(?:UTF-8''|utf-8'')([^;\s]+)/i);
    const filenameMatch = contentDisposition?.match(/filename="?([^";\s]+)"?/);
    const filename = (filenameStarMatch?.[1] && decodeURIComponent(filenameStarMatch[1])) || filenameMatch?.[1] || `tickets-${new Date().toISOString().slice(0, 10)}.csv`;

    const url = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
