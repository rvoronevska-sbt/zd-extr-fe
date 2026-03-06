import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? 'localhost' : '/',

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
        visualizer({
            open: true,
            filename: './dist/stats.html',
            gzipSize: true,
            template: 'treemap',
            emitFile: false
        })
    ],

    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return;

                    if (id.includes('vue') || id.includes('@vue') || id.includes('pinia') || id.includes('vue-router')) {
                        return 'framework';
                    }

                    if (id.includes('primevue') || id.includes('primeicons')) {
                        return 'primevue';
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
            '/api': {
                target: 'http://56.228.5.130',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
});
