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
    desc: "Smart planning powered by AI search optimization for long-term, predictable growth.",
    icon: Zap,
    color: "text-yellow-400"
  },
  {
    title: "AI Search Consultancy",
    desc: "Clear direction from a proven AI SEO company that understands how decisions happen today.",
    icon: Search,
    color: "text-blue-400"
  },
  {
    title: "GEO SEO",
    desc: "Visibility across generative discovery systems including Google SGE, Gemini, and Perplexity.",
    icon: Globe,
    color: "text-emerald-400"
  },
  {
    title: "AEO SEO",
    desc: "Content built for answer-based search so your brand appears where questions get answered.",
    icon: Target,
    color: "text-rose-400"
  },
  {
    title: "Entity Optimization",
    desc: "Clear signals across AI and search engines through structured data and knowledge graph integration.",
    icon: ShieldCheck,
    color: "text-purple-400"
  },
  {
    title: "Technical SEO",
    desc: "Fast, clean, and optimized performance with deep-level site health checks for crawlers.",
    icon: LineChart,
    color: "text-orange-400"
  },
  {
    title: "Digital PR",
    desc: "Authority building through link building and strategic brand mention outreach.",
    icon: Globe,
    color: "text-cyan-400"
  },
  {
    title: "LLM Performance Tracking",
    desc: "Track how AI systems surface your brand across ChatGPT, Gemini, Perplexity, and beyond.",
    icon: BarChart3,
    color: "text-pink-400"
  }
];

const steps = [
  { num: "1", title: "Research your niche", desc: "We study your market, competitors, and gaps to build a clear picture of where you stand and where opportunity exists." },
  { num: "2", title: "Set up your team", desc: "Experts are assigned based on what is needed for your specific industry, goals, and search environment." },
  { num: "3", title: "Create a game plan", desc: "We build a plan with clear goals, defined timelines, and measurable targets tied to real business outcomes." },
  { num: "4", title: "Review and scale", desc: "We track results, identify what works, and continuously improve to ensure compounding, long-term growth." }
];

const faqs = [
  {
    q: "Why choose an AI SEO service agency like WebestOne?",
    a: "Because visibility without results is wasted. We operate as a proven AI SEO company focused on real growth and strong AI search visibility."
  },
  {
    q: "Do you offer AI-based SEO services for Google SGE?",
    a: "Yes. Our AI-based SEO services are designed for Google SGE, AI Overviews, and modern AI search systems."
  },
  {
    q: "What makes your AI SEO solutions different?",
    a: "We focus on clarity, intent, and LLM optimization, not just rankings."
  },
  {
    q: "Can AI SEO improve visibility on Perplexity AI and Gemini?",
    a: "Yes. We improve LLM visibility across both platforms."
  },
  {
    q: "How long does it take to see results?",
    a: "You will see early changes in months, with stronger results over time."
  },
  {
    q: "Do you guarantee rankings?",
    a: "No. We guarantee clear execution, transparency, and continuous improvement."
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

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl lg:text-5xl font-black leading-tight tracking-tight uppercase">
                AI SEO Service Agency <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  That Turns Visibility <br />Into Predictable Growth
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-neutral-300 max-w-lg leading-relaxed font-medium">
              WebestOne is not a typical AI SEO service agency. We build search systems that place your brand inside decisions before your competitors are even considered.
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
            className="relative lg:ml-8 xl:ml-12"
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
                    Search has changed. People do not scroll through pages anymore. They read answers, summaries, and recommendations, then decide fast. That means your brand is judged before your site is even opened.
                  </p>
                  <p>
                    Most companies still rely on outdated SEO methods. That gap leads to lost visibility, weak trust, and poor leads. As an AI SEO service agency, WebestOne builds AI search optimization strategies around how decisions actually happen today.
                  </p>
                  <p className="font-bold text-white pt-2">
                    If you are not there at that moment, your competitor is.
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
                  SEO That Drives <br />
                  Real Business <br />
                  Outcomes
                </h2>
                <div className="w-24 h-1 bg-blue-600"></div>
                <div className="space-y-4 text-neutral-400 text-sm md:text-base leading-relaxed">
                  <p>
                    Traffic does not grow a business. Decisions do. WebestOne works as an AI SEO service agency and a proven AI SEO company for businesses that want results tied to revenue, not reports.
                  </p>
                  <p>
                    We combine semantic search, strong technical SEO, and structured content. The result is simple — better trust, better leads, and real LLM visibility where decisions happen.
                  </p>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-blue-600/10 border border-blue-500/20">
                <p className="text-blue-400 font-bold leading-relaxed">
                  Show up early. Stay trusted. Win the decision through AI search optimization.
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
              <p className="text-xl font-bold text-white">SEO should not feel uncertain. It should feel controlled.</p>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              As an AI SEO service agency, WebestOne delivers AI-based SEO services and expert AI SEO services using data, predictive systems, and AI optimization techniques to focus only on what drives results.
            </p>
            <ul className="space-y-4">
              {[
                "Visibility across AI and traditional search",
                "Better quality leads",
                "Higher conversions through structured AI content strategy"
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
                  Book a consultation and see where you are losing ground.
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
                This is not SEO with AI added later. It was built this way from the start.
              </p>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              As an AI SEO service agency, WebestOne does not rely on isolated tools. We operate the WebestOne SEO Intelligence System, a structured framework that connects data, content, and search signals into a single decision-making engine. By combining platforms like Ahrefs, SurferSEO, and Clearscope with internal analysis models, this system aligns your brand with search ranking signals, E-E-A-T factors, and evolving AI-driven visibility patterns.
            </p>
            <div className="space-y-4">
              <p className="font-bold text-white">AI enables our teams to:</p>
              <ul className="space-y-4">
                {[
                  "Hidden gaps are uncovered",
                  "Traffic shifts are seen early",
                  "ROI is clear before action",
                  "Strategy adapts fast"
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
                  Schedule a consultation and review your data clearly.
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
                Search is no longer just Google. An AI SEO service agency must ensure your content appears inside AI systems before users click.
              </p>
              <p>
                WebestOne structures content across Google AI Overviews, the Google Gemini AI model, and Perplexity AI, helping your brand appear in AI-generated results.
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
              <p className="text-lg font-bold text-white">Generative Engine Optimization is now essential.</p>
            </div>
            <div className="space-y-6 text-neutral-400 leading-relaxed text-sm md:text-base">
              <p>
                As an AI SEO service agency, WebestOne places your brand inside AI-generated answers where trust starts.
              </p>
              <p>
                Our Generative Engine Optimization (GEO) approach strengthens AI search engine optimization and long-term LLM optimization across Google SGE, Gemini, and Perplexity. Be visible where decisions begin.
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
