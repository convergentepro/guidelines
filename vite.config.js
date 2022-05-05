import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    // Plugins sections: Svelte works:
    plugins: [],

    // Dev Server Configurations:
    server: {
        port: 3000,
        host: 'localhost',
        cors: true,
        hmr: true,
        base: '/',
        open: true,
    },
    build: {
        sourcemap: true,
        dynamicImportVarsOptions: {
            warnOnError: true,
        },
        minify: true,
        outDir: './public',
        emptyOutDir: true,
        assetsInlineLimit: 1000,
        assetsDir: 'assets',
        cssCodeSplit: true,
        chunkSizeWarningLimit: 1000000,
        rollupOptions: {
            external: ['svelte', 'path', 'node-fetch', '@babel/runtime'],
        },
    },
    css: {
        devSourcemap: true,
        postcss: {
            plugins: [autoprefixer()],
        },
        preprocessorOptions: {
            scss: {
                includePaths: ['/src/scss/**/*.scss'],
                exclude: ['node_modules'],
            },
            typescript: {
                transpileOnly: true,
            },
        },
    },
    // Production Options:
    esbuild: {
        footer: '//# sourceMappingURL=',
        format: 'iife',
        logLevel: 'info',
        sourcemap: true,
        color: true,
        exclude: ['node_modules', '**/__tests__/**', '**/__mocks__/**'],
    },
});
