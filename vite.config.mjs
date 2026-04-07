import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    // base: process.env.NODE_ENV === 'production' ? 'localhost' : '/',
    base: '/zd-extr-fe/', // Uncomment and set this if deploying to a subdirectory (e.g., GitHub Pages)

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    },

    plugins: [
        vue(),
        tailwindcss(),
        Components({
            resolvers: [PrimeVueResolver()]
        }),
        // Replace mock JSON with empty array in production — prevents 973 kB dead chunk in dist/
        {
            name: 'exclude-mock-data',
            enforce: 'pre',
            resolveId(source) {
                if (source.includes('mocked-ticket-summaries') && !this.meta.watchMode) {
                    return '\0mock-empty';
                }
            },
            load(id) {
                if (id === '\0mock-empty') return 'export default []';
            }
        },
        {
            // Rewrite primeicons font URLs in the final CSS output to point to public/fonts/primeicons/.
            // Vite's asset pipeline hashes and resolves url() paths before plugin transforms can intercept
            // them (even with enforce:'pre'), so we rewrite in generateBundle after all processing is done.
            name: 'primeicons-local-fonts',
            enforce: 'post',
            generateBundle(_, bundle) {
                const hashedFontRE = /primeicons[^/]*\.(eot|svg|ttf|woff2?)$/;
                // Map hashed filenames back to original names (e.g. primeicons-C6QP2o4f.woff2 → primeicons.woff2)
                const hashToOriginal = {};
                for (const key of Object.keys(bundle)) {
                    if (hashedFontRE.test(key)) {
                        const ext = key.match(/\.(eot|svg|ttf|woff2?)$/)[0];
                        hashToOriginal[key.split('/').pop()] = `primeicons${ext}`;
                        delete bundle[key];
                    }
                }
                // Rewrite CSS url() references from hashed assets to /zd-extr-fe/fonts/primeicons/
                for (const key of Object.keys(bundle)) {
                    if (bundle[key].type === 'asset' && key.endsWith('.css')) {
                        let css = bundle[key].source;
                        for (const [hashed, original] of Object.entries(hashToOriginal)) {
                            css = css.replaceAll(hashed, `../fonts/primeicons/${original}`);
                        }
                        bundle[key].source = css;
                    }
                }
            }
        }
    ],

    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return;

                    // Aura theme preset — large (~200 KB), loaded async via dynamic import in main.js
                    if (id.includes('@primeuix')) {
                        return 'primevue-theme';
                    }

                    // PrimeVue config/services — tiny, loaded async alongside theme
                    if (id.includes('primevue/config') || id.includes('primevue/confirmationservice') || id.includes('primevue/toastservice')) {
                        return 'primevue-config';
                    }

                    // PrimeVue MUST be checked before 'vue' — 'primevue' contains 'vue'
                    // Component library loads lazily via route components
                    if (id.includes('primevue') || id.includes('primeicons') || id.includes('@primevue')) {
                        return 'primevue';
                    }

                    if (id.includes('vue') || id.includes('@vue') || id.includes('pinia') || id.includes('vue-router')) {
                        return 'framework';
                    }

                    if (id.includes('firebase')) {
                        return 'firebase';
                    }

                    if (id.includes('chart.js') || id.includes('recharts')) {
                        return 'charts';
                    }

                    return 'vendor';
                }
            }
        },
        minify: 'esbuild'
    },

    server: {
        proxy: {
            // Dev-only proxy — set VITE_API_URL in .env to override the default backend
            '/api': {
                target: process.env.VITE_API_URL || 'http://56.228.5.130',
                changeOrigin: true
            }
        }
    }
});
