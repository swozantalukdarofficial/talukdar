import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: null,
		errorInfo: null,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error, errorInfo: null };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
		if (
			error?.message?.includes("Failed to fetch dynamically imported module") ||
			error?.name === "ChunkLoadError"
		) {
			const refreshed = sessionStorage.getItem("webestone_chunk_retry");
			if (!refreshed) {
				sessionStorage.setItem("webestone_chunk_retry", "true");
				window.location.reload();
				return;
			}
		}
		this.setState({ errorInfo });
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen bg-black text-white p-8 flex flex-col justify-center items-center font-mono">
					<div className="max-w-2xl w-full border border-red-500/30 bg-red-950/20 p-8 rounded-2xl space-y-4">
						<h1 className="text-2xl font-bold text-red-500">Something went wrong.</h1>
						<div className="p-4 bg-neutral-900 rounded border border-white/5">
							<p className="text-neutral-200 text-sm font-semibold">
								{this.state.error?.toString()}
							</p>
						</div>
						<div className="space-y-2">
							<p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
								Component Stack Trace:
							</p>
							<pre className="bg-neutral-900 p-4 rounded text-[11px] overflow-auto max-h-80 text-neutral-300 border border-white/5 leading-relaxed">
								{this.state.errorInfo?.componentStack || this.state.error?.stack}
							</pre>
						</div>
						<button
							onClick={() => window.location.reload()}
							className="px-5 py-2.5 bg-red-600 hover:bg-red-500 transition-colors text-white font-bold rounded-xl text-sm"
						>
							Reload Page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
