import { motion } from "framer-motion";
import DomeGallery from "../components/DomeGallery";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useContent } from "../context/ContentContext";

const PORTFOLIO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    alt: "Full Stack Digital Marketing - Strategic Business Campaigns"
  },
  {
    src: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=800&auto=format&fit=crop",
    alt: "AI Driven SEO - High-Performance Ranking & Metrics"
  },
  {
    src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
    alt: "SMM (Social Media Marketing) - Brand Feed Engagement"
  },
  {
    src: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=800&auto=format&fit=crop",
    alt: "PPC Ads Management - Google & Facebook Funnels"
  },
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    alt: "Shopify SEO - Store Growth & Conversion Optimization"
  },
  {
    src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
    alt: "Content Writing - Persuasive SEO Copywriting & Articles"
  },
  {
    src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
    alt: "Cinematic Video Editing - Viral Short-form Content"
  },
  {
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    alt: "Motion Graphics - Dynamic Creative Animations"
  },
  {
    src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    alt: "Full-Stack Website Development - Scaleable Architectures"
  },
  {
    src: "https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=800&auto=format&fit=crop",
    alt: "Custom WordPress Web - High-Performance CMS Systems"
  },
  {
    src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop",
    alt: "Web Design (UI UX) - User-Focused Design Systems"
  },
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    alt: "Custom Shopify Development - Advanced E-commerce Solutions"
  }
];


export default function WorkPage() {
  const { portfolio: dynamicPortfolio } = useContent();
  const displayImages = dynamicPortfolio && dynamicPortfolio.length > 0
    ? dynamicPortfolio.map(p => ({ src: p.src, alt: p.alt }))
    : PORTFOLIO_IMAGES;

  return (
    <main className="min-h-screen bg-black overflow-hidden relative pb-24">
      <SEO 
        title="Our Work & Case Studies - WeBestOne" 
        description="Explore our portfolio of successful projects, including web development, AI SEO campaigns, and branding that drive revenue." 
      />
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Header Block */}
      <section className="relative z-10 pt-32 pb-8 px-6 max-w-4xl mx-auto text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neutral-300 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-neon-green animate-pulse" />
          <span>Interactive 3D Experience</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-white tracking-tight"
        >
          Portfolio <span className="text-neon-green">Masterpieces</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
        >
          Drag, swipe, and rotate the 3D sphere to explore our premium web systems, custom application interfaces, and scaleable client infrastructures. Click any image to view in detail.
        </motion.p>
      </section>

      {/* Immersive 3D Gallery Viewport */}
      <section className="relative z-10 w-full h-[620px] md:h-[680px] border-y border-white/5 bg-neutral-950/20">
        <DomeGallery
          images={displayImages}
          fit={0.85}
          minRadius={580}
          maxVerticalRotationDeg={10}
          segments={34}
          dragDampening={1.8}
          grayscale={false}
          imageBorderRadius="24px"
          openedImageBorderRadius="24px"
          openedImageWidth="300px"
          openedImageHeight="420px"
          overlayBlurColor="#000000"
        />
      </section>

      {/* Conversion Banner Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-purple-600/5 opacity-50" />
          <div className="relative p-10 md:p-12 text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to Build Your System?
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              We specialize in custom web development, search engine scaling, and operational automated infrastructures that help businesses scale without friction.
            </p>
            <div className="pt-4">
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#87E65C] text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
              >
                <span>👉 Book a Strategy Call</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
