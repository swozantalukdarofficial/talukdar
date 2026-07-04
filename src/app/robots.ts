import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://yourdomain.com";

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
