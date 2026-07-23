import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Lightbulb, PenTool, Rocket, TrendingUp } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    title: "Discovery & Audit",
    description: "We dive deep into your brand, market, and competitors using AI analysis tools and data analytics to find untapped growth opportunities and revenue gaps.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/20",
  },
  {
    title: "Strategy Planning",
    description: "Our experts craft a data-driven digital strategy roadmap tailored specifically to your business goals, target audience, and KPIs.",
    icon: Lightbulb,
    color: "from-purple-500 to-indigo-500",
    glow: "shadow-purple-500/20",
  },
  {
    title: "Creative Execution",
    description: "High-quality content, precision design, AI automation setup, and technical implementation that bring the strategy to life with measurable impact.",
    icon: PenTool,
    color: "from-rose-500 to-pink-500",
    glow: "shadow-rose-500/20",
  },
  {
    title: "Launch & Scale",
    description: "We deploy campaigns across Google Ads, Meta Ads, organic search, and social platforms, then continuously optimize using real-time data for maximum performance and ROI.",
    icon: Rocket,
    color: "from-neon-green to-emerald-500",
    glow: "shadow-neon-green/20",
  },
  {
    title: "Revenue Growth",
    description: "The end result is increased organic traffic, higher conversion rates, and scalable, predictable revenue for your brand.",
    icon: TrendingUp,
    color: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/20",
  },
];

export default function WorkingProcess() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden bg-slate-50">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-emerald-500/5 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 uppercase tracking-[0.3em] mb-6">
              Our Roadmap
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
              Our <span className="text-emerald-600">Proven</span> Process
            </h2>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We don't believe in guesswork. Our systematic AI-driven approach ensures every project is engineered for long-term, compounding growth.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Central Vertical Line (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 -translate-x-1/2 hidden md:block">
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 shadow-md shadow-emerald-500/30"
            />
          </div>

          <div className="space-y-12 md:space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-[42%] group">
                  <div className="relative p-8 rounded-[2.5rem] bg-white border border-slate-200 hover:border-emerald-500/40 transition-all duration-500 shadow-xl shadow-slate-200/50">
                    <div className="absolute -top-12 -right-6 text-9xl font-black text-slate-100 pointer-events-none select-none group-hover:text-emerald-500/10 transition-colors">
                      0{index + 1}
                    </div>
                    
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} ${step.glow} flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Circle Indicator */}
                <div className="relative z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-slate-300 group-hover:border-emerald-500 transition-colors duration-500 overflow-hidden shadow-md">
                   <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                   <span className="relative z-10 text-xs font-black text-slate-700 group-hover:text-white">0{index + 1}</span>
                </div>

                {/* Empty Spacer for desktop alignment */}
                <div className="hidden md:block w-[42%]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
