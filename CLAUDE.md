# CLAUDE.md — Zendesk Extractor Frontend

## Project Purpose

**zd-extr-fe** is a Vue 3 SPA for extracting, filtering, and visualizing Zendesk support ticket data. It provides:

- Advanced multi-criteria filtering (brand, topic, CSAT, sentiment, agent/customer email, date range, chat tags, transcript search)
- Analytics dashboard with charts (topic distribution, sentiment breakdown)
- VIP customer tracking table
- CSV export with size warnings
- Firebase email/password authentication with Firestore RBAC (role-based access control)
- Role-based UI (e.g. email masking for non-admin users)
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
| Auth | Firebase 12 Auth + Firestore RBAC (primary), Django JWT (secondary) |
| HTTP | Axios + JWT refresh interceptor |
| Build | Vite 6 (base: `/zd-extr-fe/`) |
| Deploy | gh-pages (`npm run deploy`) |

---

## Key Architecture Decisions

1. **Dual-mode architecture (mock vs API)** — Controlled by `VITE_USE_MOCKED_DATA` env var. **Mock mode**: loads all data client-side from JSON, filters/aggregates in the browser. **API mode**: server-side pagination, filtering, and aggregation via 7 REST endpoints (see API Endpoints section). Every composable, store, and view branches on `USE_MOCKED` to use the correct data path.

2. **Pinia `ticketDataStore` in `stores/ticketData.js`** — A setup-style Pinia store with two code paths. **Mock mode**: loads all data once, IDB cache with 1-hour TTL, batched `processRecords`. **API mode**: `fetchTickets(params)` calls `GET /api/ticket-conversation-summaries/` per page/filter change; `fetchTicketById(id)` calls `GET /api/ticket-conversation-summaries/{id}/` for transcript detail. `lazyInit()` dispatches to the correct mode. `tickets` (API) and `mockedFullProcessedTickets` (mock) use `shallowRef` to avoid deep-reactivity overhead.

3. **Batched `processRecords` to prevent main-thread blocking (mock mode only)** — 30k tickets are processed in batches of 150. Between batches, `scheduler.yield()` (Chrome 129+) or `setTimeout(0)` hands control back to the browser, keeping each task under the 50ms long-task threshold and reducing Lighthouse TBT to near-zero.

4. **Lazy route loading + async components** — All 4 routes use `() => import(...)`. `TableDoc`, `VipTableDoc`, and `ChartDoc` use `defineAsyncComponent()`. This eliminates unused-JS on the login page and defers heavy component parsing until the home route is active.

5. **Pinia `tableStore` as the data bridge** — **Mock mode**: `TableDoc.vue` writes client-side filtered results to `tableStore.mockedFilteredTickets`; `ChartDoc.vue` reads `mockedTopicStats`; `VipTableDoc.vue` reads `mockedFilteredTickets`. **API mode**: `tableStore` holds server responses — `filterOptions` (from `/api/ticket-filter-options/`), `stats` (from `/api/ticket-stats/`), `topicChartData` (from `/api/topic-chart-data/`), `vipCsatData` (from `/api/vip-csat-data/`). `fetchAllAggregations(filters)` fetches all 4 in parallel. No prop drilling.

6. **Faceted filter options** — **Mock mode**: `useFacetedFilterOptions` composable with single-pass bitmask aggregation (client-side). **API mode**: `GET /api/ticket-filter-options/` returns distinct values server-side with the same faceted logic — applying all active filters except the field's own. Response shape: `{ topic: [], brand: [], vip_level: [], customer_email: [], agent_email: [], chat_tags: [], sentiment: [], csat_score: [] }`.

7. **Firebase is primary auth with Firestore RBAC** — `VITE_USE_FIREBASE=true` in `.env`. Firebase Auth handles login; Firestore `users/{uid}` stores `role` and `displayName`. Auth store fetches user data from Firestore after login and on `onAuthStateChanged`. `hasRole()` is a plain function (not computed) for role checks. Django JWT auth (`authApi.js`) is implemented but secondary. Route guards await `initializeAuth()` before every navigation. See `FIREBASE+FIRESTORE.md` for full setup guide.

8. **Mock data fallback** — Set `VITE_USE_MOCKED_DATA=true` in `.env` (comment out the line to disable) to load `src/services/mocked-ticket-summaries.json` instead of hitting the API.

9. **Code splitting** — Vite manual chunks: `framework` (vue/pinia/vue-router), `primevue-theme` (Aura preset), `primevue-config` (config/services), `primevue` (components), `firebase`, `charts`, `vendor`. Combined with lazy routes and async components this produces an optimal loading cascade.

10. **PrimeIcons hosted locally** — Font files committed to `public/fonts/primeicons/`, frozen from npm updates. Vite plugin `primeicons-local-fonts` rewrites CSS `url()` references and strips font files from `dist/assets/` at build time. A `@font-face` rule in `styles.scss` sets `font-display: swap` to prevent FOIT (flash of invisible text).

11. **Static HTML shell + dark-mode restore in `index.html`** — A lightweight header + "Loading..." message renders instantly from raw HTML before any JS loads. An inline `<script>` in `<head>` sets the canonical URL dynamically from `location.origin`, reads `localStorage('app-dark-mode')` and adds `.app-dark` to `<html>` before first paint, preventing a white flash for dark-mode users. The shell uses CSS variable fallbacks (`var(--surface-card, #fff)`) so it inherits the correct theme once CSS loads. Vue replaces the shell on mount.

12. **Single-pass filter loop in `applyMockedTicketFilters` (mock mode only)** — Instead of chained `.filter()` calls (one per filter), a single `for` loop with early-exit `continue` avoids intermediate array allocations. Filter values are pre-computed outside the loop (Sets for multiselects, lowercased strings for text) so each iteration is a cheap comparison chain. In API mode, all filtering is done server-side.

---

## Project Structure

```
src/
├── main.js                            # Entry: Pinia, Router, PrimeVue config
├── App.vue                            # Root: auth loading gate + router-view
├── router/index.js                    # 4 lazy routes (/login, /, /error, /access-denied) + auth guards
├── stores/
│   ├── auth.js                        # Firebase/Django auth state + Firestore RBAC (user, role, hasRole)
│   ├── tableStore.js                  # filteredTickets + memoized chart aggregations (topicStats etc.)
│   └── ticketData.js                  # Core: data fetch, IDB cache, batched normalization, lazy init (Pinia store)
├── composables/
│   ├── useFacetedFilterOptions.js     # Cascading multiselect options (mock mode — bitmask aggregation)
│   ├── useCsvExport.js                # CSV generation with >10k row / >2 MB warnings (mock mode)
│   ├── useChartAggregations.js        # Chart.js datasets from mock topicStats or API topicChartData
│   ├── useApiVipAggregation.js        # API-mode: transforms /api/vip-csat-data/ into DataTable rows
│   ├── useMockedVipAggregation.js     # Mock-mode: client-side VIP × date CSAT aggregation
│   ├── useApiStatsAggregation.js      # API-mode: maps /api/ticket-stats/ to display format
│   └── useMockedStatsAggregation.js   # Mock-mode: client-side stats aggregation
├── services/
│   ├── authApi.js                     # Axios instance with auto-refresh on 401
│   ├── ticketApi.js                   # API-mode: param builders + fetch calls for all 7 endpoints
│   ├── mockedTicketCache.js           # Mock-mode: IndexedDB cache (1-hour TTL)
│   ├── mockedTicketService.js         # Mock-mode: simulated paginated ticket service
│   └── mocked-ticket-summaries.json   # Mock dataset (~30k tickets)
├── utils/
│   ├── mockedTicketFilters.js         # Mock-mode: applyMockedTicketFilters() — single-pass filter loop
│   ├── normalization.js               # emptyToNone(), normalizeTranscript()
│   ├── stringUtils.js                 # cleanAndFormatString(), formatDate()
│   └── dateUtils.js                   # formatDate() helper
├── config/
│   └── mockedEnums.js                 # VIP_TIERS, VIP_SEGMENT_ORDER, CSAT_OPTIONS, SENTIMENT_OPTIONS, NEGATIVE_SENTIMENTS
├── views/
│   ├── HomeView.vue                   # Layout shell: AppTopbar + AppFooter; ChartDoc async
│   ├── Dashboard.vue                  # StatsWidget + TableDoc (async) + VipTableDoc (async)
│   ├── uikit/TableDoc.vue             # Main DataTable with all filters
│   ├── uikit/ChartDoc.vue             # Topic/sentiment bar+line charts (async)
│   ├── uikit/VipTableDoc.vue          # VIP customer segment table
│   └── pages/auth/Login.vue           # Email/password login form
├── components/
│   ├── StatsWidget.vue                # 8-metric cards (CSAT, sentiment, VIP, compliance…)
│   ├── Logo.vue                       # Theme-aware SVG logo (dark/light)
│   └── FloatingConfigurator.vue       # Theme toggle button (login page)
├── layout/
│   ├── AppTopbar.vue                  # Header: Logo, dark mode toggle, logout
│   ├── AppFooter.vue
│   └── composables/layout.js          # Dark mode state (useLayout composable, persisted to localStorage)
├── firebase/index.js                  # Firebase SDK init: exports `auth` and `db` (Firestore) instances
└── assets/layout/                     # SCSS: _topbar, _core, _typography, _preloading, _utils, variables/
```

---

## API Endpoints (API mode)

All endpoints use the same common filter params: `timestamp_gte`, `timestamp_lt`, `started_at_gte/lt`, `updated_at_gte/lt`, plus attribute filters (`brand`, `topic`, `vip_level`, `agent_email`, `customer_email`, `chat_tags`, `csat_score`, `sentiment`). Multi-value filters are comma-separated (e.g. `brand=BrandA,BrandB`).

| Endpoint | Method | Purpose | Extra Params |
|---|---|---|---|
| `/api/ticket-conversation-summaries/` | GET | Paginated ticket list (no transcripts — returns `has_chat_transcript`/`has_email_transcript` booleans) | `page`, `page_size`, `ordering`, `search`, `ticketid`, `summary_contains` (bool), `chat_transcript_contains` (bool), `email_transcript_contains` (bool), `sentiment_reason` |
| `/api/ticket-summaries/{ticketid}/` | GET | Single ticket detail WITH full transcripts | — |
| `/api/ticket-filter-options/` | GET | Distinct values for dropdown filters (faceted) | — |
| `/api/ticket-stats/` | GET | Aggregated stats for StatsWidget | — |
| `/api/topic-chart-data/` | GET | Topic distribution for charts (max 100, sorted by total desc) | — |
| `/api/vip-csat-data/` | GET | VIP segment × date CSAT grid | — |
| `/api/ticket-summaries/export/` | GET | Streaming CSV (all filters, no pagination) | Same text filters as list |

Param builders in `src/services/ticketApi.js`: `buildTicketListParams()`, `buildFilterOptionsParams()`, `buildStatsParams()`, `buildTopicChartParams()`, `buildVipCsatParams()`, `buildExportParams()`. Each builder sends only the params its endpoint accepts — e.g. `buildVipCsatParams` only sends `timestamp_gte/lt` + `vip_level` + `csat_score`; `buildTopicChartParams` adds `brand`, `topic`, `sentiment` on top of that but omits `agent_email`/`customer_email`/`chat_tags`.

### Backend requirement: server-side customer email masking (SECURITY)

**Current state (insecure):** The frontend masks `customer_email` in the UI for non-admin users (`useTicketTableData.js` + `maskEmail()` in `stringUtils.js`). `maskEmail` uses a fixed-width placeholder (`****@domain.com`) that does not reveal the original email length. However, raw unmasked emails are still visible in API responses (Network tab), Pinia state (Vue DevTools), and the browser console. This is cosmetic masking only — not a security boundary.

**Required backend behavior:** All endpoints that return or accept `customer_email` must enforce role-based masking server-side. The backend should inspect the authenticated user's role and:

1. **Ticket list** (`/api/ticket-conversation-summaries/`) — return masked `customer_email` (e.g. `c*****@example.com`) for non-admin users
2. **Ticket detail** (`/api/ticket-summaries/{ticketid}/`) — same masking
3. **Filter options** (`/api/ticket-filter-options/`) — either omit the `customer_email` array entirely for non-admins, or return masked values. If masked values are returned, the backend must accept those masked values as filter params and match them against real emails internally
4. **CSV export** (`/api/ticket-summaries/export/`) — export masked emails for non-admins
5. **Stats/chart/VIP endpoints** — do not expose `customer_email`, so no change needed

Once the backend implements this, the frontend's client-side masking (`maskEmail` in `useTicketTableData.js`) becomes redundant and can be removed. Until then, it remains as a UI courtesy — not a security control.

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
| `summary` | string/null | `null` | text contains |
| `startDate` | Date/null | today 00:00 | timestamp >= startDate |
| `endDate` | Date/null | tomorrow 00:00 | timestamp < endDate |

### Faceted options (`useFacetedFilterOptions` — mock mode only; API mode uses `/api/ticket-filter-options/`)

`baseFilterParams` — non-multiselect params passed to every faceted query (date, text, single-select):
- `globalFilter`, `ticketid`, `csat_score`, `sentiment`, `sentiment_reason`, `chat_transcript`, `email_transcript`, `summary`, `startDate`, `endDate`

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
- Lazy Firebase imports: `const { signInWithEmailAndPassword } = await import('firebase/auth')`

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

1. Add `filterField: { value: defaultValue, matchMode: FilterMatchMode.X }` to `createInitialFilters()` in `TableDoc.vue`
2. Add the param to `extractFilterParams()` in `TableDoc.vue`
3. **Mock mode**: Add the filter logic to `applyMockedTicketFilters` in `src/utils/mockedTicketFilters.js`
4. **Mock mode multiselect**: add to `activeMultiselects` + `facetedOptions(...)` computed in `useFacetedFilterOptions.js`
5. **Mock mode text/date/single-select**: add to `baseFilterParams` in `useFacetedFilterOptions.js` only
6. **API mode**: Add the param to the appropriate `build*Params()` function in `src/services/ticketApi.js` (usually `buildCommonFilterParams` for attribute filters, or `buildTicketListParams` for text-contains/search). The backend must also support the new param.
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
- Check `fetchError` ref in `useTicketDataStore` for error state
- `processRecords` is async/batched (mock mode). `isLoading` stays `true` while batches run — do not check for data until `isLoading` is false

### Filters not working
- **Mock mode**: Verify the filter param is passed to `applyMockedTicketFilters` in `filteredTickets` computed (TableDoc.vue). Verify the filter logic exists in `mockedTicketFilters.js`.
- **API mode**: Verify the filter param is included in `extractFilterParams()` (TableDoc.vue) and mapped in the appropriate `build*Params()` function in `ticketApi.js`. Check that the backend supports the param.
- Multiselect filters use `FilterService.register('containsAny', ...)` — confirm registration runs before DataTable mounts (mock mode)
- Faceted options (mock mode): check whether the field is in `baseFilterParams` or `activeMultiselects` — wrong bucket means it won't narrow the facet correctly
- Check that normalized data uses `'none'` (string) for empty fields, not `null`/`''`

### Auth issues
- Auth state: `useAuthStore()` — inspect `isAuthenticated`, `user`, `role`, `isLoading` in Vue DevTools
- Route guard awaits `initializeAuth()` which resolves after Firebase `onAuthStateChanged` — if this hangs, check Firebase config in `.env`
- Role not loading: verify Firestore `users/{uid}` document exists and the document ID matches the Firebase Auth UID exactly
- `hasRole()` is a plain function (not computed) — wrap in `computed()` at the call site for reactivity: `const isAdmin = computed(() => authStore.hasRole('admin'))`
- **Session invalidation redirect** — three layers detect lost sessions and hard-redirect to `/login`:
  1. XHR interceptor in `firebase/index.js` — catches Firestore 400 responses (e.g. cleared IndexedDB)
  2. `visibilitychange` listener in `auth.js` — two checks: verifies Firebase Auth's IDB still exists via `indexedDB.databases()`, then forces a token refresh via `getIdToken(true)` to catch revoked tokens
  3. `onAuthStateChanged` callback in `auth.js` — catches SDK-detected session loss (e.g. account disabled)
- Django JWT: `authApi.js` interceptor auto-retries on 401 using `REFRESH_ENDPOINT` constant. If looping, check the refresh endpoint
- Firebase errors: `firebase/index.js` validates required env vars (`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`) on startup and logs missing ones. Verify all `VITE_FIREBASE_*` env vars match the Firebase console project settings
- See `FIREBASE+FIRESTORE.md` for full setup guide (adding users, Firestore structure, security rules)

### Dark mode not toggling
- Check that `useLayout().toggleDarkMode()` is called in `AppTopbar.vue`
- The `.app-dark` class should appear on `<html>` — inspect with browser DevTools
- PrimeVue theme switching depends on `darkModeSelector: '.app-dark'` in `main.js` PrimeVue config
- Preference is persisted in `localStorage.getItem('app-dark-mode')` — clear it to reset

### Build / deployment issues
- Base URL must be `/zd-extr-fe/` in `vite.config.mjs` — do not change for GitHub Pages
- `npm run deploy` runs `npm run build` then `gh-pages -d dist`
- Never commit `.env` — Firebase credentials must be set per-environment
- PrimeIcons fonts must exist in `public/fonts/primeicons/` — copy from `node_modules/primeicons/fonts/` once after install; they are committed to git and not regenerated by Vite

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_USE_FIREBASE` | `true` to use Firebase auth |
| `VITE_USE_MOCKED_DATA` | `true` to load local mock JSON instead of API (comment out to disable) |
| `VITE_FIREBASE_API_KEY` | Firebase project API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_API_URL` | API proxy target for dev server (fallback: `http://56.228.5.130`) |

API proxy (dev only): `/api/` → `VITE_API_URL` or `http://56.228.5.130` (configured in `vite.config.mjs`)

---

## Important Gotchas

- **Do NOT add `/:pathMatch(.*)*` catch-all route** — it breaks GitHub Pages cold navigation. Vue Router cannot intercept direct URL loads on GH Pages; the 404.html trick is needed instead.
- **`isLoading` from `useTicketDataStore()`** — use this for DataTable `:loading` prop; do not create a local `loading = ref(false)` that is never set.
- **`processRecords` is async (mock mode)** — it yields between batches. Any code that depends on `mockedFullProcessedTickets` must wait for `isLoading` to become false, not run immediately after `lazyInit()`.
- **Named constants over magic numbers** — e.g. `PAGE_SIZE_DEFAULT = 5`, `FILTER_DEBOUNCE_MS = 300`, `CSAT_HIGH_THRESHOLD = 80`, `CSV_ROW_WARN_THRESHOLD = 10_000`, `PROCESS_BATCH_SIZE = 150`, `IDB_TIMEOUT_MS = 5000`, `REFRESH_ENDPOINT`, `DJANGO_TOKEN_ENDPOINT`.
- **No virtual scrolling on DataTable** — lazy pagination (5 rows default, `PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100]`) is used instead. The DataTable uses `lazy=true` with `onPage`/`onFilter` events. Mock mode slices `filteredTickets` client-side; API mode receives pre-paginated results from the server.
- **Data is already normalized** by `processRecords` (mock) or `normalizeApiRecord` (API) — no need for defensive `|| 'none'` / `|| 'No Data'` checks downstream.
- **`topic` is a multiselect filter** — its value is `string[]`, not `string|null`. Mock mode: lives in `activeMultiselects` in `useFacetedFilterOptions`. API mode: comma-joined in `buildCommonFilterParams`.
- **API ticket list does NOT return transcripts** — it returns `has_chat_transcript` / `has_email_transcript` booleans. Full transcripts are fetched on-demand via `GET /api/ticket-summaries/{ticketid}/`.
- **`!important` inside CSS `var()` is invalid** — silently ignored by browsers. Override PrimeVue tokens by redefining the CSS variable, not with `!important` inside the value.
- **Chart topic limit** — `useChartAggregations.js` caps charts at `TOP_TOPICS_LIMIT = 100` topics (sorted by total desc). Chrome's max canvas width is 32,767px; at 48px/bar, exceeding ~682 bars silently breaks the canvas. 100 is a safe, readable default.
- **Git remotes**: `origin` = old/clean repo (`rvoronevska-sbt/zd-extr-fe`), `new-origin` = active development repo. Always push to `new-origin`.
