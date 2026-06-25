import { useParams, Link, Navigate } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  Link as LinkIcon,
  Twitter,
  Linkedin,
  Facebook,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Sparkles,
  Send,
  BookOpen
} from "lucide-react";
import { blogPosts } from "../data/blogData";
import SEO from "../components/SEO";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);
  const [isShared, setIsShared] = useState(false);
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleBar = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Generate Table of Contents dynamically from h2 elements
  const headings = useMemo(() => {
    if (!post) return [];
    const matches = Array.from(post.content.matchAll(/<h2>(.*?)<\/h2>/g));
    return matches.map((m) => m[1]);
  }, [post]);

  const [activeHeading, setActiveHeading] = useState<string>("");

  // Track active section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const h2Elements = document.querySelectorAll("article h2");
      let currentActive = "";
      
      h2Elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 180) {
          currentActive = el.textContent || "";
        }
      });
      
      setActiveHeading(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) return <Navigate to="/blogs" replace />;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubscribed(true);
    setTimeout(() => setEmailSubscribed(false), 3000);
  };

  return (
    <article className="min-h-screen bg-black text-white relative pb-24">
      <SEO 
        title={post.seoTitle || `${post.title} - WeBestOne`} 
        description={post.seoDescription || post.excerpt} 
      />
      {post.schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(post.schemaMarkup)}
        </script>
      )}
      {/* Top Thin Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#87E65C] origin-left z-50 shadow-[0_0_10px_rgba(135,230,92,0.5)]"
        style={{ scaleX: scaleBar }}
      />

      {/* Floating Back Button (Desktop) */}
      <div className="fixed top-28 left-8 z-40 hidden xl:block">
        <Link
          to="/blogs"
          className="flex items-center gap-2 text-neutral-400 hover:text-[#87E65C] transition-all bg-neutral-900/60 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10 hover:border-[#87E65C]/30 hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Back to Articles</span>
        </Link>
      </div>

      {/* ══════════════════════════════════════════
          1. ELEGANT AMBIENT HERO HEADER
      ══════════════════════════════════════════ */}
      <header className="relative w-full min-h-[55vh] md:min-h-[65vh] flex items-center justify-center pt-32 pb-16 overflow-hidden border-b border-white/5">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
        {post.image?.includes("from-") && (
          <div className="absolute inset-0 opacity-10 mix-blend-screen pointer-events-none">
            <div className={`w-full h-full bg-gradient-to-br ${post.image}`} />
          </div>
        )}

        <div className="relative z-10 container max-w-4xl px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 text-xs font-bold tracking-[0.2em] uppercase"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-[#87E65C]/10 border border-[#87E65C]/20 text-[#87E65C]">
              {post.category}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            <span className="text-neutral-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#87E65C]" />
              {post.readTime}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-white tracking-tight"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            {post.excerpt}
          </motion.p>

          {/* Meta Information Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-white/5 max-w-xl mx-auto"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center shadow-lg shadow-black/40">
                <User className="w-4 h-4 text-neutral-300" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white leading-tight">
                  {post.author || "Webestone Team"}
                </div>
                <div className="text-xs text-neutral-500">
                  {post.authorRole || "Admin"}
                </div>
              </div>
            </div>

            <div className="w-px h-6 bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white leading-tight">
                  {post.date}
                </div>
                <div className="text-xs text-neutral-500">Published Date</div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          2. THREE-COLUMN ARTICLE VIEWPORT
      ══════════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Sticky Dynamic Progress & Share */}
        <aside className="lg:col-span-2 hidden lg:flex flex-col items-center gap-8 relative">
          <div className="sticky top-32 flex flex-col items-center gap-6">
            
            {/* SVG Progress Ring */}
            <div className="relative w-16 h-16 flex items-center justify-center bg-neutral-900/60 rounded-full border border-white/5 backdrop-blur-md">
              <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" className="stroke-white/5 fill-none" strokeWidth="6" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-[#87E65C] fill-none"
                  strokeWidth="6"
                  style={{ pathLength: scrollYProgress }}
                />
              </svg>
              <BookOpen className="w-5 h-5 text-neutral-300" />
            </div>

            {/* Sticky Share Panel */}
            <div className="flex flex-col gap-3 p-3 bg-neutral-950/60 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-[#87E65C] hover:border-[#87E65C] transition-all duration-300 group relative"
              >
                {isShared ? (
                  <CheckCircle2 className="w-4 h-4 text-black" />
                ) : (
                  <LinkIcon className="w-4 h-4" />
                )}
                <span className="absolute left-full ml-4 px-2.5 py-1.5 bg-neutral-800 border border-white/5 text-white text-[10px] uppercase font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  Copy Link
                </span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#1DA1F2]/80 hover:border-[#1DA1F2] transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#0A66C2]/80 hover:border-[#0A66C2] transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#1877F2]/80 hover:border-[#1877F2] transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* MIDDLE COLUMN: Main Article Body */}
        <main className="col-span-1 lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="prose prose-invert max-w-none text-neutral-300
              [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-extrabold [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:text-white [&_h2]:tracking-tight [&_h2]:scroll-mt-28
              [&_p]:text-base [&_p]:md:text-[18px] [&_p]:leading-[1.8] [&_p]:text-neutral-300 [&_p]:mb-6 [&_p]:font-normal
              [&_a]:text-[#87E65C] [&_a]:underline hover:[&_a]:text-white [&_a]:transition-colors [&_a]:font-semibold
              [&_strong]:text-white [&_strong]:font-extrabold
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-neutral-300 [&_ul]:space-y-2
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#87E65C] [&_blockquote]:pl-6 [&_blockquote]:py-3 [&_blockquote]:italic [&_blockquote]:text-white/90 [&_blockquote]:bg-white/[0.02] [&_blockquote]:rounded-r-2xl [&_blockquote]:mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Premium Newsletter Inline Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-white/10 bg-neutral-950/60 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#87E65C]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#87E65C] uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>Join 5,000+ Tech Leaders</span>
              </div>
              <h3 className="text-xl font-bold text-white">Get scaleable web & SEO tips in your inbox</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Stay updated with the latest digital trends, code refactoring secrets, and automation insights delivered weekly.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex gap-2 pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email"
                  className="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#87E65C]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#87E65C] text-black font-bold text-sm rounded-xl hover:bg-[#87E65C]/90 transition-colors flex items-center gap-2"
                >
                  {emailSubscribed ? "Sent!" : <><span className="hidden sm:inline">Subscribe</span> <Send className="w-4 h-4" /></>}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Mobile Share Section */}
          <div className="lg:hidden flex items-center justify-between py-6 border-t border-white/5">
            <span className="text-neutral-500 font-bold text-xs uppercase tracking-wider">Share Article</span>
            <div className="flex gap-3">
              <button onClick={handleShare} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-neutral-400">
                {isShared ? <CheckCircle2 className="w-4 h-4 text-[#87E65C]" /> : <LinkIcon className="w-4 h-4" />}
              </button>
              <button className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-neutral-400"><Twitter className="w-4 h-4" /></button>
              <button className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-neutral-400"><Linkedin className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Author Bio Showcase */}
          <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-2 border-white/10 flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0">
              {post.author ? post.author.split(" ").map(w => w[0]).join("") : "WT"}
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="text-lg font-bold text-white">{post.author || "Sarah Jenkins"}</h4>
              <p className="text-[#87E65C] text-xs font-bold uppercase tracking-wider">{post.authorRole || "Senior Tech Lead"}</p>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
                Passionate about scaling web architectures, integrating machine-learning automations, and helping businesses optimize digital user experiences at scale.
              </p>
            </div>
          </div>

          {/* Up Next & CTA Section */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <Link to="/blogs" className="group">
              <div className="flex items-center gap-2 text-neutral-500 mb-1 text-[10px] uppercase font-bold tracking-widest">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>All Articles</span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-[#87E65C] transition-colors leading-tight">
                Read Next Insights
              </h4>
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#87E65C] text-black font-bold rounded-full text-xs uppercase tracking-wider hover:scale-105 transition-transform"
            >
              Book a Strategy Session
            </Link>
          </div>
        </main>

        {/* RIGHT COLUMN: Sticky Table of Contents */}
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-32 space-y-6">
            
            {headings.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
                  On this page
                </h4>
                <nav className="flex flex-col gap-3">
                  {headings.map((h, idx) => {
                    const isActive = activeHeading === h;
                    return (
                      <a
                        key={idx}
                        href={`#${h.replace(/\s+/g, "-").toLowerCase()}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.querySelectorAll("article h2")[idx];
                          el?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className={`text-sm leading-relaxed transition-all duration-300 pl-3 border-l ${
                          isActive
                            ? "border-[#87E65C] text-[#87E65C] font-semibold"
                            : "border-white/5 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {h}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Sidebar CTA Box */}
            <div className="p-6 rounded-2xl border border-white/5 bg-neutral-950/40 space-y-4">
              <h5 className="text-white font-bold text-sm">Need operational scaling?</h5>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Build high-performance web systems and automated marketing funnels directly backed by the Webestone development team.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-[#87E65C] hover:underline font-bold text-xs uppercase tracking-widest pt-2"
              >
                <span>Let's talk</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </article>
  );
}
