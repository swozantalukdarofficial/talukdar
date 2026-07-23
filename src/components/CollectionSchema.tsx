import React from "react";
import { SITE_URL } from "@/config/seo";
import type { Product } from "@/lib/types";

interface Props {
  products: Product[];
  categoryName: string;
  categorySlug: string;
}

export default function CollectionSchema({ products, categoryName, categorySlug }: Props) {
  const baseUrl = SITE_URL;
  const url = categorySlug === "all" ? `${baseUrl}/products` : `${baseUrl}/products?category=${categorySlug}`;

  // 1. CollectionPage Schema
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryName} | EV Solution BD`,
    "url": url,
    "description": `Browse premium ${categoryName} at the best price in Bangladesh. Shop original E-Bikes, Lithium Batteries, and spare parts.`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "EV Solution BD",
      "url": baseUrl,
    },
  };

  // 2. ItemList Schema for products listed
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${categoryName} Products List`,
    "url": url,
    "numberOfItems": products.length,
    "itemListElement": products.map((prod, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `${baseUrl}/products/${prod.slug}`,
      "name": prod.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  );
}
