import { supabase } from "./supabase";

/** A hero carousel slide as stored in store_settings.hero_slides (JSONB). */
export interface HeroSlide {
  id: number | string;
  tag: string;
  /** Color theme — mapped to the Tailwind classes in HeroCarousel. */
  theme: "emerald" | "blue" | "amber";
  headline: string;
  sub: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}

export interface StoreSettings {
  id?: string;
  store_name: string;
  support_email: string;
  support_phone: string;
  whatsapp_number: string;
  shipping_fee: number;
  enable_cod: boolean;
  enable_bkash: boolean;
  enable_nagad: boolean;
  bkash_number: string;
  nagad_number: string;
  /** Where new-order notification emails go (comma-separated). Requires DB migration: supabase/add_order_notification_email.sql */
  order_notification_email?: string;
  /** Maintenance mode flag. Requires DB migration: supabase/add_maintenance_mode.sql */
  maintenance_mode?: boolean;
  /** Message shown on the maintenance page. Requires DB migration: supabase/add_maintenance_mode.sql */
  maintenance_message?: string;
  /** Hero carousel slides. Requires DB migration: supabase/add_homepage_settings.sql */
  hero_slides?: HeroSlide[];
  /** Thin announcement strip above the header. Requires DB migration: supabase/add_homepage_settings.sql */
  announcement_bar?: string;
  /** Promo banner section on the homepage. Requires DB migration: supabase/add_homepage_settings.sql */
  promo_banner?: string;
}

/** Default hero slides — mirrors the original hardcoded HeroCarousel content. */
export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tag: "New Arrival",
    theme: "emerald",
    headline: "The Future of",
    sub: "Urban Commute",
    description:
      "Premium electric bikes and smart scooters built for Bangladesh roads. Zero emission. Maximum efficiency.",
    image: "/silver_scooter.webp",
    ctaLabel: "Shop E-Bikes",
    ctaHref: "/products/category/ebike",
    ctaSecondaryLabel: "View All Products",
    ctaSecondaryHref: "/products",
  },
  {
    id: 2,
    tag: "Commercial EVs",
    theme: "blue",
    headline: "Built For",
    sub: "Heavy Duty",
    description:
      "High-performance electric auto-rickshaws, pickups, and utility vehicles designed for maximum ROI and reliability.",
    image: "/iso_commercial.webp",
    ctaLabel: "Shop Commercial",
    ctaHref: "/products/category/commercial",
    ctaSecondaryLabel: "Explore Products",
    ctaSecondaryHref: "/products",
  },
  {
    id: 3,
    tag: "Solar Energy",
    theme: "amber",
    headline: "Power Your",
    sub: "Ride With Sun",
    description:
      "High-efficiency solar panels and inverters. Charge your EVs with 100% renewable energy directly from the sun.",
    image: "/iso_solar.webp",
    ctaLabel: "Shop Solar",
    ctaHref: "/products/category/solar",
    ctaSecondaryLabel: "Inverters",
    ctaSecondaryHref: "/products/category/parts",
  },
];

export const DEFAULT_SETTINGS: StoreSettings = {
  store_name: "EV Solution BD",
  support_email: "support@evsolutionbd.com",
  support_phone: "01333600272",
  whatsapp_number: "8801333600272",
  shipping_fee: 150,
  enable_cod: true,
  enable_bkash: true,
  enable_nagad: true,
  bkash_number: "01333600272",
  nagad_number: "01333600272",
  maintenance_mode: false,
  maintenance_message:
    "We are performing scheduled maintenance. Please check back soon.",
};

export async function getStoreSettings(): Promise<StoreSettings> {
  if (!supabase) return DEFAULT_SETTINGS;
  try {
    const { data, error } = await supabase
      .from("store_settings")
      .select("*")
      .eq("id", "global")
      .maybeSingle();

    if (error || !data) {
      console.warn("Could not fetch store settings from Supabase, using defaults:", error?.message);
      return DEFAULT_SETTINGS;
    }
    return {
      ...DEFAULT_SETTINGS,
      ...data,
      store_name: data.store_name && data.store_name !== "Talukdar EV" ? data.store_name : "EV Solution BD",
      support_email: data.support_email && !data.support_email.includes("evstorebd") ? data.support_email : "support@evsolutionbd.com",
      shipping_fee: data.shipping_fee != null ? Number(data.shipping_fee) : DEFAULT_SETTINGS.shipping_fee,
      maintenance_mode: data.maintenance_mode === true,
      maintenance_message:
        typeof data.maintenance_message === "string" && data.maintenance_message.trim()
          ? data.maintenance_message
          : DEFAULT_SETTINGS.maintenance_message,
      hero_slides: Array.isArray(data.hero_slides) && data.hero_slides.length > 0
        ? data.hero_slides
        : DEFAULT_HERO_SLIDES,
      announcement_bar:
        typeof data.announcement_bar === "string" ? data.announcement_bar.trim() : "",
      promo_banner:
        typeof data.promo_banner === "string" ? data.promo_banner.trim() : "",
    };
  } catch (err) {
    console.error("Error in getStoreSettings:", err);
    return DEFAULT_SETTINGS;
  }
}

export async function updateStoreSettings(settings: Partial<StoreSettings>): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase not configured" };
  try {
    const { error } = await supabase
      .from("store_settings")
      .upsert({ id: "global", ...settings, updated_at: new Date().toISOString() });
    if (error) return { error: error.message };
    return {};
  } catch (err: any) {
    return { error: err.message || "An unknown error occurred" };
  }
}
