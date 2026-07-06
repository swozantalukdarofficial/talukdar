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
		sourcemap: true,
		// Raise warning threshold — 500kb → 1000kb
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: {
					// Core React runtime — smallest possible first-load
					"vendor-react": ["react", "react-dom", "react-router-dom"],
					// Framer Motion — large library, separate chunk
					"vendor-framer": ["framer-motion"],
					// Lucide icons — large icon set, lazy-loadable
					"vendor-lucide": ["lucide-react"],
					// All page-level components split out from main bundle
					"pages-services": [
						"./src/pages/SeoPage",
						"./src/pages/AiSeoPage",
						"./src/pages/PPCPage",
						"./src/pages/ShopifySeoPage",
					],
					"pages-design": [
						"./src/pages/UiUxDesignPage",
						"./src/pages/CustomwebsiteDevelopmentPage",
						"./src/pages/ShopifyDevelopmentPage",
						"./src/pages/WordpressServicePage",
					],
					"pages-marketing": [
						"./src/pages/SocialMediaMarketingPage",
						"./src/pages/DigitalMarketingPage",
						"./src/pages/ContentWritingPage",
					],
					"pages-media": [
						"./src/pages/VideoEditingPage",
						"./src/pages/MotionGraphicsPage",
					],
					"pages-info": [
						"./src/pages/AboutPage",
						"./src/pages/ContactPage",
						"./src/pages/BlogsPage",
						"./src/pages/BlogDetailPage",
						"./src/pages/WorkPage",
					],
				},
			},
		},
	},
});
