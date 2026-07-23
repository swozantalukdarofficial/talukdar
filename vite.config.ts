import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		sourcemap: false,
		minify: "esbuild",
		target: "es2020",
		cssCodeSplit: true,
		chunkSizeWarningLimit: 500,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("firebase")) {
							return "vendor-firebase";
						}
						if (id.includes("lucide-react")) {
							return "vendor-lucide";
						}
						if (id.includes("framer-motion")) {
							return "vendor-framer";
						}
						if (id.includes("react")) {
							return "vendor-react";
						}
					}
				},
			},
		},
	},
	esbuild: {
		drop: ["console", "debugger"],
	},
});
