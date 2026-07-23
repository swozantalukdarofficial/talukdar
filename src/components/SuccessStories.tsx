import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Users, Target } from "lucide-react";

const cases = [
  {
    title: "High-Performance Web Ecosystem",
    client: "GLOBAL TECH SOLUTIONS",
    stat: "300%",
    metric: "Increase in User Retention",
    description: "Built a custom, lightning-fast web platform with seamless UI and UX that transformed their digital presence and lowered bounce rate by 60%.",
    tags: ["Web Dev", "UI/UX Design"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Lead Generation Optimization",
    client: "TECHEDU LAB",
    stat: "12X",
    metric: "Lower Cost Per Lead",
    description: "Revamped their Facebook and Google Ads funnel with AI-driven audience targeting and landing page optimization to maximize conversion rate and slash wasted spend.",
    tags: ["PPC", "CRO"],
    color: "from-neon-green/20 to-emerald-500/20",
  },
  {
    title: "Brand Authority Build",
    client: "NGO Connect",
    stat: "1M+",
    metric: "Social Media Reach",
    description: "Strategic storytelling and video marketing that captured nationwide attention.",
    tags: ["SMM", "Video Marketing"],
    color: "from-purple-500/20 to-rose-500/20",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Real Results for <span className="text-emerald-600">Real Businesses</span>
            </h2>
            <p className="text-slate-600 text-lg">
              We don't just talk about growth. We deliver it. Our case studies represent the measurable impact we have had on our clients' revenue and visibility.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <button className="flex items-center gap-2 text-emerald-600 font-bold group">
              <span>View All Case Studies</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className="relative h-full p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/40 transition-all flex flex-col shadow-lg shadow-slate-200/50">
                <div className="flex justify-between items-start mb-8">
                  <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                    {item.client}
                  </div>
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                <p className="text-slate-600 text-sm mb-8 flex-grow">{item.description}</p>
                
                <div className="pt-8 mt-auto border-t border-slate-100">
                  <div className="text-4xl font-black text-slate-900 mb-1 group-hover:scale-110 transition-transform origin-left">{item.stat}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.metric}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
