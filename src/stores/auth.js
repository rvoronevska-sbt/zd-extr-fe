import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import api from '@/services/authApi';

const TOKEN_ENDPOINT = '/api/token/';
const TOKEN_REFRESH_ENDPOINT = '/api/token/refresh/';

export const useAuthStore = defineStore('auth', () => {
    // Access + refresh tokens live in closure scope — NOT returned from the
    // store and NOT reactive refs. Keeps them out of Vue DevTools' reactive
    // graph and out of any accidental serialization (HMR, SSR). `username`
    // is whatever the user typed at login — the /api/token/ response carries
    // no user object, so it's all we have.
    //
    // Threat-model note: this is NOT XSS-proof. During an active session the
    // tokens still live here and on `api.defaults.headers.common.Authorization`,
    // and any XSS running in the tab can read both. What this buys us is
    // reduced surface area — DevTools no longer prints tokens on every state
    // snapshot — plus the existing refresh-clears-state behavior.
    let _access = null;
    let _refresh = null;
    let _username = null;
    const _authVersion = ref(0);

    const isLoading = ref(false);
    const error = ref(null);

    const isAuthenticated = computed(() => {
        _authVersion.value; // subscribe
        return _access !== null;
    });
    const username = computed(() => {
        _authVersion.value;
        return _username;
    });

    function setAuthHeader(access) {
        if (access) api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        else delete api.defaults.headers.common['Authorization'];
    }

    function applyTokens(access, refresh, usernameValue) {
        _access = access;
        _refresh = refresh;
        if (usernameValue !== undefined) _username = usernameValue;
        _authVersion.value++;
    }

    /** Boolean probe for the interceptor — lets it decide whether a refresh
     *  attempt is worth making WITHOUT exposing the token itself. Closure
     *  scoping would be pointless if we handed the value back out. */
    function hasRefreshToken() {
        return _refresh !== null;
    }

    async function login(usernameInput, password) {
        error.value = null;
        isLoading.value = true;
        try {
            const res = await api.post(TOKEN_ENDPOINT, { username: usernameInput, password });
            const data = res?.data;
            if (!data?.access || !data?.refresh) {
                throw new Error('Malformed login response');
            }
            applyTokens(data.access, data.refresh, usernameInput);
            setAuthHeader(data.access);
            return { success: true };
        } catch (err) {
            const data = err.response?.data;
            error.value = data?.detail || data?.non_field_errors?.[0] || err.message || 'Login failed';
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    /** Invoked by the authApi 401 interceptor. Rotates tokens per the spec
     *  (refresh response contains BOTH a new access and a new refresh). */
    async function refresh() {
        if (!_refresh) throw new Error('No refresh token available');
        const res = await api.post(TOKEN_REFRESH_ENDPOINT, { refresh: _refresh });
        const data = res?.data;
        if (!data?.access) {
            throw new Error('Malformed refresh response');
        }
        // Rotating refresh tokens — keep the old one if the backend didn't
        // rotate (defensive; the reference backend does rotate).
        applyTokens(data.access, data.refresh ?? _refresh);
        setAuthHeader(data.access);
        return data.access;
    }

    /** JWT is stateless — there's no server-side logout endpoint in the spec.
     *  Just clear local state. Tokens remain server-valid for their natural
     *  lifetime (30 min access / 7 days refresh). */
    function logout() {
        setAuthHeader(null);
        applyTokens(null, null, null);
        error.value = null;
    }

    function initializeAuth() {
        // Nothing to restore — tokens are in-memory only. On every fresh page
        // load the user starts unauthenticated and will be routed to /login.
        isLoading.value = false;
    }

    /** Clear the last login error — exposed so components don't have to
     *  reach in and mutate `error` directly from the outside. */
    function clearError() {
        error.value = null;
    }

    return {
        isLoading,
        error,
        isAuthenticated,
        username,
        login,
        logout,
        refresh,
        initializeAuth,
        clearError,
        hasRefreshToken
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
