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
								setHeader: (k: string, v: string | string[]) => res.setHeader(k, v),
								status: (code: number) => {
									res.statusCode = code;
									return {
										json: (data: unknown) => {
											res.setHeader("Content-Type", "application/json");
											res.end(JSON.stringify(data));
										},
									};
								},
							};
							const handler = require("./api/chat.js").default;
							await handler(mockReq, mockRes);
						} catch (e: any) {
							res.statusCode = 500;
							res.setHeader("Content-Type", "application/json");
							res.end(JSON.stringify({ error: e?.message || "Internal error" }));
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
		chunkSizeWarningLimit: 600,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("firebase/auth")) return "vendor-firebase-auth";
						if (id.includes("firebase/firestore")) return "vendor-firebase-db";
						if (id.includes("firebase/storage")) return "vendor-firebase-storage";
						if (id.includes("firebase/app")) return "vendor-firebase-core";
						if (id.includes("framer-motion")) return "vendor-framer";
						if (id.includes("lucide-react")) return "vendor-lucide";
						if (id.includes("react-dom")) return "vendor-react-dom";
						if (id.includes("react-router")) return "vendor-react-router";
					}
				},
			},
		},
	},
	esbuild: {
		drop: ["console", "debugger"],
		legalComments: "none",
	},
});
