// ─── Product Types ────────────────────────────────────────────────
export type ProductCategory = string;

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  category: ProductCategory;
  image_url: string;
  images: string[];
  stock_quantity: number;
  is_featured: boolean;
  specs: Record<string, string> | null;
  tags?: string[];
  created_at: string;
}

// ─── Cart Types ───────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

// ─── Order Types ──────────────────────────────────────────────────
export interface OrderItem {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    district: string;
    zip: string;
  };
}

export type PaymentMethod = "cod" | "bkash" | "nagad" | "card";

export interface OrderPayload {
  customer: CustomerInfo;
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  notes?: string;
}

export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Featured", value: "featured" },
];

export interface PriceRange {
  label: string;
  min?: number;
  max?: number;
}

export const PRICE_RANGES: PriceRange[] = [
  { label: "All Prices", min: undefined, max: undefined },
  { label: "Under ৳10,000", min: undefined, max: 10000 },
  { label: "৳10,000 – ৳100,000", min: 10000, max: 100000 },
  { label: "৳100,000 – ৳200,000", min: 100000, max: 200000 },
  { label: "৳200,000+", min: 200000, max: undefined },
];

export const POPULAR_BRANDS = [
  { label: "Akij", value: "Akij" },
  { label: "Solis", value: "Solis" },
  { label: "SAKO", value: "SAKO" },
  { label: "Zeeho", value: "Zeeho" },
  { label: "Yadea", value: "Yadea" },
  { label: "Revoo", value: "Revoo" },
  { label: "Tailg", value: "Tailg" },
  { label: "Walton", value: "Walton" },
  { label: "Green Tiger", value: "Green Tiger" },
  { label: "Sunra", value: "Sunra" },
];

export interface Subcategory {
  label: string;
  value: string;
}

export const SUBCATEGORIES: Record<ProductCategory, Subcategory[]> = {
  ebike: [
    { label: "Electric Scooters", value: "scooter" },
    { label: "Electric Bikes / Cycles", value: "bike" },
    { label: "Dirt Bikes", value: "dirt" },
  ],
  commercial: [
    { label: "Electric Auto Rickshaws", value: "rickshaw" },
    { label: "Electric Pickups & Vans", value: "pickup" },
    { label: "Electric Buses", value: "bus" },
    { label: "Golf Carts & Utility", value: "utility" },
  ],
  battery: [
    { label: "Lithium-Ion", value: "lithium" },
    { label: "LiFePO4", value: "lifepo4" },
    { label: "Lead-Acid", value: "lead" },
    { label: "Acut Power / Graphene", value: "acut" },
  ],
  solar: [
    { label: "Monocrystalline Panels", value: "mono" },
    { label: "Bifacial Panels", value: "bifacial" },
    { label: "Heterojunction Panels", value: "hjt" },
    { label: "Off-Grid Hybrid Inverters", value: "off-grid-inverter" },
    { label: "On-Grid Hybrid Inverters", value: "on-grid-inverter" },
  ],
  parts: [
    { label: "Motors", value: "motor" },
    { label: "Controllers", value: "controller" },
    { label: "Throttles & Switches", value: "throttle" },
    { label: "Chargers & Converters", value: "charger" },
    { label: "Other Parts", value: "other" },
  ],
  accessories: [
    { label: "Helmets & Safety", value: "helmet" },
    { label: "Locks & Alarms", value: "lock" },
    { label: "Horns & Lights", value: "light" },
  ],
};
