# CLAUDE.md — Zendesk Extractor Frontend

## Project Purpose

**zd-extr-fe** is a Vue 3 SPA for extracting, filtering, and visualizing Zendesk support ticket data. It provides:

- Advanced multi-criteria filtering (brand, topic, CSAT, sentiment, agent/customer email, date range, chat tags, transcript search)
- Analytics dashboard with charts (topic distribution, sentiment breakdown)
- VIP customer tracking table
- CSV export with size warnings
- Django-backed username/password authentication — JWT access + rotating refresh (`djangorestframework-simplejwt`)
- Role handling lives entirely on the backend — the frontend doesn't track or branch on user role. Server-side masking of `customer_email` for non-admins is transparent to the client, which renders whatever the API returns.
- Dark/light mode toggle (persisted to localStorage)
- Deployed to GitHub Pages at `/zd-extr-fe/`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 + `<script setup>` (Composition API) |
| Routing | Vue Router 4 |
| State | Pinia 3 |
| UI | PrimeVue 4 (Aura theme), PrimeIcons 7 |
| Styling | Tailwind CSS 4 + tailwindcss-primeui, SCSS |
| Charts | Chart.js 3 (via PrimeVue `<Chart>`) |
| Auth | Django JWT (djangorestframework-simplejwt) — access + rotating refresh, ~30 min access / 7 day refresh |
| HTTP | Axios + 401 interceptor with single in-flight refresh (queued concurrent 401s) |
| Build | Vite 6 (base: `/zd-extr-fe/`) |
| Deploy | gh-pages (`npm run deploy`) |

---

## Key Architecture Decisions

1. **Dual-mode architecture (mock vs API)** — Controlled by `VITE_USE_MOCKED_DATA` env var. **Mock mode**: loads all data client-side from JSON, filters/aggregates in the browser. **API mode**: server-side pagination, filtering, and aggregation via 7 REST endpoints (see API Endpoints section). Every composable, store, and view branches on `USE_MOCKED` to use the correct data path.

2. **Pinia `ticketDataStore` in `stores/ticketData.js`** — A setup-style Pinia store with two code paths. **Mock mode**: loads all data once, IDB cache with 1-hour TTL, batched `processRecords`. The transient `_mockedSearchIndex` field built lazily by `applyMockedTicketFilters` is **stripped before IDB persistence** (`stripTransientFields`) — otherwise each ticket's concatenated-text index would balloon the cache by several MB with no benefit (the index rebuilds on demand). **API mode**: `fetchTickets(params)` calls `GET /api/ticket-conversation-summaries/` per page/filter change; `fetchTicketById(id)` calls `GET /api/ticket-summaries/{ticketid}/` for transcript detail. A generation counter (`fetchGeneration`) discards stale `fetchTickets` responses when the user pages/filters faster than the server responds — mirrors the same pattern in `tableStore`. **Ticket ID filter special case**: when `params.ticketid` is set, `fetchTickets` routes through the detail endpoint `/api/ticket-summaries/{id}/` (wrapping the single result as `{count: 1, results: [ticket]}`) because the list endpoint doesn't honor the `ticketid` query param. 404s are handled gracefully as an empty result. `lazyInit(initialFilterParams?)` dispatches to the correct mode; in API mode the optional arg is threaded into `buildTicketListParams` so the prefetched list uses the **same filter snapshot** the UI is about to apply (prevents the transient mismatch where stats showed N but the table showed N-1 on first paint). `tickets` (API) and `mockedFullProcessedTickets` (mock) use `shallowRef` to avoid deep-reactivity overhead.

3. **Batched `processRecords` to prevent main-thread blocking (mock mode only)** — all tickets are processed in batches of 150 (`PROCESS_BATCH_SIZE`). Between batches, `scheduler.yield()` (Chrome 129+) or `setTimeout(0)` hands control back to the browser, keeping each task under the 50ms long-task threshold and reducing Lighthouse TBT to near-zero. Designed to scale well past the current 1541-row mock dataset.

4. **Lazy route loading + async components** — All 4 routes use `() => import(...)`. `TableDoc`, `VipTableDoc`, and `ChartDoc` use `defineAsyncComponent()`. This eliminates unused-JS on the login page and defers heavy component parsing until the home route is active.

5. **Pinia `tableStore` as the data bridge + split fetch responsibilities** — **Mock mode**: `TableDoc.vue` writes client-side filtered results to `tableStore.mockedFilteredTickets`; `ChartDoc.vue` reads `mockedTopicStats`; `VipTableDoc.vue` reads `mockedFilteredTickets`. **API mode**: `tableStore` holds server responses — `filterOptions` (from `/api/ticket-filter-options/`), `stats` (from `/api/ticket-stats/`), `topicChartData` (from `/api/topic-chart-data/`), `vipCsatData` (from `/api/vip-csat-data/`). On mount/filter-change, `useTicketTableData` calls `fetchCoreAggregations(filters)` which fetches **3 always-visible endpoints** in parallel (full + narrowed filter options + stats) — the two below-the-fold widgets own their own fetches (see decision #13 in Key Architecture Decisions, below). `tableStore.currentFilterParams` is a reactive snapshot of the latest filter state, pushed by `useTicketTableData` via `setCurrentFilterParams()`; `ChartDoc` and `VipTableDoc` subscribe to it. **Ticket ID filter branch**: when filtering by ticketid, `fetchFilterOptionsOnly(filters)` fetches only the two filter-options endpoints and `setSingleTicketAggregations(ticket)` populates `stats`/`topicChartData`/`vipCsatData` client-side from the single fetched ticket — the backend ignores `ticketid` on those aggregation endpoints. `setSingleTicketAggregations` **bumps the `stats` / `topicChart` / `vipCsat` generation counters** before writing, so any widget-initiated HTTP fetch still in flight is discarded on return — without this bump the slower network response could overwrite the single-ticket override with broader backend data. **Per-fetch generation counters** (one per endpoint) discard stale responses at the write site — a previous group-level counter only guarded error reporting, allowing slow old inner writes to overwrite fresh data. **Loading flag (`isAggregationsLoading`) is counter-backed** — `fetchCoreAggregations` and `fetchFilterOptionsOnly` can overlap; a simple boolean would let the faster call flip it to `false` while the slower is still running. No prop drilling.

6. **Faceted filter options** — **Mock mode**: `useFacetedFilterOptions` composable with single-pass bitmask aggregation (client-side). **API mode**: `GET /api/ticket-filter-options/` returns distinct values server-side with the same faceted logic — applying all active filters except the field's own. Response shape: `{ topic: [], brand: [], vip_level: [], customer_email: [], agent_email: [], chat_tags: [], sentiment: [], csat_score: [] }`. **Case-insensitive dedup**: the backend can return mixed-case duplicates (e.g. `vip_level: ["Gold", "gold", "Normal", "normal", ...]`) when the underlying data has inconsistent casing. `tableStore.fetchFilterOptionsFromApi` / `fetchNarrowedFilterOptions` run the response through `normalizeFilterOptions` (src/utils/normalization.js) which lowercases + dedupes the `LOWERCASE_FIELDS` arrays (`vip_level`, `sentiment`, `csat_score`) so the dropdown matches what `normalizeApiRecord` did to ticket rows and what the outgoing filter param will carry. Case-sensitive fields (topic, brand, emails, chat_tags) pass through untouched.

7. **JWT authentication (djangorestframework-simplejwt)** — `POST /api/token/` with `{ username, password }` returns `{ access, refresh }` (no user object). Every subsequent request sends `Authorization: Bearer <access>`. Access token lives ~30 min; refresh token ~7 days and **rotates on each use** (refresh response carries a new `refresh` too). The auth store (`src/stores/auth.js`) holds both tokens plus the user-typed `username` in **closure scope** — not as reactive refs and **not returned from the store** — plus a `_authVersion` counter that drives exposed computed refs (`isAuthenticated`, `username`, `isLoading`, `error`). The frontend does **not** track role — role enforcement is purely server-side. No localStorage / sessionStorage / cookies, so nothing persists across tab/refresh (the 7-day refresh window is **not** used — by design, consistent with the existing security posture). Closure-scoping keeps tokens out of Vue DevTools snapshots; it does **not** make the store XSS-proof (active-session XSS can still read `api.defaults.headers.common.Authorization`). `logout()` is **best-effort server-side** — it awaits `POST /api/logout/` (3s cap) to let the backend blacklist the token, then clears local state in `finally`. Errors (network, 401 from an already-dead access token) are swallowed so local cleanup always runs. `/api/logout/` is added to the interceptor's `isAuthEndpoint()` set so a 401 there can't kick off a recursive refresh-then-logout loop from the terminal-refresh-failure path. **Logout always hard-reloads** (`window.location.href = .../login`) rather than SPA-navigating, so `ticketDataStore` / `tableStore` singletons can't leak the previous user's data to a subsequent login on the same tab. On 401 the `authApi.js` interceptor calls `/api/token/refresh/` once, replays the original request with the new Bearer token, and falls back to logout+redirect only on terminal auth failures (401/403 from the refresh endpoint). Transient errors (5xx, network) bubble up without kicking the user out. Concurrent 401s queue behind a single in-flight refresh promise so the rotating refresh token is only consumed once. Route guards await `initializeAuth()` which resolves immediately (no persisted state to restore).

8. **Mock data fallback** — Set `VITE_USE_MOCKED_DATA=true` in `.env` (comment out the line to disable) to load `src/services/mocked-ticket-summaries.json` instead of hitting the API. **Note**: mock mode only replaces the *ticket data* endpoints — login still hits the real Django backend at `VITE_API_URL/api/token/`, so you need the backend running to sign in. The backend masks `customer_email` server-side, but mock data has raw emails baked in, so mock-mode users always see real emails regardless of their real backend role. `mockedProcessTicket` applies the same `LOWERCASE_FIELDS` pass as `normalizeApiRecord`, so the mock-mode filter dropdown never shows mixed-case duplicates even if the fixture does. Dev-only concern; production uses the API.

9. **Code splitting** — Vite manual chunks: `framework` (vue/pinia/vue-router), `primevue-theme` (Aura preset), `primevue-config` (config/services), `primevue` (components), `charts`, `vendor`. Combined with lazy routes and async components this produces an optimal loading cascade.

10. **PrimeIcons hosted locally** — Font files committed to `public/fonts/primeicons/`, frozen from npm updates. Vite plugin `primeicons-local-fonts` rewrites CSS `url()` references and strips font files from `dist/assets/` at build time. A `@font-face` rule in `styles.scss` sets `font-display: swap` to prevent FOIT (flash of invisible text).

11. **Static HTML shell + dark-mode restore in `index.html`** — A lightweight header + "Loading..." message renders instantly from raw HTML before any JS loads. An inline `<script>` in `<head>` sets the canonical URL dynamically from `location.origin`, reads `localStorage('app-dark-mode')` and adds `.app-dark` to `<html>` before first paint, preventing a white flash for dark-mode users. The shell uses CSS variable fallbacks (`var(--surface-card, #fff)`) so it inherits the correct theme once CSS loads. Vue replaces the shell on mount.

12. **Single-pass filter loop in `applyMockedTicketFilters` (mock mode only)** — Instead of chained `.filter()` calls (one per filter), a single `for` loop with early-exit `continue` avoids intermediate array allocations. Filter values are pre-computed outside the loop (Sets for multiselects, lowercased strings for text) so each iteration is a cheap comparison chain. In API mode, all filtering is done server-side.

13. **Below-the-fold widgets fetch themselves via `IntersectionObserver` (API mode only)** — `ChartDoc` and `VipTableDoc` are always-below-the-fold on the dashboard. The scaffold (IntersectionObserver setup/teardown, `hasTriggered` latch, filter-change watch, mock-mode bypass, ticketid-skip) lives in a shared composable [`useLazyWidgetFetch`](src/composables/useLazyWidgetFetch.js) — each widget just passes its `rootRef` and the store fetch action (`tableStore.fetchTopicChart` / `tableStore.fetchVipCsat`). `rootMargin: '200px'` preloads just before the user scrolls into range. Once triggered, subsequent filter changes re-fetch automatically via a shallow watch on `tableStore.currentFilterParams` (no `deep: true` — `setCurrentFilterParams` always assigns a fresh object). If the user never scrolls to them, the two endpoints are never called. Net effect: cold-load concurrency drops from 6 → 4 requests, and filter changes only re-fetch what's visible. Mock mode skips both the fetch and the observer (client-side aggregation is used). Browsers without `IntersectionObserver` fall back to immediate fetch on mount.

---

## Project Structure

```
src/
├── main.js                            # Entry: Pinia, Router, PrimeVue config
├── App.vue                            # Root: auth loading gate + router-view
├── router/index.js                    # 4 lazy routes (/login, /, /error, /access-denied) + auth guards
├── stores/
│   ├── auth.js                        # JWT auth — access/refresh tokens in closure scope; exposes isAuthenticated / username / refresh() / hasRefreshToken()
│   ├── tableStore.js                  # filteredTickets + memoized chart aggregations (topicStats etc.)
│   └── ticketData.js                  # Core: data fetch, IDB cache, batched normalization, lazy init (Pinia store)
├── composables/
│   ├── useFacetedFilterOptions.js     # Cascading multiselect options (mock mode — bitmask aggregation)
│   ├── useCsvExport.js                # CSV generation with >10k row / >2 MB warnings (mock mode)
│   ├── useChartAggregations.js        # Chart.js datasets from mock topicStats or API topicChartData
│   ├── useTicketFilters.js            # Filter state + exported `createInitialFilters()` / pure `extractFilterParams(filters)` so stores can build the same initial params without a component ref. Constants: PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, FILTER_DEBOUNCE_MS.
│   ├── useTicketTableData.js          # Table data composable: column defs, email masking for non-admins, row transforms
│   ├── useTranscriptDialog.js         # Transcript dialog state + fetch-on-demand for ticket detail
│   ├── useApiVipAggregation.js        # API-mode: transforms /api/vip-csat-data/ into DataTable rows
│   ├── useMockedVipAggregation.js     # Mock-mode: client-side VIP × date CSAT aggregation
│   ├── useApiStatsAggregation.js      # API-mode: maps /api/ticket-stats/ to display format
│   ├── useMockedStatsAggregation.js   # Mock-mode: client-side stats aggregation
│   └── useLazyWidgetFetch.js          # Shared scaffold for below-the-fold widgets: IntersectionObserver + hasTriggered latch + filter-change re-fetch. Used by ChartDoc + VipTableDoc.
├── services/
│   ├── authApi.js                     # Axios instance + JWT refresh-on-401 interceptor (single in-flight `_refreshPromise`, `_retry` latch). Logs out only on 401/403 from /api/token/refresh/; transient errors keep the session alive.
│   ├── ticketApi.js                   # API-mode: param builders + fetch calls for all 7 endpoints
│   ├── mockedTicketCache.js           # Mock-mode: IndexedDB cache (1-hour TTL)
│   ├── mockedTicketService.js         # Mock-mode: simulated paginated ticket service
│   └── mocked-ticket-summaries.json   # Mock dataset (~1541 tickets, evenly distributed across 5 time buckets — see `npm run refresh-mock-dates`)
├── utils/
│   ├── mockedTicketFilters.js         # Mock-mode: applyMockedTicketFilters() — single-pass filter loop
│   ├── normalization.js               # emptyToNone(), normalizeTranscript()
│   ├── stringUtils.js                 # cleanAndFormatString()
│   ├── dateUtils.js                   # formatDate() helper
│   ├── debounce.js                    # debounce() utility for throttling rapid input
│   └── logger.js                      # Thin console wrapper — `debug`/`info` silenced in prod, `warn`/`error` always flow through. Single seam for Sentry / user toasts later.
├── config/
│   └── mockedEnums.js                 # VIP_TIERS, VIP_SEGMENT_ORDER, CSAT_OPTIONS, SENTIMENT_OPTIONS, NEGATIVE_SENTIMENTS
├── views/
│   ├── HomeView.vue                   # Layout shell: AppTopbar + AppFooter; ChartDoc async
│   ├── Dashboard.vue                  # StatsWidget + TableDoc (async) + VipTableDoc (async)
│   ├── uikit/TableDoc.vue             # Main DataTable with all filters
│   ├── uikit/ChartDoc.vue             # Topic/sentiment bar+line charts (async)
│   ├── uikit/VipTableDoc.vue          # VIP customer segment table
│   ├── pages/auth/Login.vue           # Email/password login form
│   ├── pages/auth/Error.vue           # Error page (/error route)
│   └── pages/auth/Access.vue          # Access denied page (/access-denied route)
├── components/
│   ├── StatsWidget.vue                # 8-metric cards (CSAT, sentiment, VIP, compliance…)
│   ├── TranscriptDialog.vue           # Transcript viewer dialog (chat + email transcripts)
│   ├── Logo.vue                       # Theme-aware SVG logo (dark/light)
│   └── FloatingConfigurator.vue       # Theme toggle button (login page)
├── layout/
│   ├── AppTopbar.vue                  # Header: Logo, dark mode toggle, logout
│   ├── AppFooter.vue
│   └── composables/layout.js          # Dark mode state (useLayout composable, persisted to localStorage)
└── assets/layout/                     # SCSS: layout.scss, _topbar, _core, _typography, _preloading, _utils, _mixins, _responsive, variables/ (_common, _dark, _light)
```

---

## API Endpoints (API mode)

Each endpoint accepts a different subset of filter params. All share `timestamp_gte`/`timestamp_lt`. Only the ticket list and export add `started_at_gte/lt`, `updated_at_gte/lt`. Attribute filters (`brand`, `topic`, `vip_level`, `agent_email`, `customer_email`, `chat_tags`, `csat_score`, `sentiment`) vary per endpoint — see param builders below for exact coverage. Multi-value filters are comma-separated (e.g. `brand=BrandA,BrandB`).

| Endpoint | Method | Purpose | Extra Params |
|---|---|---|---|
| `/api/ticket-conversation-summaries/` | GET | Paginated ticket list (no transcripts — returns `has_chat_transcript`/`has_email_transcript` booleans) | `page`, `page_size`, `ordering`, `search`, `summary_contains` (bool), `chat_transcript_contains` (bool), `email_transcript_contains` (bool), `sentiment_reason` |
| `/api/ticket-summaries/{ticketid}/` | GET | Single ticket detail WITH full transcripts. Used both for the "View" transcript button AND for the ticketid filter (the list endpoint doesn't honor `?ticketid=`) | — |
| `/api/ticket-filter-options/` | GET | Distinct values for dropdown filters (faceted) | — |
| `/api/ticket-stats/` | GET | Aggregated stats for StatsWidget | — |
| `/api/topic-chart-data/` | GET | Topic distribution for charts (max 100, sorted by total desc) | — |
| `/api/vip-csat-data/` | GET | VIP segment × date CSAT grid | — |
| `/api/ticket-summaries/export/` | GET | Streaming CSV (no pagination) | `brand`, `topic`, `vip_level`, `csat_score`, `sentiment`, `agent_email`, `customer_email`, `chat_tags` (no text-contains, no started_at/updated_at, no ticketid, no search, no sentiment_reason) |

Param builders in `src/services/ticketApi.js`: `buildTicketListParams()`, `buildFilterOptionsParams()`, `buildNarrowedFilterOptionsParams()`, `buildStatsParams()`, `buildTopicChartParams()`, `buildVipCsatParams()`, `buildExportParams()`. Each builder sends only the params its endpoint accepts:
- `buildTicketListParams` — full set: all dates, all attributes, pagination, ordering, search, sentiment_reason, boolean text-contains. **Special case**: when `filters.ticketid` is set, pagination/ordering/search/text-contains are all skipped because the request is routed to `/api/ticket-summaries/{id}/` which ignores query params entirely.
- `buildFilterOptionsParams` — `timestamp_gte/lt` only (returns unfiltered distinct values for the active filter's own dropdown)
- `buildNarrowedFilterOptionsParams` — `timestamp_gte/lt` + all attribute filters incl. ticketid (returns narrowed distinct values for inactive filter dropdowns)
- `buildStatsParams` — `timestamp_gte/lt` + all attribute filters incl. ticketid
- `buildTopicChartParams` — `timestamp_gte/lt` + `brand`, `topic`, `vip_level`, `csat_score`, `sentiment` (omits `agent_email`/`customer_email`/`chat_tags`/`started_at`/`updated_at`)
- `buildVipCsatParams` — `timestamp_gte/lt` + `vip_level` + `csat_score` only
- `buildExportParams` — `timestamp_gte/lt` + `brand`, `topic`, `vip_level`, `csat_score`, `sentiment`, `agent_email`, `customer_email`, `chat_tags` (a superset of topic-chart's attribute filters). CSV export is **disabled in the UI** whenever any filter the endpoint does not honor is active — `ticketid`, global search, `sentiment_reason`, `chat_transcript`, `email_transcript`, `summary`, `started_at`, or `updated_at`. Principle: the download must reflect what's in the table, so applying e.g. a text-contains filter drops export until the user clears it.

### Customer email masking (server-side)

The backend masks `customer_email` server-side based on the authenticated user's role (a server-side concern — the JWT itself carries no role claim, and the frontend does not track role). Non-admin users receive `"*****"` for the email and `customer_email: []` from `/api/ticket-filter-options/`; admins receive real addresses. The frontend renders whatever the API returns — there is **no client-side masking pass** and no role-based UI branching. This applies uniformly to the ticket list, ticket detail, filter options, and CSV export responses. The customer_email column filter is always rendered; when the backend returns an empty options list, the dropdown simply shows no selectable values.

---

## Filter Architecture

### Filter types in `mockedTicketFilters.js` (`applyMockedTicketFilters`) — mock mode only

| Filter | Type | Default | Logic |
|---|---|---|---|
| `globalFilter` | string | `''` | substring match across all text fields |
| `ticketid` | string/null | `null` | exact match |
| `brand` | string[] | `[]` | multiselect — exact includes |
| `topic` | string[] | `[]` | multiselect — exact includes (via Set) |
| `vip_level` | string[] | `[]` | multiselect — exact includes |
| `customer_email` | string[] | `[]` | multiselect — substring includes |
| `agent_email` | string[] | `[]` | multiselect — substring includes |
| `_chatTagsString` | string[] | `[]` | multiselect — tag exact includes |
| `csat_score` | string/null | `null` | exact match |
| `sentiment` | string/null | `null` | exact match (trimmed, lowercase) |
| `chat_transcript` | string/null | `null` | text contains |
| `email_transcript` | string/null | `null` | text contains |
| `sentiment_reason` | string/null | `null` | text contains |
| `summary` | string/null | `null` | text contains |
| `startDate` | Date/null | today 00:00 | timestamp >= startDate |
| `endDate` | Date/null | tomorrow 00:00 | timestamp < endDate |
| `startedAtStart` | Date/null | `null` | started_at >= startedAtStart |
| `startedAtEnd` | Date/null | `null` | started_at < startedAtEnd |
| `updatedAtStart` | Date/null | `null` | updated_at >= updatedAtStart |
| `updatedAtEnd` | Date/null | `null` | updated_at < updatedAtEnd |

### Faceted options (`useFacetedFilterOptions` — mock mode only; API mode uses `/api/ticket-filter-options/`)

`baseFilterParams` — non-multiselect params passed to every faceted query (date, text, single-select):
- `globalFilter`, `ticketid`, `csat_score`, `sentiment`, `sentiment_reason`, `chat_transcript`, `email_transcript`, `summary`, `startDate`, `endDate`, `startedAtStart`, `startedAtEnd`, `updatedAtStart`, `updatedAtEnd`

`activeMultiselects` — array params that participate in cross-filtering:
- `topic`, `brand`, `vip_level`, `customer_email`, `agent_email`, `_chatTagsString`

Single-pass bitmask aggregation replaces separate filter passes. For each row, a bitmask tracks which multiselect filters it passes (bit positions: topic=1, brand=2, vip_level=4, customer_email=8, agent_email=16, _chatTagsString=32). A row qualifies for facet X's dropdown if `(mask | bitForX) === ALL_PASS` (63). Returned refs: `availableTopics`, `availableBrands`, `availableVipLevels`, `availableCustomerEmails`, `availableAgentEmails`, `availableChatTags`, `availableSentiments`, `availableCsatScores`.

### Quick date filters

Header buttons (Today, Last 7 Days, Last 30 Days, Last 2 Months, Last 3 Months) set `startDate`/`endDate` via `setQuickDateFilter(period)`. Active state tracked by `activeQuickFilter` ref — the active button renders filled (like a PrimeVue `<Tag>` chip), inactive ones render `outlined`. Clicking the active button again **toggles it off** (clears the date range). **"Today" is active by default on load** — `createInitialFilters()` sets timestamps to today's range. `clearFilter()` resets dates to `null` and clears `activeQuickFilter`.

> **To add a new multiselect filter**: add it to `activeMultiselects`, add a `facetedOptions(...)` computed, add to the return object. To add a new non-multiselect (text/date/select): add it to `baseFilterParams` only — no faceted computed needed.

---

## Coding Conventions

### Vue Style
- Always use `<script setup>` — never Options API
- Async operations use `async/await` with `try/catch`

### Naming Convention
| Type | Convention | Example |
|---|---|---|
| Variables / functions | camelCase | `filteredTickets`, `toggleDarkMode` |
| Vue component files | PascalCase | `StatsWidget.vue`, `TableDoc.vue` |
| Composables | `use` prefix | `useCSVExport`, `useVipAggregation` |
| API / data fields | snake_case | `ticket_id`, `csat_score`, `customer_email` |
| Internal/private | `_` prefix | `_chatTagsString` |

### Patterns
- **Composables** for all reusable reactive logic (not mixins, not global utils)
- **Services** (`src/services/`) for external API calls and browser storage (IDB) only
- **Utils** (`src/utils/`) for pure functions (no Vue reactivity)
- **`safeArray`** pattern for null-safety: `const safeArray = (arr) => arr ?? []`
- **Empty string normalization**: convert `''` → `'none'` for consistent filtering
- **Tag normalization**: lowercase + sort arrays before storing
- **Filter debounce**: 300ms to throttle rapid input changes
- **`defineAsyncComponent`** for any component that is heavy or not needed on the login route

### Formatting
- Prettier: **4-space indent**, **250-char line width** (see `.prettierrc.json`)
- Run `npm run lint` to auto-fix ESLint issues before committing

---

## Styling Conventions

- **Dark mode**: add/remove `.app-dark` class on `document.documentElement`
  - Uses View Transition API: `document.startViewTransition(() => { ... })`
  - **Persisted to `localStorage`** (`app-dark-mode` key) — restored before first paint by an inline `<script>` in `index.html`, then managed at runtime by `layout.js`
  - PrimeVue Aura preset handles color switching automatically
- **CSS variable switching pattern** — define light defaults on `html`, override in `html.app-dark`. Single rule set per selector. Do NOT duplicate rules with a separate dark block.
  ```scss
  html {
      --app-shadow-color: var(--p-primary-800);
      &.app-dark { --app-shadow-color: var(--primary-color); }
  }
  .my-element { box-shadow: .1rem .1rem .25rem var(--app-shadow-color); }
  ```
- **CSS variables** for theming (use these, don't hardcode colors):
  - `--surface-card`, `--surface-ground`, `--surface-border`, `--surface-hover`, `--surface-overlay`
  - `--text-color`, `--text-color-secondary`
  - `--primary-color`, `--primary-contrast-color`
  - `--transition-duration`, `--content-border-radius`
- **Tailwind `dark:` variant works with `.app-dark`** — configured via `@custom-variant dark` in `src/assets/tailwind.css`. Prefer `dark:bg-green-900` over CSS variable switching for component-level dark mode when practical.
- **Tailwind** for layout and spacing (`grid`, `flex`, `gap-*`, `p-*`, breakpoints `lg:`, `xl:`). Use Tailwind arbitrary values (`rounded-[56px]`, `h-[3.2rem]`, `bg-[linear-gradient(...)]`) instead of `<style scoped>` for one-off values.
- **SCSS `<style scoped>`** for component-specific overrides only when Tailwind arbitrary values are not practical
- **`:deep(.p-*)`** to override PrimeVue internals — **only inside `<style scoped>`**. In a plain `<style>` block, `:deep()` is invalid — use plain class selectors there instead
- **Responsive**: Tailwind breakpoints + `@media (max-width: 991px)` in SCSS files

---

## Common Tasks

### Adding a new filter to TableDoc

1. Add `filterField: { value: defaultValue, matchMode: FilterMatchMode.X }` to `createInitialFilters()` in `src/composables/useTicketFilters.js`
2. Add the param to `extractFilterParams()` in `src/composables/useTicketFilters.js`
3. **Mock mode**: Add the filter logic to `applyMockedTicketFilters` in `src/utils/mockedTicketFilters.js`
4. **Mock mode multiselect**: add to `activeMultiselects` + `facetedOptions(...)` computed in `useFacetedFilterOptions.js`
5. **Mock mode text/date/single-select**: add to `baseFilterParams` in `useFacetedFilterOptions.js` only
6. **API mode**: Add the param to the appropriate `build*Params()` function in `src/services/ticketApi.js` (usually `addAllAttributeFilters` for attribute filters, or `buildTicketListParams` for text-contains/search). The backend must also support the new param.
7. Add the `<Column>` with `:filterField` and `#filter` slot in the `<DataTable>`
8. Filtered results auto-sync — mock mode syncs to `tableStore`; API mode re-fetches all endpoints

### Adding a new chart

1. Add aggregation computed to `src/stores/tableStore.js` based on `filteredTickets`
2. In `src/views/uikit/ChartDoc.vue`, add computed `chartData` and `chartOptions` objects reading from `tableStore`
3. Use PrimeVue's `<Chart type="bar|line|doughnut" :data="chartData" :options="chartOptions" />`
4. Dark mode: update chart colors inside a `watch` on `isDarkTheme`

### Adding a new stats metric

1. Add computed logic in `src/components/StatsWidget.vue` using `useTicketDataStore()` or `tableStore`
2. Add a card in the Tailwind 12-column grid:
   ```html
   <div class="col-span-12 lg:col-span-6 xl:col-span-3">
     <!-- metric card -->
   </div>
   ```

### Adding a new page/route

1. Create the view in `src/views/`
2. Add the route in `src/router/index.js` using `component: () => import('@/views/MyView.vue')` (lazy)
3. If auth-protected, add `meta: { requiresAuth: true }` — the existing route guard handles it
4. If it needs the layout shell (topbar/footer), nest it under the `HomeView` route

---

## Debugging Guide

### Data not loading / stale data
- `useTicketDataStore().lazyInit()` fires once. **Mock mode**: clear IDB (`clearTicketCache()` in `mockedTicketCache.js`) or hard-refresh. **API mode**: check Network tab for failed requests to `/api/ticket-conversation-summaries/`.
- IDB cache TTL is 1 hour (mock mode only). Stale cache triggers a silent background refresh — UI still renders immediately from the old data. All IDB operations have a 5-second timeout (`IDB_TIMEOUT_MS` in `mockedTicketCache.js`) to prevent indefinite hangs on blocked/corrupted databases.
- Switch to mock data: uncomment `VITE_USE_MOCKED_DATA=true` in `.env`, restart dev server
- **Mock mode shows no rows for "Today" / recent filters**: the JSON's dates are static and drift out of the active window over time. Run `npm run refresh-mock-dates` to redistribute (see "Mock data maintenance" below).
- Check `fetchError` ref in `useTicketDataStore` for error state
- `processRecords` is async/batched (mock mode). `isLoading` stays `true` while batches run — do not check for data until `isLoading` is false

### Filters not working
- **Mock mode**: Verify the filter param is passed to `applyMockedTicketFilters` in `filteredTickets` computed (TableDoc.vue). Verify the filter logic exists in `mockedTicketFilters.js`.
- **API mode**: Verify the filter param is included in `extractFilterParams()` (`useTicketFilters.js`) and mapped in the appropriate `build*Params()` function in `ticketApi.js`. Check that the backend supports the param.
- Multiselect filters use `FilterService.register('containsAny', ...)` — confirm registration runs before DataTable mounts (mock mode)
- Faceted options (mock mode): check whether the field is in `baseFilterParams` or `activeMultiselects` — wrong bucket means it won't narrow the facet correctly
- Check that normalized data uses `'none'` (string) for empty fields, not `null`/`''`
- **Sentiment / CSAT single-select columns** — have `:showFilterMatchModes="false"` locked to `EQUALS`. Without this, PrimeVue's filter menu lets the user switch to `CONTAINS`, which would match `"very negative"` when filtering for `"negative"` (substring).
- **Ticket ID filter (API mode)** — routes through `/api/ticket-summaries/{id}/` (detail endpoint), NOT the list endpoint. The list endpoint ignores the `ticketid` query param. If filtering doesn't work, check Network tab for the detail endpoint call.
- **Date filter "Clear" button** — PrimeVue's built-in Clear replaces the `constraints` array with a single empty constraint, which would break the From/To DatePicker bindings. A watcher in `useTicketFilters.js` restores the `[DATE_AFTER, DATE_BEFORE]` shape when length drops below 2.

### Auth issues
- Auth state: `useAuthStore()` — inspect `isAuthenticated`, `username`, `isLoading`, `error` in Vue DevTools. The `access` and `refresh` tokens are **closure-scoped** and deliberately not on the store surface, so they won't show up in DevTools snapshots; check `api.defaults.headers.common.Authorization` if you need to see the access token at runtime. All are `null` / `false` on every fresh page load by design (in-memory only).
- **"I logged in and the page refresh logged me out"** — this is expected. Tokens are in-memory only (no localStorage/cookies) so refresh always starts unauthenticated. The backend's 7-day refresh lifetime is effectively unused here. If persistence is needed, store the refresh token in `localStorage` on login / read on `initializeAuth` and call `refresh()` — tradeoff is XSS exposure.
- **Login request**: `POST /api/token/` with `{ username, password }`. Response: `{ access, refresh }` (no user object — the JWT carries `{token_type, exp, iat, jti, user_id}` and nothing else; `username` is what the user typed at login). A malformed response (missing either token) throws before any state is set. On success the auth store sets `api.defaults.headers.common['Authorization'] = 'Bearer <access>'`.
- **Refresh request**: `POST /api/token/refresh/` with `{ refresh }`. Response: `{ access, refresh }` — **rotating refresh tokens**. The interceptor updates both on success and falls back to logout if refresh returns an error. Concurrent 401s (e.g. 5 aggregation endpoints firing together, all with the same stale token) queue behind a single in-flight refresh so the rotating refresh token is only consumed once.
- **401 handler** in `authApi.js` interceptor: attempts one refresh → replays the original request with the new Bearer → if refresh itself fails, calls `logout()` + `window.location.href = '/login'`. The `_retry` flag on the original request config prevents infinite loops (a request that already had its access token refreshed once and STILL 401s bubbles as a hard error).
- **Authorization header format** is `Bearer <value>`. If the backend returns 401 on valid-looking requests, check the header prefix in DevTools Network tab — if it still says `Token` somewhere, a stale axios instance or manual header override is at fault.
- **Login failures**: error message comes from `error.response.data.detail` or `error.response.data.non_field_errors[0]` (standard DRF error shapes). Falls back to `err.message` then a generic string.
- **Role-gated UI missing for a known admin** — the frontend does not track role; it just renders whatever the API returns. If an admin user sees masked emails (`*****`), the issue is on the backend (wrong `is_admin` on the user record, or the serializer isn't honoring it). Check the API response in the Network tab.
- **Logout is best-effort server-side** — `logout()` awaits `POST /api/logout/` (empty body, `Authorization: Bearer <access>`, 3s timeout) before clearing local state; failures are swallowed so local cleanup always runs. Both callers (`AppTopbar.handleLogout`, the `authApi.js` interceptor's terminal-refresh-failure branch) `await` it before the hard redirect so the browser doesn't abort the in-flight POST. `/api/logout/` is listed in `isAuthEndpoint()` alongside `/api/token/` and `/api/token/refresh/` so a 401 from it can't recursively re-enter the refresh path.
- **Open-redirect protection** — `Login.vue` validates `?redirect=` via `safeRedirectPath`: rejects non-strings, absolute URLs, protocol-relative, backslash tricks, and `/login`/`/login/*` itself (to prevent post-login ping-pong).

### Transcripts
- **Email transcripts containing "Conversation with" are sanitized to empty string** during normalization (`sanitizeEmailTranscript` in `ticketData.js`). These are chat-session metadata lines, not actual email transcripts. When sanitized to empty, `has_email_transcript` is also flipped to `false` so the "View" button doesn't render.
- **Transcript dialog auto-closes on empty content** — if the fetched transcript is empty after sanitization (happens in API mode when the list endpoint flags `has_email_transcript: true` but the detail endpoint returns a "Conversation with" header), `useTranscriptDialog` closes the dialog instead of showing an empty popup. The real fix is on the backend — it should set `has_email_transcript = false` for these entries.

### Dark mode not toggling
- Check that `useLayout().toggleDarkMode()` is called in `AppTopbar.vue`
- The `.app-dark` class should appear on `<html>` — inspect with browser DevTools
- PrimeVue theme switching depends on `darkModeSelector: '.app-dark'` in `main.js` PrimeVue config
- Preference is persisted in `localStorage.getItem('app-dark-mode')` — clear it to reset

### Build / deployment issues
- Base URL must be `/zd-extr-fe/` in `vite.config.mjs` — do not change for GitHub Pages
- `npm run deploy` runs `npm run build` then `gh-pages -d dist`
- Never commit `.env`
- PrimeIcons fonts must exist in `public/fonts/primeicons/` — copy from `node_modules/primeicons/fonts/` once after install; they are committed to git and not regenerated by Vite

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_USE_MOCKED_DATA` | `true` to load local mock JSON instead of API (comment out to disable) |
| `VITE_API_BASE_URL` | axios `baseURL` for `authApi.js` (default: empty — requests go to same origin and rely on the Vite proxy) |
| `VITE_API_URL` | Dev-server proxy target for `/api/*` (fallback: `http://13.53.64.132`) |

API proxy (dev only): `/api/` → `VITE_API_URL` or `http://13.53.64.132` (configured in `vite.config.mjs`)

---

## Mock data maintenance

`src/services/mocked-ticket-summaries.json` is a static fixture (~1541 tickets). Because dates are baked in, the dataset drifts out of the active quick-filter windows over time. The `scripts/refresh-mock-dates.mjs` script keeps it usable.

```bash
npm run refresh-mock-dates
```

**What it does** — redistributes every ticket's `timestamp` so the dataset is evenly split across the 5 non-overlapping ranges that correspond to the UI quick filters, using the same local-midnight boundaries as `useTicketFilters.js`:

| Bucket | Span | Approx. row count |
|---|---|---|
| today | 1 day | ~308 |
| 1-7 days ago | 7 days | ~308 |
| 1 week - 1 month ago | ~23 days | ~308 |
| 1-2 months ago | ~30 days | ~308 |
| 2-3 months ago | ~30 days | ~309 |

Cumulative counts seen when clicking the quick-filter buttons: Today 308, Last 7 Days 616, Last Month 924, Last 2 Months 1232, Last 3 Months 1541.

**Invariants preserved** (every date field in a ticket shifts by the same per-ticket delta):
- `timestamp === updated_at` — required by the backend contract and verified by the app
- every timestamp embedded in `chat_transcript` / `email_transcript` ≥ the ticket's `started_at`

**Idempotent-ish** — re-running after the calendar has advanced re-equalizes around the new "today". Running twice in the same second is essentially a no-op.

**Format preservation** — embedded transcript timestamps keep their original fractional-digit width (`.SSSSSS`) and timezone suffix (`Z` / `+00:00`). Ceiling-round on output prevents shifting into a lower-precision format from silently rounding a value *below* the intended target.

---

## Important Gotchas

- **Do NOT add `/:pathMatch(.*)*` catch-all route** — it breaks GitHub Pages cold navigation. Vue Router cannot intercept direct URL loads on GH Pages; the 404.html trick is needed instead.
- **`isLoading` from `useTicketDataStore()`** — use this for DataTable `:loading` prop; do not create a local `loading = ref(false)` that is never set.
- **`processRecords` is async (mock mode)** — it yields between batches. Any code that depends on `mockedFullProcessedTickets` must wait for `isLoading` to become false, not run immediately after `lazyInit()`.
- **Named constants over magic numbers** — e.g. `PAGE_SIZE_DEFAULT = 5`, `FILTER_DEBOUNCE_MS = 300`, `CSAT_HIGH_THRESHOLD = 80`, `CSV_ROW_WARN_THRESHOLD = 10_000`, `PROCESS_BATCH_SIZE = 150`, `IDB_TIMEOUT_MS = 5000`, `REVOKE_DELAY_MS = 1000`, `TOKEN_ENDPOINT`, `TOKEN_REFRESH_ENDPOINT`.
- **No virtual scrolling on DataTable** — lazy pagination (5 rows default, `PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100]`) is used instead. The DataTable uses `lazy=true` with `onPage`/`onFilter` events. Mock mode slices `filteredTickets` client-side; API mode receives pre-paginated results from the server.
- **Data is already normalized** by `processRecords` (mock) or `normalizeApiRecord` (API) — no need for defensive `|| 'none'` / `|| 'No Data'` checks downstream.
- **`topic` is a multiselect filter** — its value is `string[]`, not `string|null`. Mock mode: lives in `activeMultiselects` in `useFacetedFilterOptions`. API mode: sent as array via `addAllAttributeFilters` in `ticketApi.js`.
- **API ticket list does NOT return transcripts** — it returns `has_chat_transcript` / `has_email_transcript` booleans. Full transcripts are fetched on-demand via `GET /api/ticket-summaries/{ticketid}/`.
- **Ticket ID filter uses the detail endpoint** — filtering by `ticketid` in API mode routes to `/api/ticket-summaries/{id}/`, NOT the list endpoint (backend doesn't honor `?ticketid=`). `stats`/`topicChartData`/`vipCsatData` are computed client-side from the single fetched ticket via `tableStore.setSingleTicketAggregations()`. The CSV export button is disabled in this state (along with any other filter the export endpoint doesn't honor — see `buildExportParams` in the API Endpoints section).
- **Single-result widget fallback (API mode)** — when a non-ticketid filter narrows the list to exactly 1 ticket (`totalCount === 1`), [useTicketTableData.js](src/composables/useTicketTableData.js) silently overrides `stats`/`topicChartData`/`vipCsatData` via `tableStore.setSingleTicketAggregations()` after the normal `fetchAllAggregations()` call. This keeps StatsWidget / ChartDoc / VipTableDoc consistent with the table when the user applies a filter that the aggregation endpoints don't honor (e.g. `customer_email`, `agent_email`, `chat_tags` on `/api/vip-csat-data/`, which would otherwise show broader totals than the single visible row).
- **API mount flow (`useTicketTableData.onMounted`)** — list prefetch (`ticketDataStore.lazyInit`) and aggregation fetch (`tableStore.fetchAllAggregations`) run in a single `Promise.all` off a **single** filter snapshot. Filter changes made while that promise is pending set a `pendingFilterChange` flag that's flushed via `debouncedFetchData()` as soon as `initialFetchDone` flips — without the flush, a user typing in the global search during cold load would see their input accepted into state but never trigger a fetch.
- **Filter watcher uses `{ deep: true }` on the filters ref**, not `JSON.stringify(extractFilterParams())`. Semantically equivalent, zero stringification on every reactive tick.
- **Sorting resets pagination** — `onSort` sets `lazyParams.page = 1` before re-fetching. Without this, sorting while on page N would return rows N*limit..N*limit+limit of the newly-ordered dataset, not the top.
- **CSV export has no axios timeout** — `exportTicketsCsv` sets `timeout: 0` to override the instance-level 10s limit, since the backend streams the whole filtered dataset and large date ranges exceed that. Object URLs are revoked **after a 1s delay** (both here and in `useCsvExport.js`); revoking synchronously after `link.click()` aborts the download in some browsers.
- **`!important` inside CSS `var()` is invalid** — silently ignored by browsers. Override PrimeVue tokens by redefining the CSS variable, not with `!important` inside the value.
- **Chart topic limit** — `useChartAggregations.js` caps charts at `TOP_TOPICS_LIMIT = 100` topics (sorted by total desc). Chrome's max canvas width is 32,767px; at 48px/bar, exceeding ~682 bars silently breaks the canvas. 100 is a safe, readable default.
- **Chart y-axis locks (`ChartDoc.vue`)** — the `% Negative Chats per Topic` line chart is locked to `min: 0, max: 100` with a `%` tick suffix; the `Number of Chats` bar chart uses `beginAtZero: true, suggestedMax: 1, precision: 0`. Without these, Chart.js auto-scales to `-1 → 1` (or fractional ticks) when every value is 0 or when there's a single row — which is common on narrow filters.
- **Git remote**: `origin` = `rvoronevska-sbt/zd-extr-fe`. Single repo — push to `origin`.
