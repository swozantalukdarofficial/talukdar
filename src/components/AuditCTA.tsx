import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";

export default function AuditCTA() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
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
        throw new Error(data.error || "Failed to submit request. Please try again.");
      }

      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        website: "",
      });
    } catch (err: any) {
      console.error("Audit form error:", err);
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-8 md:p-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -ml-32 -mb-32"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-6">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Not getting results?</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Get Your Free <span className="text-neon-green">AI-Powered Growth Audit</span> Today
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Is your digital presence failing to convert? Our team will analyze your website, SEO, social media, and ad strategy using AI tools and show you exactly where you are losing revenue and how to fix it.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Website Performance & Core Web Vitals Check",
                "SEO & Google Ranking Analysis",
                "Social Media Engagement Audit",
                "Competitor Benchmark Comparison",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-300">
                  <CheckCircle2 className="w-5 h-5 text-neon-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 sm:p-8 rounded-2xl backdrop-blur-sm min-w-0 overflow-hidden">
            {isSubmitted ? (
              <div className="text-center py-6 sm:py-8 space-y-6">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green mx-auto">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Request Received!</h3>
                  <p className="text-neutral-400 text-xs sm:text-sm">
                    Thank you. We have received your request for a Free Growth Audit. Our team will review your digital footprint and reach out to you within 24-48 hours.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 transition-colors text-xs sm:text-sm"
                >
                  Request Another Audit
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Claim Your Free Audit</h3>
                <form className="space-y-3.5 sm:space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="Full Name"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-white text-xs sm:text-sm focus:border-neon-green transition-colors outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder="Business Email"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-white text-xs sm:text-sm focus:border-neon-green transition-colors outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      name="website"
                      value={formState.website}
                      onChange={handleChange}
                      placeholder="Website URL (Optional)"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-white text-xs sm:text-sm focus:border-neon-green transition-colors outline-none"
                    />
                  </div>
                  {error && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                      ⚠️ {error}
                    </div>
                  )}
                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 px-4 bg-neon-green text-black font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-neon-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-neon-green/20"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="truncate">Send My Free Audit</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </>
                    )}
                  </MagneticButton>
                </form>
              </>
            )}
            <p className="text-neutral-500 text-[9px] sm:text-[10px] text-center mt-4 uppercase tracking-widest font-mono">
              100% Free • No Commitment • Expert Advice
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
