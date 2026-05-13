import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Globe,
  TrendingUp,
  Smartphone,
  CheckCircle2,
  Search,
  Users,
  Zap,
  ShieldCheck,
  ArrowRight,
  ShoppingCart,
  LayoutTemplate,
  Wrench,
  Server,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Eye,
  MousePointerClick,
  Award,
  Star,
} from "lucide-react";
import { useState } from "react";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ─── Data ─── */
const whyChoose = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Custom Tailored Code",
    desc: "No bloated templates. We write clean, optimized code that perfectly fits your specific business requirements.",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile-First Design",
    desc: "Flawless user experiences across all devices. We ensure your site looks and functions perfectly on mobile.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast Speed",
    desc: "Optimized for core web vitals. We build blazing fast websites that keep visitors engaged and reduce bounce rates.",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "SEO-Optimized Architecture",
    desc: "Built from the ground up with SEO best practices, ensuring search engines can easily crawl and rank your site.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Enterprise-Grade Security",
    desc: "Robust protection against vulnerabilities, regular backups, and secure coding practices to keep your data safe.",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Easy Content Management",
    desc: "Intuitive backend systems (like WordPress) customized for you, making future updates a breeze without coding.",
  },
];

const services = [
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Custom WordPress Development",
    desc: "Bespoke, highly customizable WordPress websites built from scratch, offering full control and scalability.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
  },
  {
    icon: <ShoppingCart className="w-7 h-7" />,
    title: "WooCommerce & E-Commerce",
    desc: "High-converting online stores with secure payment gateways, inventory management, and seamless checkout flows.",
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
  },
  {
    icon: <LayoutTemplate className="w-7 h-7" />,
    title: "UI/UX & Landing Page Design",
    desc: "Data-driven, aesthetically pleasing landing pages designed specifically to maximize your conversion rates.",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Website Redesign",
    desc: "Transform your outdated website into a modern, fast, and lead-generating machine without losing SEO juice.",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
  },
  {
    icon: <Code2 className="w-7 h-7" />,
    title: "Custom Web Applications",
    desc: "Complex, scalable web apps built with modern frameworks (React, Next.js) for specialized business logic.",
    color: "from-indigo-500/20 to-violet-500/20",
    border: "border-indigo-500/30",
  },
  {
    icon: <Server className="w-7 h-7" />,
    title: "Maintenance & Security",
    desc: "Ongoing support, security monitoring, plugin updates, and performance tuning to keep your site running smoothly.",
    color: "from-rose-500/20 to-pink-500/20",
    border: "border-rose-500/30",
  },
];

const industries = [
  "Technology & SaaS",
  "E-Commerce & Retail",
  "Healthcare & Clinics",
  "Corporate & B2B",
  "Education & EdTech",
  "Real Estate",
  "Travel & Hospitality",
  "Agencies & Consultants",
  "Legal & Financial",
  "Food & Restaurants",
  "Automotive",
  "Non-Profit & NGO",
];

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We analyze your business goals, target audience, and competitors to define the perfect technical stack and sitemap.",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/30",
  },
  {
    num: "02",
    title: "UI/UX Prototyping",
    desc: "We create wireframes and high-fidelity mockups, giving you a visual representation of the website before coding begins.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/30",
  },
  {
    num: "03",
    title: "Development & Coding",
    desc: "Our developers bring the designs to life using clean, semantic, and highly optimized code, ensuring cross-browser compatibility.",
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/30",
  },
  {
    num: "04",
    title: "Testing & QA",
    desc: "Rigorous testing across devices, speed optimization, security checks, and SEO audits are performed to ensure flawlessness.",
    color: "text-pink-400",
    bg: "bg-pink-400/10 border-pink-400/30",
  },
  {
    num: "05",
    title: "Launch & Training",
    desc: "We deploy the website to your live server, connect analytics, and provide training on how to manage your new content system.",
    color: "text-neon-green",
    bg: "bg-neon-green/10 border-neon-green/30",
  },
];

const portfolio = [
  {
    type: "E-Commerce Platform",
    client: "StyleHub BD",
    title: "High-Volume WooCommerce Store",
    preview:
      "A blazing fast custom WooCommerce build handling 10k+ daily visitors with a custom inventory sync and checkout flow.",
    tag: "Retail",
    color: "border-blue-500/30 bg-blue-500/5",
    tagColor: "bg-blue-500/20 text-blue-400",
  },
  {
    type: "Corporate Website",
    client: "NextGen Tech",
    title: "B2B SaaS Corporate Presence",
    preview:
      "A sleek, highly animated React/Next.js corporate site that increased lead generation by 65% through optimized funnels.",
    tag: "Technology",
    color: "border-purple-500/30 bg-purple-500/5",
    tagColor: "bg-purple-500/20 text-purple-400",
  },
  {
    type: "Web Application",
    client: "MedSync",
    title: "Patient Booking & Management Portal",
    preview:
      "A secure, HIPAA-compliant custom portal for booking appointments, managing records, and processing payments securely.",
    tag: "Healthcare",
    color: "border-emerald-500/30 bg-emerald-500/5",
    tagColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    type: "Website Redesign",
    client: "Elite Estates",
    title: "Real Estate Property Listing Site",
    preview:
      "Complete overhaul of an outdated property site into a modern, searchable platform with interactive maps and fast loading times.",
    tag: "Real Estate",
    color: "border-orange-500/30 bg-orange-500/5",
    tagColor: "bg-orange-500/20 text-orange-400",
  },
];

const metrics = [
  { icon: <Zap className="w-8 h-8" />, value: "<1.5s", label: "Average Page Load Time", color: "text-neon-green" },
  { icon: <ShieldCheck className="w-8 h-8" />, value: "99.9%", label: "Uptime Guarantee", color: "text-cyan-400" },
  { icon: <Globe className="w-8 h-8" />, value: "100+", label: "Websites Launched", color: "text-blue-400" },
  { icon: <TrendingUp className="w-8 h-8" />, value: "45%", label: "Average Conversion Increase", color: "text-purple-400" },
  { icon: <Award className="w-8 h-8" />, value: "100/100", label: "Google PageSpeed Scores", color: "text-pink-400" },
  { icon: <Users className="w-8 h-8" />, value: "50+", label: "Happy Enterprise Clients", color: "text-orange-400" },
];

const testimonials = [
  {
    quote:
      "WeBestOne didn't just build a website; they built a digital engine for our business. The new site is incredibly fast, looks stunning, and our online sales have doubled since the launch.",
    name: "Tariq Mahmud",
    role: "Founder, StyleHub BD",
    rating: 5,
  },
  {
    quote:
      "Their understanding of UI/UX and technical architecture is unmatched. They transformed our complex requirements into a seamless, user-friendly web application that our clients love.",
    name: "Sarah Ahmed",
    role: "Product Manager, NextGen Tech",
    rating: 5,
  },
  {
    quote:
      "We had an outdated site that was hurting our SEO. WeBestOne rebuilt it from scratch, keeping all our SEO juice intact while drastically improving the design and speed. Highly recommended.",
    name: "Kamrul Islam",
    role: "CEO, Elite Estates",
    rating: 5,
  },
];

const faqs = [
  {
    q: "How long does it take to build a custom website?",
    a: "A standard corporate website usually takes 3-5 weeks from discovery to launch. Complex e-commerce sites or custom web applications may take 6-12 weeks depending on the features required.",
  },
  {
    q: "Do you use pre-made templates or build from scratch?",
    a: "We specialize in custom design and development. While we can work with templates if requested to save budget, we strongly recommend custom builds for better performance, uniqueness, and scalability.",
  },
  {
    q: "Will my website be mobile-friendly and responsive?",
    a: "Absolutely. We follow a mobile-first approach. Your website will adapt seamlessly to look and function perfectly on smartphones, tablets, and desktops.",
  },
  {
    q: "Do you provide hosting and ongoing maintenance?",
    a: "Yes! We offer premium, secure hosting solutions and dedicated maintenance packages to ensure your website remains updated, secure, and fast long after it's launched.",
  },
  {
    q: "Will the website be optimized for SEO?",
    a: "Yes. All our websites are built with semantic HTML, optimized media, fast loading speeds, and proper metadata structures to give you the best possible foundation for search engine rankings.",
  },
  {
    q: "Can I easily update the content myself?",
    a: "Yes. We integrate user-friendly Content Management Systems (like WordPress) and provide you with comprehensive training so you can easily update text, images, and blogs without needing to code.",
  },
];

/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      onClick={() => setOpen((v) => !v)}
      className="border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-blue-500/30 transition-colors duration-300 bg-white/[0.02]"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-semibold text-white text-sm md:text-base">{q}</p>
        {open ? (
          <ChevronUp className="w-5 h-5 text-blue-400 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="mt-3 text-neutral-400 text-sm leading-relaxed overflow-hidden"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function WordpressDevelopmentPage() {
  return (
    <main className="relative min-h-screen text-white bg-black overflow-hidden">
      {/* Global background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
      </div>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="space-y-7">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              High-Performance Web Solutions
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight"
            >
              We Build Websites That{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">
                Load Faster & Sell More
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-neutral-400 text-base leading-relaxed">
                At WeBestOne, we engineer digital experiences. We build{" "}
                <span className="text-white font-semibold">custom websites and applications</span> that are 
                <span className="text-blue-400 font-semibold"> fast, secure, and infinitely scalable</span>. 
                Our expert development team turns complex requirements into sleek, highly-converting platforms.
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed">
                From bespoke WordPress themes and robust WooCommerce stores to cutting-edge React web applications, 
                we craft technical solutions that elevate your brand and dominate search rankings through{" "}
                <span className="text-neutral-300">superior architecture</span>.
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
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-500 text-white font-bold rounded-full shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_40px_rgba(59,130,246,0.55)] hover:scale-105 transition-all duration-300 text-sm"
              >
                Discuss Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-neutral-300 font-medium hover:border-white/30 hover:text-white transition-all duration-300 text-sm"
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
              {["100+ Sites Launched", "React & WP Experts", "99.9% Uptime", "SEO-Ready"].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-neutral-500 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  {b}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Floating Cards & Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative h-[400px] lg:h-[500px] flex items-center justify-center w-full mt-10 lg:mt-0"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Main Center Image */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <img 
                src="/web_dev_hero.png" 
                alt="Web Development Mockup" 
                className="w-[90%] md:w-[80%] lg:w-full h-auto max-h-full object-contain mix-blend-lighten opacity-90 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-[pulse_6s_ease-in-out_infinite]" 
              />
            </div>

            {/* ── Card 1: Performance Score ── */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[5%] left-0 sm:-left-4 md:-left-8 w-[200px] sm:w-[240px] p-3 sm:p-4 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold">Performance Score</p>
                  <p className="text-green-400 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase">Lightning Fast</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-1 sm:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "99%" }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-neutral-500 text-[9px] sm:text-[10px]">Google PageSpeed</span>
                <span className="text-green-400 text-[9px] sm:text-[10px] font-mono">99/100</span>
              </div>
            </motion.div>

            {/* ── Card 2: Uptime Security ── */}
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[5%] right-0 sm:-right-4 md:-right-8 w-[200px] sm:w-[240px] p-3 sm:p-4 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold">Server Uptime</p>
                  <p className="text-blue-400 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase">Secure & Stable</p>
                </div>
              </div>
              <div className="h-1 sm:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "99.9%" }}
                  transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-neutral-500 text-[9px] sm:text-[10px]">Annual Uptime</span>
                <span className="text-blue-400 text-[9px] sm:text-[10px] font-mono">99.99%</span>
              </div>
            </motion.div>

            {/* ── Card 3: Conversion Rate (small) ── */}
            <motion.div
              animate={{ y: [-5, 10, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[40%] right-[-5%] md:-right-6 w-[160px] sm:w-[180px] p-3 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 hidden sm:block"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Conversions</p>
                  <p className="text-purple-400 text-[8px] font-bold tracking-widest uppercase">Growing</p>
                </div>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-neutral-500 text-[9px]">Sales Lift</span>
                <span className="text-purple-400 text-[9px] font-mono">+45%</span>
              </div>
            </motion.div>

            {/* ── Floating icon badges ── */}
            <motion.div
              animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] right-[20%] w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)] z-10"
            >
              <Code2 className="w-5 h-5 text-cyan-400" />
            </motion.div>

            <motion.div
              animate={{ x: [0, -6, 0], y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[15%] left-[20%] w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center z-10"
            >
              <LayoutTemplate className="w-4 h-4 text-blue-500" />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. WHY CHOOSE WEBESTIONE
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-blue-500/60" />
              <span className="text-blue-500 font-mono text-xs tracking-[0.25em] uppercase">Why Choose Us</span>
              <span className="w-8 h-[1px] bg-blue-500/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Engineering Excellence,{" "}
              <span className="text-blue-500">Not Just Templates</span>
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              We build technically robust, scalable, and beautifully designed digital platforms that drive your business forward.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyChoose.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-blue-500/30 hover:bg-blue-500/[0.03] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. CORE SERVICES
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-cyan-400/60" />
              <span className="text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase">Our Capabilities</span>
              <span className="w-8 h-[1px] bg-cyan-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Comprehensive Web{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Development Solutions</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`p-6 rounded-2xl border ${s.border} bg-gradient-to-br ${s.color} hover:scale-[1.02] transition-all duration-300 group`}
              >
                <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. INDUSTRIES
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-purple-400/60" />
              <span className="text-purple-400 font-mono text-xs tracking-[0.25em] uppercase">Industries We Serve</span>
              <span className="w-8 h-[1px] bg-purple-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Platforms Built For{" "}
              <span className="text-purple-400">Your Specific Market</span>
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Our development team creates highly specialized technical solutions tailored to industry-specific demands.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-2 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-purple-400/30 hover:bg-purple-400/[0.04] transition-all duration-300 group"
              >
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-neutral-300 text-sm font-medium">{ind}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. OUR PROCESS
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-pink-400/60" />
              <span className="text-pink-400 font-mono text-xs tracking-[0.25em] uppercase">Agile Workflow</span>
              <span className="w-8 h-[1px] bg-pink-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Our <span className="text-pink-400">5-Step Development</span> Lifecycle
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              A transparent, agile process ensuring on-time delivery and pixel-perfect execution of your vision.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-400 via-cyan-400 via-purple-400 via-pink-400 to-neon-green opacity-30 hidden sm:block" />

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Number bubble */}
                  <div className={`shrink-0 w-14 h-14 rounded-2xl border ${step.bg} flex items-center justify-center font-mono font-bold text-lg ${step.color} z-10 relative`}>
                    {step.num}
                  </div>
                  {/* Content */}
                  <div className={`flex-1 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-colors duration-300 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                    <h3 className={`text-white font-bold text-lg mb-2 ${step.color}`}>{step.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. DEVELOPMENT PORTFOLIO
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-cyan-400/60" />
              <span className="text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase">Featured Work</span>
              <span className="w-8 h-[1px] bg-cyan-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Digital Experiences <span className="text-cyan-400">We've Shipped</span>
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Explore some of our recent web development projects and the technical challenges we solved.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {portfolio.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`p-6 rounded-2xl border ${p.color} hover:scale-[1.01] transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.tagColor}`}>{p.type}</span>
                  <span className="text-xs text-neutral-500 border border-white/10 px-3 py-1 rounded-full">{p.tag}</span>
                </div>
                <p className="text-neutral-400 text-xs font-mono mb-2">CLIENT: {p.client}</p>
                <h3 className="text-white font-bold text-lg mb-3 leading-snug">{p.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{p.preview}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-cyan-400/40 text-cyan-400 font-semibold hover:bg-cyan-400/10 transition-all duration-300"
            >
              View Full Tech Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. RESULTS / METRICS
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-blue-500/60" />
              <span className="text-blue-500 font-mono text-xs tracking-[0.25em] uppercase">By The Numbers</span>
              <span className="w-8 h-[1px] bg-blue-500/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Metrics That <span className="text-blue-500">Matter</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl border border-white/5 bg-white/[0.01]"
              >
                <div className={`p-3 rounded-xl bg-white/5 ${m.color}`}>{m.icon}</div>
                <h4 className={`text-4xl font-black ${m.color}`}>{m.value}</h4>
                <p className="text-neutral-400 text-sm font-medium">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-purple-400/60" />
              <span className="text-purple-400 font-mono text-xs tracking-[0.25em] uppercase">Client Love</span>
              <span className="w-8 h-[1px] bg-purple-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              What Our Tech <span className="text-purple-400">Partners Say</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-white/10 bg-black hover:border-purple-500/30 transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-neutral-300 leading-relaxed mb-8">"{t.quote}"</p>
                </div>
                <div>
                  <p className="text-white font-bold">{t.name}</p>
                  <p className="text-neutral-500 text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. FAQS & CTA
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-blue-500/60" />
              <span className="text-blue-500 font-mono text-xs tracking-[0.25em] uppercase">Got Questions?</span>
              <span className="w-8 h-[1px] bg-blue-500/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Frequently Asked <span className="text-blue-500">Questions</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-4 mb-24"
          >
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>

          {/* CTA Box */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
            <div className="relative p-12 text-center space-y-6">
              <h2 className="text-4xl font-bold text-white">Ready to Build Your Next Digital Platform?</h2>
              <p className="text-blue-100 max-w-2xl mx-auto text-lg">
                Let's discuss your project requirements and architect a robust web solution that drives real business growth.
              </p>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
                >
                  Schedule a Tech Consultation <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
