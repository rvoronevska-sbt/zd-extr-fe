const DB_NAME = 'zd-extr-cache';
const STORE_NAME = 'tickets';
const DB_VERSION = 1;
const CACHE_KEY = 'all-tickets';

export const CACHE_MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

let dbPromise = null;

function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'key' });
            }
        };
        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror = (e) => {
            dbPromise = null;
            reject(e.target.error);
        };
    });
    return dbPromise;
}

const IDB_TIMEOUT_MS = 5000;

function withTimeout(promise, ms = IDB_TIMEOUT_MS) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(`IDB operation timed out after ${ms}ms`)), ms))
    ]);
}

export async function getCachedTickets() {
    const db = await withTimeout(openDb());
    return withTimeout(new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const req = tx.objectStore(STORE_NAME).get(CACHE_KEY);
        req.onsuccess = () => resolve(req.result ?? null);
        req.onerror = () => reject(req.error);
    }));
}

export async function setCachedTickets(data) {
    const db = await withTimeout(openDb());
    return withTimeout(new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const req = tx.objectStore(STORE_NAME).put({ key: CACHE_KEY, data, timestamp: Date.now() });
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    }));
}

export function isCacheStale(cached, maxAgeMs = CACHE_MAX_AGE_MS) {
    if (!cached?.timestamp) return true;
    return Date.now() - cached.timestamp > maxAgeMs;
}

export async function clearTicketCache() {
    const db = await withTimeout(openDb());
    return withTimeout(new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const req = tx.objectStore(STORE_NAME).delete(CACHE_KEY);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    }));
}
