import React from "react";

export default function HomeSchema() {
  const baseUrl = "https://yourdomain.com";

  // 1. Organization Schema
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Talukdar EV",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "09638001122",
      "contactType": "customer service",
      "areaServed": "BD",
      "availableLanguage": ["Bengali", "English"],
    },
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com",
      "https://tiktok.com",
    ],
  };

  // 2. WebSite Schema (with SearchAction)
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Talukdar EV",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  );
}
