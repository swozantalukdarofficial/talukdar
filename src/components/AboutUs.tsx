import { motion } from "framer-motion";
import { Clock, Search, Settings, Target, ArrowRight, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

// Google Icon SVG
const GoogleIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

// ChatGPT Icon SVG
const ChatGPTIcon = () => (
  <svg className="w-5 h-5 text-[#10a37f]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21.74 11.64c.22-.07.41-.22.53-.42.27-.45.31-.99.1-1.48a1.69 1.69 0 00-.77-.85c-.17-.09-.37-.13-.56-.11l-2.07.25c-.2.02-.38-.07-.49-.23-.27-.41-.65-.72-1.1-.88-.44-.17-.93-.19-1.39-.06a1.72 1.72 0 00-.98.71 1.7 1.7 0 00-.18.99l.13 2.08c.01.2-.12.38-.3.44a3.84 3.84 0 01-1.41.27c-.49-.02-.97-.15-1.38-.39a1.73 1.73 0 00-1.12-.13c-.48.12-.89.41-1.15.82a1.71 1.71 0 00-.13 1.2c.07.22.06.46-.03.67l-.93 1.87c-.09.18-.28.27-.47.23a3.86 3.86 0 01-1.3-.6c-.39-.31-.69-.71-.87-1.17a1.69 1.69 0 00-.91-.94 1.7 1.7 0 00-1.2-.01c-.46.16-.84.49-1.04.92a1.71 1.71 0 00-.11 1.2l.96 1.85c.09.18.06.39-.07.54-.23.27-.52.47-.85.59-.34.12-.7.16-1.06.11a1.7 1.7 0 00-1.13.41 1.69 1.69 0 00-.47 1.1c-.05.48.09.96.4 1.34a1.73 1.73 0 00.91.56l2.03.46c.19.04.33.2.35.39.06.49.25.96.53 1.36.29.4.67.71 1.12.9a1.72 1.72 0 001.2-.02 1.71 1.71 0 00.91-.79l1.1-1.77c.1-.17.3-.24.49-.17.43.16.89.22 1.36.19.46-.04.91-.18 1.3-.43a1.72 1.72 0 00.73-.86c.19-.45.22-.95.09-1.41a1.73 1.73 0 00-.49-.91l-1.48-1.46c-.14-.14-.16-.36-.05-.52.27-.37.64-.64 1.07-.79.43-.15.89-.18 1.34-.09a1.71 1.71 0 001.21-.29 1.7 1.7 0 00.56-1.07c.12-.47.07-.97-.15-1.41a1.72 1.72 0 00-.91-.8l-1.92-.81c-.18-.08-.27-.27-.22-.46.14-.47.38-.9.7-1.25.32-.36.72-.64 1.17-.81a1.7 1.7 0 00.95-.91c.17-.46.18-.95.04-1.41a1.73 1.73 0 00-.63-.92zm-5.46 3.03c.12-.2.34-.31.57-.28.48.06.94-.03 1.36-.26.42-.23.75-.58.97-1 .24-.46.31-.99.2-1.5a1.7 1.7 0 00-.85-1.12c-.22-.11-.47-.15-.71-.11a1.7 1.7 0 00-1.05.61l-1.27 1.66c-.13.17-.07.41.13.51.44.22.8.55 1.05.96.25.4.38.87.38 1.35 0 .14-.01.28-.04.42-.03.22.09.43.26.48zm-1.89 4.88c-.14-.16-.38-.21-.57-.1-.45.25-.97.37-1.48.34-.51-.03-1-.22-1.39-.55a3.83 3.83 0 01-1.06-1.9 1.7 1.7 0 00-.92-1.06 1.7 1.7 0 00-1.38.07c-.2.1-.31.32-.3.55.05.49.23.95.52 1.33.29.38.68.67 1.13.84a1.73 1.73 0 001.41-.09l1.83-.99c.19-.1.25-.34.13-.53l-.9-1.22c-.1-.13-.1-.32 0-.45zm-.82-4.14c.2-.08.33-.28.32-.5a3.85 3.85 0 01.32-1.51c.21-.44.54-.81.94-1.07.44-.29.96-.44 1.49-.44a1.71 1.71 0 001.23-.52c.16-.18.23-.42.2-.67a1.69 1.69 0 00-.59-1.08c-.46-.35-1.03-.54-1.61-.53a3.83 3.83 0 00-2.82 1.39 1.7 1.7 0 00-.33 1.37l.63 1.98c.06.2.25.32.45.29l.92-.3c.18-.06.3-.23.28-.42zm6.27 1.94c-.21.04-.36.21-.37.42-.02.48-.19.95-.49 1.33-.3.38-.7.66-1.17.8-.46.14-.96.14-1.42.01a1.71 1.71 0 00-1.37.44 1.7 1.7 0 00-.47 1.24c.02.22.14.42.34.5a1.71 1.71 0 001.44-.15l1.7-1.11c.18-.12.21-.37.07-.54l-1.09-1.29c-.11-.13-.1-.32.02-.45z" />
  </svg>
);

// Claude Icon SVG
const ClaudeIcon = () => (
  <svg className="w-4 h-4 text-[#D97754]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3.5c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V5c0-.8-.7-1.5-1.5-1.5zm-5.3 3.3c-.6-.6-1.5-.6-2.1 0s-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0s.6-1.5 0-2.1L6.7 6.8zm10.6 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1s1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1s-1.5-.6-2.1 0zM5 12c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5S8.8 12 8 12H5zm11 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5S19.8 12 19 12h-3zm-9.3 5.2l-2.1 2.1c-.6.6-.6 1.5 0 2.1s1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1s-1.5-.6-2.1 0zm6.6 0c-.6-.6-1.5-.6-2.1 0s-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0s.6-1.5 0-2.1l-2.1-2.1z" />
  </svg>
);

// Meta Icon SVG
const MetaIcon = () => (
  <svg className="w-4.5 h-4.5 text-[#0668E1]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.42 6.84c-1.39 0-2.6.49-3.42 1.34-.82-.85-2.03-1.34-3.42-1.34-2.88 0-5.22 2.45-5.22 5.48s2.34 5.48 5.22 5.48c1.39 0 2.6-.49 3.42-1.34.82.85 2.03 1.34 3.42 1.34 2.88 0 5.22-2.45 5.22-5.48s-2.34-5.48-5.22-5.48zm-6.84 8.78c-1.74 0-3.15-1.48-3.15-3.3s1.41-3.3 3.15-3.3c1.74 0 3.15 1.48 3.15 3.3s-1.41 3.3-3.15 3.3zm6.84 0c-1.74 0-3.15-1.48-3.15-3.3s1.41-3.3 3.15-3.3c1.74 0 3.15 1.48 3.15 3.3s-1.41 3.3-3.15 3.3z" />
  </svg>
);

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
            className="absolute w-[90%] h-[90%] border border-white/5 rounded-full"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute w-[65%] h-[65%] border border-white/5 rounded-full"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="absolute w-[40%] h-[40%] border border-white/10 rounded-full"
          ></motion.div>

          {/* Orbiting Icons */}
          
          {/* Inner Orbit (40%): Google & Meta */}
          <motion.div
            animate={{ rotate: [30, 30 - 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute w-[40%] h-[40%]"
          >
            {/* Google */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10">
              <motion.div
                animate={{ rotate: [-30, -30 + 360] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(66,133,244,0.3)]"
              >
                <GoogleIcon />
              </motion.div>
            </div>
            {/* Meta */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10">
              <motion.div
                animate={{ rotate: [-30, -30 + 360] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(6,104,225,0.3)]"
              >
                <MetaIcon />
              </motion.div>
            </div>
          </motion.div>

          {/* Middle Orbit (65%): Search & ChatGPT */}
          <motion.div
            animate={{ rotate: [-45, 360 - 45] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute w-[65%] h-[65%]"
          >
            {/* Search */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10">
              <motion.div
                animate={{ rotate: [45, 45 - 360] }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                <Search className="w-4 h-4 text-blue-500" />
              </motion.div>
            </div>
            {/* ChatGPT */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10">
              <motion.div
                animate={{ rotate: [45, 45 - 360] }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(16,163,127,0.3)]"
              >
                <ChatGPTIcon />
              </motion.div>
            </div>
          </motion.div>

          {/* Outer Orbit (90%): Claude & CPU */}
          <motion.div
            animate={{ rotate: [90, 90 - 360] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute w-[90%] h-[90%]"
          >
            {/* Claude */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10">
              <motion.div
                animate={{ rotate: [-90, -90 + 360] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(217,119,84,0.3)]"
              >
                <ClaudeIcon />
              </motion.div>
            </div>
            {/* Cpu */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10">
              <motion.div
                animate={{ rotate: [-90, -90 + 360] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
              </motion.div>
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
