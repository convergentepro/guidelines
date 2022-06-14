// import { svelte } from '@sveltejs/vite-plugin-svelte';
// import autoPreprocess from 'svelte-preprocess';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    assetsInlineLimit: 1000,
    assetsDir: 'assets',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000000
  },

  preview: {
    port: 5000,
    cors: true,
    open: false
  },
  logLevel: 'info',
  base: '/',
  server: {
    port: 8000,
    hmr: true,
    open: true
  }
})
