import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";

export default function AuditCTA() {
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

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Claim Your Free Audit</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green transition-colors outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Business Email"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green transition-colors outline-none"
                />
              </div>
              <div>
                <input
                  type="url"
                  placeholder="Website URL (Optional)"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-green transition-colors outline-none"
                />
              </div>
              <MagneticButton className="w-full py-4 bg-neon-green text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-neon-green/90 transition-colors">
                <span>Send My Free Audit</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </form>
            <p className="text-neutral-500 text-[10px] text-center mt-4 uppercase tracking-widest font-mono">
              100% Free • No Commitment • Expert Advice
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
