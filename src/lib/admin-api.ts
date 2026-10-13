import { supabase } from "./supabase";

/**
 * Calls a server-side /api/admin/* route with the current Supabase session
 * token. The route verifies the token belongs to an allowlisted admin email.
 */
export async function adminFetch<T = any>(
  path: string,
  init?: RequestInit
): Promise<T> {
  if (!supabase) throw new Error("Supabase is not configured");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const res = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
      Authorization: `Bearer ${session?.access_token || ""}`,
    },
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error || `Request failed (${res.status})`);
  }
  return json as T;
}

/**
 * Uploads a file to /api/upload with the current Supabase session token.
 * Unlike adminFetch, it does NOT force a JSON Content-Type so the browser
 * can set the multipart boundary for FormData.
 */
export async function adminUpload(file: File): Promise<{
  url: string;
  publicId?: string;
  width?: number;
  height?: number;
  bytes?: number;
}> {
  if (!supabase) throw new Error("Supabase is not configured");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.access_token || ""}`,
    },
    body: fd,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error || `Upload failed (${res.status})`);
  }
  return json;
}
