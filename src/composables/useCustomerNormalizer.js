import { cleanAndFormatString } from '@/utils/stringUtils';

export function useCustomerNormalizer() {
    // Helper to normalize string fields - single pass
    const normalizeField = (value, defaultValue = 'none') => {
        if (value == null) return defaultValue;
        const normalized = String(value).trim().toLowerCase();
        return normalized === 'null' || normalized === '' ? defaultValue : normalized;
    };

    const normalizeCustomer = (customer) => {
        const normalized = { ...customer };

        normalized.timestamp = new Date(customer.timestamp);

        // Use helper for consistent, efficient normalization (single pass per field)
        normalized.vip_level = normalizeField(customer.vip_level, 'none');
        normalized.customer_email = normalizeField(customer.customer_email, 'none');
        normalized.agent_email = normalizeField(customer.agent_email, 'none');
        normalized.sentiment = normalizeField(customer.sentiment, 'none');

        // Summary uses different default
        normalized.summary = normalizeField(customer.summary, 'No Data');

        // Clean transcripts (already have null checks)
        if (customer.chat_transcript) {
            normalized.chat_transcript = cleanAndFormatString(customer.chat_transcript);
        }
        if (customer.email_transcript) {
            normalized.email_transcript = cleanAndFormatString(customer.email_transcript);
        }

        return normalized;
    };

    return { normalizeCustomer };
}
