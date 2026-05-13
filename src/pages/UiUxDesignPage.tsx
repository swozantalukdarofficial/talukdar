import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Awards from "../components/Awards";
import TestimonialSlider from "../components/TestimonialSlider";
import Counter from "../components/Counter";
import ProcessSection from "../components/ProcessSection";
import PortfolioSlider from "../components/PortfolioSlider";
import {
  MonitorSmartphone,
  Figma,
  Component,
  Wand2,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  Users,
  BoxSelect,
  Sparkles,
  CheckCircle2,
  Building2,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Search,
  Code2,
  ShieldCheck
} from "lucide-react";

/* ─── Data ─── */
const tools = [
  "Figma", "Sketch", "Adobe XD", "Framer", "Webflow", "Midjourney AI", "ChatGPT", "Miro", "InVision", "Protopie", "Zeplin", "Google Analytics"
];

const philosophy = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "User-Centric First",
    desc: "We design for the people who actually use your product, ensuring intuitive navigation and seamless workflows.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Data-Driven Decisions",
    desc: "We don't guess. We use heatmaps, A/B testing, and analytics to drive every single pixel and interaction.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Aesthetic Excellence",
    desc: "A beautiful UI builds immediate trust. We craft visually stunning interfaces that elevate your brand's perceived value.",
  },
];

const services = [
  {
    icon: <Component className="w-8 h-8 text-pink-400" />,
    title: "Design Systems",
    desc: "Scalable component libraries (Atoms, Molecules, Organisms) built in Figma for perfect developer handoff.",
    span: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-pink-900/20 to-black border-pink-500/20"
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6 text-violet-400" />,
    title: "Web & Mobile UI",
    desc: "Pixel-perfect interfaces for SaaS, Dashboards, and Apps.",
    span: "md:col-span-1 bg-black border-white/10"
  },
  {
    icon: <Search className="w-6 h-6 text-cyan-400" />,
    title: "Prototyping",
    desc: "Interactive, high-fidelity prototypes to test user flows.",
    span: "md:col-span-1 bg-black border-white/10"
  },
  {
    icon: <Wand2 className="w-8 h-8 text-yellow-400" />,
    title: "AI-Enhanced UX",
    desc: "Leveraging generative AI for dynamic layouts and personalized user journeys.",
    span: "md:col-span-2 bg-gradient-to-r from-neutral-900 to-black border-white/10"
  },
];

const stats = [
  { value: 400, suffix: "%", label: "Potential Conversion Lift", sub: "With optimized UX design" },
  { value: 88, suffix: "%", label: "Less Likely to Return", sub: "After a bad user experience" },
  { prefix: "$", value: 100, label: "Return on Investment", sub: "For every $1 invested in UX" },
  { value: 3, suffix: "x", label: "Faster Development", sub: "Using strict Design Systems" },
];

const industries = [
  { name: "SaaS & Tech", icon: <BoxSelect className="w-6 h-6 text-indigo-400" />, desc: "Complex dashboards, B2B software, and AI interfaces designed for maximum productivity." },
  { name: "E-Commerce", icon: <ShoppingBag className="w-6 h-6 text-pink-400" />, desc: "High-converting shopping experiences that reduce cart abandonment and boost sales." },
  { name: "FinTech", icon: <Briefcase className="w-6 h-6 text-cyan-400" />, desc: "Secure, trustworthy, and intuitive interfaces for banking, crypto, and financial tools." },
  { name: "Healthcare", icon: <HeartPulse className="w-6 h-6 text-rose-400" />, desc: "Accessible and clear UI for telemedicine, patient portals, and health tracking apps." },
  { name: "EdTech", icon: <GraduationCap className="w-6 h-6 text-yellow-400" />, desc: "Engaging and distraction-free learning management systems and course platforms." },
  { name: "Real Estate", icon: <Building2 className="w-6 h-6 text-emerald-400" />, desc: "Immersive property listings and seamless search experiences for buyers and agents." },
];

const faqs = [
  {
    q: "What tools do you use for UI/UX design?",
    a: "We primarily use Figma for UI design, prototyping, and design systems. We also leverage AI tools like Midjourney for ideation, and tools like Miro for UX flows.",
  },
  {
    q: "Do you design for both Web and Mobile?",
    a: "Yes, we create fully responsive web applications and native iOS/Android mobile app interfaces.",
  },
  {
    q: "Do you also do the development?",
    a: "We are a full-service agency. We can seamlessly transition your approved Figma designs into React, Next.js, or WordPress code.",
  },
  {
    q: "How long does a UI/UX project take?",
    a: "A typical medium-sized app or website design takes 3 to 6 weeks, depending on the complexity of the user flows and the number of screens.",
  },
];

const deliverables = [
  { title: "Full UI Audit", desc: "We analyze your current product for friction points and usability gaps before we start.", icon: <Search className="w-6 h-6 text-pink-400" /> },
  { title: "Weekly Syncs", desc: "Stay updated with live design reviews and collaborative Figma sessions every week.", icon: <Users className="w-6 h-6 text-purple-400" /> },
  { title: "Source Files", desc: "You get full ownership of the Figma source files, including the organized design system.", icon: <Figma className="w-6 h-6 text-indigo-400" /> },
  { title: "Dev Handoff", desc: "Detailed documentation and redlines to make development a breeze for your engineers.", icon: <Code2 className="w-6 h-6 text-emerald-400" /> },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      onClick={() => setOpen(!open)}
      className="border-b border-white/10 py-5 cursor-pointer group"
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-lg font-medium text-white group-hover:text-pink-400 transition-colors">{q}</h4>
        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all ${open ? 'bg-pink-500 border-pink-500 text-white rotate-180' : 'text-neutral-400'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-neutral-400 leading-relaxed pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function UiUxDesignPage() {
  const containerRef = useRef(null);
  
  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-pink-500/30">
      
      {/* Background Ambient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-600/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1: HERO
      ══════════════════════════════════════════ */}
      <section className="relative z-10 pt-40 pb-20 min-h-[95vh] flex flex-col items-center justify-center px-6">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-sm font-semibold tracking-wide backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4" />
              Award-Winning UI/UX Agency
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              Design That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                Captivates & Converts.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-lg"
            >
              We craft intuitive, data-driven, and visually stunning digital experiences. From complex SaaS dashboards to seamless e-commerce flows, we design for the user.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link to="/contact" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Start Design Project <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="#portfolio" className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors">
                View Prototypes
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative h-[500px] w-full perspective-1000"
          >
             <motion.div 
               animate={{ rotateY: [-5, 5, -5], rotateX: [5, -5, 5] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_80px_rgba(236,72,153,0.15)] flex flex-col overflow-hidden transform-gpu"
             >
                <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.01]">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                   </div>
                   <div className="flex gap-4">
                      <div className="h-2 w-12 rounded bg-white/20" />
                      <div className="h-2 w-12 rounded bg-white/20" />
                   </div>
                </div>
                <div className="flex-1 p-8 flex gap-6">
                   <div className="w-1/3 flex flex-col gap-4">
                      <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10" />
                      <div className="h-4 w-3/4 rounded bg-white/10" />
                      <div className="h-2 w-1/2 rounded bg-white/5" />
                   </div>
                   <div className="flex-1 flex flex-col gap-4">
                      <div className="h-32 w-full rounded-2xl bg-white/5 border border-white/10" />
                      <div className="flex gap-4">
                        <div className="h-20 flex-1 rounded-xl bg-white/5" />
                        <div className="h-20 flex-1 rounded-xl bg-white/5" />
                      </div>
                      <div className="mt-auto h-10 w-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
                   </div>
                </div>
             </motion.div>

             <motion.div 
               animate={{ x: [0, 150, 50, 0], y: [0, -50, 100, 0] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/2 left-1/4 z-30 pointer-events-none"
             >
               <div className="w-6 h-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black border-2 border-white transform rotate-[-20deg] shadow-lg" />
               <div className="ml-4 px-3 py-1 bg-pink-500 text-white text-[10px] font-bold rounded-full shadow-xl">
                 Designing...
               </div>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust: Awards & Certifications */}
      <Awards />

      {/* ══════════════════════════════════════════
          SECTION 2: MODERN TOOLS MARQUEE
      ══════════════════════════════════════════ */}
      <section className="py-10 border-y border-white/5 bg-white/[0.01] overflow-hidden relative z-10 flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20" />
        
        <div className="flex w-max items-center gap-10 md:gap-20 whitespace-nowrap px-10 animate-marquee text-neutral-500 font-bold text-xl md:text-3xl tracking-widest uppercase hover:[animation-play-state:paused]">
          {[...tools, ...tools].map((tool, i) => (
            <span key={i} className="hover:text-pink-400 transition-colors cursor-default">{tool}</span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3: CORE PHILOSOPHY
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Design <span className="text-purple-400">Philosophy</span></h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">We don't just make things look pretty. We architect experiences that solve complex user problems.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophy.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-neutral-900/40 border border-white/5 text-center group hover:bg-neutral-900 hover:border-purple-500/30 transition-all"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 group-hover:bg-purple-500/10 transition-all">
                  {p.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{p.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4: SERVICES BENTO
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">UI/UX <br /><span className="text-pink-400">Capabilities.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
            {services.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-3xl border overflow-hidden group ${item.span}`}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500" />
                
                {i === 0 && (
                  <div className="absolute top-10 right-10 w-48 h-48 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="w-full h-12 bg-pink-500/20 rounded border border-pink-500/40" />
                      <div className="w-full h-12 bg-purple-500/20 rounded border border-purple-500/40" />
                      <div className="col-span-2 h-8 bg-blue-500/20 rounded border border-blue-500/40" />
                      <div className="col-span-2 h-16 bg-white/10 rounded border border-white/20 flex items-center justify-center">
                         <span className="text-xs text-white/50 font-mono">Component_Button</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5: WHY DESIGN MATTERS (ROI)
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-16"
          >
            The True Value of <span className="text-cyan-400">Great Design</span>
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-600 mb-4">
                  <Counter 
                    value={stat.value} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                  />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{stat.label}</h4>
                <p className="text-xs text-neutral-500 uppercase tracking-widest">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      {/* ══════════════════════════════════════════
          SECTION 7: DESIGN SYSTEMS SHOWCASE
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Scalable <br /><span className="text-amber-400">Design Systems</span></h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              We don't just design pages; we build exhaustive component libraries. Colors, typography, spacing tokens, and atomic components all meticulously organized in Figma.
            </p>
            <ul className="space-y-4 mb-8">
              {["Atomic Design Principles", "Auto-Layout Mastery", "Interactive Variants", "Developer-Ready Tokens"].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  className="flex items-center gap-3 text-neutral-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-500" /> {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square w-full max-w-md mx-auto"
          >
             <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-[80px]" />
             <div className="relative z-10 h-full w-full bg-neutral-900 border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
                <div className="h-6 w-32 bg-white/10 rounded mb-4" />
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500" />
                  <div className="w-12 h-12 rounded-full bg-pink-500" />
                  <div className="w-12 h-12 rounded-full bg-amber-500" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                   <div className="px-4 py-2 rounded-lg bg-blue-500 text-white text-center text-sm font-medium">Primary Button</div>
                   <div className="px-4 py-2 rounded-lg border border-white/20 text-white text-center text-sm font-medium">Secondary</div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-black border border-white/5 space-y-3">
                   <div className="h-2 w-full bg-white/10 rounded" />
                   <div className="h-2 w-3/4 bg-white/10 rounded" />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT YOU GET: HIGH VALUE DELIVERABLES
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              What You <span className="text-pink-400">Actually Get</span>
            </motion.h2>
            <p className="text-neutral-400">We go beyond just 'screens'. We provide the full infrastructure for your product's success.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-pink-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PortfolioSlider />

      {/* ══════════════════════════════════════════
          INDUSTRIES WE SERVE
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Industries <span className="text-blue-400">We Serve</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral-400 max-w-2xl mx-auto"
            >
              From ambitious startups to enterprise giants, we design interfaces tailored to specific business goals and industry standards.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-neutral-900/40 border border-white/5 group hover:bg-neutral-900 hover:border-blue-500/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all">
                  {ind.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{ind.name}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm md:text-base">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSlider />

      {/* ══════════════════════════════════════════
          SATISFACTION & TRUST BANNER
      ══════════════════════════════════════════ */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-white/10 p-10 md:p-16 text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
           >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-pink-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Satisfaction Guarantee</h2>
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8">
                We don't stop until you're 100% satisfied. We offer unlimited revisions during the initial design phase and a dedicated project manager for seamless communication.
              </p>
              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                <div className="flex items-center gap-2 text-white font-medium text-sm md:text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 100% Satisfaction
                </div>
                <div className="flex items-center gap-2 text-white font-medium text-sm md:text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Transparent Pricing
                </div>
                <div className="flex items-center gap-2 text-white font-medium text-sm md:text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 24/7 Support
                </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 10: FAQS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Design <span className="text-neutral-500">FAQs</span></h2>
        <div className="border-t border-white/10">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 11: CTA
      ══════════════════════════════════════════ */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#87E65C]/20 bg-[#87E65C]/10 text-[#87E65C] text-sm font-medium mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Ready to Start?
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Let's Build Interfaces That <span className="text-[#87E65C] block md:inline">Grow</span><br className="hidden md:block" />
            <span className="text-[#87E65C]">Your Business</span>
          </h2>
          
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Whether you need a full app redesign, a comprehensive design system, or a high-converting website, our team is ready to deliver.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-8 py-4 bg-[#87E65C] text-black font-bold rounded-full hover:bg-[#87E65C]/90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(135,230,92,0.25)] flex items-center justify-center gap-2"
            >
              Request a Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all flex items-center justify-center"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
