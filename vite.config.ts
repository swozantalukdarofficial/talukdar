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
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: {
					// Core React runtime
					"vendor-react": ["react", "react-dom", "react-router-dom"],
					// Framer Motion
					"vendor-framer": ["framer-motion"],
					// Service pages
					"pages-services": [
						"./src/pages/SeoPage",
						"./src/pages/AiSeoPage",
						"./src/pages/PPCPage",
						"./src/pages/ShopifySeoPage",
					],
					// Design pages
					"pages-design": [
						"./src/pages/UiUxDesignPage",
						"./src/pages/CustomwebsiteDevelopmentPage",
						"./src/pages/ShopifyDevelopmentPage",
						"./src/pages/WordpressServicePage",
					],
					// Marketing pages
					"pages-marketing": [
						"./src/pages/SocialMediaMarketingPage",
						"./src/pages/DigitalMarketingPage",
						"./src/pages/ContentWritingPage",
					],
					// Media pages
					"pages-media": [
						"./src/pages/VideoEditingPage",
						"./src/pages/MotionGraphicsPage",
					],
					// Info pages
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
