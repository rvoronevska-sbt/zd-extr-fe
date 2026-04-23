import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';

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
    }
});

const authStore = useAuthStore();
authStore.initializeAuth();

app.mount('#app');
