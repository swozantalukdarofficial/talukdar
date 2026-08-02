import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getAllProducts } from "@/lib/products";
import { POSTS } from "@/lib/blogs";
import { SITE_URL } from "@/config/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL || "https://evsolutionbd.com";

  // 1. Static Pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/emi-policy",
    "/return-policy",
    "/privacy-policy",
    "/terms-conditions",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" || route === "/blog" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Category Pages
  const categories = ["ebike", "battery", "parts", "accessories", "solar"];
  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/products?category=${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  // 3. Dynamic Product Details Pages
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productPages = products.map((prod) => ({
      url: `${baseUrl}/products/${prod.slug}`,
      lastModified: prod.created_at ? new Date(prod.created_at) : new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));
  } catch (error) {
    console.error("Sitemap generation error fetching products:", error);
  }

  // 4. Dynamic Blog Posts Pages
  const blogPages = POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
