/**
 * Formats dates, splits lines after dates and separators,
 * and removes any markdown image syntax like ![](...) or ![]()
 *
 * Regex patterns precompiled at module level to avoid
 * recompilation per call (30k+ tickets during processRecords).
 */

// Markdown image patterns
const MD_IMG_FULL = /!\[.*?\]\(.*?\)/g;
const MD_IMG_EMPTY = /!\[\]\(.*?\)/g;
const MD_IMG_BLOB = /!\[.*?\]\(\s*blob:.*?\)/g;
const MD_IMG_BARE = /!\[\]/g;

// ISO date normalization: convert space-separated dates to T-separated, then clean up
const ISO_SPACE_TO_T = /(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})/g;
const ISO_PUNCT_SPACES = /\s*([+:])\s*/g;
const ISO_T_SPACE = /T\s+/g;
const ISO_TZ_SPACE = /(\d{2})\s*([+-]\d{2}:\d{2})/g;

// Date extraction
const DATE_RE = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?[+-]\d{2}:\d{2})/g;

// Separator and cleanup
const SEPARATOR_RE = /\s*(?:\|+|[-–—]+|\band\b|,\s*)\s*/gi;
const MULTI_NEWLINES_RE = /\n{4,}/g;

/** Mask an email address with a fixed-width placeholder to avoid revealing length. */
export function maskEmail(email) {
    if (!email || email === 'none') return 'none';
    const atIdx = email.indexOf('@');
    if (atIdx === -1) return '****@****';
    const domain = email.slice(atIdx);
    return `****${domain}`;
}

export function cleanAndFormatString(input) {
    if (!input || typeof input !== 'string') return input;

    // Remove markdown images
    let cleaned = input.replace(MD_IMG_FULL, '').replace(MD_IMG_EMPTY, '').replace(MD_IMG_BLOB, '').replace(MD_IMG_BARE, '');

    // Normalize broken ISO dates (remove unwanted spaces)
    cleaned = cleaned.replace(ISO_SPACE_TO_T, '$1T$2').replace(ISO_PUNCT_SPACES, '$1').replace(ISO_T_SPACE, 'T').replace(ISO_TZ_SPACE, '$1$2');

    // Format dates: first one inline, others with double newline before
    let dateCount = 0;

    let result = cleaned.replace(DATE_RE, (match) => {
        try {
            const date = new Date(match);
            if (isNaN(date.getTime())) return match;

            const parts = new Intl.DateTimeFormat('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).formatToParts(date);

            const get = (type) => parts.find((p) => p.type === type)?.value ?? '';
            const formatted = `${get('month')} ${get('day')} ${get('year')} ${get('hour')}:${get('minute')}`;

            dateCount++;
            return dateCount === 1 ? formatted : `\n\n${formatted}`;
        } catch {
            return match;
        }
    });

    // Replace separators with newline
    result = result.replace(SEPARATOR_RE, '\n');

    // Clean up multiple newlines
    result = result.replace(MULTI_NEWLINES_RE, '\n\n').trim();

    return result;
}
