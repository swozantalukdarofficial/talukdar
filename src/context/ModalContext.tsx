import React, { createContext, useContext, useState } from "react";
import { AlertTriangle, Info, CheckCircle2, X } from "lucide-react";

export type ModalType = "danger" | "info" | "success" | "warning";

export interface ConfirmConfig {
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	type?: ModalType;
	onConfirm: () => void | Promise<void>;
}

export interface AlertConfig {
	title?: string;
	message: string;
	type?: ModalType;
}

interface ModalContextType {
	showAlert: (config: AlertConfig | string) => void;
	showConfirm: (config: ConfirmConfig) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [confirmState, setConfirmState] = useState<ConfirmConfig | null>(null);
	const [alertState, setAlertState] = useState<AlertConfig | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const showAlert = (config: AlertConfig | string) => {
		if (typeof config === "string") {
			setAlertState({ message: config, type: "info" });
		} else {
			setAlertState(config);
		}
	};

	const showConfirm = (config: ConfirmConfig) => {
		setConfirmState(config);
	};

	const handleConfirmAction = async () => {
		if (!confirmState) return;
		try {
			setIsSubmitting(true);
			await confirmState.onConfirm();
		} catch (err) {
			console.error("Confirm action error:", err);
		} finally {
			setIsSubmitting(false);
			setConfirmState(null);
		}
	};

	return (
		<ModalContext.Provider value={{ showAlert, showConfirm }}>
			{children}

			{/* Confirm Modal Overlay */}
			{confirmState && (
				<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
					<div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200 text-white relative">
						<button
							onClick={() => setConfirmState(null)}
							className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
						>
							<X className="w-4 h-4" />
						</button>

						<div className="flex items-start gap-4">
							<div
								className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
									confirmState.type === "danger"
										? "bg-red-500/10 text-red-500 border border-red-500/20"
										: "bg-teal-500/10 text-teal-400 border border-teal-500/20"
								}`}
							>
								{confirmState.type === "danger" ? (
									<AlertTriangle className="w-6 h-6" />
								) : (
									<Info className="w-6 h-6" />
								)}
							</div>

							<div className="flex-1 min-w-0 pr-2">
								<h4 className="text-base font-bold text-white leading-snug">
									{confirmState.title || "Confirm Action"}
								</h4>
								<p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
									{confirmState.message}
								</p>
							</div>
						</div>

						<div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-neutral-800">
							<button
								onClick={() => setConfirmState(null)}
								disabled={isSubmitting}
								className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs transition-all cursor-pointer disabled:opacity-50"
							>
								{confirmState.cancelText || "Cancel"}
							</button>

							<button
								onClick={handleConfirmAction}
								disabled={isSubmitting}
								className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md flex items-center gap-2 ${
									confirmState.type === "danger"
										? "bg-red-600 hover:bg-red-700 text-white shadow-red-600/20"
										: "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/20"
								}`}
							>
								{isSubmitting ? (
									<span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
								) : null}
								{confirmState.confirmText || (confirmState.type === "danger" ? "Delete" : "Confirm")}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Alert Modal Overlay */}
			{alertState && (
				<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
					<div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200 text-white text-center relative">
						<div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mx-auto mb-3">
							<CheckCircle2 className="w-6 h-6" />
						</div>

						<h4 className="text-base font-bold text-white mb-1">
							{alertState.title || "Notification"}
						</h4>
						<p className="text-xs text-neutral-400 mb-5 leading-relaxed">
							{alertState.message}
						</p>

						<button
							onClick={() => setAlertState(null)}
							className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md shadow-teal-600/20"
						>
							OK
						</button>
					</div>
				</div>
			)}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};
