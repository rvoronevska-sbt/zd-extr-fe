import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/pages/auth/Login.vue'),
        meta: { requiresGuest: true, hideNavbar: true }
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('@/views/pages/auth/Error.vue'),
        meta: { hideNavbar: true }
    },
    {
        path: '/access-denied',
        name: 'access-denied',
        component: () => import('@/views/pages/auth/Access.vue'),
        meta: { hideNavbar: true }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior: () => ({ top: 0 })
});

router.beforeEach(async (to) => {
    const authStore = useAuthStore();

    if (authStore.isLoading) {
        await new Promise((resolve) => {
            if (!authStore.isLoading) return resolve();
            const unwatch = authStore.$subscribe(() => {
                if (!authStore.isLoading) {
                    unwatch();
                    resolve();
                }
            });
            // Re-check after subscribe in case state changed between check and subscribe
            if (!authStore.isLoading) {
                unwatch();
                resolve();
            }
        });
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return { name: 'login', query: to.path !== '/' ? { redirect: to.fullPath } : {} };
    }

    if (to.meta.requiresGuest && authStore.isAuthenticated) {
        return { name: 'home' };
    }

    return true;
});

export default router;
