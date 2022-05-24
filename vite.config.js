import {svelte} from '@sveltejs/vite-plugin-svelte';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [svelte()],
    build: {
        assetsDir: 'static',
        chunkSizeWarningLimit: 1000000,
        cssCodeSplit: true,
        minify: true,
    },
    base: '/',
    envPrefix: 'VITE_',
    logLevel: 'info',
    mode: 'development',
    publicDir: 'public',
    worker: {
        format: 'es',
    },

    server: {
        base: './',
        hmr: true,
        port: 8000,
        open: false,
        cors: true,
        middlewareMode: 'html',
    },
});
