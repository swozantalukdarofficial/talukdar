"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageSquare } from "lucide-react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Hi! I am interested in your EV products.");
  const widgetRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_NUMBER = "8801341757541"; // User's mobile number: 01341-757541

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;
    const encodedText = encodeURIComponent(message);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Close widget when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Menu Card */}
      {isOpen && (
        <div className="mb-4 w-[320px] sm:w-[360px] bg-[#f0f2f5] rounded-3xl shadow-2xl border border-stone-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#ff5c00] p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              {/* Live Chat Icon Wrapper */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <MessageSquare className="w-5 h-5 text-[#ff5c00] fill-current" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold leading-none mb-1">Live Chat</h4>
                <p className="text-[10px] text-white/90 leading-none">Online • We reply instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 transition-colors border-0 bg-transparent text-white cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body with agent bubble */}
          <div className="p-4 min-h-[100px] flex flex-col justify-end bg-[#f5f5f5] relative overflow-hidden">
            {/* Soft grid background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Agent Message Bubble */}
            <div className="relative z-10 bg-white p-3 rounded-2xl rounded-tl-none shadow-[0_1px_2px_rgba(0,0,0,0.15)] max-w-[85%] text-left self-start">
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                Hi there! 👋 How can we help you today?
              </p>
            </div>
          </div>

          {/* User Input & Action Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-stone-200/60 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-[#f0f2f5] border-0 rounded-2xl py-2 px-4 text-xs font-semibold focus:ring-0 focus:outline-none placeholder-stone-400 text-stone-800 h-9"
            />
            <button
              type="submit"
              className="w-9 h-9 bg-[#ff5c00] hover:bg-[#e05100] text-white rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 shrink-0 border-0 cursor-pointer shadow-md"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 fill-current ml-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 border-0 cursor-pointer text-white ${
          isOpen 
            ? "bg-stone-800 hover:bg-stone-900 shadow-stone-800/25" 
            : "bg-[#ff5c00] hover:bg-[#e05100] shadow-[#ff5c00]/25"
        }`}
        aria-label="Toggle chat menu"
      >
        {isOpen ? (
          <X className="w-5 h-5 transition-transform duration-300" />
        ) : (
          <MessageSquare className="w-5 h-5 fill-white text-white" />
        )}
      </button>
    </div>
  );
}
