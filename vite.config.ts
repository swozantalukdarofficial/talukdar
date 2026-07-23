import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		{
			name: "local-api-chat-plugin",
			configureServer(server) {
				server.middlewares.use("/api/chat", async (req, res) => {
					if (req.method !== "POST") {
						res.statusCode = 405;
						return res.end();
					}
					let bodyStr = "";
					req.on("data", (chunk) => (bodyStr += chunk));
					req.on("end", async () => {
						try {
							const body = JSON.parse(bodyStr || "{}");
							const mockReq = { method: req.method || "POST", headers: req.headers, body };
							const mockRes = {
								setHeader: (k, v) => res.setHeader(k, v),
								status: (code) => {
									res.statusCode = code;
									return {
										json: (data) => {
											res.setHeader("Content-Type", "application/json");
											res.end(JSON.stringify(data));
										},
									};
								},
							};
							const handler = require("./api/chat.js").default;
							await handler(mockReq, mockRes);
						} catch (e) {
							res.statusCode = 500;
							res.setHeader("Content-Type", "application/json");
							res.end(JSON.stringify({ error: e.message }));
						}
					});
				});
			},
		},
	],
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
