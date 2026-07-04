import React from "react";
import type { Product } from "@/lib/types";

interface Props {
  product: Product;
}

export default function ProductSchema({ product }: Props) {
  const baseUrl = "https://yourdomain.com";

  // 1. Product Schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image_url ? [product.image_url] : [],
    "description": product.description ?? `Buy ${product.name} online at Talukdar EV.`,
    "sku": product.id,
    "mpn": product.slug,
    "brand": {
      "@type": "Brand",
      "name": "Talukdar EV",
    },
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/products/${product.slug}`,
      "priceCurrency": "BDT",
      "price": product.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stock_quantity > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": 0,
          "currency": "BDT",
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "BD",
        },
      },
    },
  };

  // 2. BreadcrumbList Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${baseUrl}/products`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.category,
        "item": `${baseUrl}/products?category=${product.category}`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name,
        "item": `${baseUrl}/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
