#!/usr/bin/env node
// Redistribute every ticket's dates so the dataset is evenly split across the
// 5 non-overlapping time ranges that correspond to the UI's quick-date filters:
//   - today (1 day)
//   - yesterday..7 days ago (7 days)
//   - 8 days..1 month ago
//   - 1..2 months ago
//   - 2..3 months ago
// Each bucket ends up with ~N/5 tickets, spread evenly within the bucket's span.
// Intra-ticket relationships are preserved (same delta applied to every date field):
//   - timestamp === updated_at
//   - every transcript ts >= started_at
// Idempotent-ish: re-running produces a re-aligned but still even distribution.
// Usage: npm run refresh-mock-dates
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = resolve(__dirname, '../src/services/mocked-ticket-summaries.json');

const TS_RE = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(\.\d+)?(Z|[+-]\d{2}:?\d{2})?/g;
const pad = (n, len = 2) => String(n).padStart(len, '0');

function parseTs(raw, offsetPart) {
    return new Date(offsetPart ? raw : raw + 'Z');
}

// Ceiling-round to the precision implied by fracPart so output never silently
// rounds DOWN below the input when the target format has fewer fractional digits.
function ceilToPrecision(dateMs, fracWidth) {
    const unit = Math.pow(10, 3 - fracWidth);
    if (unit <= 1) return dateMs;
    const rem = dateMs % unit;
    return rem === 0 ? dateMs : dateMs + (unit - rem);
}

function formatLike(dateMs, fracPart, offsetPart) {
    const fracWidth = fracPart ? Math.min(fracPart.length - 1, 3) : 0;
    dateMs = ceilToPrecision(dateMs, fracWidth);
    let y, mo, dd, hh, mm, ss, ms;
    const dt = new Date(dateMs);
    if (offsetPart && offsetPart !== 'Z') {
        const m = offsetPart.match(/([+-])(\d{2}):?(\d{2})/);
        const sign = m[1] === '+' ? 1 : -1;
        const offMs = sign * (parseInt(m[2], 10) * 60 + parseInt(m[3], 10)) * 60000;
        const sh = new Date(dateMs + offMs);
        y = sh.getUTCFullYear(); mo = sh.getUTCMonth() + 1; dd = sh.getUTCDate();
        hh = sh.getUTCHours(); mm = sh.getUTCMinutes(); ss = sh.getUTCSeconds(); ms = sh.getUTCMilliseconds();
    } else {
        y = dt.getUTCFullYear(); mo = dt.getUTCMonth() + 1; dd = dt.getUTCDate();
        hh = dt.getUTCHours(); mm = dt.getUTCMinutes(); ss = dt.getUTCSeconds(); ms = dt.getUTCMilliseconds();
    }
    let out = `${y}-${pad(mo)}-${pad(dd)}T${pad(hh)}:${pad(mm)}:${pad(ss)}`;
    if (fracPart) {
        const width = fracPart.length - 1;
        out += '.' + (pad(ms, 3) + '000000').slice(0, width);
    }
    if (offsetPart) out += offsetPart;
    return out;
}

function shiftEmbedded(text, deltaMs) {
    if (!text) return text;
    return text.replace(TS_RE, (full, _dp, _tp, frac, off) => {
        const d = parseTs(full, off);
        if (isNaN(d)) return full;
        return formatLike(d.getTime() + deltaMs, frac, off);
    });
}

function shiftTicket(r, deltaMs) {
    if (deltaMs === 0) return;
    for (const field of ['timestamp', 'started_at', 'updated_at']) {
        if (r[field]) {
            r[field] = new Date(new Date(r[field]).getTime() + deltaMs).toISOString();
        }
    }
    r.chat_transcript = shiftEmbedded(r.chat_transcript, deltaMs);
    r.email_transcript = shiftEmbedded(r.email_transcript, deltaMs);
}

const tickets = JSON.parse(readFileSync(FILE, 'utf8'));
const N = tickets.length;

// Local-time boundaries matching the UI's quick-filter math
const now = new Date();
const today0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const tom0   = new Date(today0); tom0.setDate(tom0.getDate() + 1);
const d7     = new Date(today0); d7.setDate(d7.getDate() - 7);
const d1mo   = new Date(today0); d1mo.setMonth(d1mo.getMonth() - 1);
const d2mo   = new Date(today0); d2mo.setMonth(d2mo.getMonth() - 2);
const d3mo   = new Date(today0); d3mo.setMonth(d3mo.getMonth() - 3);

// Ordered oldest → newest (so the oldest originally-sorted tickets go to the oldest region)
const regions = [
    { label: '2-3 months ago',   from: d3mo.getTime(),   to: d2mo.getTime() },
    { label: '1-2 months ago',   from: d2mo.getTime(),   to: d1mo.getTime() },
    { label: '1 week-1 month ago', from: d1mo.getTime(), to: d7.getTime() },
    { label: '1-7 days ago',     from: d7.getTime(),     to: today0.getTime() },
    { label: 'today',            from: today0.getTime(), to: tom0.getTime() }
];

// Equal counts with remainder going to oldest regions
const base = Math.floor(N / regions.length);
const extra = N - base * regions.length;
const counts = regions.map(() => base);
for (let i = 0; i < extra; i++) counts[i]++;

// Sort a COPY by current timestamp asc (keeps file order stable, mutates shared refs)
const sorted = [...tickets].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

let idx = 0;
for (let r = 0; r < regions.length; r++) {
    const { from, to } = regions[r];
    const count = counts[r];
    const span = to - from;
    for (let i = 0; i < count; i++) {
        const t = sorted[idx++];
        const origTs = new Date(t.timestamp).getTime();
        // Center each ticket in its own (span / count) slot within the region
        const newTs = from + Math.floor((i + 0.5) * span / count);
        shiftTicket(t, newTs - origTs);
    }
}

writeFileSync(FILE, JSON.stringify(tickets, null, 4) + '\n', 'utf8');

console.log(`Redistributed ${N} tickets across 5 time buckets (newest → oldest):`);
for (let i = regions.length - 1; i >= 0; i--) {
    console.log(`  ${regions[i].label.padEnd(22)} ${counts[i]} rows`);
}
