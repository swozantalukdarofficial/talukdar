import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { POSTS } from "@/lib/blogs";

export default function BlogSection() {
  const latestPosts = [...POSTS].reverse().slice(0, 3);

  return (
    <section className="py-16 bg-white border-b border-stone-200/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Title */}
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <p className="text-emerald-755 text-xs font-extrabold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Resources & Insights
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
              From The EV Journal
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold text-stone-400 hover:text-emerald-800 transition-colors uppercase tracking-wider flex items-center gap-1"
          >
            Read all articles
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between bg-stone-50/40 rounded-2xl overflow-hidden border border-stone-200/60 hover:border-emerald-600/30 hover:bg-white hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-4 left-4 px-2.5 py-0.5 bg-[#141824] text-white text-[9px] font-bold uppercase tracking-wider rounded-md">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Read time */}
                  <div className="flex items-center gap-1 text-[10px] font-bold text-stone-400 uppercase tracking-wide mb-2.5">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-850 group-hover:text-emerald-800 transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-200/50 flex items-center gap-1 text-xs font-bold text-[#141824] group-hover:text-emerald-800 transition-colors uppercase tracking-wider">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
