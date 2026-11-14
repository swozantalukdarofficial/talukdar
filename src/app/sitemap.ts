import { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import { POSTS } from "@/lib/blogs";
import { SITE_URL } from "@/config/seo";

// Fully static (on-demand only): generated at build time and refreshed only
// when an admin edit calls /api/revalidate (sitemap is in its path list).

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL || "https://evsolutionbd.com";

  // 1. Static Pages
  const staticPages = [
    "",
    "/products",
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

  // 2. Category Pages (static /products/category/<slug> pages)
  let categorySlugs: string[] = [];
  try {
    categorySlugs = (await getAllCategories()).map((c) => c.slug);
  } catch (error) {
    console.error("Sitemap generation error fetching categories:", error);
  }
  if (categorySlugs.length === 0) {
    categorySlugs = ["ebike", "battery", "parts", "accessories", "solar"];
  }
  if (!categorySlugs.includes("commercial")) categorySlugs.push("commercial");
  const categoryPages = categorySlugs.map((cat) => ({
    url: `${baseUrl}/products/category/${cat}`,
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
