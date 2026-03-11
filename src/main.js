import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import { useAuthStore } from '@/stores/auth';

import '@/assets/tailwind.css';
import '@/assets/styles.scss';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    },
    locale: {
        matchAll: 'Match All (AND)', // instead of "Match All"
        matchAny: 'Match Any (OR)' // instead of "Match Any"
        // addRule: 'Add another condition',
        // removeRule: 'Remove condition',
        // clear: 'Reset',
        // apply: 'Filter'
    }
});

app.use(ToastService);
app.use(ConfirmationService);

const authStore = useAuthStore();
authStore.initializeAuth();

app.mount('#app');
