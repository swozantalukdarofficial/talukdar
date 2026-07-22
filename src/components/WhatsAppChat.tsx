import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function WhatsAppChat() {
	const { socials } = useContent();
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState("Hi, I want to discuss a project.");

	const phoneNumber = socials.whatsapp || "+8801815025322";

	const handleSend = () => {
		const cleanNumber = phoneNumber.replace(/[^0-9+]/g, "");
		const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
		window.open(url, "_blank");
		setIsOpen(false);
	};

	return (
		<div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
			<div
				className={`mb-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl w-[calc(100vw-2rem)] sm:w-80 overflow-hidden transition-all duration-300 origin-bottom-right transform ${
					isOpen 
						? "opacity-100 translate-y-0 scale-100" 
						: "opacity-0 translate-y-4 scale-90 pointer-events-none"
				}`}
			>
				{/* Header */}
				<div className="bg-[#25D366] p-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<MessageCircle className="text-white w-6 h-6" />
						<div>
							<p className="text-white font-bold text-sm">Chat with us</p>
							<p className="text-white/80 text-xs">
								We typically reply instantly
							</p>
						</div>
					</div>
					<button
						onClick={() => setIsOpen(false)}
						className="text-white/80 hover:text-white transition-colors"
						aria-label="Close chat"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Body */}
				<div className="p-4 space-y-4 bg-neutral-50 dark:bg-neutral-900/50">
					<div className="bg-white dark:bg-neutral-800 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm text-neutral-600 dark:text-neutral-300">
						Hi there! 👋 How can we help you today?
					</div>
				</div>

				{/* Footer / Input */}
				<div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
					<div className="relative">
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none resize-none min-h-[50px] max-h-[100px] text-neutral-800 dark:text-neutral-100 placeholder-neutral-400"
							placeholder="Type a message..."
						/>
						<button
							onClick={handleSend}
							className="absolute right-2 bottom-2 p-2 bg-[#25D366] text-white rounded-full hover:bg-[#20bd5a] transition-colors shadow-md"
							aria-label="Send message to WhatsApp"
						>
							<Send className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>

			{/* Toggle Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 transform active:scale-90 hover:scale-110"
				aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
			>
				{isOpen ?
					<X className="w-7 h-7 text-white" />
				:	<MessageCircle className="w-7 h-7 text-white" />}
			</button>
		</div>
	);
}
