import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// Cache for the auth instance (closure variable – lives as long as the store)
let cachedAuth = null;
// Store unsubscribe function to clean up listener
let unsubscribeAuth = null;

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null); // { uid, email, displayName, role? }
    const isLoading = ref(true);
    const error = ref(null);

    const isAuthenticated = computed(() => !!user.value);

    const isFirebase = import.meta.env.VITE_USE_FIREBASE === 'true';

    // ====================== HELPERS ======================

    // Lazy-load and cache Firebase auth instance
    async function getFirebaseAuth() {
        if (cachedAuth) return cachedAuth;

        // Import modules only when needed
        const { getAuth } = await import('firebase/auth');
        const { auth: importedAuth } = await import('@/firebase');

        // Use the already initialized auth from your firebase.js
        // (assuming firebase.js exports 'auth' after initializeApp)
        cachedAuth = importedAuth || getAuth(); // fallback if not exported

        return cachedAuth;
    }

    // ====================== LOGIN ======================
    async function login(email, password) {
        error.value = null;
        isLoading.value = true;

        try {
            if (isFirebase) {
                await loginFirebase(email, password);
            } else {
                await loginDjango(email, password); // ← future implementation
            }
            return { success: true };
        } catch (err) {
            error.value = err.message || 'Login failed';
            throw err; // let Login.vue decide redirect
        } finally {
            isLoading.value = false;
        }
    }

    async function loginFirebase(email, password) {
        const auth = await getFirebaseAuth();
        const { signInWithEmailAndPassword } = await import('firebase/auth');

        const credential = await signInWithEmailAndPassword(auth, email, password);

        user.value = {
            uid: credential.user.uid,
            email: credential.user.email,
            displayName: credential.user.displayName || email.split('@')[0]
        };
    }

    // Placeholder – ready for Django JWT
    async function loginDjango(email, password) {
        const api = (await import('@/services/api')).default;
        const res = await api.post('/api/token/', { email, password });

        // Django will return access token + set HttpOnly refresh cookie
        user.value = res.data.user || { email };
    }

    // ====================== LOGOUT ======================
    async function logout() {
        // Clean up Firebase listener before logout
        if (isFirebase && unsubscribeAuth) {
            unsubscribeAuth();
            unsubscribeAuth = null;
        }

        if (isFirebase) {
            const auth = await getFirebaseAuth();
            const { signOut } = await import('firebase/auth');
            await signOut(auth);
        } else {
            // Django: clear HttpOnly refresh cookie
            const api = (await import('@/services/api')).default;
            await api.post('/api/logout/', {}, { withCredentials: true });
        }

        user.value = null;
        error.value = null;
    }

    // ====================== INITIALIZE ======================
    function initializeAuth() {
        isLoading.value = true;

        if (isFirebase) {
            // Fully lazy listener setup
            Promise.all([
                import('firebase/auth'),
                getFirebaseAuth() // initializes/caches auth when needed
            ])
                .then(([{ onAuthStateChanged }, auth]) => {
                    // Clean up previous listener if one exists
                    if (unsubscribeAuth) {
                        unsubscribeAuth();
                    }

                    // Set up listener and store unsubscribe function for cleanup
                    unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
                        user.value = fbUser
                            ? {
                                  uid: fbUser.uid,
                                  email: fbUser.email,
                                  displayName: fbUser.displayName
                              }
                            : null;
                        isLoading.value = false;
                    });
                })
                .catch((err) => {
                    console.error('Auth initialization failed:', err);
                    isLoading.value = false;
                });
        } else {
            isLoading.value = false; // Django will check /api/me/ later
        }
    }

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        initializeAuth
    };
});
