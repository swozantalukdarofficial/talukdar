import React from "react";
import { MessageCircle, Send, PhoneCall } from "lucide-react";

interface WhatsAppTabProps {
	waMessage: string;
	setWaMessage: (val: string) => void;
	onSendWhatsApp: () => void;
	phoneNumber: string;
}

export const WhatsAppTab: React.FC<WhatsAppTabProps> = ({
	waMessage,
	setWaMessage,
	onSendWhatsApp,
	phoneNumber,
}) => {
	return (
		<div className="flex-1 p-6 bg-neutral-950/80 flex flex-col justify-between space-y-6 overflow-y-auto custom-scrollbar text-white">
			<div className="space-y-4">
				<div className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 space-y-2">
					<div className="flex items-center gap-2 text-[#25D366] font-bold text-xs">
						<MessageCircle className="w-4 h-4" />
						<span>Direct Executive Desk</span>
					</div>
					<p className="text-neutral-300 text-xs leading-relaxed">
						Connect directly with Founder <strong>Rozi Osman</strong> & Lead Dev <strong>Shipon Talukdar</strong> via WhatsApp for instant project quotes.
					</p>
				</div>

				<div className="space-y-1.5">
					<label className="text-xs font-bold text-neutral-400">
						Your Project Inquiry / Message
					</label>
					<textarea
						rows={4}
						value={waMessage}
						onChange={(e) => setWaMessage(e.target.value)}
						className="w-full bg-neutral-900 border border-white/15 rounded-2xl p-3.5 text-white text-xs focus:outline-none focus:border-[#25D366]/50 transition-colors resize-none shadow-xs"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<button
					onClick={onSendWhatsApp}
					className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/20"
				>
					<Send className="w-4 h-4" />
					<span>Start Chat on WhatsApp ({phoneNumber})</span>
				</button>
				<a
					href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
					className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
				>
					<PhoneCall className="w-3.5 h-3.5 text-neon-green" />
					<span>Call {phoneNumber}</span>
				</a>
			</div>
		</div>
	);
};
