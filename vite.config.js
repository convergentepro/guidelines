import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [svelte()],
	build: {
		assetsDir: "static",
		chunkSizeWarningLimit: 1000000,
		cssCodeSplit: true,
		minify: true,
	},
	base: "/",
	envPrefix: "VITE_",
	envDir: "./",
	logLevel: "info",
	publicDir: "/public",
	worker: {
		format: "es",
	},

	preview: {
		port: 5000,
		open: true,
	},

	server: {
		hmr: true,
		port: 8000,
		open: false,
		cors: true,
	},
});
