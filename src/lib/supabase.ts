import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Supports both new publishable key format and classic anon key
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate before creating client
const isConfigured =
  !!supabaseUrl &&
  !!supabaseKey &&
  supabaseUrl.startsWith("http") &&
  !supabaseUrl.includes("your_supabase");

export const supabase = isConfigured
  ? createBrowserClient(supabaseUrl!, supabaseKey!)
  : null;

export const isSupabaseReady = isConfigured;
