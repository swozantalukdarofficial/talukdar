import React, { useState } from "react";
import { Paperclip, Smile, Mic, Send, ChevronDown, MicOff } from "lucide-react";

interface ChatInputProps {
	input: string;
	setInput: (val: string) => void;
	isLoading: boolean;
	onSubmit: (e: React.FormEvent) => void;
	onMinimize?: () => void;
	onShowNotice?: (title: string, message: string, type?: "info" | "success" | "warning") => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
	input,
	setInput,
	isLoading,
	onSubmit,
	onMinimize,
	onShowNotice,
}) => {
	const [isListening, setIsListening] = useState(false);

	const handleEmojiClick = () => {
		setInput(input + " 😊");
	};

	const handleMicClick = () => {
		const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
		if (SpeechRecognition) {
			try {
				const recognition = new SpeechRecognition();
				recognition.continuous = false;
				recognition.interimResults = false;
				recognition.lang = "en-US";

				recognition.onstart = () => {
					setIsListening(true);
					onShowNotice?.("Voice Typing Active", "Listening... Speak into your microphone.", "info");
				};

				recognition.onresult = (event: any) => {
					const transcript = event.results[0][0].transcript;
					setInput(input ? `${input} ${transcript}` : transcript);
					setIsListening(false);
					onShowNotice?.("Speech Captured", `Added: "${transcript}"`, "success");
				};

				recognition.onerror = () => {
					setIsListening(false);
					onShowNotice?.("Voice Search", "Could not hear audio. Please try typing your message.", "warning");
				};

				recognition.onend = () => {
					setIsListening(false);
				};

				recognition.start();
			} catch (e) {
				setIsListening(false);
				onShowNotice?.("Voice Search", "Please allow microphone permissions in browser.", "warning");
			}
		} else {
			onShowNotice?.(
				"Voice Input Info",
				"Voice typing is simulated on this browser. Type message or contact us directly!",
				"info"
			);
		}
	};

	const handleFileClick = () => {
		onShowNotice?.(
			"Attachment Feature",
			"To send project files or documents, click the WhatsApp tab to chat directly with our team!",
			"info"
		);
	};

	return (
		<div className="bg-neutral-900/90 border-t border-white/10 flex-shrink-0">
			{/* Top Footer Branding Bar */}
			<div className="px-3.5 py-1.5 flex items-center justify-between text-[11px] text-neutral-400 border-b border-white/5">
				<div>
					Powered by <span className="font-bold text-white">WeBestOne</span>
				</div>
				<button
					type="button"
					onClick={onMinimize}
					className="flex items-center gap-0.5 hover:text-neon-green transition-colors cursor-pointer"
				>
					<ChevronDown className="w-3.5 h-3.5" />
					<span>Minimize</span>
				</button>
			</div>

			{/* Main Input Form Bar */}
			<form onSubmit={onSubmit} className="p-3 flex items-center gap-2">
				{/* Attachment Icon */}
				<button
					type="button"
					onClick={handleFileClick}
					className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer shrink-0"
					title="Attach file"
					aria-label="Attach file"
				>
					<Paperclip className="w-4 h-4" />
				</button>

				{/* Text Input */}
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type a message..."
					className="flex-1 bg-neutral-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-neon-green/50 transition-colors placeholder:text-neutral-500"
				/>

				{/* Emoji Button */}
				<button
					type="button"
					onClick={handleEmojiClick}
					className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer shrink-0"
					title="Add emoji"
					aria-label="Add emoji"
				>
					<Smile className="w-4 h-4" />
				</button>

				{/* Microphone Button */}
				<button
					type="button"
					onClick={handleMicClick}
					className={`p-2 rounded-xl transition-colors cursor-pointer shrink-0 ${
						isListening
							? "text-red-400 bg-red-950/50 animate-pulse border border-red-500/30"
							: "text-neutral-400 hover:text-white hover:bg-white/5"
					}`}
					title={isListening ? "Listening..." : "Voice input"}
					aria-label="Voice input"
				>
					{isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
				</button>

				{/* Neon Green Circular Send Button */}
				<button
					type="submit"
					disabled={!input.trim() || isLoading}
					className="p-2.5 bg-neon-green disabled:bg-neutral-800 text-black disabled:text-neutral-500 rounded-xl hover:bg-neon-green/90 transition-all cursor-pointer font-bold shrink-0 shadow-md shadow-neon-green/10"
					title="Send message"
					aria-label="Send message"
				>
					<Send className="w-4 h-4" />
				</button>
			</form>
		</div>
	);
};
