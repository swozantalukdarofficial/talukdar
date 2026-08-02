// Global SEO and Site configuration
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://evsolutionbd.com"
).replace(/\/$/, "");

