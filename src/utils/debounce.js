import { logger } from '@/utils/logger';

/**
 * Creates a debounced version of the given function.
 * The returned function also exposes a `.cancel()` method to clear any pending invocation
 * (useful for cleanup in onUnmounted hooks).
 *
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Debounce delay in milliseconds
 * @returns {Function} Debounced function with `.cancel()` method
 */
export const debounce = (fn, delay) => {
    let timer = null;
    const debounced = (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            Promise.resolve(fn(...args)).catch((err) => logger.error('Debounced function error:', err));
        }, delay);
    };
    debounced.cancel = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };
    return debounced;
};
