// import { svelte } from '@sveltejs/vite-plugin-svelte';
// import autoPreprocess from 'svelte-preprocess';
import purgecssPlugin from '@fullhuman/postcss-purgecss';


import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

  ],
  css: {
    postcss: {
      from: 'src/css/index.css',
      to: 'src/css/index.min.css',
      plugins: [
        purgecssPlugin( {
                     content: ['**/*.html'],
          safelist: ['body', 'html', '*'],
         })
      ]
    }
  },
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
