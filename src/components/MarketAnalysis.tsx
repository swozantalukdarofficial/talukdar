import { motion } from "framer-motion";
import { TrendingUp, Users, Globe, BarChart2 } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "5.4B+",
    label: "Active Internet Users",
    description: "The global market holds one of the largest digital audiences in history. The brands that show up first in search and social capture the market.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Globe,
    value: "5.0B+",
    label: "Social Media Users",
    description: "Daily active users across Facebook, Instagram, TikTok, LinkedIn, and YouTube. Massive reach for precision-targeted social media marketing campaigns.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: TrendingUp,
    value: "20%+",
    label: "Annual E-Commerce Growth",
    description: "The e-commerce market is compounding fast. Shopify and WooCommerce stores with strong SEO and conversion rate optimization are capturing the lead.",
    color: "text-neon-green",
    bg: "bg-neon-green/10",
  },
  {
    icon: BarChart2,
    value: "85%",
    label: "Research Before Buying",
    description: "Customers Google products, read reviews, and check social proof before any purchase decision. If you are not on page one of the SERP, you do not exist.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export default function MarketAnalysis() {
  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
              Why Brands Need an <span className="text-emerald-600">AI-Powered Growth Partner</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              The digital landscape is moving faster than traditional marketing can keep up with. To compete in 2026, brands need more than a website or an ad campaign. They need an <span className="text-slate-900 font-semibold">AI-driven growth ecosystem</span> engineered for speed, precision, and measurable ROI.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/40 transition-all shadow-lg shadow-slate-200/50 group"
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{stat.value}</h3>
              <p className="text-xs md:text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">{stat.label}</p>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
