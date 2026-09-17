import React from "react";
import { SITE_URL } from "@/config/seo";
import type { Product } from "@/lib/types";
import { getProductMetaDescription } from "@/lib/metaDescriptions";
import { getProductReviews } from "@/lib/reviews";

interface Props {
  product: Product;
}

export default function ProductSchema({ product }: Props) {
  const baseUrl = SITE_URL;
  const metaDesc = getProductMetaDescription(product.slug, product.name, product.description);
  const reviewData = getProductReviews(product.slug, product.id);

  // 1. Product Schema with AggregateRating & Review Rich Snippets
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image_url ? [product.image_url] : [],
    "description": metaDesc,
    "sku": product.id,
    "mpn": product.slug,
    "brand": {
      "@type": "Brand",
      "name": "EV Solution BD",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": reviewData.ratingString,
      "reviewCount": reviewData.reviewCount,
      "bestRating": "5",
      "worstRating": "1",
    },
    "review": reviewData.reviews.map((rev) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": rev.authorName,
      },
      "datePublished": rev.date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": rev.rating,
        "bestRating": "5",
        "worstRating": "1",
      },
      "name": rev.title,
      "reviewBody": rev.comment,
    })),
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

