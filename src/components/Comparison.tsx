import { motion } from "framer-motion";
import { Check, X, ShieldCheck } from "lucide-react";

const features = [
  {
    name: "Strategy Foundation",
    we: "Data-Driven ROI Strategy",
    others: "Generic One-Size-Fits-All",
  },
  {
    name: "AI Integration",
    we: "Full AI Automation for Speed & Scale",
    others: "Slow Manual Processes",
  },
  {
    name: "Reporting",
    we: "Real-time Live Dashboards",
    others: "Monthly PDF Reports",
  },
  {
    name: "Team Access",
    we: "Direct Expert Communication",
    others: "Hidden Behind Account Managers",
  },
  {
    name: "Goal Focus",
    we: "Revenue & Growth Metrics",
    others: "Vanity Metrics (Likes/Shares)",
  },
];

export default function Comparison() {
  return (
    <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Why We Are Different
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              WeBestOne vs <span className="text-slate-500">Other Agencies</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Most agencies sell visibility. We engineer <span className="text-slate-900 font-bold">profitability.</span>
            </p>
          </motion.div>
        </div>

        <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="min-w-[500px] md:min-w-0 w-full overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
            <div className="grid grid-cols-[1fr_1.2fr_1.2fr] bg-slate-50 border-b border-slate-200">
              <div className="p-3.5 sm:p-6 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500">Feature</div>
              <div className="p-3.5 sm:p-6 text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 text-left">WeBestOne</div>
              <div className="p-3.5 sm:p-6 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 text-left">Others</div>
            </div>

            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-[1fr_1.2fr_1.2fr] border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
              >
                <div className="p-3.5 sm:p-6 text-xs sm:text-sm font-bold text-slate-900 flex items-center">{feature.name}</div>
                <div className="p-3.5 sm:p-6 text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50/40 flex items-center justify-start gap-1.5 sm:gap-2 text-left">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-emerald-600" />
                  {feature.we}
                </div>
                <div className="p-3.5 sm:p-6 text-xs sm:text-sm font-medium text-slate-500 flex items-center justify-start gap-1.5 sm:gap-2 text-left">
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-rose-500" />
                  {feature.others}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
