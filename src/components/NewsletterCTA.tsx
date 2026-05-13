import { motion } from "framer-motion";
import { Send, ArrowRight, Check } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";

export default function NewsletterCTA() {
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
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready to <span className="text-neon-green">Skyrocket</span> Your Revenue?
            </h2>
            <p className="text-neutral-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Join 500+ business owners receiving weekly data-driven growth strategies directly in their inbox.
            </p>

            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-8" onSubmit={(e) => e.preventDefault()}>
              <div className="flex-grow relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-neon-green transition-all"
                />
              </div>
              <MagneticButton className="px-8 py-4 bg-neon-green text-black font-black rounded-full shadow-[0_0_20px_rgba(135,230,92,0.3)] hover:shadow-neon-green/60 transition-all flex items-center justify-center gap-2 shrink-0">
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </MagneticButton>
            </form>

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
