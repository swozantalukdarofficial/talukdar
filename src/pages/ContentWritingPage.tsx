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
import SEO from "../components/SEO";
import { useContent } from "../context/ContentContext";
import AdminServiceImageEditor from "../components/admin/AdminServiceImageEditor";

const contentWritingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://webestone.com/services/content-writing#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://webestone.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://webestone.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Content Writing Services", "item": "https://webestone.com/services/content-writing" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://webestone.com/services/content-writing#service",
      "serviceType": "Content Writing & SEO Content Marketing",
      "name": "Content Writing Services",
      "description": "Expert SEO content writing services including blog posts, long-form articles, website copy, product descriptions, email sequences, and AI-powered content strategy.",
      "url": "https://webestone.com/services/content-writing",
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
        "name": "Content Writing Service Packages",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Blog Writing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Copywriting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Long-Form Article Writing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Product Description Writing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Email Marketing Copy" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Content Strategy & Planning" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What content writing services do you provide?",
          "acceptedAnswer": { "@type": "Answer", "text": "We provide SEO blog posts, long-form articles, website copy, landing page content, product descriptions, social media captions, email sequences, and AI-assisted content strategy tailored to your target audience." }
        },
        {
          "@type": "Question",
          "name": "Is your content SEO optimized?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every piece of content is researched and written with target keyword integration, semantic search optimization, proper heading structure, meta descriptions, and E-E-A-T principles to support Google rankings." }
        },
        {
          "@type": "Question",
          "name": "How do you ensure content quality?",
          "acceptedAnswer": { "@type": "Answer", "text": "All content goes through a multi-stage quality process including topic research, outline review, AI-assisted drafting, human expert editing, plagiarism checking, and SEO scoring before delivery." }
        },
        {
          "@type": "Question",
          "name": "Do you write in multiple languages?",
          "acceptedAnswer": { "@type": "Answer", "text": "We primarily write in English with native-level quality. We also offer content in Bengali and can coordinate multilingual content projects through our partner network." }
        }
      ]
    }
  ]
};

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
    icon: <Users className="w-6 h-6" />,
    title: "Tailored to Your Brand Voice",
    desc: "People trust brands that sound consistent. We shape tone, structure, and messaging around your identity so the content feels naturally connected to your business rather than copied from elsewhere.",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Search Engine Optimized",
    desc: "Good SEO should feel invisible. We structure content around search intent, keyword clustering, readability, and metadata without making the writing feel stuffed or unnatural.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Audience-Centred Approach",
    desc: "Nobody enjoys reading content that feels heavy or forced. We focus on cleaner flow, sharper pacing, and messaging that feels easy to move through.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Built Around Real Results",
    desc: "Traffic means nothing if nobody trusts the brand behind it. Our content writing services are designed to support engagement, lead generation, and stronger conversion growth.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "AI Assisted Without Feeling Artificial",
    desc: "Most AI-generated content sounds empty because it lacks rhythm and perspective. We use AI to improve efficiency, then shape the writing with real strategy, editing, and human tension.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Content That Feels Hard to Ignore",
    desc: "Most online content plays too safe. Safe content disappears fast. We create sharper hooks, stronger storytelling, and messaging that keeps people emotionally engaged from the first line.",
  },
];

const services = [
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Website Copywriting",
    desc: "Clear website messaging designed to improve trust, engagement, and conversions from the very first interaction.",
    tags: ["Website content writing services", "Business copywriting agency", "Homepage copywriting", "Conversion copywriting"]
  },
  {
    icon: <Search className="w-7 h-7" />,
    title: "Blog and SEO Content Writing",
    desc: "Search-focused blog writing built around search intent, keyword strategy, and long-term organic traffic growth.",
    tags: ["SEO content writing", "Expert blog writing agency", "Keyword optimization", "Long-form content marketing"]
  },
  {
    icon: <Megaphone className="w-7 h-7" />,
    title: "Social Media Copywriting",
    desc: "Short-form messaging designed to stop scrolling, increase engagement, and strengthen brand personality.",
    tags: ["Social media marketing", "Caption writing", "Ad copy", "Campaign messaging"]
  },
  {
    icon: <ShoppingCart className="w-7 h-7" />,
    title: "E-commerce and Product Copywriting",
    desc: "Conversion-focused product content designed for Shopify, WordPress, and growing online stores.",
    tags: ["E-commerce content writing", "Product description service", "Shopify copywriting", "Sales copywriting"]
  },
  {
    icon: <Mail className="w-7 h-7" />,
    title: "Email and Newsletter Campaigns",
    desc: "Strategic email marketing content designed to nurture leads, strengthen customer retention, and keep audiences engaged.",
    tags: ["Email copywriting", "Newsletter campaigns", "Drip sequences", "Retention emails"]
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Content Strategy and Planning",
    desc: "Structured content strategy services designed around SEO, consistency, and scalable long-term growth.",
    tags: ["Content strategy services", "Editorial calendar", "SEO strategy", "Content ecosystems"]
  }
];

const industriesData = [
  {
    title: "Technology and SaaS",
    desc: "Clear messaging that simplifies complexity and strengthens positioning."
  },
  {
    title: "E-commerce and Retail",
    desc: "Conversion-focused content designed to improve engagement and increase sales."
  },
  {
    title: "Real Estate",
    desc: "Trust-driven messaging that turns attention into inquiries."
  },
  {
    title: "Health and Wellness",
    desc: "Educational content written with clarity, structure, and audience sensitivity."
  },
  {
    title: "Education and E-Learning",
    desc: "Learning-focused writing designed for engagement and readability."
  },
  {
    title: "Fashion and Lifestyle",
    desc: "Brand storytelling that feels visual, emotional, and trend aware."
  },
  {
    title: "Marketing and Creative Agencies",
    desc: "Scalable content support for high-volume campaigns and growing brands."
  },
  {
    title: "Media and Entertainment",
    desc: "High-engagement scripts and campaigns built for visibility and retention."
  }
];

const steps = [
  {
    num: "01",
    title: "Discovery and Research",
    desc: "We study your audience, competitors, and market behavior to uncover real growth opportunities.",
    color: "text-neon-green",
    bg: "bg-neon-green/10 border-neon-green/30",
  },
  {
    num: "02",
    title: "Strategy Development",
    desc: "We build a content roadmap around search intent, positioning, and messaging direction before writing begins.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/30",
  },
  {
    num: "03",
    title: "Creation and Optimization",
    desc: "Our writers create content that balances readability, SEO structure, engagement, and conversion-focused storytelling.",
    color: "text-neon-green",
    bg: "bg-neon-green/10 border-neon-green/30",
  },
  {
    num: "04",
    title: "Review and Refinement",
    desc: "Every piece is reviewed for tone, clarity, grammar, and brand consistency before delivery.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/30",
  },
  {
    num: "05",
    title: "Delivery and Performance Tracking",
    desc: "We deliver polished content with performance-focused recommendations designed for long-term growth.",
    color: "text-neon-green",
    bg: "bg-neon-green/10 border-neon-green/30",
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
    color: "border-white/[0.08] bg-white/[0.02] hover:border-neon-green/30",
    tagColor: "bg-neon-green/20 text-neon-green",
  },
  {
    type: "Website Copy",
    client: "GlowSkin BD",
    title: "Homepage & Product Page Rewrite",
    preview:
      "Complete website copy overhaul for a skincare brand — conversion rate improved by 38% within the first month after launch.",
    tag: "E-Commerce",
    color: "border-white/[0.08] bg-white/[0.02] hover:border-neon-green/30",
    tagColor: "bg-neon-green/20 text-neon-green",
  },
  {
    type: "Email Sequence",
    client: "EduNext Platform",
    title: "7-Part Welcome Email Onboarding Series",
    preview:
      "Nurture sequence for an EdTech SaaS platform — average open rate of 62% and 28% trial-to-paid conversion rate.",
    tag: "Education",
    color: "border-white/[0.08] bg-white/[0.02] hover:border-neon-green/30",
    tagColor: "bg-neon-green/20 text-neon-green",
  },
  {
    type: "Product Descriptions",
    client: "TechMart BD",
    title: "500+ E-Commerce Product Listings",
    preview:
      "Bulk product description writing for a tech e-commerce store — organic product page traffic increased by 210% in 3 months.",
    tag: "Retail",
    color: "border-white/[0.08] bg-white/[0.02] hover:border-neon-green/30",
    tagColor: "bg-neon-green/20 text-neon-green",
  },
];

const metrics = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Organic Traffic",
    desc: "Content structures designed to improve visibility and long-term search growth.",
    color: "text-neon-green",
    borderColor: "hover:border-neon-green/30"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "User Engagement",
    desc: "Sharper messaging that increases interaction and audience retention.",
    color: "text-emerald-400",
    borderColor: "hover:border-emerald-400/30"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Brand Authority",
    desc: "Strategic positioning that strengthens credibility and trust.",
    color: "text-neon-green",
    borderColor: "hover:border-neon-green/30"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Conversion Growth",
    desc: "Clearer messaging designed to support stronger conversion rates and lead quality.",
    color: "text-emerald-400",
    borderColor: "hover:border-emerald-400/30"
  }
];

const testimonials = [
  {
    quote: "Before WeBestOne, our website sounded like every other company in the industry. Now the brand finally feels clear, premium, and memorable.",
    name: "CLIENT TESTIMONIAL",
    role: "Founder, E-commerce Brand",
    rating: 5,
  },
  {
    quote: "We had traffic before, but the messaging was weak. Once the content changed, engagement and conversions started improving almost immediately.",
    name: "CLIENT TESTIMONIAL",
    role: "Marketing Director",
    rating: 5,
  },
  {
    quote: "The biggest difference was how natural everything felt. The content finally sounded like a real brand instead of generic marketing.",
    name: "CLIENT TESTIMONIAL",
    role: "Operations Manager",
    rating: 5,
  },
];

const faqs = [
  {
    q: "Do you provide SEO optimized content writing services?",
    a: "Yes. Our content writing services are built around search intent, readability, metadata optimization, and long-term visibility growth.",
  },
  {
    q: "Can your content writing agency match our brand tone?",
    a: "Yes. We adapt tone, messaging, and structure based on your audience, positioning, and branding goals.",
  },
  {
    q: "Do you offer content marketing services for growing businesses?",
    a: "Yes. We create SEO blogs, website copy, landing pages, email campaigns, and scalable content marketing services designed for long-term growth.",
  },
  {
    q: "Can you support long-term content strategy services?",
    a: "Yes. We build scalable content strategy services focused on consistency, organic traffic, and customer retention.",
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
  const { serviceImages } = useContent();
  return (
    <main className="relative min-h-screen text-white bg-black overflow-x-hidden">
      <AdminServiceImageEditor serviceId="content-writing-services" />
      <SEO
        pageKey="content-writing-services"
        title="Content Writing Services | Creative Content Writing Agency"
        description="Expert Content Writing Services are designed to scale your brand with SEO optimized blogs, authority-building articles and a creative content writing team."
        schemaMarkup={contentWritingSchema}
      />
      {/* Global background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
      </div>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center pt-32 md:pt-36 lg:pt-40 pb-16 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="space-y-4 md:space-y-5 order-2 lg:order-1 mt-10 lg:mt-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 text-xs font-semibold uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              Words That Work. Content That Converts.
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-[60px] font-black leading-[1.1] tracking-tight"
            >
              Content Writing Services That Make{" "}
              <span className="bg-gradient-to-r from-neon-green to-emerald-400 bg-clip-text text-transparent block">
                Brands Sound Worth Paying Attention To
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-neutral-400 text-sm md:text-base leading-relaxed space-y-4 max-w-xl font-medium"
            >
              <p>
                <span className="text-white font-semibold">Most brands are posting constantly. Blogs, emails, captions, landing pages. Yet almost all of it disappears five seconds later.</span> Not because people hate content, but because most content sounds exactly the same.
              </p>
              <p>
                <span className="text-white font-semibold">WeBestOne builds content writing services designed to make people stop, feel something and keep reading.</span> We combine audience psychology, search behavior and sharp messaging to create content that feels impossible to skim past.
              </p>
              <p className="text-neon-green font-bold text-sm tracking-wide border-l-2 border-neon-green pl-3 py-0.5 mt-2">
                Because good content gets seen. Great content gets remembered.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-1"
            >
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-neon-green text-black font-bold rounded-full shadow-[0_0_25px_rgba(135,230,92,0.35)] hover:shadow-[0_0_40px_rgba(135,230,92,0.55)] hover:scale-105 transition-all duration-300 text-sm"
              >
                Get a Free Content Strategy
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact-us"
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
            className="relative h-[300px] sm:h-[420px] flex items-center justify-center order-1 lg:order-2 w-full"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/10 via-emerald-500/10 to-neutral-900/10 rounded-full blur-[80px] pointer-events-none" />

            {serviceImages["content-writing-services"] ? (
              <img
                src={serviceImages["content-writing-services"]}
                alt="Content Writing Services"
                className="w-[90%] md:w-[80%] max-h-full object-contain rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
              />
            ) : (
              <>
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
                      className="h-full bg-gradient-to-r from-neon-green to-emerald-400 rounded-full"
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
                    <div className="w-8 h-8 rounded-lg bg-neon-green/15 border border-neon-green/30 flex items-center justify-center">
                      <PenTool className="w-4 h-4 text-neon-green" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Website Copy</p>
                      <p className="text-neon-green text-[10px] font-bold tracking-widest uppercase">Converting</p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "78%" }}
                      transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-neon-green to-emerald-400 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-neutral-500 text-[10px]">Conversion Rate</span>
                    <span className="text-neon-green text-[10px] font-mono">+38%</span>
                  </div>
                </motion.div>

                {/* ── Card 3: Blog Traffic (small) ── */}
                <motion.div
                  animate={{ y: [-5, 10, -5] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-[38%] right-[2%] w-[44%] p-3.5 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">Blog Traffic</p>
                      <p className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase">Growing</p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-neon-green rounded-full"
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-neutral-500 text-[10px]">Traffic Growth</span>
                    <span className="text-emerald-400 text-[10px] font-mono">320%</span>
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
              </>
            )}
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. WHY CHOOSE WEBESTIONE
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-12 md:py-16 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Why WeBestOne</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Why Brands Choose <span className="text-neon-green">WeBestOne</span> for Their Content Writing Needs
            </h2>
            <p className="text-neutral-400 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
              The internet is already crowded with content nobody remembers. More generic writing will not fix that. WeBestOne creates content that feels sharper, smoother, and built with actual intent behind it. We combine creative content writing, search engine optimization, and audience psychology to create messaging people genuinely want to keep reading. Every sentence is designed to guide attention naturally rather than fight for it.
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
      <section className="relative z-10 pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">What We Write</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Our Core <span className="text-neon-green">Content Writing Services</span>
            </h2>
            <p className="text-neutral-400 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
              Content is no longer just a marketing task. It shapes how people see your brand before they ever contact you. That is why we build content systems designed for visibility, authority, engagement, and long-term growth across search, social, websites, and campaigns.
            </p>
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
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-neon-green/30 hover:bg-neon-green/[0.02] hover:scale-[1.02] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="text-neon-green mb-4 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                </div>
                {s.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/5">
                    {s.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] text-neutral-400 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. INDUSTRIES
      ══════════════════════════════════════════ */}
      <section className="relative z-10 pt-12 pb-12 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Industries We Serve</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Industries <span className="text-neon-green">WeBestOne Supports</span>
            </h2>
            <p className="text-neutral-400 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
              Every industry has its own tone, pace, and audience behavior. We shape content around how people actually search, think, compare, and decide so brands feel relevant inside their market instead of sounding generic everywhere.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {industriesData.map((ind, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-neon-green/30 hover:bg-neon-green/[0.04] transition-all duration-300 group flex flex-col gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-neon-green shrink-0 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-sm md:text-base">{ind.title}</h3>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed">{ind.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Industry Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 text-center max-w-2xl mx-auto p-8 rounded-3xl border border-neon-green/10 bg-neon-green/[0.02]"
          >
            <Quote className="w-8 h-8 text-neon-green mx-auto mb-4 opacity-40" />
            <p className="text-lg md:text-xl font-medium text-neutral-300 italic">
              “Every industry has its own rhythm. Great content sounds like it belongs there naturally.”
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. OUR PROCESS
      ══════════════════════════════════════════ */}
      <section className="relative z-10 pt-12 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">How We Work</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Our Process: From <span className="text-neon-green">Strategy</span> to Search Visibility
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
              Strong content is never random. Every project follows a structured process designed to balance visibility, clarity, engagement, and business goals without losing the human side of the writing.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-green via-emerald-400 to-neon-green opacity-30 hidden sm:block" />

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
                    <h3 className={`font-bold text-lg mb-2 ${step.color}`}>{step.title}</h3>
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
      <section className="relative z-10 pt-12 pb-12 px-6 bg-white/[0.02]">
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
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Portfolio</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Content Writing{" "}
              <span className="text-neon-green">Samples & Results</span>
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
                className={`p-6 rounded-2xl ${p.color} hover:scale-[1.01] transition-all duration-300`}
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
              to="/contact-us"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-neon-green/40 text-neon-green font-semibold hover:bg-neon-green/10 transition-all duration-300"
            >
              Request Full Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. RESULTS / METRICS
      ══════════════════════════════════════════ */}
      <section className="relative z-10 pt-12 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Proven Results</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Proven Results <span className="text-neon-green">with WeBestOne</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`p-8 rounded-3xl border border-white/[0.08] bg-white/[0.03] text-center hover:border-white/20 transition-all duration-300 group flex flex-col items-center gap-4 ${m.borderColor}`}
              >
                <div className={`${m.color} group-hover:scale-110 transition-transform duration-300`}>
                  {m.icon}
                </div>
                <h3 className="text-white font-bold text-lg md:text-xl">{m.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Success Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 max-w-3xl mx-auto p-8 md:p-10 rounded-[2.5rem] border border-neon-green/10 bg-neon-green/[0.02] text-center relative overflow-hidden"
          >
            <Quote className="w-10 h-10 text-neon-green mx-auto mb-6 opacity-30" />
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              “Our content stopped feeling like filler and started feeling like a real competitive advantage.”
            </p>
            <p className="text-neon-green font-mono text-xs font-black uppercase tracking-[0.2em] mt-6">
              — CLIENT SUCCESS STORY
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="relative z-10 pt-12 pb-12 px-6 bg-white/[0.02]">
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
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Client Feedback</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              What Our{" "}
              <span className="text-neon-green">Clients Say</span>
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
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-neon-green/30 transition-all duration-300 flex flex-col gap-4"
              >
                <Quote className="w-8 h-8 text-neon-green/60" />
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
      <section className="relative z-10 pt-12 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">FAQ</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
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
      <section className="relative z-10 pt-12 pb-24 px-6">
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
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Build a Brand People{" "}
                  <span className="bg-gradient-to-r from-neon-green to-cyan-400 bg-clip-text text-transparent">
                    Actually Remember
                  </span>
                </h2>
                <p className="text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                  People can feel when the content was written just to fill space.
                  That kind of writing disappears instantly. <strong>WeBestOne</strong> provides content writing services designed to capture attention, strengthen brand authority, improve visibility, and drive measurable business growth.
                  If your content is not creating momentum, it is time to rebuild the strategy behind it.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact-us"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-neon-green text-black font-bold rounded-full shadow-[0_0_25px_rgba(135,230,92,0.4)] hover:shadow-[0_0_40px_rgba(135,230,92,0.6)] hover:scale-105 transition-all duration-300"
                  >
                    Request a Free Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/contact-us"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-neon-green/50 hover:bg-neon-green/5 transition-all duration-300"
                  >
                    Start Your Project Today
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
