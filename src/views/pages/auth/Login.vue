<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import Logo from '@/components/Logo.vue';
import { useAuthStore } from '@/stores/auth';
import { safeRedirectPath } from '@/utils/safeRedirect';
import { nextTick, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const username = ref('');
const password = ref('');
const passwordRef = ref(null);
const formError = ref(''); // local error message (clears on input change)
const shake = ref(false); // subtle shake animation on failure

watch([username, password], () => {
    formError.value = '';
    authStore.clearError();
});

onMounted(async () => {
    await nextTick();

    // PrimeVue's Password component emits menu-trigger ARIA even when
    // `:feedback="false"` and the popup never renders. Strip only what's
    // actually there so we no-op cleanly if PrimeVue changes the behavior.
    const input = passwordRef.value?.$el.querySelector('input.p-password-input');
    if (!input) return;
    if (input.hasAttribute('aria-expanded')) input.removeAttribute('aria-expanded');
    if (input.hasAttribute('aria-haspopup')) input.removeAttribute('aria-haspopup');
    const controls = input.getAttribute('aria-controls');
    if (controls && !document.getElementById(controls)) input.removeAttribute('aria-controls');
});

async function handleLogin() {
    formError.value = '';
    authStore.clearError();

    try {
        const result = await authStore.login(username.value, password.value);

        if (result.success) {
            // Success → redirect (validated to block open-redirect phishing)
            router.replace(safeRedirectPath(route.query.redirect));
        }
    } catch (err) {
        // Failure → show error message + shake effect
        formError.value = authStore.error || err.message || 'Invalid username or password';
        shake.value = true;

        // Remove shake after animation
        setTimeout(() => {
            shake.value = false;
        }, 600);
    }
}
</script>

<template>
    <main>
        <FloatingConfigurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div class="rounded-[56px] p-[0.3rem] bg-[linear-gradient(180deg,var(--primary-color)_10%,var(--app-btn-outlined-border)_30%)]">
                    <div class="rounded-[53px] w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20">
                        <div class="text-center mb-8">
                            <Logo class="mx-auto mb-8" />
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Zendesk Extractor FE!</div>
                            <span class="text-muted-color font-medium">Sign in to continue</span>
                        </div>

                        <form @submit.prevent="handleLogin" v-if="!authStore.isLoading" class="space-y-6">
                            <!-- Username -->
                            <div>
                                <label for="username1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"> Username </label>
                                <InputText id="username1" type="text" placeholder="Username" class="w-full md:w-[30rem]" v-model="username" autocomplete="username" required autofocus />
                            </div>

                            <!-- Password -->
                            <div>
                                <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"> Password </label>
                                <Password id="password1" ref="passwordRef" v-model="password" placeholder="Password" :toggleMask="true" class="w-full md:w-[30rem]" fluid :feedback="false" required autocomplete="current-password" />
                            </div>

                            <!-- Error Message -->
                            <div v-if="formError" class="text-red-600 dark:text-red-400 text-center font-medium animate-shake">
                                {{ formError }}
                            </div>

                            <!-- Submit Button -->
                            <Button type="submit" label="Sign In" class="w-full" :loading="authStore.isLoading" :disabled="authStore.isLoading || !username || !password" />
                        </form>

                        <!-- Loading state overlay -->
                        <div v-if="authStore.isLoading" class="text-center mt-8 text-surface-500">Checking authentication...</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
@keyframes shake {
    0%,
    100% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-6px);
    }
    50% {
        transform: translateX(6px);
    }
    75% {
        transform: translateX(-6px);
    }
}

.animate-shake {
    animation: shake 0.6s ease-in-out;
}
</style>
