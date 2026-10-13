import { supabase } from "./supabase";

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
}

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
