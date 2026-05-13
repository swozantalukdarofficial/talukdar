import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PenTool,
  Globe,
  TrendingUp,
  Target,
  CheckCircle2,
  Search,
  Users,
  Zap,
  Star,
  ArrowRight,
  FileText,
  ShoppingCart,
  Mail,
  BookOpen,
  Megaphone,
  ChevronDown,
  ChevronUp,
  Quote,
  BarChart3,
  Eye,
  MousePointerClick,
  Award,
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
    icon: <Search className="w-6 h-6" />,
    title: "SEO-First Approach",
    desc: "Every piece is written with keyword strategy, search intent, and ranking potential baked in from day one.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Audience-Driven Copy",
    desc: "We research your audience deeply to craft content that resonates, builds trust, and drives action.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Turnaround",
    desc: "Consistent delivery without compromising quality — ready when your publishing calendar needs it.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Multi-Industry Expertise",
    desc: "From tech startups to e-commerce brands, our writers understand the language of your market.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Measurable ROI",
    desc: "Content that doesn't just fill pages — it generates traffic, leads, and real business growth.",
  },
];

const services = [
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Blog & Article Writing",
    desc: "Long-form SEO blogs, thought leadership articles, and informational content that ranks and builds authority.",
    color: "from-emerald-500/20 to-cyan-500/20",
    border: "border-emerald-500/30",
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Website Copywriting",
    desc: "Conversion-focused homepage, about, services, and landing page copy that turns visitors into customers.",
    color: "from-blue-500/20 to-purple-500/20",
    border: "border-blue-500/30",
  },
  {
    icon: <ShoppingCart className="w-7 h-7" />,
    title: "Product Descriptions",
    desc: "Compelling e-commerce product copy that highlights benefits, answers objections, and drives purchases.",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
  },
  {
    icon: <Mail className="w-7 h-7" />,
    title: "Email Marketing Copy",
    desc: "High-open-rate subject lines and persuasive email sequences that nurture leads and boost conversions.",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
  },
  {
    icon: <Megaphone className="w-7 h-7" />,
    title: "Social Media Content",
    desc: "Platform-optimized captions, carousels, and hooks that increase engagement and grow your following.",
    color: "from-violet-500/20 to-indigo-500/20",
    border: "border-violet-500/30",
  },
  {
    icon: <FileText className="w-7 h-7" />,
    title: "Case Studies & Whitepapers",
    desc: "In-depth research-backed content that establishes expertise and supports high-value B2B sales cycles.",
    color: "from-teal-500/20 to-green-500/20",
    border: "border-teal-500/30",
  },
];

const industries = [
  "Technology & SaaS",
  "E-Commerce & Retail",
  "Healthcare & Wellness",
  "Finance & FinTech",
  "Education & EdTech",
  "Real Estate",
  "Travel & Hospitality",
  "Fashion & Lifestyle",
  "Legal & Compliance",
  "Food & Restaurant",
  "Automotive",
  "Non-Profit & NGO",
];

const steps = [
  {
    num: "01",
    title: "Discovery & Brief",
    desc: "We learn your brand voice, goals, target audience, and competitors. A detailed content brief is created before writing begins.",
    color: "text-neon-green",
    bg: "bg-neon-green/10 border-neon-green/30",
  },
  {
    num: "02",
    title: "Keyword & Topic Research",
    desc: "Using advanced SEO tools, we identify high-value keywords, search intent, and topic clusters that align with your business goals.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/30",
  },
  {
    num: "03",
    title: "Content Creation",
    desc: "Our expert writers craft each piece with your brand tone, SEO structure, E-E-A-T principles, and reader engagement in mind.",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/30",
  },
  {
    num: "04",
    title: "Review & Refinement",
    desc: "Every piece goes through editing, plagiarism checks, and SEO scoring. You get revision rounds to ensure it hits the mark.",
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/30",
  },
  {
    num: "05",
    title: "Delivery & Optimization",
    desc: "Final content is delivered in your preferred format with meta tags, internal linking suggestions, and performance tracking setup.",
    color: "text-pink-400",
    bg: "bg-pink-400/10 border-pink-400/30",
  },
];

const portfolio = [
  {
    type: "Blog Post",
    client: "FAST IT",
    title: "How AI is Transforming IT Infrastructure in 2024",
    preview:
      "A 2,500-word SEO blog targeting 'AI IT solutions' — ranked page 1 on Google within 60 days, driving 4,200+ monthly organic visits.",
    tag: "Technology",
    color: "border-neon-green/30 bg-neon-green/5",
    tagColor: "bg-neon-green/20 text-neon-green",
  },
  {
    type: "Website Copy",
    client: "GlowSkin BD",
    title: "Homepage & Product Page Rewrite",
    preview:
      "Complete website copy overhaul for a skincare brand — conversion rate improved by 38% within the first month after launch.",
    tag: "E-Commerce",
    color: "border-blue-500/30 bg-blue-500/5",
    tagColor: "bg-blue-500/20 text-blue-400",
  },
  {
    type: "Email Sequence",
    client: "EduNext Platform",
    title: "7-Part Welcome Email Onboarding Series",
    preview:
      "Nurture sequence for an EdTech SaaS platform — average open rate of 62% and 28% trial-to-paid conversion rate.",
    tag: "Education",
    color: "border-purple-500/30 bg-purple-500/5",
    tagColor: "bg-purple-500/20 text-purple-400",
  },
  {
    type: "Product Descriptions",
    client: "TechMart BD",
    title: "500+ E-Commerce Product Listings",
    preview:
      "Bulk product description writing for a tech e-commerce store — organic product page traffic increased by 210% in 3 months.",
    tag: "Retail",
    color: "border-orange-500/30 bg-orange-500/5",
    tagColor: "bg-orange-500/20 text-orange-400",
  },
];

const metrics = [
  { icon: <TrendingUp className="w-8 h-8" />, value: "320%", label: "Average Organic Traffic Growth", color: "text-neon-green" },
  { icon: <Eye className="w-8 h-8" />, value: "4.2M+", label: "Content Views Generated", color: "text-cyan-400" },
  { icon: <MousePointerClick className="w-8 h-8" />, value: "2.8x", label: "Average CTR Improvement", color: "text-blue-400" },
  { icon: <BarChart3 className="w-8 h-8" />, value: "500+", label: "Content Pieces Delivered", color: "text-purple-400" },
  { icon: <Award className="w-8 h-8" />, value: "98%", label: "Client Satisfaction Rate", color: "text-pink-400" },
  { icon: <Users className="w-8 h-8" />, value: "45+", label: "Brands Served", color: "text-orange-400" },
];

const testimonials = [
  {
    quote:
      "WeBestOne's content team transformed our blog into a lead generation machine. We went from 500 to 18,000 monthly visitors in just 4 months. The quality and SEO depth of every article is exceptional.",
    name: "Rifat Hossain",
    role: "CEO, FAST IT Solutions",
    rating: 5,
  },
  {
    quote:
      "They rewrote our entire website copy and the difference was immediate. Our bounce rate dropped by 40% and enquiries doubled within 6 weeks. Best investment we've made in marketing.",
    name: "Nadia Rahman",
    role: "Marketing Head, GlowSkin BD",
    rating: 5,
  },
  {
    quote:
      "The email sequences they wrote for us have an insane open rate. Our onboarding conversion went up 28% — our SaaS product finally has copy that sells it the way it deserves.",
    name: "Arif Chowdhury",
    role: "Founder, EduNext Platform",
    rating: 5,
  },
];

const faqs = [
  {
    q: "How long does it take to receive my content?",
    a: "Turnaround varies by content type. Blog posts (1,000–2,000 words) take 3–5 business days. Website copy takes 5–7 days. Bulk orders and rush delivery are available on request.",
  },
  {
    q: "Will the content be SEO-optimized?",
    a: "Yes, every piece includes keyword integration, proper heading structure, meta description suggestions, internal linking recommendations, and E-E-A-T alignment.",
  },
  {
    q: "Do you offer revisions?",
    a: "Absolutely. All packages include 2 rounds of revisions to ensure the content aligns perfectly with your brand voice and goals.",
  },
  {
    q: "Can you write in Bengali or both English and Bengali?",
    a: "Yes! We have writers fluent in both English and Bengali, and we can deliver bilingual content tailored to the Bangladeshi and global markets.",
  },
  {
    q: "Do you sign an NDA or keep content confidential?",
    a: "Yes, we treat all client projects with strict confidentiality. NDAs can be signed on request before project kickoff.",
  },
  {
    q: "How do I get started?",
    a: "Simply fill out our contact form or book a discovery call. We'll understand your needs, share a custom proposal, and start once approved.",
  },
];

/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      onClick={() => setOpen((v) => !v)}
      className="border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-neon-green/30 transition-colors duration-300 bg-white/[0.02]"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-semibold text-white text-sm md:text-base">{q}</p>
        {open ? (
          <ChevronUp className="w-5 h-5 text-neon-green shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
        )}
      </div>
      {open && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-neutral-400 text-sm leading-relaxed"
        >
          {a}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ─── Page ─── */
export default function ContentWritingPage() {
  return (
    <main className="relative min-h-screen text-white bg-black overflow-hidden">
      {/* Global background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />
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
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              Words That Work. Content That Converts.
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight"
            >
              WeBestOne{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent block">
                Content Writing Services
              </span>
              That Drive Growth
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-neutral-400 text-base leading-relaxed">
                At WeBestOne, we do much more than write. We build{" "}
                <span className="text-white font-semibold">strategies</span> that transform every word into{" "}
                <span className="text-neon-green font-semibold">measurable business growth</span>. Our team of
                experienced strategists, copywriters, and SEO professionals craft data-driven content
                that attracts attention, builds trust, and inspires measurable action.
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Whether you need professional website copy that sells, search engine optimized blogs
                that rank, or persuasive video scripts that connect with your audience, we make your
                brand unforgettable through{" "}
                <span className="text-neutral-300">intelligent storytelling</span> and strategic precision.
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
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-neon-green text-black font-bold rounded-full shadow-[0_0_25px_rgba(135,230,92,0.35)] hover:shadow-[0_0_40px_rgba(135,230,92,0.55)] hover:scale-105 transition-all duration-300 text-sm"
              >
                Get a Free Content Strategy
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-neutral-300 font-medium hover:border-white/30 hover:text-white transition-all duration-300 text-sm"
              >
                View Samples
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-5 pt-1"
            >
              {["500+ Pieces Written", "45+ Brands", "SEO-Always", "EN + BN"].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-neutral-500 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neon-green" />
                  {b}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Floating Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative h-[420px] flex items-center justify-center"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

            {/* ── Card 1: SEO Optimization ── */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[5%] w-[62%] p-4 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-neon-green/15 border border-neon-green/30 flex items-center justify-center">
                  <Search className="w-4 h-4 text-neon-green" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">SEO Optimization</p>
                  <p className="text-neon-green text-[10px] font-bold tracking-widest uppercase">Ranking 1st</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-neon-green to-cyan-400 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-neutral-500 text-[10px]">Organic Rank Score</span>
                <span className="text-neon-green text-[10px] font-mono">92%</span>
              </div>
            </motion.div>

            {/* ── Card 2: Website Copy ── */}
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[12%] right-[3%] w-[58%] p-4 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Website Copy</p>
                  <p className="text-blue-400 text-[10px] font-bold tracking-widest uppercase">Converting</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-neutral-500 text-[10px]">Conversion Rate</span>
                <span className="text-blue-400 text-[10px] font-mono">+38%</span>
              </div>
            </motion.div>

            {/* ── Card 3: Blog Traffic (small) ── */}
            <motion.div
              animate={{ y: [-5, 10, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[38%] right-[2%] w-[44%] p-3.5 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Blog Traffic</p>
                  <p className="text-purple-400 text-[10px] font-bold tracking-widest uppercase">Growing</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-neutral-500 text-[10px]">Traffic Growth</span>
                <span className="text-purple-400 text-[10px] font-mono">320%</span>
              </div>
            </motion.div>

            {/* ── Floating icon badge ── */}
            <motion.div
              animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[8%] right-[8%] w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            >
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </motion.div>

            <motion.div
              animate={{ x: [0, -6, 0], y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[8%] left-[8%] w-9 h-9 rounded-xl bg-neon-green/15 border border-neon-green/30 flex items-center justify-center"
            >
              <FileText className="w-4 h-4 text-neon-green" />
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
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Why WeBestOne</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Content That Works,{" "}
              <span className="text-neon-green">Not Just Fills Space</span>
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              We don't just write — we strategize, optimize, and deliver content that achieves real business results.
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
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-neon-green/30 hover:bg-neon-green/[0.03] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green mb-4 group-hover:scale-110 transition-transform duration-300">
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
              <span className="text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase">What We Write</span>
              <span className="w-8 h-[1px] bg-cyan-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Core Content Writing{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Services</span>
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
              <span className="w-8 h-[1px] bg-blue-400/60" />
              <span className="text-blue-400 font-mono text-xs tracking-[0.25em] uppercase">Industries We Serve</span>
              <span className="w-8 h-[1px] bg-blue-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              We Speak Your{" "}
              <span className="text-blue-400">Industry's Language</span>
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Our writers have hands-on experience across a wide range of industries.
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
                className="flex items-center gap-2 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-blue-400/30 hover:bg-blue-400/[0.04] transition-all duration-300 group"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
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
              <span className="w-8 h-[1px] bg-purple-400/60" />
              <span className="text-purple-400 font-mono text-xs tracking-[0.25em] uppercase">How We Work</span>
              <span className="w-8 h-[1px] bg-purple-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Our{" "}
              <span className="text-purple-400">5-Step Content</span> Creation Process
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              A proven system that ensures every piece of content is strategic, polished, and results-driven.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-green via-cyan-400 via-blue-400 via-purple-400 to-pink-400 opacity-30 hidden sm:block" />

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
          6. CONTENT PORTFOLIO
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
              <span className="w-8 h-[1px] bg-orange-400/60" />
              <span className="text-orange-400 font-mono text-xs tracking-[0.25em] uppercase">Portfolio</span>
              <span className="w-8 h-[1px] bg-orange-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Content Writing{" "}
              <span className="text-orange-400">Samples & Results</span>
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Real work. Real results. A glimpse into what we've created for our clients.
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
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-orange-400/40 text-orange-400 font-semibold hover:bg-orange-400/10 transition-all duration-300"
            >
              Request Full Portfolio <ArrowRight className="w-4 h-4" />
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
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Proven Results</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Numbers That{" "}
              <span className="text-neon-green">Speak for Themselves</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-center hover:border-white/20 transition-all duration-300 group"
              >
                <div className={`${m.color} mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300`}>{m.icon}</div>
                <div className={`text-4xl font-bold ${m.color} mb-1`}>{m.value}</div>
                <div className="text-neutral-400 text-xs uppercase tracking-wide">{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
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
              <span className="w-8 h-[1px] bg-pink-400/60" />
              <span className="text-pink-400 font-mono text-xs tracking-[0.25em] uppercase">Client Feedback</span>
              <span className="w-8 h-[1px] bg-pink-400/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              What Our{" "}
              <span className="text-pink-400">Clients Say</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-pink-400/30 transition-all duration-300 flex flex-col gap-4"
              >
                <Quote className="w-8 h-8 text-pink-400/60" />
                <p className="text-neutral-300 text-sm leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-neutral-500 text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. FAQ
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-cyan-400/60" />
              <span className="text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase">FAQ</span>
              <span className="w-8 h-[1px] bg-cyan-400/60" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-neutral-400">Everything you need to know before getting started.</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FaqItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          10. FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Glow border */}
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-neon-green via-cyan-400 to-blue-500 opacity-40 blur-sm" />
            <div className="relative rounded-3xl bg-neutral-950 p-12 text-center space-y-6">
              {/* Background glow inside */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-blue-500/5 rounded-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green text-sm font-semibold">
                  <PenTool className="w-4 h-4" />
                  Ready to Start?
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  Let's Build Content That{" "}
                  <span className="bg-gradient-to-r from-neon-green to-cyan-400 bg-clip-text text-transparent">
                    Grows Your Business
                  </span>
                </h2>
                <p className="text-neutral-400 max-w-xl mx-auto leading-relaxed">
                  Whether you need one blog post or a full content strategy, our team is ready to deliver.
                  Let's get your brand the visibility it deserves.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-neon-green text-black font-bold rounded-full shadow-[0_0_25px_rgba(135,230,92,0.4)] hover:shadow-[0_0_40px_rgba(135,230,92,0.6)] hover:scale-105 transition-all duration-300"
                  >
                    Request a Free Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-neon-green/50 hover:bg-neon-green/5 transition-all duration-300"
                  >
                    Book a Discovery Call
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
