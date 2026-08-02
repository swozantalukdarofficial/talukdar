export function getProductMetaDescription(
  slug: string,
  productName?: string,
  rawDesc?: string | null,
  specs?: Record<string, any> | null
): string {
  // 1. Read directly from Database product.specs._meta_description
  if (specs && specs._meta_description) {
    return String(specs._meta_description);
  }

  // 2. Fallback: clean raw HTML from product description if present
  if (rawDesc) {
    const clean = rawDesc.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim();
    if (clean) {
      return clean.length > 155 ? clean.substring(0, 152) + "..." : clean;
    }
  }

  // 3. Fail-safe generic fallback
  const nameStr = productName ? ` ${productName}` : "";
  return `Buy${nameStr} at the best price in Bangladesh. High quality electric vehicle, battery & solar parts with warranty & free delivery.`;
}
