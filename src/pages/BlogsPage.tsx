import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Sparkles, Filter, Calendar, Clock } from "lucide-react";
import { useContent } from "../context/ContentContext";
import CircularGallery from "../components/CircularGallery";
import SEO from "../components/SEO";
import BlogSidebar from "../components/BlogSidebar";

export default function BlogsPage() {
  const { blogs } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchParam = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "All";

  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  // Sync state with URL parameter changes
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setActiveCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setSearchParams((prev) => {
      if (val) {
        prev.set("search", val);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSearchParams((prev) => {
      if (cat && cat !== "All") {
        prev.set("category", cat);
      } else {
        prev.delete("category");
      }
      return prev;
    });
  };

  const regularPosts = blogs;

  // Take the top articles to populate a gorgeous infinite WebGL carousel!
  const featuredPosts = useMemo(() => {
    const featured = blogs.filter((p) => p.featured);
    return featured.length >= 3 ? featured : blogs.slice(0, 6);
  }, [blogs]);

  const galleryItems = useMemo(() => {
    return featuredPosts.map((post) => {
      let imageSrc = post.image;
      if (post.image?.includes("from-")) {
        if (post.category === "AI & Tech") {
          imageSrc = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop";
        } else if (post.category === "Design") {
          imageSrc = "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop";
        } else if (post.category === "Marketing") {
          imageSrc = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop";
        } else if (post.category === "Development") {
          imageSrc = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop";
        } else {
          imageSrc = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop";
        }
      }
      return {
        image: imageSrc,
        text: post.title,
        id: post.id
      };
    });
  }, [featuredPosts]);

  const handleItemClick = (id: string) => {
    navigate(`/blogs/${id}`);
  };

  const filteredPosts = regularPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-24 overflow-x-hidden relative">
      <SEO 
        pageKey="blogs"
        title="Blog & Insights | WeBestOne" 
        description="Read the latest insights, tutorials, and strategy guides on AI marketing, SEO, web design, and growth optimization from WeBestOne." 
      />
      {/* Immersive Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#87E65C]/5 to-purple-600/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[80vh] right-0 w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0 opacity-80" />

      {/* ══════════════════════════════════════════
          1. SLEEK TECH HEADER
      ══════════════════════════════════════════ */}
      <section className="relative z-10 pt-16 pb-12 px-6 max-w-5xl mx-auto text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#87E65C]" />
          <span>Webestone Insights</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-white tracking-tight"
        >
          Latest <span className="text-[#87E65C]">Insights & Ideas</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
        >
          Explore expert strategies in custom web development, SEO scaling, brand architecture, and intelligent automation systems.
        </motion.p>
      </section>

      {/* ══════════════════════════════════════════
          2. FEATURED 3D WEBGL CAROUSEL GALLERY
      ══════════════════════════════════════════ */}
      {activeCategory === "All" && searchQuery === "" && galleryItems.length >= 3 && (
        <section className="px-6 pb-16 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#87E65C] bg-[#87E65C]/10 px-4 py-2 rounded-full border border-[#87E65C]/25 shadow-lg shadow-[#87E65C]/5 animate-pulse">
              🏆 Interactive Featured Articles · Swipe & Drag to Rotate
            </span>
          </div>
          <div className="h-[460px] md:h-[540px] w-full relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-950/30 backdrop-blur-md shadow-2xl">
            <CircularGallery
              items={galleryItems}
              bend={1.8}
              textColor="#ffffff"
              borderRadius={0.04}
              scrollSpeed={2.5}
              scrollEase={0.05}
              onItemClick={handleItemClick}
            />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          3. MAIN 2-COLUMN CONTENT SECTION
      ══════════════════════════════════════════ */}
      <section className="px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Article Listing */}
          <div className="lg:col-span-8 space-y-8">
            {searchQuery || activeCategory !== "All" ? (
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex flex-wrap items-center gap-2">
                  <span>Filtered by:</span>
                  {activeCategory !== "All" && (
                    <span className="bg-white/5 border border-white/10 text-white px-2.5 py-1 rounded-md text-[10px]">
                      Category: {activeCategory}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-white/5 border border-white/10 text-white px-2.5 py-1 rounded-md text-[10px]">
                      Search: "{searchQuery}"
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    handleSearchChange("");
                    handleCategoryChange("All");
                  }}
                  className="text-xs font-semibold text-[#87E65C] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : null}

            {filteredPosts.length === 0 ? (
              <div className="text-center py-28 rounded-3xl border border-white/5 bg-neutral-900/10">
                <Filter className="w-12 h-12 text-neutral-600 mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg font-bold text-neutral-400 mb-1">No articles found</h3>
                <p className="text-neutral-500 text-sm max-w-xs mx-auto">
                  We couldn't find any match for your query. Try updating your filters or search keywords.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group"
                  >
                    <Link to={`/blogs/${post.id}`}>
                      <div className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-[#87E65C]/30 transition-all duration-500 h-full flex flex-col shadow-xl">
                        
                        {/* Media Card */}
                        <div className="aspect-[16/9] bg-gradient-to-br from-neutral-800 to-neutral-950 relative overflow-hidden shrink-0">
                          {post.image?.includes("from-") ? (
                            <div className={`w-full h-full bg-gradient-to-br ${post.image} opacity-30 group-hover:scale-105 transition-transform duration-700`} />
                          ) : (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                          <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 border border-white/10 backdrop-blur-md text-[9px] uppercase font-bold tracking-widest text-white rounded-full">
                            {post.category}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex flex-col gap-3.5 flex-1 justify-between">
                          <div className="space-y-3.5">
                            <div className="flex items-center gap-3 text-[10px] text-neutral-500 uppercase font-semibold tracking-wider">
                              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#87E65C]" /> {post.date}</span>
                              <span>·</span>
                              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#87E65C]" /> {post.readTime}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-[#87E65C] transition-colors leading-snug tracking-tight">
                              {post.title}
                            </h3>
                            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-[#87E65C] transition-colors pt-5 mt-4 border-t border-white/5">
                            <span>Read Article</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                          </div>
                        </div>

                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <BlogSidebar
              initialSearchVal={searchQuery}
              onSearchChange={handleSearchChange}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

        </div>
      </section>
    </main>
  );
}
