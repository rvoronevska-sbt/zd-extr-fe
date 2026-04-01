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

1. **Client-side filtering only** — All ticket data is fetched once on load. Every filter change operates on the local dataset; no API calls are made per filter.

2. **Pinia `ticketDataStore` in `stores/ticketData.js`** — A setup-style Pinia store that manages ticket data fetching, IDB caching, and batched normalization. `lazyInit()` fires exactly once per session. IDB cache stores **processed** data (not raw), so cache hits skip `processRecords` entirely and assign directly to `fullProcessedTickets` (only `Date` objects need restoring since IDB serializes them to strings). Fresh API fetch only on a cold first visit or stale cache (>1 hour). `fullProcessedTickets` uses `shallowRef` to avoid deep-reactivity overhead on 30k+ row arrays.

3. **Batched `processRecords` to prevent main-thread blocking** — 30k tickets are processed in batches of 150. Between batches, `scheduler.yield()` (Chrome 129+) or `setTimeout(0)` hands control back to the browser, keeping each task under the 50ms long-task threshold and reducing Lighthouse TBT to near-zero.

4. **Lazy route loading + async components** — All 4 routes use `() => import(...)`. `TableDoc`, `VipTableDoc`, and `ChartDoc` use `defineAsyncComponent()`. This eliminates unused-JS on the login page and defers heavy component parsing until the home route is active.

5. **Pinia `tableStore` as the data bridge** — `TableDoc.vue` writes its filtered results to `tableStore.filteredTickets` via `setFilteredTickets()`. `ChartDoc.vue` reads memoized chart aggregations (`topicStats`, `chartLabels`, etc.) from the same store. `VipTableDoc.vue` reads `filteredTickets` directly. No prop drilling. `filteredTickets` uses `shallowRef` to avoid deep-reactivity overhead.

6. **Faceted filter options via `useFacetedFilterOptions`** — Each multiselect dropdown only shows values present in the currently filtered dataset. `baseFilterParams` holds non-multiselect filters (text, date, single-select); `activeMultiselects` holds array filters. Each `available*` computed excludes its own field and applies all others, so selecting brand X only shows topics that exist within brand X.

7. **Firebase is primary auth with Firestore RBAC** — `VITE_USE_FIREBASE=true` in `.env`. Firebase Auth handles login; Firestore `users/{uid}` stores `role` and `displayName`. Auth store fetches user data from Firestore after login and on `onAuthStateChanged`. `hasRole()` is a plain function (not computed) for role checks. Django JWT auth (`authApi.js`) is implemented but secondary. Route guards await `initializeAuth()` before every navigation. See `FIREBASE+FIRESTORE.md` for full setup guide.

8. **Mock data fallback** — Set `VITE_USE_MOCK_DATA=true` in `.env` (comment out the line to disable) to load `src/services/mock-ticket-summaries.json` instead of hitting the API.

9. **Code splitting** — Vite manual chunks: `framework` (vue/pinia/vue-router), `primevue-theme` (Aura preset), `primevue-config` (config/services), `primevue` (components), `firebase`, `charts`, `vendor`. Combined with lazy routes and async components this produces an optimal loading cascade.

10. **PrimeIcons hosted locally** — Font files committed to `public/fonts/primeicons/`, frozen from npm updates. Vite plugin `primeicons-local-fonts` rewrites CSS `url()` references and strips font files from `dist/assets/` at build time. A `@font-face` rule in `styles.scss` sets `font-display: swap` to prevent FOIT (flash of invisible text).

11. **Static HTML shell + dark-mode restore in `index.html`** — A lightweight header + "Loading..." message renders instantly from raw HTML before any JS loads. An inline `<script>` in `<head>` reads `localStorage('app-dark-mode')` and adds `.app-dark` to `<html>` before first paint, preventing a white flash for dark-mode users. The shell uses CSS variable fallbacks (`var(--surface-card, #fff)`) so it inherits the correct theme once CSS loads. Vue replaces the shell on mount.

12. **Single-pass filter loop in `applyTicketFilters`** — Instead of chained `.filter()` calls (one per filter), a single `for` loop with early-exit `continue` avoids intermediate array allocations. Filter values are pre-computed outside the loop (Sets for multiselects, lowercased strings for text) so each iteration is a cheap comparison chain.

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
│   ├── useFacetedFilterOptions.js     # Cascading multiselect options derived from active filters
│   ├── useCSVExport.js                # CSV generation with >10k row / >2 MB warnings
│   ├── useChartAggregations.js        # Top-N topic chart data (sliced from tableStore, capped at 100 topics)
│   ├── useVipAggregation.js           # VIP table date range + per-segment CSAT aggregation
│   └── useStatsAggregation.js         # Single-pass stats widget ticket aggregation
├── services/
│   ├── authApi.js                     # Axios instance with auto-refresh on 401
│   ├── ticketCache.js                 # IndexedDB cache: get/set/isCacheStale (1-hour TTL)
│   ├── TicketService.js               # Ticket fetch (live API or mock)
│   └── mock-ticket-summaries.json
├── utils/
│   ├── ticketFilters.js               # applyTicketFilters() — single source of truth for all filter logic
│   ├── normalization.js               # emptyToNone(), normalizeTranscript()
│   ├── stringUtils.js                 # cleanAndFormatString(), formatDate()
│   └── dateUtils.js                   # formatDate() helper
├── config/
│   └── enums.js                       # VIP_TIERS, VIP_SEGMENT_ORDER, CSAT_OPTIONS, SENTIMENT_OPTIONS, NEGATIVE_SENTIMENTS
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

## Filter Architecture

### Filter types in `ticketFilters.js` (`applyTicketFilters`)

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

### Faceted options (`useFacetedFilterOptions`)

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
2. Add the param to `filteredTickets` computed (pass it to `applyTicketFilters`)
3. Add the filter logic to `applyTicketFilters` in `src/utils/ticketFilters.js`
4. **Multiselect**: add to `activeMultiselects` + `facetedOptions(...)` computed in `useFacetedFilterOptions.js`; use `MultiSelect` in the column filter slot
5. **Text/date/single-select**: add to `baseFilterParams` in `useFacetedFilterOptions.js` only; use `InputText` / `DatePicker` / `Select` in the column filter slot
6. Add the `<Column>` with `:filterField` and `#filter` slot in the `<DataTable>`
7. Filtered results auto-sync to `tableStore` — charts and stats update automatically

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
- `useTicketDataStore().lazyInit()` fires once. If data seems stale, clear IDB (`clearTicketCache()` in `ticketCache.js`) or hard-refresh (Ctrl+Shift+R) in dev
- IDB cache TTL is 1 hour (`CACHE_MAX_AGE_MS` in `ticketCache.js`). Stale cache triggers a silent background refresh — UI still renders immediately from the old data
- Switch to mock data: uncomment `VITE_USE_MOCK_DATA=true` in `.env`, restart dev server
- Check browser Network tab for failed requests; `fetchError` ref in `useTicketDataStore` stores error state
- `processRecords` is now async (batched). `isLoading` stays `true` while batches run — do not check for data until `isLoading` is false

### Filters not working
- Verify the filter param is passed to `applyTicketFilters` in `filteredTickets` computed (TableDoc.vue)
- Verify the filter logic exists in `ticketFilters.js` `applyTicketFilters`
- Multiselect filters use `FilterService.register('containsAny', ...)` — confirm registration runs before DataTable mounts
- Faceted options: check whether the field is in `baseFilterParams` or `activeMultiselects` — wrong bucket means it won't narrow the facet correctly
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
- Django JWT: `authApi.js` interceptor auto-retries on 401. If looping, check `/api/auth/refresh/` endpoint
- Firebase errors: verify all `VITE_FIREBASE_*` env vars match the Firebase console project settings
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
| `VITE_USE_MOCK_DATA` | `true` to load local mock JSON instead of API (comment out to disable) |
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
- **`processRecords` is async** — it yields between batches. Any code that depends on `fullProcessedTickets` must wait for `isLoading` to become false, not run immediately after `lazyInit()`.
- **Named constants over magic numbers** — e.g. `PAGE_SIZE_DEFAULT = 5`, `FILTER_DEBOUNCE_MS = 300`, `CSAT_HIGH_THRESHOLD = 80`, `CSV_ROW_WARN_THRESHOLD = 10_000`, `PROCESS_BATCH_SIZE = 150`.
- **No virtual scrolling on DataTable** — lazy pagination (5 rows default, `PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100]`) is used instead. The DataTable uses `lazy=true` with `onPage`/`onFilter` events and a `paginatedTickets` computed that slices from `filteredTickets`. Do not add `virtualScrollerOptions`; it's unnecessary overhead with paginated data.
- **Data is already normalized** by `processRecords` — no need for defensive `|| 'none'` / `|| 'No Data'` checks downstream in composables or CSV export.
- **`topic` is a multiselect filter** — its value is `string[]`, not `string|null`. It lives in `activeMultiselects` in `useFacetedFilterOptions` (with faceted `availableTopics`), and uses Set-based exact matching in `applyTicketFilters`.
- **`!important` inside CSS `var()` is invalid** — silently ignored by browsers. Override PrimeVue tokens by redefining the CSS variable, not with `!important` inside the value.
- **Chart topic limit** — `useChartAggregations.js` caps charts at `TOP_TOPICS_LIMIT = 100` topics (sorted by total desc). Chrome's max canvas width is 32,767px; at 48px/bar, exceeding ~682 bars silently breaks the canvas. 100 is a safe, readable default.
- **Git remotes**: `origin` = old/clean repo (`rvoronevska-sbt/zd-extr-fe`), `new-origin` = active development repo. Always push to `new-origin`.
