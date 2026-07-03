"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending email/form to API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      toast.success("Message sent successfully! We will contact you soon. ✅");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-white border border-stone-200/90 rounded-2xl p-8 text-center space-y-4 shadow-sm flex flex-col items-center justify-center min-h-[350px]">
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 animate-bounce">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-stone-900 uppercase tracking-tight">Thank You!</h3>
        <p className="text-stone-500 text-[11px] leading-relaxed max-w-xs font-semibold">
          Your message has been delivered. Our technical support team will reach out to you within the next 24 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          id="send-another-msg-btn"
          className="mt-2 text-xs font-bold text-emerald-850 hover:text-emerald-900 hover:underline uppercase tracking-wider"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm shadow-stone-150/40"
      id="contact-us-form"
    >
      <h3 className="text-xs font-bold text-stone-750 uppercase tracking-widest border-b border-stone-100 pb-3">
        Send Us a Message
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="name-input" className="text-[10px] font-bold text-stone-600 uppercase tracking-wide">
            Your Name *
          </label>
          <input
            id="name-input"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 transition-all"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="phone-input" className="text-[10px] font-bold text-stone-600 uppercase tracking-wide">
            Phone Number *
          </label>
          <input
            id="phone-input"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01712345678"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 transition-all"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="email-input" className="text-[10px] font-bold text-stone-600 uppercase tracking-wide">
          Email Address *
        </label>
        <input
          id="email-input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="yourname@gmail.com"
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 transition-all"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message-input" className="text-[10px] font-bold text-stone-600 uppercase tracking-wide">
          How can we help? *
        </label>
        <textarea
          id="message-input"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message about custom battery configurations, e-bike repairs, or solar panel requirements..."
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        id="submit-contact-btn"
        className="w-full bg-emerald-800 text-white hover:bg-emerald-850 disabled:bg-stone-300 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Sending message...
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
