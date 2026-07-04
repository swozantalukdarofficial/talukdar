// Global SEO and Site configuration
const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const SITE_URL = (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1"))
  ? envUrl
  : "https://shipon.tech";
