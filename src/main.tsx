import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ContentProvider } from "./context/ContentContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

// Auto-recover from dynamic import chunk fetch errors (e.g. after new deployment cache mismatch)
window.addEventListener("vite:preload-error", (event) => {
	event.preventDefault();
	window.location.reload();
});

window.addEventListener("unhandledrejection", (event) => {
	if (
		event.reason &&
		(event.reason.name === "ChunkLoadError" ||
			String(event.reason.message || "").includes("Failed to fetch dynamically imported module"))
	) {
		event.preventDefault();
		const refreshed = sessionStorage.getItem("webestone_chunk_retry");
		if (!refreshed) {
			sessionStorage.setItem("webestone_chunk_retry", "true");
			window.location.reload();
		}
	}
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary>
			<AuthProvider>
				<ContentProvider>
					<App />
				</ContentProvider>
			</AuthProvider>
		</ErrorBoundary>
	</StrictMode>,
);
