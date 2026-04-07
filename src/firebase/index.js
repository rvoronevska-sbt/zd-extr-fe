import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const REQUIRED_ENV_VARS = ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_PROJECT_ID'];
const missing = REQUIRED_ENV_VARS.filter((key) => !import.meta.env[key]);
if (missing.length) {
    console.error(`[Firebase] Missing required env vars: ${missing.join(', ')} — check your .env file`);
}

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize the Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app); // <--- Add this line to get the Firestore instance

// Redirect to login if Firestore returns 400 (session invalidated, e.g. cleared IndexedDB)
// Firestore's channel listener uses XHR long-polling, not fetch
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    this.addEventListener('load', async function () {
        if (this.status === 400 && typeof url === 'string' && url.includes('firestore.googleapis.com')) {
            const { useAuthStore } = await import('@/stores/auth');
            const authStore = useAuthStore();
            if (authStore.isAuthenticated) {
                authStore.user = null;
                authStore.role = null;
                window.location.href = `${import.meta.env.BASE_URL}login`;
            }
        }
    });
    return originalXHROpen.call(this, method, url, ...rest);
};
