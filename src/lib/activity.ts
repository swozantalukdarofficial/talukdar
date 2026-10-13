import { getAdminClient } from "./supabase-server";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only activity logging helper. NEVER import in client components.
 * Writes to the admin_activity table (see supabase/add_activity_log.sql).
 */

export interface ActivityEntry {
  adminEmail: string;
  action: string;
  entity: string;
  entityId?: string | null;
  details?: Record<string, unknown> | null;
}

/**
 * Logs one admin action. Fire-and-forget safe: callers should .catch() it
 * so logging never breaks the surrounding operation.
 *
 * Pass the request-scoped client (e.g. getUserDbClient(req)) when the
 * admin_activity RLS policy needs the caller's JWT — the plain
 * getAdminClient() fallback has no JWT attached when SUPABASE_SERVICE_ROLE_KEY
 * is not configured, and the allowlist policy would reject the write.
 */
export async function logActivity(
  entry: ActivityEntry,
  client?: SupabaseClient
): Promise<void> {
  const db = client || getAdminClient();
  const { error } = await db.from("admin_activity").insert({
    admin_email: entry.adminEmail,
    action: entry.action,
    entity: entry.entity,
    entity_id: entry.entityId ?? null,
    details: entry.details ?? null,
  });
  if (error) throw error;
}

/** Extracts the admin email from a successful requireAdmin() result. */
export function adminEmailFrom(
  auth: { user: { id: string; email?: string } } | { error: string; status: number }
): string {
  if ("error" in auth) return "unknown";
  return auth.user.email || "unknown";
}
