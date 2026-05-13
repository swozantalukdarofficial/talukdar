import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Plus, 
  Search, 
  Zap, 
  Target, 
  BarChart3, 
  Globe, 
  ShieldCheck, 
  LineChart,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { MagneticButton } from "../components/ui/MagneticButton";
import aiRobotImg from "../assets/ai-robot.png";
import seoDashboardImg from "../assets/seo-dashboard.png";
import aiLettersImg from "../assets/ai-letters.png";
import circuitBoardImg from "../assets/circuit-board.png";
import aiBrainImg from "../assets/ai-brain.png";

const offers = [
  {
    title: "AI SEO Strategy",
    desc: "Predictive modeling and AI-driven insights to build a future-proof roadmap.",
    icon: Zap,
    color: "text-yellow-400"
  },
  {
    title: "AI Search Consultancy",
    desc: "Expert guidance on navigating the evolving landscape of AI-powered search.",
    icon: Search,
    color: "text-blue-400"
  },
  {
    title: "GEO SEO",
    desc: "Generative Engine Optimization to ensure your brand is cited by LLMs.",
    icon: Globe,
    color: "text-emerald-400"
  },
  {
    title: "AEO SEO",
    desc: "Answer Engine Optimization to dominate voice and direct-answer queries.",
    icon: Target,
    color: "text-rose-400"
  },
  {
    title: "Entity Optimization",
    desc: "Establishing authority through structured data and knowledge graph integration.",
    icon: ShieldCheck,
    color: "text-purple-400"
  },
  {
    title: "Technical SEO",
    desc: "Deep-level site health checks and performance optimization for crawlers.",
    icon: LineChart,
    color: "text-orange-400"
  },
  {
    title: "Digital PR",
    desc: "High-authority link building and brand mentions through strategic outreach.",
    icon: Globe,
    color: "text-cyan-400"
  },
  {
    title: "EverySearch Tracking",
    desc: "LLM performance tracking and visibility monitoring across all platforms.",
    icon: BarChart3,
    color: "text-pink-400"
  }
];

const steps = [
  { num: "1", title: "Research your niche", desc: "Deep-dive into market trends and competitor gaps using proprietary AI tools." },
  { num: "2", title: "Set up your team", desc: "Assigning dedicated experts to execute every facet of your customized strategy." },
  { num: "3", title: "Create a game plan", desc: "Mapping out a 12-month roadmap focused on sustainable organic growth." },
  { num: "4", title: "Review and scale", desc: "Continuous monitoring and rapid iteration to maximize your results." }
];

const faqs = [
  {
    q: "Why should I choose WebestOne?",
    a: "We specialize in next-gen AI-driven SEO that adapts to the evolving search landscape, including LLMs and generative search engines."
  },
  {
    q: "How does your SEO approach differ?",
    a: "Our strategy is built around clarity, authority, and adaptability, supported by continuous data analysis and AI-driven insights."
  },
  {
    q: "How long does SEO take to show results?",
    a: "Visibility improvements are typically seen within 3-6 months, depending on the niche, competition, and starting baseline."
  },
  {
    q: "Can you guarantee rankings?",
    a: "No reputable agency can guarantee #1 rankings, but we guarantee data-backed strategies that significantly improve visibility and high-intent traffic."
  }
];

export default function SeoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-black text-white pt-24 overflow-hidden">
      {/* 1. Hero Section - Standardized Sizes */}
      <section className="relative z-10 px-6 lg:px-20 py-12 md:py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 md:gap-12">
              <div className="space-y-1">
                <h4 className="text-xl md:text-2xl font-bold text-white">$ Revenue</h4>
                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.1em] font-bold">Generated via SEO</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-xl md:text-2xl font-bold text-white">Qualified Leads</h4>
                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.1em] font-bold">Generated</p>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight uppercase">
                NEXT-GEN SEO BY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  WEBESTONE
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-neutral-300 max-w-lg leading-relaxed font-medium">
              WebestOne positions itself as an AI SEO service provider built to turn search visibility into predictable business outcomes, not vanity rankings that look good but fail to convert.
            </p>

            {/* Subtext */}
            <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold max-w-lg leading-relaxed">
              RECOGNIZED AND TRUSTED BY BRANDS THAT EXPECT SEARCH TO DRIVE RESULTS
            </p>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
              <img 
                src={aiRobotImg} 
                alt="AI SEO Robot" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            
            {/* Subtle Glows */}
            <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute -z-10 -bottom-20 -left-20 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. Visibility & Strategy Section */}
      <section className="py-24 px-6 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <img src={seoDashboardImg} alt="SEO Dashboard" className="w-full h-auto" />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Data-driven, results-oriented <br />
                  SEO strategy and services
                </h2>
                <div className="space-y-4 text-neutral-400 text-sm md:text-base leading-relaxed">
                  <p>
                    SEO becomes powerful when it is structured, measurable, and tied directly to business intent. When executed correctly, it evolves into a compounding acquisition channel rather than an ongoing experiment.
                  </p>
                  <p>
                    WebestOne operates as an AI SEO service provider for local businesses, startups, eCommerce brands, and multilingual organizations. Our approach blends technical accuracy, semantic clarity, authoritative content, and sustained trust signals to produce consistent organic growth.
                  </p>
                  <p className="font-bold text-white pt-2">
                    The result is not just traffic, but credibility across every discovery touchpoint.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 lg:pt-12"
            >
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Search visibility no <br />
                  longer works the way <br />
                  most businesses think it <br />
                  does
                </h2>
                <div className="w-24 h-1 bg-blue-600"></div>
                <div className="space-y-4 text-neutral-400 text-sm md:text-base leading-relaxed">
                  <p>
                    Search engines evolve constantly, but customer behavior changes even faster. Today, buyers rely on summaries, extracted answers, and AI-generated recommendations before they ever visit a website.
                  </p>
                  <p>
                    Yet many companies still invest in SEO as if rankings alone decide success. That disconnect quietly costs visibility, credibility, and qualified leads. As an AI SEO service provider, WebestOne designs search strategies around how decisions are actually made today, not how SEO worked years ago.
                  </p>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-blue-600/10 border border-blue-500/20">
                <p className="text-blue-400 font-bold leading-relaxed">
                  If your brand is not present where understanding forms, competitors will be.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. AI SEO Services Section */}
      <section className="py-24 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-blue-500">AI SEO</span> Services
              </h2>
              <p className="text-xl font-bold text-white">SEO should be intelligent, not reactive.</p>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              As an AI SEO service provider, WebestOne uses artificial intelligence to prioritize actions, forecast outcomes, and focus resources where they generate measurable impact.
            </p>
            <ul className="space-y-4">
              {[
                "Visibility across AI-driven and traditional search environments",
                "Qualified lead growth guided by predictive analysis",
                "Conversion improvement through automated optimization"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm md:text-base text-neutral-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-neon-green" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Link to="/contact">
                <button className="px-8 py-4 bg-neon-green text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(135,230,92,0.2)]">
                  Book a free consultation
                </button>
              </Link>
              <p className="text-xs text-neutral-500 mt-4 ml-2 uppercase tracking-widest font-bold">
                and identify where your visibility is leaking.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/5"
          >
            <img src={aiLettersImg} alt="AI 3D" className="w-full h-auto" />
          </motion.div>
        </div>
      </section>

      {/* 4. Success Behind AI Section */}
      <section className="py-24 px-6 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Behind the success of our <br />
                <span className="text-blue-500">AI SEO solutions</span>
              </h2>
              <p className="text-lg font-bold text-white max-w-lg leading-snug">
                Artificial Intelligence was not added to an existing workflow. The system was designed first.
              </p>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              As an AI SEO service provider, WebestOne integrates internal analytics, platforms such as Ahrefs, ChatGPT, and SurferSEO, and experienced specialists who know how to translate data into strategy, not noise.
            </p>
            <div className="space-y-4">
              <p className="font-bold text-white">AI enables our teams to:</p>
              <ul className="space-y-4">
                {[
                  "Identify growth opportunities competitors miss",
                  "Forecast traffic and visibility shifts before execution",
                  "Estimate ROI prior to investment",
                  "Respond rapidly to algorithm and ranking-signal changes"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm md:text-base text-neutral-300 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4">
              <Link to="/contact">
                <button className="px-8 py-4 bg-neon-green text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(135,230,92,0.2)]">
                  Schedule a free consultation
                </button>
              </Link>
              <p className="text-xs text-neutral-500 mt-4 ml-2 uppercase tracking-widest font-bold">
                to see what your data already reveals.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/5"
          >
            <img src={seoDashboardImg} alt="Success Analytics" className="w-full h-auto" />
          </motion.div>
        </div>
      </section>

      {/* 5. AI Search Platforms Section */}
      <section className="py-24 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 order-2 lg:order-1"
          >
            <img src={circuitBoardImg} alt="AI Search Platforms" className="w-full h-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              AI Search Platforms We <br />
              Optimise For
            </h2>
            <div className="space-y-6 text-neutral-400 leading-relaxed text-sm md:text-base">
              <p>
                Search visibility now extends far beyond traditional results pages. An AI SEO service provider must ensure content can be interpreted, summarized, and cited by AI systems that influence decisions before a click happens.
              </p>
              <p>
                WebestOne structures content for clarity, authority, and contextual relevance across platforms such as Amazon Alexa, OpenAI ChatGPT, and emerging AI-driven search environments.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. GEO & AI SEO Services Section */}
      <section className="py-24 px-6 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold uppercase">
                GEO & AI SEO Services
              </h2>
              <p className="text-lg font-bold text-white">Generative Engine Optimization is no longer optional.</p>
            </div>
            <div className="space-y-6 text-neutral-400 leading-relaxed text-sm md:text-base">
              <p>
                As an AI SEO service provider, WebestOne strengthens brand presence inside AI-generated answers, summaries, and discovery interfaces where customer trust is formed.
              </p>
              <p>
                Our GEO strategies prioritize accessibility, credibility, and structural alignment across Google AI Overviews, Gemini, Perplexity, and related platforms.
              </p>
            </div>
            <div className="pt-4">
              <Link to="/contact">
                <button className="px-10 py-5 bg-neon-green text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(135,230,92,0.3)]">
                  Get Started Today
                </button>
              </Link>
              <p className="text-[10px] text-neutral-500 mt-4 ml-2 uppercase tracking-[0.2em] font-bold">
                and secure visibility where decisions originate.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-neutral-900/50 p-4"
          >
            <img src={aiBrainImg} alt="GEO AI SEO" className="w-full h-auto rounded-[2rem]" />
          </motion.div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-24 px-6 relative z-10 bg-neutral-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">What We Offer</h2>
            <div className="w-24 h-1 bg-neon-green mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((offer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-black/40 border border-white/10 hover:border-neon-green/30 transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${offer.color}`}>
                  <offer.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{offer.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {offer.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Redesigned Process Section - Alternating Timeline */}
      <section className="py-24 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <span className="text-purple-500 font-mono text-sm tracking-[0.3em] uppercase block">
              —— How We Work ——
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Our <span className="text-purple-500">5-Step SEO</span> Process
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              A proven system that ensures every piece of strategy is strategic, polished, and results-driven.
            </p>
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent -translate-x-1/2 hidden lg:block"></div>

            <div className="space-y-12 lg:space-y-0">
              {[
                {
                  num: "01",
                  title: "Discovery & Brief",
                  desc: "We learn your brand voice, goals, target audience, and competitors. A detailed strategy brief is created before execution begins.",
                  color: "border-emerald-500/30 text-emerald-500 bg-emerald-500/10",
                  align: "left"
                },
                {
                  num: "02",
                  title: "Keyword & Topic Research",
                  desc: "Using advanced AI SEO tools, we identify high-value keywords, search intent, and topic clusters that align with your business goals.",
                  color: "border-blue-500/30 text-blue-500 bg-blue-500/10",
                  align: "right"
                },
                {
                  num: "03",
                  title: "Content & Strategy Execution",
                  desc: "Our expert team crafts every piece with your brand tone, SEO structure, E-E-A-T principles, and reader engagement in mind.",
                  color: "border-cyan-500/30 text-cyan-500 bg-cyan-500/10",
                  align: "left"
                },
                {
                  num: "04",
                  title: "Review & Refinement",
                  desc: "Every element goes through auditing, plagiarism checks, and SEO scoring. You get revision rounds to ensure it hits the mark.",
                  color: "border-purple-500/30 text-purple-500 bg-purple-500/10",
                  align: "right"
                },
                {
                  num: "05",
                  title: "Delivery & Optimization",
                  desc: "Final strategy is delivered in your preferred format with meta tags, internal linking suggestions, and performance tracking setup.",
                  color: "border-pink-500/30 text-pink-500 bg-pink-500/10",
                  align: "left"
                }
              ].map((step, i) => (
                <div key={i} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${step.align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Card Section */}
                  <div className="w-full lg:w-1/2 flex justify-center lg:justify-end px-4 lg:px-12 order-2 lg:order-1">
                    <motion.div
                      initial={{ opacity: 0, x: step.align === 'left' ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className={`w-full max-w-2xl p-8 rounded-2xl bg-neutral-900/50 border ${step.color.split(' ')[0]} backdrop-blur-xl group hover:bg-neutral-800/50 transition-colors`}
                    >
                      <h3 className={`text-xl md:text-2xl font-bold mb-4 ${step.align === 'right' ? 'lg:text-right' : ''}`}>
                        {step.title}
                      </h3>
                      <p className={`text-neutral-400 text-sm md:text-base leading-relaxed ${step.align === 'right' ? 'lg:text-right' : ''}`}>
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Number Section */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 order-1 lg:order-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl border-2 flex items-center justify-center font-bold text-lg lg:text-xl ${step.color} shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                    >
                      {step.num}
                    </motion.div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden lg:block lg:w-1/2 order-3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-24 px-6 relative z-10 bg-neutral-900/30 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-white/10 pb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left py-4 hover:text-neon-green transition-colors"
                >
                  <span className="text-lg font-bold">{faq.q}</span>
                  <Plus className={`w-5 h-5 transition-transform ${openFaq === i ? 'rotate-45 text-neon-green' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-neutral-400 pt-2 pb-4 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-gradient-to-br from-blue-600/10 to-neon-green/10 border border-white/10 backdrop-blur-xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Ready to lead the <br />
            <span className="text-neon-green">automated world?</span>
          </h2>
          <Link to="/contact">
            <MagneticButton className="px-10 py-5 bg-neon-green text-black font-bold rounded-full hover:scale-105 transition-transform">
               Get Your Free Audit <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </MagneticButton>
          </Link>
        </div>
      </section>
    </main>
  );
}
