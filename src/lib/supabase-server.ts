import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase helpers. The service-role key bypasses Row Level
 * Security — NEVER import this file in a client component.
 */

let cached: SupabaseClient | null = null;

/**
 * Prefers the service-role key (works regardless of RLS). Falls back to the
 * anon/publishable key when the service key isn't configured (works only if
 * the DB's RLS permits anon access, as it currently does for orders).
 */
export function getAdminClient(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured");

  if (serviceKey) {
    cached = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } else if (anonKey) {
    console.warn(
      "[admin-api] SUPABASE_SERVICE_ROLE_KEY missing — falling back to anon client (RLS applies)"
    );
    cached = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } else {
    throw new Error("No Supabase key configured");
  }
  return cached;
}

function adminEmails(): string[] {
  const raw =
    process.env.ADMIN_EMAILS ||
    process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
    "swozantalukdaofficial@gmail.com,shipontalukdaroffice@gmail.com";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Verifies the request carries a valid Supabase session token for an
 * allowlisted admin email. Returns { user } or { error, status }.
 */
export async function requireAdmin(req: Request): Promise<
  | { user: { id: string; email?: string } }
  | { error: string; status: number }
> {
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return { error: "Unauthorized", status: 401 };

  try {
    const { data, error } = await getAdminClient().auth.getUser(token);
    const email = data?.user?.email?.toLowerCase();
    if (error || !email || !adminEmails().includes(email)) {
      return { error: "Forbidden", status: 403 };
    }
    return { user: { id: data.user.id, email } };
  } catch {
    return { error: "Unauthorized", status: 401 };
  }
}

/**
 * Supabase client for admin table reads/writes on behalf of the caller.
 * - If SUPABASE_SERVICE_ROLE_KEY is configured, uses the service-role client
 *   (bypasses RLS; requireAdmin already verified the caller).
 * - Otherwise attaches the request's Bearer token (the admin's own JWT) to
 *   the anon-key client, so email-allowlist RLS policies can see who is
 *   calling. Use this (not getAdminClient) for tables whose RLS requires
 *   the allowlist email, e.g. staff, blogs, admin_activity.
 */
export function getUserDbClient(req: Request): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) return getAdminClient();
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("Supabase is not configured");
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
}
