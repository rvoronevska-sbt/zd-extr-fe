import { computed, reactive } from 'vue';

const storedDark = localStorage.getItem('app-dark-mode') === 'true';

const layoutConfig = reactive({
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    darkTheme: storedDark
});

// Initialize DOM class on load to match persisted preference
if (storedDark) {
    document.documentElement.classList.add('app-dark');
}

export function useLayout() {
    const toggleDarkMode = () => {
        if (!document.startViewTransition) {
            executeDarkModeToggle();
            return;
        }

        document.startViewTransition(() => executeDarkModeToggle());
    };

    const executeDarkModeToggle = () => {
        layoutConfig.darkTheme = !layoutConfig.darkTheme;
        document.documentElement.classList.toggle('app-dark');
        localStorage.setItem('app-dark-mode', layoutConfig.darkTheme);
    };

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    return {
        layoutConfig,
        isDarkTheme,
        toggleDarkMode
    };
}
