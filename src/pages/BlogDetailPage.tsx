import { useParams, Link, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useContent } from "../context/ContentContext";
import SEO from "../components/SEO";
import BlogSidebar from "../components/BlogSidebar";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { blogs, services } = useContent();
  const post = blogs.find((p) => p.id === id);
  
  const linkedService = useMemo(() => {
    if (!post || !post.linkedServiceId) return null;
    return services.find((s) => s.id === post.linkedServiceId);
  }, [post, services]);

  const { scrollYProgress } = useScroll();
  const scaleBar = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const currentIndex = useMemo(() => {
    if (!post) return -1;
    return blogs.findIndex((p) => p.id === post.id);
  }, [blogs, post]);

  const prevPost = useMemo(() => {
    return currentIndex > 0 ? blogs[currentIndex - 1] : null;
  }, [blogs, currentIndex]);

  const nextPost = useMemo(() => {
    return currentIndex >= 0 && currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
  }, [blogs, currentIndex]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogs
      .filter((p) => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
  }, [blogs, post]);

  if (!post) return <Navigate to="/blogs" replace />;

  return (
    <article className="min-h-screen bg-black text-white relative pb-24">
      <SEO 
        title={post.seoTitle || `${post.title} - WeBestOne`} 
        description={post.seoDescription || post.excerpt} 
        schemaMarkup={post.schemaMarkup}
        canonical={`https://webestone.com/blogs/${post.id}`}
      />
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

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#87E65C]/5 to-purple-600/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ══════════════════════════════════════════
          MAIN GRID STRUCTURE (Matches Screenshots)
      ══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative z-10">
        
        {/* Breadcrumb, Title & Meta on Top of Left Column */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#87E65C] mb-4">
            <Link to="/blogs" className="hover:underline text-[#87E65C]">Blog</Link>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-400">{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-white tracking-tight mb-4 max-w-4xl">
            {post.title}
          </h1>
          <p className="text-neutral-500 text-xs md:text-sm font-semibold tracking-wider">
            written by <span className="text-white">{post.author || "Webestone Team"}</span> <span className="mx-2 text-neutral-700">|</span> {post.date}
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Main Post & Content */}
          <div className="lg:col-span-8 space-y-10 min-w-0">
            
            {/* Featured Image */}
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/40 relative">
              {post.image?.includes("from-") ? (
                <div className={`w-full h-full bg-gradient-to-br ${post.image} opacity-60`} />
              ) : (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover opacity-80"
                />
              )}
            </div>

            {/* Post Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-invert max-w-none text-neutral-300
                [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-black [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:text-white [&_h1]:tracking-tight
                [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-extrabold [&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:text-white [&_h2]:tracking-tight [&_h2]:scroll-mt-28
                [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-white
                [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mt-6 [&_h4]:mb-3 [&_h4]:text-[#87E65C]
                [&_p]:text-base [&_p]:md:text-[18px] [&_p]:leading-[1.8] [&_p]:text-neutral-300 [&_p]:mb-6 [&_p]:font-normal
                [&_a]:text-[#87E65C] [&_a]:underline hover:[&_a]:text-white [&_a]:transition-colors [&_a]:font-semibold
                [&_strong]:text-white [&_strong]:font-extrabold
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-neutral-300 [&_ul]:space-y-2
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:text-neutral-300 [&_ol]:space-y-2
                [&_table]:w-full [&_table]:text-left [&_table]:border-collapse [&_table]:my-8 [&_table]:border [&_table]:border-white/10 [&_table]:rounded-2xl [&_table]:overflow-hidden
                [&_th]:bg-white/10 [&_th]:p-3.5 [&_th]:text-white [&_th]:font-bold [&_th]:border [&_th]:border-white/10
                [&_td]:p-3.5 [&_td]:border [&_td]:border-white/10 [&_td]:text-neutral-300
                [&_img]:w-full [&_img]:max-h-[550px] [&_img]:object-cover [&_img]:rounded-2xl [&_img]:border [&_img]:border-white/10 [&_img]:my-8 [&_img]:shadow-2xl
                [&_figcaption]:text-xs [&_figcaption]:text-neutral-500 [&_figcaption]:text-center [&_figcaption]:italic [&_figcaption]:-mt-4 [&_figcaption]:mb-6
                [&_blockquote]:border-l-4 [&_blockquote]:border-[#87E65C] [&_blockquote]:pl-6 [&_blockquote]:py-3 [&_blockquote]:italic [&_blockquote]:text-white/90 [&_blockquote]:bg-white/[0.02] [&_blockquote]:rounded-r-2xl [&_blockquote]:mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Linked Service Callout Card */}
            {linkedService && (
              <div className="p-8 rounded-3xl border border-[#87E65C]/20 bg-gradient-to-br from-neutral-900/40 to-neutral-950 border-l-4 border-l-[#87E65C] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#87E65C]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#87E65C]/10 border border-[#87E65C]/20 text-[#87E65C] text-[10px] font-bold uppercase tracking-wider">
                    💡 Recommended Service Page
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                    {linkedService.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {linkedService.description}
                  </p>
                  <Link
                    to={linkedService.href || `/services/${linkedService.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#87E65C] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02]"
                  >
                    <span>Explore Service Details</span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </Link>
                </div>
              </div>
            )}

            {/* Author Bio Showcase */}
            <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-neutral-900/20 p-6 rounded-2xl border border-white/5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-2 border-white/10 flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0">
                {post.author ? post.author.split(" ").map(w => w[0]).join("") : "WT"}
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <p className="text-lg font-bold text-white uppercase tracking-wider">{post.author || "Webestone Team"}</p>
                <p className="text-[#87E65C] text-xs font-bold uppercase tracking-wider">{post.authorRole || "Specialist"}</p>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
                  Passionate about scaling web architectures, integrating machine-learning automations, and helping businesses optimize digital user experiences at scale.
                </p>
              </div>
            </div>

            {/* Previous / Next Navigation */}
            <div className="flex justify-between items-center py-6 border-t border-b border-white/5 gap-4">
              {prevPost ? (
                <Link to={`/blogs/${prevPost.id}`} className="group max-w-[45%]">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest block mb-1">
                    ← Previous Post
                  </span>
                  <p className="text-xs md:text-sm font-bold text-white group-hover:text-[#87E65C] transition-colors line-clamp-1 leading-snug">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link to={`/blogs/${nextPost.id}`} className="group max-w-[45%] text-right ml-auto">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest block mb-1">
                    Next Post →
                  </span>
                  <p className="text-xs md:text-sm font-bold text-white group-hover:text-[#87E65C] transition-colors line-clamp-1 leading-snug">
                    {nextPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 space-y-6">
                <h3 className="text-center text-sm font-extrabold uppercase tracking-[0.2em] text-white">
                  RELATED POSTS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedPosts.map((rPost) => (
                    <Link key={rPost.id} to={`/blogs/${rPost.id}`} className="group block">
                      <div className="aspect-video w-full bg-neutral-900 rounded-xl overflow-hidden mb-3 border border-white/5 relative">
                        {rPost.image?.includes("from-") ? (
                          <div className={`w-full h-full bg-gradient-to-br ${rPost.image} opacity-40`} />
                        ) : (
                          <img
                            src={rPost.image}
                            alt={rPost.title}
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-[#87E65C] transition-colors line-clamp-2 leading-snug">
                        {rPost.title}
                      </h4>
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        {rPost.date}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Sidebar (Matches screenshots widget structure) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <BlogSidebar currentPostId={post.id} />
          </div>

        </div>
      </div>
    </article>
  );
}
