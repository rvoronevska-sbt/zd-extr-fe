import axios from 'axios';
import { logger } from '@/utils/logger';

// Shared axios instance used by every API call (auth + ticket endpoints).
// The dev Vite proxy forwards /api/* to VITE_API_URL.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    timeout: 10000,
    paramsSerializer: {
        // Serialize arrays as repeated params: topic=X&topic=Y (not topic[]=X)
        indexes: null
    }
});

let _authStore = null;
const getAuthStore = async () => {
    if (!_authStore) {
        const { useAuthStore } = await import('@/stores/auth');
        _authStore = useAuthStore();
    }
    return _authStore;
};

// Single in-flight refresh promise — concurrent 401s all await the same
// refresh so we don't burn through the rotating refresh token. Cleared in
// `.finally` so the next 401 after a completed refresh can start a new one.
let _refreshPromise = null;

// Endpoints the interceptor must NEVER retry. `/api/token/` returning 401
// means bad credentials (not a refresh opportunity); `/api/token/refresh/`
// returning 401 means the refresh token itself is expired/invalid.
function isAuthEndpoint(url) {
    if (!url) return false;
    return url.endsWith('/api/token/') || url.endsWith('/api/token/refresh/');
}

// JWT access tokens expire after ~30 min. When the backend returns 401 on a
// protected endpoint, call /api/token/refresh/ once, then replay the original
// request with the new access token. If refresh itself fails, clear auth
// state and bounce the user back to /login.
//
// `_retry` flag prevents infinite loops — a request that already had its
// access token refreshed once and STILL 401s is a hard error.
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        const url = config?.url || '';

        if (error.response?.status !== 401 || isAuthEndpoint(url) || config?._retry) {
            return Promise.reject(error);
        }

        const authStore = await getAuthStore();
        if (!authStore.isAuthenticated || !authStore.hasRefreshToken()) {
            // No refresh token on hand — treat as a hard auth failure.
            return Promise.reject(error);
        }

        try {
            if (!_refreshPromise) {
                _refreshPromise = authStore.refresh().finally(() => {
                    _refreshPromise = null;
                });
            }
            await _refreshPromise;

            // Replay the original request with the fresh Bearer token.
            config._retry = true;
            config.headers = config.headers || {};
            config.headers['Authorization'] = api.defaults.headers.common['Authorization'];
            return api(config);
        } catch (refreshErr) {
            // Only force re-login on terminal auth failures. Transient errors
            // (5xx, network blip, CORS flake) bubble up and the next 401 will
            // kick off a fresh refresh attempt — otherwise a bad-network
            // moment kicks the user out of a still-valid session.
            const status = refreshErr?.response?.status;
            if (status === 401 || status === 403) {
                logger.warn('Refresh token rejected — forcing re-login:', refreshErr?.message || refreshErr);
                authStore.logout();
                window.location.href = `${import.meta.env.BASE_URL}login`;
            } else {
                logger.warn('Refresh failed with non-auth error — keeping session:', refreshErr?.message || refreshErr);
            }
            return Promise.reject(error);
        }
    }
);

export default api;
