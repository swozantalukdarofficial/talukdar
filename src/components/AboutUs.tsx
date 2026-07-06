import { motion } from "framer-motion";
import { Clock, Search, Settings, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Radar/Efficiency Graphic */}
        <div className="relative aspect-square w-full max-w-lg mx-auto flex items-center justify-center">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-green/10 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Concentric Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="absolute w-[100%] h-[100%] border border-white/5 rounded-full"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute w-[70%] h-[70%] border border-white/5 rounded-full"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="absolute w-[40%] h-[40%] border border-white/10 rounded-full"
          ></motion.div>

          {/* Orbiting Icons */}
          {/* Search Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[70%] h-[70%]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Search className="w-4 h-4 text-blue-500" />
            </div>
          </motion.div>

          {/* Settings Icon */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[100%] h-[100%]"
          >
            <div className="absolute bottom-1/4 left-0 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              <Settings className="w-4 h-4 text-orange-500" />
            </div>
          </motion.div>

          {/* Target Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[100%] h-[100%]"
          >
            <div className="absolute bottom-1/4 right-0 translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Target className="w-4 h-4 text-purple-500" />
            </div>
          </motion.div>

          {/* Center Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="relative z-10 w-32 h-32 rounded-full bg-[#0a0a0a] border border-white/10 flex flex-col items-center justify-center shadow-2xl"
          >
            <div className="w-10 h-10 rounded-full border-2 border-neon-green flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-neon-green" />
            </div>
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
              Efficiency
            </span>
          </motion.div>
        </div>

        {/* Right Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="text-xs font-bold text-neon-green uppercase tracking-widest">
            About Us
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Our Identity in a World <br />
            <span className="text-neon-green relative inline-block">
              Led by AI
              {/* Green swoosh underline effect */}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C50 2 150 2 198 10" stroke="#87E65C" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>

          <p className="text-neutral-400 text-lg leading-relaxed">
            WeBestOne is built on intelligent innovation engineered to help brands
            grow with clarity, precision, and purpose. We create AI-powered
            systems that elevate visibility, strengthen customer engagement, and turn data
            into measurable revenue. Every solution we deliver is built for smarter, faster,
            more predictable growth.
          </p>

          <div className="pt-4">
            <Link to="/contact-us" className="inline-flex px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold rounded-full hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all items-center gap-2 group">
              <span>Let Us Work Together</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
