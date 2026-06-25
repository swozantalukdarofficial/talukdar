import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  schemaMarkup?: object | string;
}

export default function SEO({ title, description, schemaMarkup }: SEOProps) {
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

  useEffect(() => {
    if (!schemaMarkup) return;

    // Remove any existing dynamic schema script to prevent duplicates
    const existingScript = document.getElementById("jsonld-schema");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "jsonld-schema";
    script.textContent = typeof schemaMarkup === "string" ? schemaMarkup : JSON.stringify(schemaMarkup);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("jsonld-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [schemaMarkup]);

  return null;
}
