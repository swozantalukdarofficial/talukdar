import React from "react";
import { SITE_URL } from "@/config/seo";
import { POSTS } from "@/lib/blogs";

export default function BlogListSchema() {
  const baseUrl = SITE_URL;

  // 1. Blog Schema listing all posts
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "EV Store Journal",
    "url": `${baseUrl}/blog`,
    "description": "Read expert buying guides, battery comparison charts, energy tips, and electric vehicle updates in Bangladesh.",
    "publisher": {
      "@type": "Organization",
      "name": "Talukdar EV",
      "logo": `${baseUrl}/logo.svg`,
    },
    "blogPost": POSTS.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.desc,
      "datePublished": post.date,
      "url": `${baseUrl}/blog/${post.slug}`,
      "image": post.image,
      "author": {
        "@type": "Person",
        "name": "EV Store Editorial",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
    />
  );
}
