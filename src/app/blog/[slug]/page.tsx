import type { Metadata } from "next";
import { SITE_URL } from "@/config/seo";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchBlogs } from "@/lib/blogs";
import { Clock, ArrowLeft, Calendar, BookOpen, ArrowRight } from "lucide-react";
import ShareButton from "@/components/ShareButton";

export const revalidate = 3600; // Refresh hourly — new posts are generated on demand, then cached

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

// ─── DYNAMIC SEO METADATA ─────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const posts = await fetchBlogs();
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDesc,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDesc,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      images: [
        {
          url: post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

// ─── STATIC PATHS GENERATION ─────────────────────────────────────
export async function generateStaticParams() {
  const posts = await fetchBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const posts = await fetchBlogs();
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // ─── JSON-LD SCHEMA FOR GOOGLE SEARCH TRUST ───────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDesc,
    "image": post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`,
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "EV Solution BD",
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": "EV Solution BD",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/icon.svg`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  // ─── LIGHTWEIGHT CUSTOM MARKDOWN PARSER ───────────────────────
  const renderContent = (contentString: string) => {
    const blocks = contentString.split("\n");
    let inList = false;
    const elements: React.ReactNode[] = [];
    let currentListItems: React.ReactNode[] = [];

    const flushList = (key: number) => {
      if (inList && currentListItems.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-6 my-4 space-y-2 text-stone-600 text-sm font-semibold leading-relaxed">
            {currentListItems}
          </ul>
        );
        currentListItems = [];
        inList = false;
      }
    };

    blocks.forEach((line, index) => {
      const trimmed = line.trim();

      // Skip empty lines
      if (!trimmed) {
        flushList(index);
        return;
      }

      // Headers
      if (trimmed.startsWith("### ")) {
        flushList(index);
        elements.push(
          <h2 key={index} className="text-xl md:text-2xl font-extrabold text-stone-900 mt-8 mb-4 tracking-tight">
            {trimmed.replace("### ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("#### ")) {
        flushList(index);
        elements.push(
          <h3 key={index} className="text-base md:text-lg font-bold text-stone-850 mt-6 mb-3 tracking-tight">
            {trimmed.replace("#### ", "")}
          </h3>
        );
      } 
      // Horizontal Rules
      else if (trimmed === "---") {
        flushList(index);
        elements.push(<hr key={index} className="my-8 border-t border-stone-200" />);
      }
      // Unordered lists
      else if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        inList = true;
        const cleanText = trimmed.replace(/^[\*\-]\s+/, "");
        
        // Handle bold inside lists
        const formattedText = parseInlineStyles(cleanText);

        currentListItems.push(
          <li key={`li-${index}`} className="leading-relaxed">
            {formattedText}
          </li>
        );
      }
      // Ordered lists (numbered)
      else if (/^\d+\.\s+/.test(trimmed)) {
        flushList(index);
        const cleanText = trimmed.replace(/^\d+\.\s+/, "");
        elements.push(
          <div key={index} className="flex gap-3 text-stone-600 text-sm font-semibold leading-relaxed my-3">
            <span className="font-extrabold text-emerald-700">{trimmed.match(/^\d+/)![0]}.</span>
            <span>{parseInlineStyles(cleanText)}</span>
          </div>
        );
      }
      // Normal Paragraphs
      else {
        flushList(index);
        elements.push(
          <p key={index} className="text-stone-600 text-xs md:text-sm font-semibold leading-relaxed my-4">
            {parseInlineStyles(trimmed)}
          </p>
        );
      }
    });

    flushList(blocks.length);
    return elements;
  };

  // Helper to render inline **bold** and *italic*
  const parseInlineStyles = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx} className="font-extrabold text-stone-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={idx} className="italic text-stone-800 font-semibold">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] text-stone-900 pb-20">
      {/* Article Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Banner Section */}
      <section className="bg-stone-950 py-12 md:py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover filter saturate-50 blur-xs"
            priority
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>

          {/* Details */}
          <div className="space-y-4">
            <span className="inline-block bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md">
              {post.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-3xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-stone-400 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="text-emerald-400">By EV Solution BD Editorial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body Grid */}
      <section className="container mx-auto px-4 md:px-6 mt-10 md:mt-12 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Main Content Column */}
          <article className="lg:col-span-8 bg-white border border-stone-200/50 rounded-3xl p-5 md:p-8 shadow-sm">
            {/* Featured Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 border border-stone-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority
              />
            </div>

            {/* Rendered Body Text */}
            <div className="prose prose-stone max-w-none">
              {renderContent(post.content)}
            </div>
          </article>

          {/* Right Sidebar Column */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Share / Action Box */}
            <div className="bg-white border border-stone-200/50 rounded-2xl p-5 shadow-sm space-y-4">
              <h4 className="text-xs font-extrabold uppercase text-stone-900 tracking-wider">
                Enjoyed this guide?
              </h4>
              <p className="text-[11px] text-stone-500 font-semibold leading-relaxed">
                Share this page with other EV owners and commuters in Bangladesh to help them save fuel and find charging hubs.
              </p>
              <ShareButton />
            </div>

            {/* Recent Posts Box */}
            <div className="bg-white border border-stone-200/50 rounded-2xl p-5 shadow-sm space-y-4">
              <h4 className="text-xs font-extrabold uppercase text-stone-900 tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                Recent Reads
              </h4>
              <div className="space-y-4">
                {posts.filter((p) => p.slug !== post.slug)
                  .slice(0, 3)
                  .map((rp) => (
                    <Link
                      key={rp.id}
                      href={`/blog/${rp.slug}`}
                      className="group block border-b border-stone-100 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                        {rp.category}
                      </span>
                      <span className="text-xs font-bold text-stone-800 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                        {rp.title}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Store Promo Box */}
            <div className="bg-emerald-900 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.15),transparent)]" />
              <div className="relative z-10 space-y-3">
                <h4 className="text-sm font-extrabold tracking-tight">
                  Need a Smart Charger or Lithium Battery?
                </h4>
                <p className="text-[10px] text-emerald-200 leading-relaxed font-semibold">
                  We supply 100% genuine lithium packs, smart BMS, and EV parts with official warranty. Free delivery in BD.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1 bg-white text-emerald-950 hover:bg-emerald-50 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors w-fit"
                >
                  Shop Now
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
