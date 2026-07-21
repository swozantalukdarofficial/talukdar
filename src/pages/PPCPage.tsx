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
  Play,
  PlayCircle,
  ChevronLeft,
  Settings,
  ChevronDown,
  Check,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import SEO from "../components/SEO";
import { MagneticButton } from "../components/ui/MagneticButton";
import { useContent } from "../context/ContentContext";
import AdminServiceImageEditor from "../components/admin/AdminServiceImageEditor";

const ppcSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://webestone.com/services/ppc-management#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://webestone.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://webestone.com/services" },
        { "@type": "ListItem", "position": 3, "name": "PPC Management Services", "item": "https://webestone.com/services/ppc-management" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://webestone.com/services/ppc-management#service",
      "serviceType": "PPC Management & Paid Advertising",
      "name": "PPC Management Services",
      "description": "Expert PPC Management Services including Google Ads, Meta Ads, YouTube Ads, and Bing Ads. AI-driven bid strategies, audience targeting, and conversion-focused campaigns.",
      "url": "https://webestone.com/services/ppc-management",
      "provider": {
        "@type": "LocalBusiness",
        "name": "WeBestOne",
        "url": "https://webestone.com",
        "logo": "https://webestone.com/favicon.png",
        "telephone": "+8801815025322",
        "email": "webestone@gmail.com",
        "address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressRegion": "Dhaka Division", "addressCountry": "BD" }
      },
      "areaServed": ["BD", "US", "GB", "AU", "CA"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "PPC Service Packages",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Search Ads" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Meta Ads (Facebook & Instagram)" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "YouTube Video Ads" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Shopping Ads" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Remarketing & Retargeting Campaigns" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is PPC management?",
          "acceptedAnswer": { "@type": "Answer", "text": "PPC management involves creating, optimizing, and monitoring paid advertising campaigns on platforms like Google Ads and Meta Ads to maximize ROI. It includes keyword bidding, ad copy creation, audience targeting, and ongoing performance optimization." }
        },
        {
          "@type": "Question",
          "name": "How much does PPC management cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "PPC management fees vary based on ad spend, platforms, and campaign complexity. WeBestOne offers flexible pricing based on your monthly ad budget and business goals." }
        },
        {
          "@type": "Question",
          "name": "How quickly can PPC campaigns generate results?",
          "acceptedAnswer": { "@type": "Answer", "text": "PPC campaigns can generate traffic and leads within days of launch. However, optimal performance typically requires 4-8 weeks of data collection and optimization to maximize ROI." }
        },
        {
          "@type": "Question",
          "name": "What platforms do you run PPC campaigns on?",
          "acceptedAnswer": { "@type": "Answer", "text": "We run paid campaigns on Google Search, Google Display, Google Shopping, YouTube, Facebook, Instagram, LinkedIn, and Microsoft Bing Ads depending on your target audience." }
        }
      ]
    }
  ]
};

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

const PPC_VIDEO_ID = "MnLd2G198U8"; // YouTube video

export default function PPCPage() {
  const { serviceImages } = useContent();
  const videoId = serviceImages?.["ppc-management-services_video"] || PPC_VIDEO_ID;
  const ctaImg = serviceImages?.["ppc-management-services_cta_img"] || "/ppc_cta.webp";
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
    <main className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <AdminServiceImageEditor serviceId="ppc-management-services" />
      <SEO
        pageKey="ppc-management-services"
        title="PPC Management Services | Expert Paid Advertising Agency"
        description="Advanced PPC Management Services scaling brands with AI-driven strategies, audience targeting, expert keyword bidding and high performing paid search advertising."
        schemaMarkup={ppcSchema}
      />
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-neon-green/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[160px]" />
      </div>

      <section className="relative z-10 px-6 lg:px-16 pt-28 pb-16 min-h-screen flex items-center w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 md:space-y-5"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
              </span>
              <span className="text-[10px] font-bold text-neon-green uppercase tracking-wider">
                Pay Per Click
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-[58px] font-black text-white leading-[1.12] tracking-tight">
                PPC Management Services <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-teal-400 to-blue-500">
                  That Turn Paid Traffic Into Predictable Growth
                </span>
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-5 text-base text-neutral-400 max-w-xl leading-relaxed">
              <p className="text-lg md:text-xl text-white font-bold border-l-2 border-neon-green pl-4 py-1 leading-snug">
                Most businesses think they have a traffic problem. <br />
                <span className="text-neon-green">They actually have a performance problem.</span>
              </p>
              <p className="text-neutral-400 text-sm md:text-base pl-4">
                If your campaigns are not generating revenue, they are draining your budget. We deliver PPC management services built to control cost per click, improve conversion rate, and turn paid traffic into consistent, measurable growth.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-1 flex">
              <MagneticButton className="px-8 py-4 bg-neon-green text-black font-black text-base rounded-full flex items-center gap-2 shadow-[0_0_25px_rgba(135,230,92,0.35)] hover:scale-105 transition-all group">
                <Link to="/contact-us" className="inline-flex items-center gap-2">
                  <span>Get in Touch</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right Side: Video Player Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full"
          >
            {/* Top-Left Floating Badge */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 z-30 flex items-center gap-3 bg-neutral-950/90 border border-neon-green/30 px-5 py-3 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-xl bg-neon-green/10 flex items-center justify-center border border-neon-green/30">
                <TrendingUp className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Average ROAS</p>
                <p className="text-lg font-black text-white">5.8x ROAS</p>
              </div>
            </motion.div>

            {/* Bottom-Right Floating Badge */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 z-30 flex items-center gap-3 bg-neutral-950/90 border border-white/10 px-5 py-3 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Growth</p>
                <p className="text-lg font-black text-white">+420% Conv.</p>
              </div>
            </motion.div>

            <div className="relative aspect-video w-full rounded-[2.5rem] bg-neutral-900 border border-white/10 overflow-hidden group shadow-2xl hover:border-neon-green/30 transition-all duration-300">
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.div
                    key="thumbnail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 cursor-pointer group/thumb"
                    onClick={() => setIsPlaying(true)}
                  >
                    <img
                      src={serviceImages["ppc-management-services"] || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt="PPC Management Services"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="relative flex items-center justify-center z-10">
                        <span className="absolute inline-flex h-24 w-24 rounded-full bg-neon-green/30 animate-ping" />
                        <div className="relative w-16 h-16 bg-neon-green rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(135,230,92,0.5)] group-hover:scale-110 transition-all duration-300">
                          <Play className="w-6 h-6 text-black fill-black ml-1" />
                        </div>
                      </div>
                      <div className="mt-8 space-y-2 relative z-10">
                        <p className="text-sm font-bold text-white uppercase tracking-widest bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-sm">
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
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0`}
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
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20"></div>
              )}
            </div>

            {/* Decorative glows */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-neon-green/5 blur-[100px] rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Proof Section - Brand New & Premium */}
      <section className="relative z-10 py-12 md:py-16 px-6 bg-neutral-950/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

            {/* Left Col: Header info */}
            <div className="space-y-4 lg:col-span-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-[10px] font-bold tracking-widest uppercase">
                Real Performance
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Real performance. <br />
                <span className="text-neon-green">Not assumptions.</span>
              </h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-medium">
                Most agencies talk about clicks. <strong className="text-white">We focus on outcomes.</strong> Recent campaign improvements achieved by WebestOne prove our structured approach works.
              </p>
            </div>

            {/* Right Col: Stats Cards Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "-37% CPA", label: "Reduced Cost Per Acquisition", desc: "Lowered overall cost per acquisition by up to 37 percent across campaigns." },
                { title: "+52% CTR", label: "Increased Click Through Rate", desc: "Improved campaign relevance to increase CTR by over 52 percent." },
                { title: "2x - 3x CR", label: "Improved Conversion Rate", desc: "Enhanced conversions across landing funnels by 2 to 3 times." },
                { title: "Scaled ROAS", label: "Profitable Ad Scaling", desc: "Scaled active campaigns while maintaining strong ROAS across platforms." }
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-neon-green/30 transition-all duration-300 group">
                  <div className="text-3xl font-bold text-neon-green mb-2 group-hover:scale-105 transition-transform duration-300 origin-left">{stat.title}</div>
                  <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
                  <div className="text-neutral-400 text-xs leading-relaxed font-medium">{stat.desc}</div>
                </div>
              ))}
            </div>

          </div>

          <div className="mt-10 text-center text-xs md:text-sm font-mono text-neutral-500">
            * These results come from structured execution, not guesswork.
          </div>
        </div>
      </section>

      {/* 2. Why you Need this Service Section - Expanded */}
      <section className="py-24 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
              Why you <span className="relative inline-block">
                <span className="text-neon-green">Need this Service</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 20" fill="none">
                  <path d="M5 15Q200 5 395 15" stroke="#87E65C" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed mt-6">
              <span className="text-white font-semibold">Right now, your PPC campaign is either producing profit or losing money. There is no middle ground.</span> Most campaigns fail at the foundation: poor keyword bidding, low quality score, weak targeting, and no conversion strategy. As a PPC marketing service provider and paid search management agency, WeBestOne rebuilds your system to eliminate waste and improve performance.
            </p>
          </div>

          <div className="max-w-6xl mx-auto p-12 rounded-[3rem] bg-neutral-900/30 border border-white/5 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {/* Left Column */}
              <div className="space-y-2">
                {[
                  { id: "01", title: "Stop paying for clicks that never convert", desc: "Every wasted click increases cost per click. We target high-intent users using refined keyword bidding and audience signals." },
                  { id: "03", title: "Turn visibility into measurable growth", desc: "Impressions do not grow revenue. We optimize across google display network, youtube ads, and paid channels to drive action." },
                  { id: "05", title: "Improve conversion rate and lower CPA", desc: "Clicks are only the starting point. We apply conversion rate optimization strategies to improve conversion rate and reduce cost per acquisition." },
                  { id: "07", title: "Track real performance metrics", desc: "Guessing leads to loss. We use google tag manager and google analytics to track click through rate, conversions, and ROI with precision." }
                ].map((item, i) => (
                  <div key={i} className="border-b border-white/5 last:border-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === i * 2 ? null : i * 2)}
                      className="w-full py-6 flex items-center justify-between group text-left"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-neon-green font-bold text-lg font-mono">{item.id}.</span>
                        <span className="text-white font-bold text-lg group-hover:text-neon-green transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-neutral-600 transition-transform duration-300 ${openFaq === i * 2 ? 'rotate-90 text-neon-green' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i * 2 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pl-12 text-neutral-400 text-sm leading-relaxed font-medium">
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
                  { id: "02", title: "Get results before budget is wasted", desc: "Delays cost money. Our google ads management services and microsoft advertising campaigns are structured to generate traction early." },
                  { id: "04", title: "Drive traffic that actually converts", desc: "Traffic without intent does not scale. As a paid advertising agency, we focus on users ready to convert across facebook ads, instagram ads, and linkedin ads." },
                  { id: "06", title: "Outperform competitors in the same auction", desc: "You are bidding for the same audience. We improve quality score, ad strength, and positioning to win higher-value traffic." },
                  { id: "08", title: "Scale profitably without losing control", desc: "Scaling without structure increases losses. Our campaign optimization approach ensures growth while maintaining strong ROAS." }
                ].map((item, i) => {
                  const actualIdx = i * 2 + 1;
                  return (
                    <div key={i} className="border-b border-white/5 last:border-0">
                      <button
                        onClick={() => setOpenFaq(openFaq === actualIdx ? null : actualIdx)}
                        className="w-full py-6 flex items-center justify-between group text-left"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-neon-green font-bold text-lg font-mono">{item.id}.</span>
                          <span className="text-white font-bold text-lg group-hover:text-neon-green transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-neutral-600 transition-transform duration-300 ${openFaq === actualIdx ? 'rotate-90 text-neon-green' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openFaq === actualIdx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 pl-12 text-neutral-400 text-sm leading-relaxed font-medium">
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
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              {
                title: "Google Analytics",
                sub: "Advanced User",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.25 18V12M12 18V6M18.75 18V14.25" stroke="#F9AB00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 21H21" stroke="#F9AB00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              {
                title: "Google Ads",
                sub: "Certified",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 3.5L3.5 18.5H12.5V3.5Z" fill="#4285F4" />
                    <path d="M20.5 18.5L12.5 3.5V18.5H20.5Z" fill="#34A853" />
                    <path d="M12.5 18.5L15.5 13.5H9.5L12.5 18.5Z" fill="#FBBC05" />
                  </svg>
                )
              },
              {
                title: "Masters Of",
                sub: "Science In Marketing Strategy",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L4 9L12 15L20 9L12 3Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 14L12 20L20 14" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              {
                title: "Facebook Ads",
                sub: "Certified",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" fill="#1877F2" />
                  </svg>
                )
              },
              {
                title: "Certified Consumer",
                sub: "Psychology Experts",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#87E65C" strokeWidth="2" />
                    <circle cx="12" cy="12" r="6" stroke="#87E65C" strokeWidth="2" />
                    <circle cx="12" cy="12" r="2" fill="#87E65C" />
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
              <div className="h-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[3rem] p-10 backdrop-blur-md transition-all duration-500 group-hover:border-neon-green/30 group-hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-[1.5rem] ${service.color} flex items-center justify-center text-white mb-8 shadow-2xl transform transition-transform group-hover:rotate-12`}>
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold mb-6 group-hover:text-neon-green transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="flex items-center gap-3 font-bold text-neon-green group/btn">
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
                    className="absolute inset-0 bg-neon-green/10 blur-[80px] -z-10 rounded-full"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Content Section: ROI Driven Process */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-white/5 rounded-[2.5rem] sm:rounded-[4rem] p-6 sm:p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-neon-green/5 blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Our <span className="text-neon-green">Approach</span>
              </h2>
              <div className="text-neutral-400 mb-8 max-w-md text-sm md:text-base leading-relaxed font-medium space-y-3">
                <p className="text-neutral-300 font-bold">We do not run ads. We engineer performance.</p>
                <p>As a PPC management services provider, WeBestOne focuses on outcomes, not activity.</p>
              </div>
              <div className="space-y-8">
                {[
                  { step: "01", title: "Strategy first", desc: "We identify where your system is losing money before scaling." },
                  { step: "02", title: "Precision targeting", desc: "We eliminate waste and focus on high-conversion segments." },
                  { step: "03", title: "Conversion-focused execution", desc: "We align ads, keywords, and landing experience to drive action." },
                  { step: "04", title: "Continuous optimization", desc: "Performance improves through structured iteration and data analysis." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="text-3xl font-black text-white/10 group-hover:text-neon-green/50 transition-colors">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-800/40 rounded-3xl border border-white/10 p-4 backdrop-blur-3xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-8 px-2 sm:px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-slate-500 tracking-wide sm:tracking-widest">REALTIME_ROAS_TRACKER</div>
                </div>

                <div className="space-y-6">
                  {[85, 60, 95].map((w, i) => (
                    <div key={i} className="space-y-2 px-2 sm:px-4">
                      <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span className="text-slate-400">Campaign Layer 0{i + 1}</span>
                        <span className="text-neon-green font-bold">{w}% Efficiency</span>
                      </div>
                      <div className="h-3 w-full bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${w}%` }}
                          transition={{ duration: 1.5, delay: i * 0.2 }}
                          className="h-full bg-neon-green shadow-[0_0_20px_rgba(135,230,92,0.5)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 sm:p-8 bg-neon-green/10 border border-neon-green/20 rounded-[2rem] text-center">
                  <div className="text-slate-400 text-xs sm:text-sm uppercase mb-2">Estimated Monthly Revenue</div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-neon-green">$2,450+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. OWN THE TOPIC SECTION */}
      <section className="pt-24 pb-12 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center gap-4 text-neon-green font-mono text-xs tracking-[0.3em] uppercase">
              <div className="w-12 h-[1px] bg-neon-green/30" />
              SYSTEM CONTROL
              <div className="w-12 h-[1px] bg-neon-green/30" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              We control the variables that <span className="text-neon-green">decide PPC success.</span>
            </h2>
            <div className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium space-y-2">
              <p className="text-neutral-300 font-bold">Most campaigns fail because they ignore fundamentals.</p>
              <p>WeBestOne manages your entire advertising stack with absolute precision:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "keyword bidding strategy aligned with intent",
              "click through rate and ad relevance",
              "quality score optimization",
              "conversion rate optimization across landing pages",
              "cost per acquisition control",
              "multi-platform execution across google ads and microsoft advertising",
              "full tracking using google tag manager and google analytics",
              "ad copy A/B testing and creative optimization",
              "audience segmentation and retargeting strategy"
            ].map((variable, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(135, 230, 92, 0.05)", borderColor: "rgba(135, 230, 92, 0.3)" }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-neutral-900/50 border border-white/5 transition-all cursor-default group"
              >
                <div className="w-6 h-6 rounded-full border border-neon-green/30 flex items-center justify-center text-neon-green group-hover:bg-neon-green group-hover:text-black transition-all shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-neutral-300 font-bold text-sm md:text-base group-hover:text-white transition-colors leading-relaxed">{variable}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center text-base md:text-lg font-mono text-neon-green/80 font-bold">
            “ This is not random testing. This is system control. ”
          </div>
        </div>
      </section>

      {/* 5. FAQ Section - Moved to last */}
      <section className="pt-12 pb-12 px-6 relative z-10 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Frequently Asked <span className="text-neon-green">Questions</span>
            </h2>
            <p className="text-neutral-500 text-lg">
              Everything you need to know about our PPC advertising services.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What makes WebestOne a strong PPC management services provider?",
                a: "We combine paid search strategy, google ads management services, conversion rate optimization, and continuous campaign improvement to drive measurable growth."
              },
              {
                q: "What is included in your PPC management services?",
                a: "Our services include keyword bidding, campaign setup, audience targeting, ad optimization, conversion tracking, and performance analysis."
              },
              {
                q: "Do you only manage google ads campaigns?",
                a: "No. As a paid advertising agency, we manage campaigns across google ads, microsoft advertising, youtube ads, facebook ads, instagram ads, and linkedin ads."
              },
              {
                q: "How do you improve PPC performance?",
                a: "We improve performance by refining keyword bidding, increasing click through rate, improving quality score, and optimizing conversion rate."
              },
              {
                q: "How long does it take to see results?",
                a: "Initial traction can appear quickly, but consistent performance comes from ongoing optimization and structured testing."
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
      <section className="pt-12 pb-32 px-6 relative z-10 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="relative p-12 md:p-20 rounded-[3rem] bg-neutral-900/40 border border-white/5 overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-neon-green/5 blur-[120px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                  Ready to stop guessing <br />
                  <span className="relative inline-block">
                    <span className="text-neon-green">and start scaling?</span>
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 350 20" fill="none">
                      <path d="M5 15Q175 5 345 15" stroke="#87E65C" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>
                <div className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-md space-y-4">
                  <p className="text-neutral-300 font-bold">
                    If your campaigns are not producing consistent results, they are costing you more than you think.
                  </p>
                  <p>
                    WeBestOne delivers PPC management services designed to improve conversion rate, reduce cost per acquisition, and generate predictable growth.
                  </p>
                  <p className="italic text-neutral-400">
                    You can keep spending and hoping. Or you can fix what is not working.
                  </p>
                </div>
                <div className="pt-4">
                  <Link to="/contact-us" className="inline-flex items-center gap-3 px-10 py-5 bg-neon-green text-black font-black text-lg rounded-full hover:scale-105 transition-all shadow-[0_10px_40px_rgba(135,230,92,0.3)]">
                    👉 contact us
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
                    src={ctaImg}
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
