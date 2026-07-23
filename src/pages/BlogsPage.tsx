import { useState, useMemo, useEffect, useRef } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sync state with URL parameter changes
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setActiveCategory(searchParams.get("category") || "All");
    setVisibleCount(6);
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

  const filteredPosts = useMemo(() => {
    return regularPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [regularPosts, activeCategory, searchQuery]);

  useEffect(() => {
    if (visibleCount >= filteredPosts.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 6, filteredPosts.length));
        }
      },
      { rootMargin: "200px" }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, filteredPosts.length]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-24 overflow-x-hidden relative">
      <SEO 
        pageKey="blogs"
        title="Blog & Insights | WeBestOne" 
        description="Read the latest insights, tutorials, and strategy guides on AI marketing, SEO, web design, and growth optimization from WeBestOne." 
      />

      {/* 1. SLEEK TECH HEADER */}
      <section className="relative z-10 pt-4 sm:pt-10 pb-8 sm:pb-12 px-6 max-w-5xl mx-auto text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-extrabold text-emerald-800 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Webestone Insights</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
        >
          Latest <span className="text-emerald-700">Insights & Ideas</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium"
        >
          Explore expert strategies in custom web development, SEO scaling, brand architecture, and intelligent automation systems.
        </motion.p>
      </section>

      {/* 2. FEATURED 3D WEBGL CAROUSEL GALLERY */}
      {activeCategory === "All" && searchQuery === "" && galleryItems.length >= 3 && (
        <section className="px-6 pb-16 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-emerald-800 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-300 shadow-md">
              🏆 Interactive Featured Articles · Swipe & Drag to Rotate
            </span>
          </div>
          <div className="h-[380px] sm:h-[480px] md:h-[540px] w-full relative rounded-3xl overflow-hidden border border-slate-200 bg-white backdrop-blur-md shadow-2xl">
            <CircularGallery
              items={galleryItems}
              bend={isMobile ? 0.9 : 1.8}
              textColor="#0f172a"
              borderRadius={0.04}
              scrollSpeed={2.5}
              scrollEase={0.05}
              onItemClick={handleItemClick}
            />
          </div>
        </section>
      )}

      {/* 3. MAIN 2-COLUMN CONTENT SECTION */}
      <section className="px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Article Listing */}
          <div className="lg:col-span-8 space-y-8">
            {searchQuery || activeCategory !== "All" ? (
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest flex flex-wrap items-center gap-2">
                  <span>Filtered by:</span>
                  {activeCategory !== "All" && (
                    <span className="bg-slate-100 border border-slate-200 text-slate-800 px-2.5 py-1 rounded-md text-[10px] font-bold">
                      Category: {activeCategory}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-slate-100 border border-slate-200 text-slate-800 px-2.5 py-1 rounded-md text-[10px] font-bold">
                      Search: "{searchQuery}"
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    handleSearchChange("");
                    handleCategoryChange("All");
                  }}
                  className="text-xs font-extrabold text-emerald-700 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : null}

            {filteredPosts.length === 0 ? (
              <div className="text-center py-28 rounded-3xl border border-slate-200 bg-white shadow-md">
                <Filter className="w-12 h-12 text-slate-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">No articles found</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">
                  We couldn't find any match for your query. Try updating your filters or search keywords.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {displayedPosts.map((post, i) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="group"
                    >
                      <Link to={`/blogs/${post.id}`}>
                        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-emerald-500/40 transition-all duration-300 h-full flex flex-col shadow-lg shadow-slate-200/50">
                          
                          {/* Media Card */}
                          <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden shrink-0">
                            {post.image?.includes("from-") ? (
                              <div className={`w-full h-full bg-gradient-to-br ${post.image} opacity-80 group-hover:scale-105 transition-transform duration-700`} />
                            ) : (
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            )}
                            <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 border border-slate-200 backdrop-blur-md text-[9px] uppercase font-extrabold tracking-widest text-slate-900 rounded-full shadow-sm">
                              {post.category}
                            </span>
                          </div>

                          {/* Card Content */}
                          <div className="p-6 flex flex-col gap-3.5 flex-1 justify-between">
                            <div className="space-y-3.5">
                              <div className="flex items-center gap-3 text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-600" /> {post.date}</span>
                                <span>·</span>
                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-600" /> {post.readTime}</span>
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug tracking-tight">
                                {post.title}
                              </h3>
                              <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-3 font-medium">
                                {post.excerpt}
                              </p>
                            </div>
                            <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-widest text-emerald-700 group-hover:text-emerald-800 transition-colors pt-5 mt-4 border-t border-slate-100">
                              <span>Read Article</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </div>
                          </div>

                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>

                {/* Infinite Scroll Sentinel */}
                {visibleCount < filteredPosts.length && (
                  <div ref={sentinelRef} className="h-16 flex items-center justify-center mt-8">
                    <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-600 rounded-full animate-spin" />
                  </div>
                )}
              </>
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
