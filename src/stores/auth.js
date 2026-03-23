// useAuthStore.js
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// Cache for the auth instance (closure variable – lives as long as the store)
let cachedAuth = null;
// Store unsubscribe function to clean up listener
let unsubscribeAuth = null;

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null); // { uid, email, displayName }
    const role = ref(null); // Single role string from Firestore (e.g. 'viewer', 'admin')
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

    // Fetch user data (role, displayName) from Firestore users/{uid} document
    async function fetchUserData(uid) {
        if (!uid) return { role: null, displayName: null };
        try {
            const { doc, getDoc } = await import('firebase/firestore');
            const { db: importedDb } = await import('@/firebase');

            const userDocRef = doc(importedDb, 'users', uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const data = userDoc.data();
                return { role: data.role || null, displayName: data.displayName || null };
            }
            return { role: null, displayName: null };
        } catch (err) {
            console.error('Error fetching user data:', err);
            return { role: null, displayName: null };
        }
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

        const fbUser = credential.user;
        if (fbUser) {
            const userData = await fetchUserData(fbUser.uid);
            user.value = {
                uid: fbUser.uid,
                email: fbUser.email,
                displayName: userData.displayName || fbUser.displayName || email.split('@')[0]
            };
            role.value = userData.role;
        }
    }

    // Placeholder – ready for Django JWT
    async function loginDjango(email, password) {
        const api = (await import('@/services/authApi')).default;
        const res = await api.post('/api/token/', { email, password });

        // Django will return access token + set HttpOnly refresh cookie
        user.value = res.data.user || { email };
        // If Django also provides roles, you'd set them here
        // roles.value = res.data.roles || [];
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
            const api = (await import('@/services/authApi')).default;
            await api.post('/api/logout/', {}, { withCredentials: true });
        }

        user.value = null;
        role.value = null;
        error.value = null;
    }

    // ====================== INITIALIZE ======================
    function initializeAuth() {
        isLoading.value = true;
        role.value = null;

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

                    let isInitialCheck = true;

                    // Re-validate auth when user returns to the tab
                    // (catches cleared IndexedDB, expired tokens, etc.)
                    document.addEventListener('visibilitychange', async () => {
                        if (document.visibilityState === 'visible' && user.value) {
                            try {
                                await auth.currentUser?.reload();
                            } catch {
                                user.value = null;
                                role.value = null;
                                window.location.href = `${import.meta.env.BASE_URL}login`;
                            }
                        }
                    });

                    // Set up listener and store unsubscribe function for cleanup
                    unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
                        if (fbUser) {
                            const userData = await fetchUserData(fbUser.uid);
                            user.value = {
                                uid: fbUser.uid,
                                email: fbUser.email,
                                displayName: userData.displayName || fbUser.displayName
                            };
                            role.value = userData.role;
                        } else {
                            const wasLoggedIn = !!user.value;
                            user.value = null;
                            role.value = null;

                            // Redirect to login if session was lost (e.g. cache cleared)
                            // but not on the initial auth check (page load)
                            if (!isInitialCheck && wasLoggedIn) {
                                window.location.href = `${import.meta.env.BASE_URL}login`;
                            }
                        }
                        isLoading.value = false;
                        isInitialCheck = false;
                    });
                })
                .catch((err) => {
                    console.error('Auth initialization failed:', err);
                    isLoading.value = false;
                    role.value = null;
                });
        } else {
            isLoading.value = false; // Django will check /api/me/ later
        }
    }

    const hasRole = (roleToCheck) => role.value === roleToCheck;

    return {
        user,
        role,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        initializeAuth,
        hasRole
    };
});
