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
    <section className="py-24 px-6 relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-neutral-900/50 to-black border border-white/10 rounded-[2.5rem] p-8 md:p-16 text-center shadow-2xl backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <div className="py-8 space-y-6 max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Subscribed Successfully!</h3>
                  <p className="text-neutral-400 text-sm">
                    Thank you! You have successfully subscribed to our newsletter. You'll receive our weekly AI-driven growth strategies directly in your inbox.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-neon-green text-black font-bold rounded-full hover:bg-neon-green/90 transition-colors text-sm"
                >
                  Okay
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Ready to <span className="text-neon-green">Skyrocket</span> Your Revenue?
                </h2>
                <p className="text-neutral-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
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
                      className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-neon-green transition-all"
                    />
                  </div>
                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-neon-green text-black font-black rounded-full shadow-[0_0_20px_rgba(135,230,92,0.3)] hover:shadow-neon-green/60 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
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
                  <div className="max-w-md mx-auto mb-8 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                    ⚠️ {error}
                  </div>
                )}
              </>
            )}

            <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold text-neutral-500 uppercase tracking-widest font-mono">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-neon-green" />
                No Spam Ever
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-neon-green" />
                Unsubscribe Anytime
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-neon-green" />
                Expert Insights
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
