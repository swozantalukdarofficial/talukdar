import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";
import { SITE_URL } from "@/config/seo";

export const dynamic = "force-dynamic";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
}

export async function GET() {
  try {
    const products = await getAllProducts();

    let xml = `<?xml version="1.0" encoding="utf-8"?>\n`;
    xml += `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n`;
    xml += `  <channel>\n`;
    xml += `    <title>Talukdar EV</title>\n`;
    xml += `    <link>${SITE_URL}</link>\n`;
    xml += `    <description>Bangladesh's leading e-bike, battery and EV parts store.</description>\n`;

    for (const p of products) {
      const id = p.slug || p.id;
      const title = escapeXml(p.name);
      const description = escapeXml(p.description || p.name);
      const link = `${SITE_URL}/products/${p.slug}`;
      const imageLink = p.image_url;
      const availability = p.stock_quantity > 0 ? "in_stock" : "out_of_stock";
      
      // Handle pricing for sales
      let priceNode = "";
      if (p.compare_at_price && p.compare_at_price > p.price) {
        priceNode = `      <g:price>${p.compare_at_price} BDT</g:price>\n`;
        priceNode += `      <g:sale_price>${p.price} BDT</g:sale_price>\n`;
      } else {
        priceNode = `      <g:price>${p.price} BDT</g:price>\n`;
      }

      const brandName = escapeXml(p.specs?.Brand || p.specs?.brand || "Talukdar EV");
      const condition = "new";
      
      // Google Product Category mapping
      let googleCategory = "5322"; // Default Sporting Goods > Cycling > Bicycles
      if (p.category === "battery") {
        googleCategory = "5613"; // Batteries
      } else if (p.category === "solar") {
        googleCategory = "5614"; // Solar panels / Alternative energy
      } else if (p.category === "parts" || p.category === "accessories") {
        googleCategory = "5412"; // Bicycle Parts & Accessories
      }

      xml += `    <item>\n`;
      xml += `      <g:id>${escapeXml(id)}</g:id>\n`;
      xml += `      <title>${title}</title>\n`;
      xml += `      <description>${description}</description>\n`;
      xml += `      <link>${escapeXml(link)}</link>\n`;
      xml += `      <g:image_link>${escapeXml(imageLink)}</g:image_link>\n`;
      xml += `      <g:availability>${availability}</g:availability>\n`;
      xml += priceNode;
      xml += `      <g:brand>${brandName}</g:brand>\n`;
      xml += `      <g:condition>${condition}</g:condition>\n`;
      xml += `      <g:google_product_category>${googleCategory}</g:google_product_category>\n`;
      
      // Add optional additional images if available
      if (p.images && p.images.length > 0) {
        p.images.slice(0, 5).forEach((img) => {
          if (img) {
            xml += `      <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>\n`;
          }
        });
      }

      xml += `    </item>\n`;
    }

    xml += `  </channel>\n`;
    xml += `</rss>\n`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error: any) {
    console.error("Error generating product feed:", error);
    return new Response(`<error>Failed to generate product feed: ${escapeXml(error?.message || "Unknown error")}</error>`, {
      status: 500,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  }
}
