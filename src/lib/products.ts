import { supabase } from "./supabase";
import type { Product, ProductCategory } from "./types";
import type { OrderPayload } from "./types";

// ─── Mock data ─────────────────────────────────────────────────
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Thunder X1 E-Bike",
    slug: "thunder-x1-ebike",
    description:
      "High-performance urban electric bike with long-range lithium battery.",
    price: 85000,
    compare_at_price: 95000,
    category: "ebike",
    image_url:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800",
    images: [],
    stock_quantity: 10,
    is_featured: true,
    specs: { range: "80km", motor: "500W", speed: "35kmh", weight: "22kg" },
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "PowerCell 48V 20Ah Battery",
    slug: "powercell-48v-20ah",
    description: "Premium lithium battery pack compatible with most e-bikes.",
    price: 18500,
    compare_at_price: 22000,
    category: "battery",
    image_url:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800",
    images: [],
    stock_quantity: 25,
    is_featured: true,
    specs: { voltage: "48V", capacity: "20Ah", cycles: "1000+" },
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "EV Controller 36V",
    slug: "ev-controller-36v",
    description: "Brushless motor controller with regenerative braking.",
    price: 4500,
    compare_at_price: null,
    category: "parts",
    image_url:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    images: [],
    stock_quantity: 50,
    is_featured: false,
    specs: { voltage: "36V", current: "15A", type: "Brushless" },
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Smart Helmet Pro",
    slug: "smart-helmet-pro",
    description:
      "Aerodynamic helmet with LED tail light and Bluetooth speaker.",
    price: 6500,
    compare_at_price: 8000,
    category: "accessories",
    image_url:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=800",
    images: [],
    stock_quantity: 30,
    is_featured: true,
    specs: { sizes: "S/M/L/XL", certification: "CE" },
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Volt Pro 750W E-Bike",
    slug: "volt-pro-750w",
    description: "Mountain-ready electric bike with suspension and 750W motor.",
    price: 125000,
    compare_at_price: 140000,
    category: "ebike",
    image_url:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    images: [],
    stock_quantity: 5,
    is_featured: true,
    specs: { range: "120km", motor: "750W", speed: "45kmh" },
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Fast Charger 5A",
    slug: "fast-charger-5a",
    description: "Universal fast charger for 36V and 48V lithium batteries.",
    price: 3200,
    compare_at_price: null,
    category: "accessories",
    image_url:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800",
    images: [],
    stock_quantity: 80,
    is_featured: false,
    specs: { output: "5A", compatible: "36V/48V" },
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: "UltraCell 60V 30Ah",
    slug: "ultracell-60v-30ah",
    description: "Heavy-duty LiFePO4 battery pack for long distance rides. IP65 waterproof.",
    price: 32000,
    compare_at_price: 38000,
    category: "battery",
    image_url:
      "https://images.unsplash.com/photo-1609092486657-6bb1a78c6e5a?w=800",
    images: [],
    stock_quantity: 12,
    is_featured: true,
    specs: { voltage: "60V", capacity: "30Ah", cycles: "1200+" },
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: "BLDC Hub Motor 500W",
    slug: "bldc-hub-motor-500w",
    description: "High-efficiency hub motor for 26-inch wheels.",
    price: 8500,
    compare_at_price: 10000,
    category: "parts",
    image_url:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    images: [],
    stock_quantity: 30,
    is_featured: false,
    specs: { power: "500W", voltage: "48V", torque: "45Nm" },
    created_at: new Date().toISOString(),
  },
];

function useMock() {
  return !supabase;
}

function filterNoImageProducts(products: Product[]): Product[] {
  return products.filter(
    (p) => !p.image_url.includes("unsplash.com")
  );
}

const COMMERCIAL_SUBCATS = ["rickshaw", "pickup", "bus", "utility"];

function transformProductCategory(p: Product): Product {
  if (p.category === "ebike" && p.specs && COMMERCIAL_SUBCATS.includes(p.specs.Subcategory?.toLowerCase() || "")) {
    return { ...p, category: "commercial" as ProductCategory };
  }
  return p;
}

// ─── Fetch all products (with optional filter) ─────────────────
export interface ProductFilter {
  category?: ProductCategory | "all";
  sortBy?: "price_asc" | "price_desc" | "newest" | "featured";
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  brand?: string;
  inStock?: boolean;
  subcat?: string;
  tag?: string;
}

export async function getAllProducts(
  filter: ProductFilter = {}
): Promise<Product[]> {
  const { category, sortBy = "newest", minPrice, maxPrice, search, brand, inStock, subcat, tag } = filter;

  if (useMock()) {
    let results = [...MOCK_PRODUCTS].map(transformProductCategory);
    if (category && category !== "all")
      results = results.filter((p) => p.category === category);
    if (minPrice !== undefined) results = results.filter((p) => p.price >= minPrice);
    if (maxPrice !== undefined) results = results.filter((p) => p.price <= maxPrice);
    if (inStock !== undefined) {
      results = results.filter((p) => (inStock ? p.stock_quantity > 0 : p.stock_quantity === 0));
    }
    if (brand && brand !== "all") {
      results = results.filter((p) => p.specs?.Brand?.toLowerCase() === brand.toLowerCase());
    }
    if (subcat && subcat !== "all") {
      const q = subcat.toLowerCase();
      if (category === "battery") {
        results = results.filter(
          (p) => p.specs?.Subcategory?.toLowerCase() === q
        );
      } else {
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q) ||
            Object.values(p.specs || {}).some((val) => String(val).toLowerCase().includes(q))
        );
      }
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    if (tag) {
      const q = tag.toLowerCase();
      results = results.filter((p) => p.specs?.tags?.toLowerCase().includes(q));
    }
    if (sortBy === "price_asc") results.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") results.sort((a, b) => b.price - a.price);
    if (sortBy === "featured") results.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    return filterNoImageProducts(results);
  }

  let query = supabase!.from("products").select("*");

  if (category && category !== "all") {
    if (category === "commercial") {
      query = query.eq("category", "ebike").in("specs->>Subcategory", COMMERCIAL_SUBCATS);
    } else {
      query = query.eq("category", category);
    }
  }
  if (minPrice !== undefined) query = query.gte("price", minPrice);
  if (maxPrice !== undefined) query = query.lte("price", maxPrice);
  if (inStock !== undefined) {
    if (inStock) {
      query = query.gt("stock_quantity", 0);
    } else {
      query = query.eq("stock_quantity", 0);
    }
  }
  if (brand && brand !== "all") query = query.eq("specs->>Brand", brand);
  if (subcat && subcat !== "all") {
    if (category === "battery") {
      query = query.eq("specs->>Subcategory", subcat);
    } else {
      const term = `%${subcat}%`;
      query = query.or(`name.ilike.${term},description.ilike.${term},specs->>Subcategory.ilike.${term},specs->>Type.ilike.${term},specs->>Battery Type.ilike.${term}`);
    }
  }
  if (search) query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  if (tag) query = query.ilike("specs->>tags", `%${tag}%`);

  if (sortBy === "price_asc") query = query.order("price", { ascending: true });
  else if (sortBy === "price_desc") query = query.order("price", { ascending: false });
  else if (sortBy === "featured") query = query.order("is_featured", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const { data, error } = await query;
  if (error) { console.error("getAllProducts:", error.message); return []; }
  
  let processedData = (data as Product[]).map(transformProductCategory);
  if (category === "ebike") {
    processedData = processedData.filter(p => p.category === "ebike");
  }
  return filterNoImageProducts(processedData);
}

// ─── Fetch featured ────────────────────────────────────────────
export async function getFeaturedProducts(): Promise<Product[]> {
  if (useMock()) return filterNoImageProducts(MOCK_PRODUCTS.filter((p) => p.is_featured));

  const { data, error } = await supabase!
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .limit(8);

  if (error) { console.error("getFeaturedProducts:", error.message); return []; }
  return filterNoImageProducts((data as Product[]).map(transformProductCategory));
}

// ─── Fetch sale products ──────────────────────────────────────────
export async function getSaleProducts(): Promise<Product[]> {
  if (useMock()) {
    return filterNoImageProducts(
      MOCK_PRODUCTS.filter((p) => p.compare_at_price && p.compare_at_price > p.price).slice(0, 4)
    );
  }

  const { data, error } = await supabase!
    .from("products")
    .select("*")
    .gt("compare_at_price", 0)
    .limit(10);

  if (error) {
    console.error("getSaleProducts:", error.message);
    return [];
  }

  const filtered = (data as Product[]).filter((p) => p.compare_at_price && p.compare_at_price > p.price);
  return filterNoImageProducts(filtered.map(transformProductCategory)).slice(0, 4);
}


// ─── Fetch by category ─────────────────────────────────────────
export async function getProductsByCategory(
  category: ProductCategory
): Promise<Product[]> {
  if (useMock()) {
    return filterNoImageProducts(MOCK_PRODUCTS.map(transformProductCategory).filter((p) => p.category === category));
  }

  let query = supabase!.from("products").select("*");
  if (category === "commercial") {
    query = query.eq("category", "ebike").in("specs->>Subcategory", COMMERCIAL_SUBCATS);
  } else {
    query = query.eq("category", category);
  }
  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) { console.error("getProductsByCategory:", error.message); return []; }
  
  let processedData = (data as Product[]).map(transformProductCategory);
  if (category === "ebike") {
    processedData = processedData.filter(p => p.category === "ebike");
  }
  return filterNoImageProducts(processedData);
}

// ─── Fetch single product ──────────────────────────────────────
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (useMock()) return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;

  const { data, error } = await supabase!
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) { console.error("getProductBySlug:", error.message); return null; }
  return transformProductCategory(data as Product);
}

// ─── Related products ──────────────────────────────────────────
export async function getRelatedProducts(
  category: ProductCategory,
  excludeSlug: string
): Promise<Product[]> {
  if (useMock())
    return filterNoImageProducts(
      MOCK_PRODUCTS.map(transformProductCategory).filter(
        (p) => p.category === category && p.slug !== excludeSlug
      )
    ).slice(0, 4);

  let query = supabase!.from("products").select("*");
  if (category === "commercial") {
    query = query.eq("category", "ebike").in("specs->>Subcategory", COMMERCIAL_SUBCATS);
  } else {
    query = query.eq("category", category);
  }
  query = query.neq("slug", excludeSlug).limit(10); // Fetch a few more to allow client filtering

  const { data, error } = await query;

  if (error) { console.error("getRelatedProducts:", error.message); return []; }
  
  let processedData = (data as Product[]).map(transformProductCategory);
  if (category === "ebike") {
    processedData = processedData.filter(p => p.category === "ebike");
  }
  
  return filterNoImageProducts(processedData).slice(0, 4);
}

// ─── Search products ───────────────────────────────────────────
export async function searchProducts(query: string): Promise<Product[]> {
  return getAllProducts({ search: query });
}

// ─── Place Order ───────────────────────────────────────────────
export async function placeOrder(
  payload: OrderPayload
): Promise<{ orderId: string } | { error: string }> {
  if (useMock()) {
    // Simulate success in mock mode
    return { orderId: `MOCK-${Date.now()}` };
  }

  const { customer, items, paymentMethod, notes } = payload;
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingFee = 150;
  const total = subtotal + shippingFee;

  const orderId = crypto.randomUUID();

  // Insert order
  const { error: orderError } = await supabase!
    .from("orders")
    .insert({
      id: orderId,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      shipping_address: customer.address,
      subtotal,
      shipping_fee: shippingFee,
      total,
      payment_method: paymentMethod,
      notes,
    });

  if (orderError) return { error: orderError.message };

  // Insert order items
  const orderItems = items.map((item) => ({
    order_id: orderId,
    product_id: item.productId,
    name: item.name,
    image_url: item.imageUrl,
    price: item.price,
    quantity: item.quantity,
  }));

  const { error: itemsError } = await supabase!
    .from("order_items")
    .insert(orderItems);

  if (itemsError) return { error: itemsError.message };

  return { orderId };
}

// ─── Admin: Create product ─────────────────────────────────────
export interface CreateProductInput {
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price?: number | null;
  category: ProductCategory;
  image_url: string;
  images?: string[];
  stock_quantity: number;
  is_featured: boolean;
  specs?: Record<string, any>;
}

export async function createProduct(
  input: CreateProductInput
): Promise<{ product: Product } | { error: string }> {
  if (!supabase) return { error: "Supabase not configured" };

  const { data, error } = await supabase
    .from("products")
    .insert({ ...input })
    .select()
    .single();

  if (error) return { error: error.message };
  return { product: data as Product };
}

// ─── Admin: Delete product ─────────────────────────────────────
export async function deleteProduct(
  id: string
): Promise<{ success: true } | { error: string }> {
  if (!supabase) return { error: "Supabase not configured" };

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  return { success: true };
}

// ─── Admin: Update product ─────────────────────────────────────
export async function updateProduct(
  id: string,
  input: Partial<CreateProductInput>
): Promise<{ product: Product } | { error: string }> {
  if (!supabase) return { error: "Supabase not configured" };

  const { data, error } = await supabase
    .from("products")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) return { error: error.message };
  return { product: data as Product };
}

// ─── Admin: Get product by ID ──────────────────────────────────
export async function getProductById(id: string): Promise<Product | null> {
  if (!supabase) return null;
  const { data } = await supabase.from("products").select("*").eq("id", id).single();
  return data;
}
