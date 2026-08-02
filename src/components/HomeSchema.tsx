import React from "react";
import { SITE_URL } from "@/config/seo";

import { getStoreSettings } from "@/lib/settings";

export default async function HomeSchema() {
  const settings = await getStoreSettings();
  const baseUrl = SITE_URL;

  // 1. Organization Schema
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": settings.store_name,
    "url": baseUrl,
    "logo": `${baseUrl}/logo.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": settings.support_phone,
      "contactType": "customer service",
      "areaServed": "BD",
      "availableLanguage": ["Bengali", "English"],
    },
    "sameAs": [
      "https://facebook.com/evsolutionbd",
      "https://instagram.com/evsolutionbd",
      "https://wa.me/8801333600272",
    ],
  };

  // 2. WebSite Schema (with SearchAction)
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EV Solution BD",
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
