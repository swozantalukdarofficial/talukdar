import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://webestone.com";

interface SEOProps {
  title: string;
  description: string;
  schemaMarkup?: object | string;
  /** Override canonical URL. If omitted, auto-derived from current path. */
  canonical?: string;
}

export default function SEO({ title, description, schemaMarkup, canonical }: SEOProps) {
  const { pathname } = useLocation();

  // Resolve canonical: explicit prop wins, otherwise build from current path
  const canonicalUrl = canonical ?? `${BASE_URL}${pathname}`;

  // ── Title + Description ──────────────────────────────────────────────────
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description);
      document.head.appendChild(metaDescription);
    }
  }, [title, description]);

  // ── Canonical Tag ────────────────────────────────────────────────────────
  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (link) {
      link.setAttribute("href", canonicalUrl);
    } else {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", canonicalUrl);
      document.head.appendChild(link);
    }

    return () => {
      // On unmount reset to base domain so no stale canonical lingers
      const existing = document.querySelector('link[rel="canonical"]');
      if (existing) existing.setAttribute("href", BASE_URL);
    };
  }, [canonicalUrl]);

  // ── Schema / JSON-LD ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!schemaMarkup) return;

    const existingScript = document.getElementById("jsonld-schema");
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "jsonld-schema";
    script.textContent =
      typeof schemaMarkup === "string" ? schemaMarkup : JSON.stringify(schemaMarkup);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("jsonld-schema");
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [schemaMarkup]);

  return null;
}
