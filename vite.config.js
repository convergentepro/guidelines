import { svelte } from '@sveltejs/vite-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/ Working with Typescript + Svelte.js
export default defineConfig({
	plugins: [
		svelte({
			preprocess: autoPreprocess({
				typescript: true,
				scss: true,
				postcss: true,
				sass: true,
				sourceMap: true,
				babel: true,
			}),
		}),
	],
	build: {
		outDir: './dist',
		emptyOutDir: true,
		assetsInlineLimit: 1000,
		assetsDir: 'assets',
		cssCodeSplit: true,
		chunkSizeWarningLimit: 1000000,
		rollupOptions: {
			external: ['svelte'],
			input: {
			  main: resolve(__dirname, 'index.html'),
			  nested: resolve(__dirname, 'nested/index.html')
			}
		 }
	},
	css: {
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

	server: {
		port: 3000,
		host: 'localhost',
		base: './src',
		hmr: true,
		open: true,
	},
});

