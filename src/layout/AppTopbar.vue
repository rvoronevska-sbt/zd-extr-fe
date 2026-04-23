<script setup>
import Logo from '@/components/Logo.vue';
import { useLayout } from '@/layout/composables/layout';
import { useAuthStore } from '@/stores/auth';
import Button from 'primevue/button';

const { toggleDarkMode, isDarkTheme } = useLayout();
const authStore = useAuthStore();

function handleLogout() {
    authStore.logout();
    // Hard reload instead of `router.replace` so ticketDataStore / tableStore
    // and every cached piece of app state is thrown out. A pure SPA navigation
    // would let the next user (on a shared machine) briefly see the previous
    // user's tickets before the core-aggregation fetch lands.
    window.location.href = `${import.meta.env.BASE_URL}login`;
}
</script>

<template>
    <header class="layout-topbar backdrop-blur-2xl">
        <div class="layout-topbar-logo-container">
            <Logo />
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu flex items-center gap-4">
                <button id="mode-toggle-button" aria-label="Toggle dark/light mode" type="button" class="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors" @click="toggleDarkMode">
                    <i :class="['pi text-xl', isDarkTheme ? 'pi-moon' : 'pi-sun']"></i>
                </button>

                <Button
                    id="logout-button"
                    label="Log out"
                    icon="pi pi-sign-out"
                    class="p-button-danger p-button-rounded p-button-raised"
                    @click="handleLogout"
                    severity="danger"
                    :loading="authStore.isLoading"
                />
            </div>
        </div>
    </header>
</template>
