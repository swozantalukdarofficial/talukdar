import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      let data: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        if (response.status === 404 || (contentType && contentType.includes("text/html"))) {
          throw new Error("Unable to connect to WeBestOne servers. Please try again later.");
        }
        throw new Error(data.error || "Failed to subscribe. Please try again.");
      }

      setIsSubmitted(true);
      setEmail("");
    } catch (err: any) {
      console.error("Subscription error:", err);
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-slate-50">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-16 text-center shadow-xl shadow-slate-200/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <div className="py-8 space-y-6 max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Subscribed Successfully!</h3>
                  <p className="text-slate-600 text-sm">
                    Thank you! You have successfully subscribed to our newsletter. You'll receive our weekly AI-driven growth strategies directly in your inbox.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors text-sm shadow-md"
                >
                  Okay
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                  Ready to <span className="text-emerald-600">Skyrocket</span> Your Revenue?
                </h2>
                <p className="text-slate-600 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                  Join 500+ business owners receiving weekly AI-driven growth strategies, digital marketing playbooks, and SEO insights directly in their inbox.
                </p>

                <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-8" onSubmit={handleSubmit}>
                  <div className="flex-grow relative group">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-slate-50 border border-slate-300 rounded-full px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-emerald-600 text-white font-black rounded-full shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </MagneticButton>
                </form>

                {error && (
                  <div className="max-w-md mx-auto mb-8 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
                    ⚠️ {error}
                  </div>
                )}
              </>
            )}

            <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest font-mono">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                No Spam Ever
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Unsubscribe Anytime
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Expert Insights
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
