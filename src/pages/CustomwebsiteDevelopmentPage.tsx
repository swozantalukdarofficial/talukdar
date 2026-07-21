import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, animate, useMotionValue, useSpring, useTransform } from "framer-motion";
import SEO from "../components/SEO";
import { useContent } from "../context/ContentContext";
import AdminServiceImageEditor from "../components/admin/AdminServiceImageEditor";
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
import { useState, useEffect, useRef } from "react";


/* ─── Animated Counter Component ─── */
interface AnimatedCounterProps {
  value: string;
  duration?: number;
}


/* ─── 3D Ambient Tilt Card Component ─── */
function Card3D({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 150 });
  
  const scale = useSpring(1, { damping: 20, stiffness: 150 });
  const shineX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    let animationFrameId: number;
    const startTime = Date.now();

    const animateFloat = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const angle = elapsed * 0.8; // Slow rotation speed
      x.set(Math.cos(angle) * 0.15);
      y.set(Math.sin(angle * 1.5) * 0.15);
      
      animationFrameId = requestAnimationFrame(animateFloat);
    };

    animateFloat();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, x, y]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.04);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="relative w-full h-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative z-10 transition-shadow duration-300 rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)]"
      >
        {/* Shine Overlay */}
        <motion.div
          style={{
            background: `radial-gradient(circle 250px at ${shineX} ${shineY}, rgba(255,255,255,0.06), transparent)`,
          }}
          className="absolute inset-0 z-20 pointer-events-none"
        />
        
        {/* Inner Content (parallax depth) */}
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function AnimatedCounter({ value, duration = 2.5 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    // Matches values like "<1.5s", "99.9%", "100+", "45%", "100/100"
    const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
    if (!match) {
      if (ref.current) ref.current.textContent = value;
      return;
    }

    const prefix = match[1] || "";
    const targetNumber = parseFloat(match[2]);
    const suffix = match[3] || "";
    const isDecimal = match[2].includes(".");

    const controls = animate(0, targetNumber, {
      duration: duration,
      ease: "easeOut",
      onUpdate(latest) {
        if (ref.current) {
          const formatted = isDecimal ? latest.toFixed(1) : Math.round(latest).toString();
          ref.current.textContent = `${prefix}${formatted}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [inView, value, duration]);

  return <span ref={ref}>{value}</span>;
}

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
    title: "Eliminate Manual Processes",
    desc: "Most businesses lose time in places they do not see. We automate manual processes to save valuable time and eliminate human errors.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Connect Disconnected Tools",
    desc: "Stop jumping between tabs. We unify your disconnected tools into a single source of truth for your entire operations.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fix Workflows Under Pressure",
    desc: "Workflows that break under pressure become extremely expensive. We build systems that perform flawlessly at peak scales.",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Custom CMS Development",
    desc: "As a custom CMS development agency, we build structured systems that align with your exact workflows, not against them.",
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Custom E-commerce Systems",
    desc: "From advanced online storefronts to complex backend integrations, everything is designed for conversion and performance.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Scalable Infrastructure",
    desc: "We build systems designed to support how your business runs, scales, and adapts, eliminating your technical growth ceiling.",
  },
];

const services = [
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Custom WordPress Development",
    desc: "Bespoke, highly customizable WordPress websites built from scratch, offering full control and scalability.",
    color: "from-neon-green/10 to-emerald-500/10",
    border: "border-neon-green/20",
  },
  {
    icon: <ShoppingCart className="w-7 h-7" />,
    title: "WooCommerce & E-Commerce",
    desc: "High-converting online stores with secure payment gateways, inventory management, and seamless checkout flows.",
    color: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: <LayoutTemplate className="w-7 h-7" />,
    title: "UI/UX & Landing Page Design",
    desc: "Data-driven, aesthetically pleasing landing pages designed specifically to maximize your conversion rates.",
    color: "from-teal-500/10 to-neon-green/10",
    border: "border-teal-500/20",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Website Redesign",
    desc: "Transform your outdated website into a modern, fast, and lead-generating machine without losing SEO juice.",
    color: "from-neon-green/10 to-teal-500/10",
    border: "border-neon-green/20",
  },
  {
    icon: <Code2 className="w-7 h-7" />,
    title: "Custom Web Applications",
    desc: "Complex, scalable web apps built with modern frameworks (React, Next.js) for specialized business logic.",
    color: "from-emerald-500/10 to-neon-green/10",
    border: "border-emerald-500/20",
  },
  {
    icon: <Server className="w-7 h-7" />,
    title: "Maintenance & Security",
    desc: "Ongoing support, security monitoring, plugin updates, and performance tuning to keep your site running smoothly.",
    color: "from-teal-500/10 to-emerald-500/10",
    border: "border-teal-500/20",
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
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
  },
  {
    num: "02",
    title: "UI/UX Prototyping",
    desc: "We create wireframes and high-fidelity mockups, giving you a visual representation of the website before coding begins.",
    color: "text-neon-green",
    bg: "bg-neon-green/10 border-neon-green/30",
  },
  {
    num: "03",
    title: "Development & Coding",
    desc: "Our developers bring the designs to life using clean, semantic, and highly optimized code, ensuring cross-browser compatibility.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
  },
  {
    num: "04",
    title: "Testing & QA",
    desc: "Rigorous testing across devices, speed optimization, security checks, and SEO audits are performed to ensure flawlessness.",
    color: "text-neon-green",
    bg: "bg-neon-green/10 border-neon-green/30",
  },
  {
    num: "05",
    title: "Launch & Training",
    desc: "We deploy the website to your live server, connect analytics, and provide training on how to manage your new content system.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
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
    color: "border-neon-green/20 bg-neon-green/5",
    tagColor: "bg-neon-green/20 text-neon-green",
  },
  {
    type: "Corporate Website",
    client: "NextGen Tech",
    title: "B2B SaaS Corporate Presence",
    preview:
      "A sleek, highly animated React/Next.js corporate site that increased lead generation by 65% through optimized funnels.",
    tag: "Technology",
    color: "border-emerald-500/20 bg-emerald-500/5",
    tagColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    type: "Web Application",
    client: "MedSync",
    title: "Patient Booking & Management Portal",
    preview:
      "A secure, HIPAA-compliant custom portal for booking appointments, managing records, and processing payments securely.",
    tag: "Healthcare",
    color: "border-neon-green/20 bg-neon-green/5",
    tagColor: "bg-neon-green/20 text-neon-green",
  },
  {
    type: "Website Redesign",
    client: "Elite Estates",
    title: "Real Estate Property Listing Site",
    preview:
      "Complete overhaul of an outdated property site into a modern, searchable platform with interactive maps and fast loading times.",
    tag: "Real Estate",
    color: "border-emerald-500/20 bg-emerald-500/5",
    tagColor: "bg-emerald-500/20 text-emerald-400",
  },
];

const metrics = [
  { icon: <Zap className="w-8 h-8" />, value: "<1.5s", label: "Average Page Load Time", color: "text-neon-green" },
  { icon: <ShieldCheck className="w-8 h-8" />, value: "99.9%", label: "Uptime Guarantee", color: "text-emerald-400" },
  { icon: <Globe className="w-8 h-8" />, value: "100+", label: "Websites Launched", color: "text-neon-green" },
  { icon: <TrendingUp className="w-8 h-8" />, value: "45%", label: "Average Conversion Increase", color: "text-emerald-400" },
  { icon: <Award className="w-8 h-8" />, value: "100/100", label: "Google PageSpeed Scores", color: "text-neon-green" },
  { icon: <Users className="w-8 h-8" />, value: "50+", label: "Happy Enterprise Clients", color: "text-emerald-400" },
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

const whatWeBuild = [
  {
    num: "01",
    title: "Crafting your unique platform",
    desc: "Your business is not standard. Your system should not be either. We build using HTML5, CSS3, JavaScript, and modern frameworks like React, Angular, and Vue.js to create scalable, structured platforms. This is where design meets functionality.",
  },
  {
    num: "02",
    title: "Connecting everything into one system",
    desc: "Disconnected tools slow everything down. We integrate custom APIs, CRMs, and payment gateways so your operations work as one system, not separate parts.",
  },
  {
    num: "03",
    title: "Building for scale from the start",
    desc: "Growth breaks weak systems. We develop using Node.js, PHP, Laravel, and MySQL, supported by Cloudflare, optimized hosting environments, and secure infrastructure with SSL certificates. This is built to handle growth before it happens.",
  },
];

const faqs = [
  {
    q: "How much do custom web development services cost?",
    a: "The cost depends on integrations, features, and system complexity. We provide a clear estimate based on your exact requirements.",
  },
  {
    q: "How long do custom web development services take?",
    a: "Most projects take between four to twelve weeks depending on scope and complexity.",
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Yes. We provide maintenance, updates, and continuous system improvements.",
  },
  {
    q: "What technologies do you use?",
    a: "We use HTML5, CSS3, JavaScript, React, Node.js, PHP, and MySQL, along with modern frameworks depending on project needs.",
  },
  {
    q: "Do you provide Shopify web development services and ecommerce platforms?",
    a: "Yes. We provide Shopify web development services along with custom ecommerce systems using WooCommerce and Magento, depending on your business model and scalability needs.",
  },
  {
    q: "Do you offer React web development services?",
    a: "Yes. We provide React web development services for scalable and high-performance applications.",
  },
  {
    q: "Can you rebuild an existing system?",
    a: "Yes. We restructure and rebuild systems that are limiting growth or performance.",
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

const customWebDevSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://webestone.com/services/custom-web-development-services#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://webestone.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://webestone.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Custom Web Development",
          "item": "https://webestone.com/services/custom-web-development-services"
        }
      ]
    },
    {
      "@type": "Service",
      "serviceType": "Custom Web Development Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "WeBestOne",
        "url": "https://webestone.com",
        "logo": "https://webestone.com/favicon.png"
      },
      "areaServed": "BD",
      "description": "High-performance custom web development services specializing in React, Node.js, PHP, Laravel, Shopify, and MySQL to scale digital presence."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much do custom web development services cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The cost depends on integrations, features, and system complexity. We provide a clear estimate based on your exact requirements."
          }
        },
        {
          "@type": "Question",
          "name": "How long do custom web development services take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most projects take between four to twelve weeks depending on scope and complexity."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide ongoing support after launch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide maintenance, updates, and continuous system improvements."
          }
        },
        {
          "@type": "Question",
          "name": "What technologies do you use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use HTML5, CSS3, JavaScript, React, Node.js, PHP, and MySQL, along with modern frameworks depending on project needs."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide Shopify web development services and ecommerce platforms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide Shopify web development services along with custom ecommerce systems using WooCommerce and Magento, depending on your business model and scalability needs."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer React web development services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide React web development services for scalable and high-performance applications."
          }
        },
        {
          "@type": "Question",
          "name": "Can you rebuild an existing system?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We restructure and rebuild systems that are limiting growth or performance."
          }
        }
      ]
    }
  ]
};

/* ─── Page ─── */
export default function WordpressDevelopmentPage() {
  const { serviceImages } = useContent();
  return (
    <main className="relative min-h-screen text-white bg-black overflow-x-hidden">
      <AdminServiceImageEditor serviceId="custom-web-development-services" />
      <SEO 
        pageKey="custom-web-development-services"
        title="Custom Web Development Services | Expert CMS Web Development" 
        description="Expert Custom web development services provide best Custom website solutions and specialize in Magento, Laravel, Shopify and React to scale your digital presence" 
        schemaMarkup={customWebDevSchema}
      />
      {/* Global background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-green/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
      </div>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center pt-20 lg:pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="space-y-4 md:space-y-5 order-2 lg:order-1 mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/20 bg-neon-green/5 text-neutral-300 text-xs font-semibold tracking-wider uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              High-Performance Web Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-[60px] font-black leading-[1.1] tracking-tight"
            >
              <span className="text-neon-green font-semibold text-xs md:text-sm block mb-1 tracking-[0.15em] uppercase">
                Custom Web Development Services
              </span>
              Build Systems Your Business Can{" "}
              <span className="bg-gradient-to-r from-neon-green via-emerald-400 to-neon-green bg-clip-text text-transparent block mt-1">
                Actually Scale On
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {/* Highlighted H2 Quote block */}
              <div className="relative pl-4 border-l-2 border-neon-green/80 py-1.5 my-3 bg-gradient-to-r from-neon-green/[0.03] to-transparent rounded-r-xl">
                <h2 className="text-base md:text-lg font-bold text-white/95 leading-relaxed">
                  "If your systems are slowing you down, it is not your effort. <span className="text-neon-green">It is your setup."</span>
                </h2>
              </div>

              {/* Lead Paragraph */}
              <p className="text-neutral-400 text-sm md:text-[0.95rem] leading-relaxed">
                Most businesses do not hit a growth ceiling because of marketing. 
                They hit it because <span className="text-white font-medium">their systems cannot keep up</span>. 
                That is where custom web development services change everything.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-neon-green/20 hover:bg-neon-green/[0.01] transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1.5 text-neon-green font-bold text-xs uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_8px_rgba(135,230,92,0.5)]" />
                    Operational Systems
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed font-medium">
                    We do not build simple pages. We build operational systems that support how your business runs, scales, and adapts.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-emerald-500/20 hover:bg-emerald-500/[0.01] transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    Controlled Infrastructure
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed font-medium">
                    This is not a template. This is robust infrastructure designed to remove friction and create momentum.
                  </p>
                </div>
              </div>
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
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-neon-green text-black font-bold rounded-full shadow-[0_0_25px_rgba(135,230,92,0.35)] hover:shadow-[0_0_40px_rgba(135,230,92,0.55)] hover:scale-105 transition-all duration-300 text-sm"
              >
                Discuss Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact-us"
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-neon-green" />
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
            className="relative h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center w-full order-1 lg:order-2"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/10 via-emerald-500/10 to-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Main Center Image */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <img 
                src={serviceImages["custom-web-development-services"] || "/web_dev_hero.webp"} 
                alt="Custom Web Development Services" 
                className="w-[90%] md:w-[80%] lg:w-full h-auto max-h-full object-contain mix-blend-lighten opacity-90 drop-shadow-[0_0_30px_rgba(135,230,92,0.3)] animate-[pulse_6s_ease-in-out_infinite]" 
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
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neon-green/15 border border-neon-green/30 flex items-center justify-center">
                  <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-neon-green" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold">Server Uptime</p>
                  <p className="text-neon-green text-[8px] sm:text-[10px] font-bold tracking-widest uppercase">Secure & Stable</p>
                </div>
              </div>
              <div className="h-1 sm:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "99.9%" }}
                  transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-neon-green to-emerald-400 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-neutral-500 text-[9px] sm:text-[10px]">Annual Uptime</span>
                <span className="text-neon-green text-[9px] sm:text-[10px] font-mono">99.99%</span>
              </div>
            </motion.div>

            {/* ── Card 3: Conversion Rate (small) ── */}
            <motion.div
              animate={{ y: [-5, 10, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[40%] right-[-5%] md:-right-6 w-[160px] sm:w-[180px] p-3 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 hidden sm:block"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Conversions</p>
                  <p className="text-emerald-400 text-[8px] font-bold tracking-widest uppercase">Growing</p>
                </div>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-neon-green rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-neutral-500 text-[9px]">Sales Lift</span>
                <span className="text-emerald-400 text-[9px] font-mono">+45%</span>
              </div>
            </motion.div>

            {/* ── Floating icon badges ── */}
            <motion.div
              animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] right-[20%] w-10 h-10 rounded-xl bg-neon-green/20 border border-neon-green/40 flex items-center justify-center shadow-[0_0_20px_rgba(135,230,92,0.2)] z-10"
            >
              <Code2 className="w-5 h-5 text-neon-green" />
            </motion.div>

            <motion.div
              animate={{ x: [0, -6, 0], y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[15%] left-[20%] w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center z-10"
            >
              <LayoutTemplate className="w-4 h-4 text-emerald-400" />
            </motion.div>
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
            className="text-center mb-14 space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Why Choose Us</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Your business deserves{" "}
              <span className="text-neon-green">more than a basic setup</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-base leading-relaxed">
              Most businesses lose time in places they do not see: manual processes, disconnected tools, and workflows that break under pressure. Over time, that becomes expensive. Our website development services for businesses are designed to fix that at the root.
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
          3.5 WHAT WE ACTUALLY BUILD
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 bg-neutral-950/40 border-t border-b border-white/5">
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
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Architecture</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              What we <span className="text-neon-green">actually build</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatWeBuild.map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-neon-green/20 hover:bg-neon-green/[0.01] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-neon-green font-mono font-bold text-lg">
                    {item.num}
                  </div>
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Our Capabilities</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Comprehensive Web{" "}
              <span className="bg-gradient-to-r from-neon-green to-emerald-400 bg-clip-text text-transparent">Development Solutions</span>
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
          4. INDUSTRIES & SCALABILITY
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14 space-y-6"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Why Custom Changes Everything</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              There comes a point where your <br />
              <span className="text-neon-green">tools stop supporting your growth</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-base leading-relaxed mb-10">
              When your tools stop supporting your growth, it is a signal to rebuild properly. 
              Our custom web development services ensure your business stops adjusting to limited software 
              and starts running on a system built to support real scale.
            </p>
            <div className="w-full h-[1px] bg-white/5 my-8" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-8">
              Platforms Built For <span className="text-neon-green">Your Specific Market</span>
            </h3>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm">
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
                className="flex items-center gap-2 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-neon-green/30 hover:bg-neon-green/[0.04] transition-all duration-300 group"
              >
                <CheckCircle2 className="w-4 h-4 text-neon-green shrink-0 group-hover:scale-110 transition-transform" />
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
            className="text-center mb-16 space-y-6"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Agile Workflow</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              How we <span className="text-neon-green">build it</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto text-left mb-12">
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5">
                <h3 className="text-neon-green font-bold text-base mb-2">01 Discovery and planning</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  We break down your workflows, identify bottlenecks, and define system architecture before anything is built.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5">
                <h3 className="text-neon-green font-bold text-base mb-2">02 Design and development</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  We design using Figma and Adobe XD, then develop using scalable technologies. All builds are version controlled using Git and GitHub, tested using Google Lighthouse, and follow web accessibility standards.
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/5 my-8" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-4">
              Our <span className="text-neon-green">5-Step Development</span> Lifecycle
            </h3>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm">
              A transparent, agile process ensuring on-time delivery and pixel-perfect execution of your vision.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-green via-emerald-500 via-teal-500 via-emerald-400 to-neon-green opacity-30 hidden sm:block" />

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
          6. CUSTOM SOLUTIONS BUILT FOR REAL USE
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
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Featured Work</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Custom solutions <span className="text-neon-green">built for real use</span>
            </h2>
            <div className="max-w-3xl mx-auto text-neutral-400 text-sm md:text-base leading-relaxed space-y-3">
              <p>
                At WebestOne, we work with businesses that have already outgrown basic solutions. We build what is missing. Everything is built for actual usage, not surface-level presentation.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono text-neutral-500">
                <span className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.01]">Custom ecommerce using WooCommerce, Shopify, Magento</span>
                <span className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.01]">SEO-ready using Analytics, Lighthouse & SEO Tools</span>
                <span className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.01]">Scalable architectures tested for real user behavior</span>
              </div>
            </div>
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
              to="/contact-us"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-neon-green/40 text-neon-green font-semibold hover:bg-neon-green/10 transition-all duration-300"
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
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">By The Numbers</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Metrics That <span className="text-neon-green">Matter</span>
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
                <h4 className={`text-4xl font-black ${m.color}`}><AnimatedCounter value={m.value} /></h4>
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
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Client Love</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              What Our Tech <span className="text-neon-green">Partners Say</span>
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
              >
                <Card3D>
                  <div className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 mb-6">
                        {[...Array(t.rating)].map((_, idx) => (
                          <Star key={idx} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <p className="text-neutral-300 leading-relaxed mb-8">"{t.quote}"</p>
                    </div>
                    <div>
                      <p className="text-white font-bold">{t.name}</p>
                      <p className="text-neutral-500 text-sm">{t.role}</p>
                    </div>
                  </div>
                </Card3D>
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
              <span className="w-8 h-[1px] bg-neon-green/60" />
              <span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">Got Questions?</span>
              <span className="w-8 h-[1px] bg-neon-green/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Frequently asked <span className="text-neon-green">questions</span>
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

          {/* Final thought */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <h3 className="text-xl font-bold text-neutral-400 uppercase tracking-wider">Final thought</h3>
            <p className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
              Your business will keep growing. <br />
              <span className="text-neon-green">The real question is whether your system can keep up.</span>
            </p>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
              With custom web development services, you build a foundation that supports performance, scale, and long-term growth.
            </p>
          </motion.div>

          {/* CTA Box */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-green to-emerald-600 opacity-90" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
            <div className="relative p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-black">We move with speed. Your business keeps up</h2>
              <p className="text-black/80 max-w-2xl mx-auto text-base md:text-lg">
                Delays cost efficiency, visibility, and growth. Start with custom web development services designed around how your business actually works.
              </p>
              <div className="pt-4">
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-neon-green font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
                >
                  👉 Book a strategy call <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
