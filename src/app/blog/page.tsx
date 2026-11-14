import type { Metadata } from "next";
import { SITE_URL } from "@/config/seo";
import Link from "next/link";
import Image from "next/image";
import { fetchBlogs } from "@/lib/blogs";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import BlogListSchema from "@/components/BlogListSchema";


export const metadata: Metadata = {
  title: "EV Store Blog — Electric Bikes & Scooter Tech Journal",
  description: "Read expert buying guides, battery comparison charts, energy tips, and electric vehicle updates in Bangladesh. Stay ahead in the green mobility revolution.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default async function BlogLandingPage() {
  const posts = await fetchBlogs();
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featuredPost = posts.find(p => p.id === 4 || p.id === '4') || sortedPosts[0]; // Pin the Buyer's Guide as the featured blog
  const regularPosts = sortedPosts.filter(p => p.id !== featuredPost.id);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-stone-900 pb-20">
      {/* Blog List Schema Markup */}
      <BlogListSchema posts={posts} />

      {/* 1. Header Banner */}
      <section className="bg-stone-900 py-16 md:py-24 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=1200"
            alt="Electric mobility infrastructure"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-stone-950/80" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl space-y-4">
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
            EV Store Journal
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            E-Bike & EV Insights
          </h1>
          <p className="text-stone-300 text-xs md:text-sm font-medium max-w-xl mx-auto leading-relaxed">
            Latest prices, specifications, expert tech breakdowns, and DIY battery build guides for Bangladeshi EV commuters.
          </p>
        </div>
      </section>

      {/* 2. Content Section */}
      <div className="container mx-auto px-4 md:px-6 mt-12 md:mt-16 max-w-6xl">
        {/* Featured Post Card */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-lg font-extrabold text-stone-900 uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-700 rounded-full inline-block"></span>
              Featured Guide
            </h2>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image Column */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[450px] overflow-hidden bg-stone-150 img-zoom">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <span className="absolute top-6 left-6 px-3 py-1 bg-stone-900 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-lg">
                  {featuredPost.category}
                </span>
              </div>

              {/* Text Column */}
              <div className="lg:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-stone-400 uppercase tracking-wide mb-4">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredPost.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-stone-900 group-hover:text-emerald-800 transition-colors leading-tight mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-stone-500 text-xs md:text-sm leading-relaxed mb-6 font-semibold">
                    {featuredPost.desc}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 bg-stone-900 group-hover:bg-emerald-850 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors w-fit">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div>
          <h2 className="text-lg font-extrabold text-stone-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-stone-900 rounded-full inline-block"></span>
            All Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-stone-200/60 hover:shadow-md transition-all duration-300 card-lift"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 img-zoom">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-4 left-4 px-2.5 py-0.5 bg-stone-900 text-white text-[9px] font-bold uppercase tracking-wider rounded-md">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-stone-400 uppercase tracking-wide mb-3">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                      <span className="mx-1.5">•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-stone-850 group-hover:text-emerald-800 transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>
                    <p className="text-[11px] md:text-xs text-stone-500 leading-relaxed line-clamp-3 mb-4 font-semibold">
                      {post.desc}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-stone-100 flex items-center gap-1 text-xs font-extrabold text-stone-900 group-hover:text-emerald-800 transition-colors uppercase tracking-wider">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
