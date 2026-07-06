import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2,
  Globe,
  TrendingUp,
  Search,
  Zap,
  ShieldCheck,
  ArrowRight,
  ShoppingCart,
  LayoutTemplate,
  Wrench,
  Server,
  ChevronDown,
  ChevronUp,
  Layers,
  Database,
  MonitorSmartphone,
  CheckCircle2,
  Star
} from "lucide-react";
import SEO from "../components/SEO";

/* ─── Data ─── */
const whyChoose = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Speed Optimization",
    desc: "Speed using WP Rocket, Cloudflare, and content delivery networks (CDN).",
    span: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-900/40 to-black border-blue-500/30",
    iconColor: "text-blue-400"
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Scalable Architecture",
    desc: "Scalability with clean architecture and optimized databases.",
    span: "md:col-span-1 bg-black border-white/10",
    iconColor: "text-yellow-400"
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6" />,
    title: "Usability & Design",
    desc: "Usability through structured layouts and responsive design.",
    span: "md:col-span-1 bg-black border-white/10",
    iconColor: "text-emerald-400"
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Search Visibility",
    desc: "SEO-ready builds using schema markup and XML sitemap integration.",
    span: "md:col-span-2 bg-gradient-to-r from-neutral-900 to-black border-white/10",
    iconColor: "text-purple-400"
  },
];

const services = [
  {
    title: "WooCommerce Solutions",
    desc: "WooCommerce development for ecommerce growth. Scalable stores with custom checkout flows.",
    icon: <ShoppingCart className="w-10 h-10" />,
  },
  {
    title: "Multilingual Setups",
    desc: "Multilingual setups using WPML to reach a global audience with localized content.",
    icon: <Globe className="w-10 h-10" />,
  },
  {
    title: "Secure Environments",
    desc: "Secure environments using WordPress security plugins like Wordfence and Sucuri.",
    icon: <ShieldCheck className="w-10 h-10" />,
  },
  {
    title: "Performance Optimization",
    desc: "Performance optimization using caching layers and hosting environments like SiteGround and WP Engine.",
    icon: <Server className="w-10 h-10" />,
  },
];

const processSteps = [
  { num: "01", title: "Briefing", desc: "We define structure, business goals, and technical direction." },
  { num: "02", title: "Design", desc: "We build layouts using Elementor, Elementor Pro, and Divi Builder." },
  { num: "03", title: "Development", desc: "Structured environments using WP themes, ACF, and scalable frameworks." },
  { num: "04", title: "Testing", desc: "We test performance, responsiveness using PageSpeed Insights and real devices." },
];

const portfolio = [
  {
    client: "TechStore BD",
    title: "WooCommerce Electronics Hub",
    type: "E-Commerce",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    client: "Daily News Insight",
    title: "High-Traffic News Portal",
    type: "Publishing",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20"
  },
  {
    client: "Learn Academy",
    title: "Custom LMS Integration",
    type: "Education",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    client: "Elite Estates",
    title: "Real Estate Listing Platform",
    type: "Corporate",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20"
  }
];

const whyPartner = [
  {
    num: "01",
    title: "Built for performance and stability",
    desc: "Every layer is optimized using caching systems like Varnish Cache, CDN networks, and performance tuning."
  },
  {
    num: "02",
    title: "Ongoing support and optimization",
    desc: "We maintain and improve your website using tools like Jetpack, performance tracking systems, and continuous updates."
  },
  {
    num: "03",
    title: "Results-driven development",
    desc: "From structure to speed, every decision supports rankings, engagement, and conversions."
  }
];

const faqs = [
  {
    q: "How long does WordPress website development take?",
    a: "Most projects take 4 to 8 weeks depending on complexity, integrations like WooCommerce, and custom features.",
  },
  {
    q: "Can I manage my website after development?",
    a: "Yes. We structure your backend using tools like Elementor so updates are simple and controlled.",
  },
  {
    q: "Do you offer WordPress plugin development?",
    a: "Yes. We build and customize plugins to extend functionality based on your business needs.",
  },
  {
    q: "Can you improve my existing WordPress website?",
    a: "Yes. We optimize speed, usability, and structure using audits, caching, and performance tools.",
  },
  {
    q: "Why choose WordPress over platforms like Shopify?",
    a: "WordPress offers flexibility, control, and scalability, while platforms like Shopify are more limited for customization-heavy environments.",
  },
  {
    q: "Do you provide ongoing optimization and maintenance?",
    a: "Yes. We continuously improve performance, security, and usability after launch.",
  },
  {
    q: "What makes your WordPress website development services different?",
    a: "We build structured systems, not just websites, focusing on performance, usability, and long-term scalability.",
  },
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
        <h4 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">{q}</h4>
        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all ${open ? 'bg-blue-500 border-blue-500 text-white rotate-180' : 'text-neutral-400'}`}>
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

export default function WordpressServicePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <SEO 
        title="WordPress website development services | AI powered Agency" 
        description="Advanced WordPress website development services featuring custom WordPress themes, security plugins and growth-focused WordPress web development agency strategies." 
      />
      
      {/* ══════════════════════════════════════════
          1. 2-COLUMN HERO WITH ABSTRACT MOCKUP
      ══════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex items-center pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="space-y-4 md:space-y-5">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 text-xs font-medium uppercase tracking-wider"
            >
              <Database className="w-3.5 h-3.5 text-blue-500" />
              Enterprise WordPress Solutions
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black leading-[1.15] tracking-tight"
            >
              WordPress Website{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">
                Development Services
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <h2 className="text-lg font-semibold text-white">Built for performance, structure, and long-term growth</h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                Most WordPress websites exist. <span className="text-white font-semibold">Very few actually perform.</span> That is the difference. At WebestOne, our WordPress website development services are built as systems that support speed, usability, and scalability.
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed">
                As a professional WordPress development agency, we combine structure, clean code, and performance optimization to create websites that do more than sit online. They work.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-bold rounded-full shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_40px_rgba(37,99,235,0.55)] hover:scale-105 transition-all duration-300 text-sm"
              >
                Discuss Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-neutral-300 font-medium hover:border-white/30 hover:text-white transition-all duration-300 text-sm"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-5 pt-1"
            >
              {["Custom Themes", "WooCommerce", "ACF Pro Integration", "Secure"].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-neutral-500 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  {b}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: UI Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative h-[420px] lg:h-[500px] flex items-center justify-center w-full mt-10 lg:mt-0"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Abstract Floating UI Dashboard */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[95%] sm:w-[85%] max-w-lg z-20"
            >
              <div className="relative aspect-[4/3] bg-neutral-950 rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(37,99,235,0.15)] flex flex-col">
                {/* Inner wrapper for overflow-hidden content */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl flex flex-col">
                  {/* Fake browser header */}
                  <div className="h-10 bg-neutral-900 border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <div className="ml-4 h-5 w-48 bg-black/50 rounded-md border border-white/5 flex items-center px-2">
                      <span className="text-[9px] text-neutral-500 font-mono">yoursite.com/wp-admin</span>
                    </div>
                  </div>
                  {/* Fake Content */}
                  <div className="flex-1 flex p-4 gap-4 relative">
                     {/* Sidebar */}
                     <div className="w-1/4 hidden sm:flex flex-col gap-2">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className={`h-6 rounded-md ${i === 0 ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-white/5'}`} />
                        ))}
                     </div>
                     {/* Main Body */}
                     <div className="flex-1 flex flex-col gap-4">
                        <div className="flex gap-4">
                           <div className="h-24 flex-1 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-3 flex flex-col justify-between">
                              <div className="w-6 h-6 rounded-full bg-blue-500/20" />
                              <div>
                                <div className="h-4 w-16 bg-blue-400/20 rounded mb-1.5" />
                                <div className="h-1.5 w-24 bg-white/10 rounded" />
                              </div>
                           </div>
                           <div className="h-24 flex-1 bg-white/5 border border-white/5 rounded-xl hidden md:block" />
                        </div>
                        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl" />
                     </div>
                  </div>
                </div>

                {/* Floating Overlay Badge 1 - Outside overflow-hidden */}
                <motion.div 
                  animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 px-4 py-3 bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl flex items-center gap-3 z-30"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                    <Zap className="text-green-400 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white font-bold">Speed Score</p>
                    <p className="text-[10px] text-green-400 font-mono">99/100 A+</p>
                  </div>
                </motion.div>
                
                {/* Floating Overlay Badge 2 - Outside overflow-hidden */}
                <motion.div 
                  animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 px-4 py-3 bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl flex items-center gap-3 z-30"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                    <ShieldCheck className="text-blue-400 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white font-bold">System Secure</p>
                    <p className="text-[10px] text-blue-400 font-mono">Hardened</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. BENTO BOX: WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Your business deserves <br /><span className="text-blue-500">more than a basic setup.</span></h2>
            <p className="text-neutral-400 max-w-lg">Most WordPress websites fail for a simple reason. They rely on default themes, unstructured layouts, and no real performance planning. Our services go beyond templates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
            {whyChoose.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-3xl border overflow-hidden group ${item.span}`}
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500" />
                
                {/* Decorative Visuals for Large Card (Index 0) */}
                {i === 0 && (
                  <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-6 md:top-12 right-[5%] md:right-[15%] w-56 md:w-72 h-32 md:h-40 border border-white/10 rounded-xl flex flex-col p-4 md:p-5 gap-3 bg-white/[0.02] backdrop-blur-sm transform rotate-6 group-hover:rotate-3 transition-transform duration-700 shadow-2xl">
                      <div className="flex gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      </div>
                      <div className="w-3/4 h-2 bg-blue-400/20 rounded-full" />
                      <div className="w-1/2 h-2 bg-white/10 rounded-full" />
                      <div className="w-5/6 h-2 bg-white/10 rounded-full" />
                      <div className="w-2/3 h-2 bg-white/5 rounded-full mt-2" />
                    </div>
                  </div>
                )}

                {/* Decorative Visuals for Large Card (Index 3) */}
                {i === 3 && (
                  <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                     <div className="absolute right-0 bottom-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 transform translate-x-1/4 translate-y-1/4">
                       <Search className="w-64 h-64 text-purple-500" />
                     </div>
                  </div>
                )}

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  <div className="mt-8 md:mt-0">
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm md:text-base">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. STICKY SCROLL SERVICES
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          
          {/* Sticky Left Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Expertise <br />Beyond <span className="text-blue-500">Themes.</span></h2>
              <p className="text-neutral-400 mb-8 leading-relaxed">
                We handle the heavy lifting. From custom PHP development to headless API integrations, our engineering team covers the full spectrum of WordPress capabilities.
              </p>
              <div className="flex flex-wrap gap-3">
                {["PHP 8+", "Gutenberg", "ACF Pro", "REST API", "WooCommerce", "Redis"].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-white/10 text-xs text-neutral-300 bg-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:w-2/3 space-y-6">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="p-8 md:p-10 rounded-3xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-900 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. HORIZONTAL PROCESS TRACKER
      ══════════════════════════════════════════ */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">WordPress Development <span className="text-blue-500">Workflow</span></h2>
            <p className="text-neutral-400">This is not random execution. It is a controlled build process designed to remove risk and support performance.</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-8 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative z-10">
              {processSteps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-full bg-black border-2 border-white/10 flex items-center justify-center text-xl font-bold font-mono text-neutral-500 mb-6 group-hover:border-blue-500 group-hover:text-blue-400 transition-colors shadow-xl">
                    {step.num}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4.5 WHY PARTNER WITH US
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why partner with <span className="text-blue-500">WebestOne</span></h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">Our WordPress website development services are built to ensure your website performs from day one and continues to improve over time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyPartner.map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-blue-500/30 transition-colors group">
                <div className="text-5xl font-black text-white/5 mb-6 group-hover:text-blue-500/10 transition-colors">{item.num}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. MASONRY PORTFOLIO CARDS
      ══════════════════════════════════════════ */}
      <section id="portfolio" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Recent <span className="text-cyan-400">Shipments</span></h2>
              <p className="text-neutral-400">Explore complex WordPress architectures we've successfully deployed.</p>
            </div>
            <Link to="/contact-us" className="text-blue-400 font-bold hover:underline flex items-center gap-2">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`p-8 md:p-12 rounded-3xl border ${item.border} ${item.bg} flex flex-col justify-end min-h-[400px] relative overflow-hidden group`}
              >
                {/* Abstract Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none" />

                {/* Decorative Abstract Visuals for Portfolio Cards */}
                <div className="absolute top-8 md:top-12 left-8 md:left-12 right-8 md:right-12 bottom-32 md:bottom-40 border border-white/5 rounded-2xl bg-black/40 shadow-2xl overflow-hidden flex flex-col transform group-hover:scale-[1.02] transition-transform duration-500 pointer-events-none">
                   {/* Fake header */}
                   <div className="h-6 bg-white/5 border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0">
                     <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                     <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                     <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                   </div>
                   {/* Fake content body */}
                   <div className="flex-1 p-4 md:p-6 flex gap-4 md:gap-6 opacity-50">
                      <div className="w-1/3 bg-white/5 rounded-lg border border-white/5" />
                      <div className="flex-1 flex flex-col gap-3">
                         <div className="h-3 bg-white/10 rounded w-3/4" />
                         <div className="h-3 bg-white/5 rounded w-1/2" />
                         <div className="mt-auto flex-1 bg-white/5 rounded-lg border border-white/5" />
                      </div>
                   </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-0 pointer-events-none" />
                
                <div className="relative z-10 pt-32">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs text-white font-medium mb-4">
                    {item.type}
                  </span>
                  <p className="text-sm font-mono text-neutral-300 mb-2 uppercase tracking-wider">{item.client}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. FAQ ACCORDION (MINIMAL)
      ══════════════════════════════════════════ */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Common <span className="text-neutral-500">Queries</span></h2>
        <div className="border-t border-white/10">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. GIANT CTA BLOCK (SCREENSHOT DESIGN)
      ══════════════════════════════════════════ */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#87E65C]/20 bg-[#87E65C]/10 text-[#87E65C] text-sm font-medium mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Ready to perform, scale, and adapt
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            We move with speed.<br className="hidden md:block" />
            <span className="text-[#87E65C]">Your business keeps up.</span>
          </h2>
          
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Delays cost visibility, leads, and growth. As a WordPress web development agency, we deliver systems that work.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
            {["Unlimited revisions", "Dedicated manager", "Clear timelines", "Transparent communication"].map(feature => (
              <div key={feature} className="flex items-center gap-2 text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#87E65C]" />
                {feature}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <Link 
              to="/contact-us" 
              className="w-full sm:w-auto px-8 py-4 bg-[#87E65C] text-black font-bold rounded-full hover:bg-[#87E65C]/90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(135,230,92,0.25)] flex items-center justify-center gap-2"
            >
              Get a quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
