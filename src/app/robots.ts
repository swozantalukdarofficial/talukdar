import { MetadataRoute } from "next";
import { SITE_URL } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/checkout/",
        "/cart/",
        "/api/",
        "/order-success",
        "/*?*search=",
        "/*?*sort=",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
