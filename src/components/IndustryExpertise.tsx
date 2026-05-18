import { motion } from "framer-motion";
import { ShoppingBag, GraduationCap, Building2, HeartPulse, Laptop, Zap } from "lucide-react";

const industries = [
  { name: "Energy", icon: Zap, color: "text-yellow-500" },
  { name: "E-Commerce", icon: ShoppingBag, color: "text-rose-500" },
  { name: "Ed-Tech", icon: GraduationCap, color: "text-blue-500" },
  { name: "NGOs", icon: HeartPulse, color: "text-emerald-500" },
  { name: "Real Estate", icon: Building2, color: "text-amber-500" },
  { name: "SaaS & Tech", icon: Laptop, color: "text-indigo-500" },
];

export default function IndustryExpertise() {
  return (
    <section className="py-24 relative overflow-hidden bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Industries We <span className="text-neon-green">Empower</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Our AI-powered strategies are not one-size-fits-all. We specialize in growing businesses across diverse high-impact sectors.
          </p>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative flex overflow-x-hidden py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap gap-6 pr-6"
        >
          {/* Double the array for seamless loop */}
          {[...industries, ...industries].map((industry, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 p-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center text-center group cursor-default hover:bg-white/[0.06] hover:border-neon-green/30 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-neon-green transition-all duration-300 ${industry.color} group-hover:text-black`}>
                <industry.icon className="w-8 h-8" />
              </div>
              <span className="text-white font-bold tracking-wide group-hover:text-neon-green transition-colors">{industry.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays for Fade Effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
