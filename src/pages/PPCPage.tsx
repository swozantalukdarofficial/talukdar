import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Target, 
  Search, 
  BarChart3, 
  MousePointer2, 
  Zap, 
  DollarSign, 
  LineChart,
  ShieldCheck,
  ChevronRight,
  PieChart,
  ArrowRight,
  PlayCircle,
  ChevronLeft,
  Settings,
  ChevronDown,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const ppcServices = [
  {
    title: "Google Search Ads",
    description: "Bring your brand to the top position exactly when someone is searching for your services.",
    icon: <Search className="w-6 h-6" />,
    color: "bg-blue-600"
  },
  {
    title: "Display Advertising",
    description: "Display your ads on the internet's largest websites through visual branding.",
    icon: <PieChart className="w-6 h-6" />,
    color: "bg-orange-500"
  },
  {
    title: "Retargeting Campaigns",
    description: "Bring back potential customers who visited your website but didn't make a purchase.",
    icon: <Target className="w-6 h-6" />,
    color: "bg-purple-600"
  },
  {
    title: "Shopping Ads",
    description: "Direct Google shopping ads with product images and prices for e-commerce businesses.",
    icon: <DollarSign className="w-6 h-6" />,
    color: "bg-emerald-600"
  }
];

const ppcStats = [
  { label: "Lower CPA", value: "35%", icon: <DollarSign className="w-5 h-5 text-emerald-400" /> },
  { label: "CTR Increase", value: "12x", icon: <MousePointer2 className="w-5 h-5 text-blue-400" /> },
  { label: "Total Managed Ad Spend", value: "৳50M+", icon: <ShieldCheck className="w-5 h-5 text-purple-400" /> }
];

const PPC_VIDEO_ID = "6pYF789-U9M"; // Relevant PPC/Marketing video

export default function PPCPage() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openMainFaq, setOpenMainFaq] = useState<number | null>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      let scrollTo;
      
      if (direction === 'right' && scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollTo = 0; // Reset to beginning
      } else {
        scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      }
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pt-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[160px]" />
      </div>

      {/* 1. Hero Section - Exact match to screenshot */}
      <section className="relative z-10 px-6 lg:px-20 py-12 md:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Pay Per Click
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                PPC Advertising <br />
                <span className="text-emerald-400">Services</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-neutral-400 max-w-lg leading-relaxed font-medium">
              We don't just create ads; we craft strategies that drive results. Whether you're targeting local customers or expanding your reach globally, our advertising solutions are tailored to your goals.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black font-bold text-base rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:scale-105 transition-all">
                Get in touch <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Video Player Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-video w-full rounded-[2.5rem] bg-neutral-900 border border-white/10 overflow-hidden group shadow-2xl">
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.div
                    key="thumbnail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                  >
                    {/* Mock Video UI / Thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:scale-110 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                        <PlayCircle className="w-12 h-12 text-white fill-white/20" />
                      </div>
                      <div className="mt-8 space-y-2">
                        <p className="text-sm font-bold text-white uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                          Watch How We Maximize PPC ROI
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0"
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${PPC_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                      title="PPC Success Strategy"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Shine effect */}
              {!isPlaying && (
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
              )}
            </div>

            {/* Decorative glows */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-600/5 blur-[100px] rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. Why you Need this Service Section - Expanded */}
      <section className="py-24 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Why you <span className="relative inline-block">
                <span className="text-neon-green">Need this Service</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 20" fill="none">
                  <path d="M5 15Q200 5 395 15" stroke="#87E65C" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-4xl mx-auto leading-relaxed font-medium">
              A well-crafted PPC campaign is a powerful marketing tool that can connect you directly with potential customers at the precise moment they are searching for your products or services. We specialize in creating targeted and high-performing PPC campaigns that drive qualified leads, increase conversions, and maximize your return on investment. Uncover the hidden potential of PPC campaigns:
            </p>
          </div>

          <div className="max-w-6xl mx-auto p-12 rounded-[3rem] bg-neutral-900/30 border border-white/5 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {/* Left Column */}
              <div className="space-y-2">
                {[
                  { id: "01", title: "Reach Your Target Audience", desc: "Deliver your message to the exact people actively searching for your business or services." },
                  { id: "03", title: "Increase Brand Visibility", desc: "Ensure your brand stays top-of-mind by appearing at the very top of search results." },
                  { id: "05", title: "Boost Conversions", desc: "Targeted ads mean users are further down the sales funnel and ready to take action." },
                  { id: "07", title: "Measure & Track Results", desc: "Every click, impression, and conversion is tracked, giving you clear data on your ROI." }
                ].map((item, i) => (
                  <div key={i} className="border-b border-white/5 last:border-0">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i * 2 ? null : i * 2)}
                      className="w-full py-6 flex items-center justify-between group text-left"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-red-500 font-bold text-lg font-mono">{item.id}.</span>
                        <span className="text-white font-bold text-lg group-hover:text-red-400 transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-neutral-600 transition-transform duration-300 ${openFaq === i * 2 ? 'rotate-90 text-red-500' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i * 2 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pl-12 text-neutral-500 text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                {[
                  { id: "02", title: "Generate Immediate Results", desc: "Unlike SEO, PPC provides instant visibility and traffic the moment your campaign goes live." },
                  { id: "04", title: "Drive Website Traffic", desc: "High-quality, intent-driven traffic that is more likely to engage with your site." },
                  { id: "06", title: "Gain A Competitive Edge", desc: "Outrank competitors for high-value keywords and capture their potential market share." },
                  { id: "08", title: "Flexibility and Control", desc: "Start, stop, or adjust your budget and targeting in real-time based on performance." }
                ].map((item, i) => {
                  const actualIdx = i * 2 + 1;
                  return (
                    <div key={i} className="border-b border-white/5 last:border-0">
                      <button 
                        onClick={() => setOpenFaq(openFaq === actualIdx ? null : actualIdx)}
                        className="w-full py-6 flex items-center justify-between group text-left"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-red-500 font-bold text-lg font-mono">{item.id}.</span>
                          <span className="text-white font-bold text-lg group-hover:text-red-400 transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-neutral-600 transition-transform duration-300 ${openFaq === actualIdx ? 'rotate-90 text-red-500' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openFaq === actualIdx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 pl-12 text-neutral-500 text-sm leading-relaxed">
                              {item.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Proven Credentials Section */}
      <section className="py-24 px-6 relative z-10 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Our Proven <span className="relative inline-block">
                  <span className="text-neon-green">Credentials</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 250 20" fill="none">
                    <path d="M5 15Q125 5 245 15" stroke="#87E65C" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p className="text-neutral-500 max-w-lg leading-relaxed">
                Trusted by industry leaders and certified by top platforms to deliver exceptional results across all marketing channels.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 text-neutral-400 group-hover:text-white" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group"
              >
                <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              { 
                title: "SEO Certified In", 
                sub: "8+ SEO Focuses", 
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )
              },
              { 
                title: "Google Analytics", 
                sub: "Advanced User", 
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.25 18V12M12 18V6M18.75 18V14.25" stroke="#F9AB00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 21H21" stroke="#F9AB00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )
              },
              { 
                title: "Google Ads", 
                sub: "Certified", 
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 3.5L3.5 18.5H12.5V3.5Z" fill="#4285F4"/>
                    <path d="M20.5 18.5L12.5 3.5V18.5H20.5Z" fill="#34A853"/>
                    <path d="M12.5 18.5L15.5 13.5H9.5L12.5 18.5Z" fill="#FBBC05"/>
                  </svg>
                )
              },
              { 
                title: "Masters Of", 
                sub: "Science In Marketing Strategy", 
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L4 9L12 15L20 9L12 3Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 14L12 20L20 14" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )
              },
              { 
                title: "Facebook Ads", 
                sub: "Certified", 
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" fill="#1877F2"/>
                  </svg>
                )
              },
              { 
                title: "Certified Consumer", 
                sub: "Psychology Experts", 
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#87E65C" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="6" stroke="#87E65C" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="2" fill="#87E65C"/>
                  </svg>
                )
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="min-w-[280px] p-10 rounded-[3rem] bg-neutral-900/40 border border-white/5 hover:border-neon-green/20 transition-all text-center group snap-center"
              >
                <div className="relative w-28 h-28 mx-auto mb-10">
                  {/* Diamond Shape */}
                  <motion.div 
                    whileHover={{ rotate: 135 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-neutral-800 rotate-45 rounded-2xl border border-white/10 group-hover:border-neon-green/30 group-hover:bg-neutral-800 transition-colors shadow-2xl" 
                  />
                  <div className="relative h-full flex items-center justify-center text-white/40 group-hover:text-neon-green transition-colors">
                    {card.icon}
                  </div>
                </div>
                <h4 className="text-white font-bold text-base mb-3 group-hover:text-neon-green transition-colors">{card.title}</h4>
                <p className="text-neutral-600 text-[11px] font-black uppercase tracking-[0.2em]">{card.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <div className="container mx-auto px-6 relative z-10">

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {ppcServices.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative group cursor-pointer"
            >
              <div className="h-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[3rem] p-10 backdrop-blur-md transition-all duration-500 group-hover:border-emerald-500/30 group-hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-[1.5rem] ${service.color} flex items-center justify-center text-white mb-8 shadow-2xl transform transition-transform group-hover:rotate-12`}>
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold mb-6 group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="flex items-center gap-3 font-bold text-emerald-400 group/btn">
                  Launch Campaign
                  <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </div>
              </div>

              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.div
                    layoutId="ppc-glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-emerald-500/10 blur-[80px] -z-10 rounded-full"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Content Section: ROI Driven Process */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-white/5 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
                  Our 4-Step <br />
                  <span className="text-emerald-400">PPC Framework</span>
                </h2>
                <div className="space-y-8">
                  {[
                    { step: "01", title: "Keyword Intelligence", desc: "Identifying highest intent search terms for your business." },
                    { step: "02", title: "Creative Ad Copy", desc: "Crafting compelling ad copies that drive users to click." },
                    { step: "03", title: "Landing Page Sync", desc: "Aligning landing pages with ads to boost conversion rates." },
                    { step: "04", title: "24/7 Optimization", desc: "Daily tracking and improving bidding strategies and performance." }
                  ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="text-3xl font-black text-white/10 group-hover:text-emerald-500/50 transition-colors">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-800/40 rounded-3xl border border-white/10 p-4 backdrop-blur-3xl">
                <div className="flex items-center justify-between mb-8 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-sm font-mono text-slate-500 tracking-widest">REALTIME_ROAS_TRACKER</div>
                </div>
                
                <div className="space-y-6">
                  {[85, 60, 95].map((w, i) => (
                    <div key={i} className="space-y-2 px-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Campaign Layer 0{i+1}</span>
                        <span className="text-emerald-400 font-bold">{w}% Efficiency</span>
                      </div>
                      <div className="h-3 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${w}%` }}
                          transition={{ duration: 1.5, delay: i * 0.2 }}
                          className="h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" 
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] text-center">
                  <div className="text-slate-400 text-sm uppercase mb-2">Estimated Monthly Revenue</div>
                  <div className="text-5xl font-black text-emerald-400">$2,450+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Industries We Serve Section */}
      <section className="py-24 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center gap-4 text-blue-500 font-mono text-xs tracking-[0.3em] uppercase">
              <div className="w-12 h-[1px] bg-blue-500/30" />
              Industries We Serve
              <div className="w-12 h-[1px] bg-blue-500/30" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              We Speak Your <span className="text-blue-500">Industry's Language</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Our PPC experts have hands-on experience across a wide range of industries, delivering tailored strategies that resonate with your specific audience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              "Technology & SaaS", "E-Commerce & Retail", "Healthcare & Wellness", "Finance & FinTech",
              "Education & EdTech", "Real Estate", "Travel & Hospitality", "Fashion & Lifestyle",
              "Legal & Compliance", "Food & Restaurant", "Automotive", "Non-Profit & NGO"
            ].map((industry, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-neutral-900/50 border border-white/5 transition-all cursor-default group"
              >
                <div className="w-6 h-6 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-black transition-all">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-neutral-300 font-medium text-sm group-hover:text-white transition-colors">{industry}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section - Moved to last */}
      <section className="py-32 px-6 relative z-10 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Common <span className="text-neon-green">Questions</span>
            </h2>
            <p className="text-neutral-500 text-lg">
              Everything you need to know about our PPC advertising services.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is PPC and how does it work?",
                a: "PPC (Pay-Per-Click) is a model of digital advertising where you pay a fee each time one of your ads is clicked. It's a way of buying visits to your site, rather than attempting to 'earn' those visits organically."
              },
              {
                q: "How long does it take to see results?",
                a: "Unlike SEO, which can take months, PPC results are almost immediate. Once your campaign is approved and live, your ads will start appearing in search results, driving traffic to your site instantly."
              },
              {
                q: "How do you determine the budget?",
                a: "We analyze your industry, competitor spending, and target keywords to recommend a budget that will deliver meaningful results. You have full control over your daily and monthly spend."
              },
              {
                q: "Which platforms do you manage?",
                a: "We specialize in Google Ads (Search, Display, YouTube), Meta Ads (Facebook, Instagram), LinkedIn Ads, and Bing Ads. We choose the platform that best fits your audience."
              },
              {
                q: "How do we track ROI?",
                a: "We set up advanced conversion tracking using Google Analytics and GTM. You'll receive real-time reports showing exactly how many leads or sales each taka of your ad spend is generating."
              }
            ].map((faq, i) => (
              <div 
                key={i} 
                className="rounded-[2rem] bg-neutral-900/30 border border-white/5 overflow-hidden transition-all hover:border-white/10"
              >
                <button
                  onClick={() => setOpenMainFaq(openMainFaq === i ? null : i)}
                  className="w-full px-8 py-7 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-bold text-white group-hover:text-neon-green transition-colors">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${openMainFaq === i ? 'bg-neon-green border-neon-green rotate-180' : ''}`}>
                    <ChevronDown className={`w-4 h-4 ${openMainFaq === i ? 'text-black' : 'text-neutral-500'}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {openMainFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-neutral-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Redesigned */}
      <section className="py-32 px-6 relative z-10 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="relative p-12 md:p-20 rounded-[3rem] bg-neutral-900/40 border border-white/5 overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-neon-green/5 blur-[120px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                  Ready to Turn PPC <br />
                  Clicks <span className="relative inline-block">
                    <span className="text-neon-green">Into Pipeline?</span>
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 350 20" fill="none">
                      <path d="M5 15Q175 5 345 15" stroke="#87E65C" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
                  You want a strategy that drives real business, not just traffic. Most campaigns stop at impressions or clicks and don't convert. We help you turn paid search into a predictable revenue engine.
                </p>
                <div className="pt-4">
                  <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-neon-green text-black font-black text-lg rounded-full hover:scale-105 transition-all shadow-[0_10px_40px_rgba(135,230,92,0.3)]">
                    Contact us
                  </Link>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full max-w-[400px] aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
                >
                  <img 
                    src="/ppc_cta.png" 
                    alt="PPC Success" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay for better integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </motion.div>
                
                {/* Extra glow behind image */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-neon-green/10 blur-[100px] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
