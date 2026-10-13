import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getAdminClient, requireAdmin } from "@/lib/supabase-server";

function bearerToken(req: Request): string {
  const header = req.headers.get("authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
}

/**
 * Supabase client for blog reads/writes.
 * - If SUPABASE_SERVICE_ROLE_KEY is configured, uses the service-role client
 *   (bypasses RLS; requireAdmin already verified the caller).
 * - Otherwise (current setup) attaches the admin's own JWT to the anon-key
 *   client so the email-allowlist RLS policies in supabase/fix_blogs_rls.sql
 *   can see who is writing. Public reads don't need the token.
 */
export function getBlogDbClient(req: Request): SupabaseClient {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) return getAdminClient();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("Supabase is not configured");
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${bearerToken(req)}` } },
  });
}

const REQUIRED = [
  "title",
  "slug",
  "category",
  "read_time",
  "image",
  "description",
  "content",
] as const;

// GET /api/admin/blogs — list all blogs, newest first (admin only)
export async function GET(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { data, error } = await getBlogDbClient(req)
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ blogs: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to load blogs" },
      { status: 500 }
    );
  }
}

// POST /api/admin/blogs — create a blog (admin only)
export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    for (const field of REQUIRED) {
      if (typeof body[field] !== "string" || !body[field].trim()) {
        return NextResponse.json(
          { error: `Field "${field}" is required.` },
          { status: 400 }
        );
      }
    }
    const slug = body.slug.trim();
    const db = getBlogDbClient(req);

    // Friendly duplicate-slug check (the table also has a UNIQUE constraint)
    const { data: clash, error: clashErr } = await db
      .from("blogs")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (clashErr) throw clashErr;
    if (clash) {
      return NextResponse.json(
        {
          error: `A blog with the slug "${slug}" already exists. Please choose a different slug.`,
        },
        { status: 409 }
      );
    }

    const { data, error } = await db
      .from("blogs")
      .insert([
        {
          title: body.title.trim(),
          slug,
          category: body.category.trim(),
          read_time: body.read_time.trim(),
          image: body.image.trim(),
          description: body.description.trim(),
          meta_title: (body.meta_title || body.title).trim(),
          meta_desc: (body.meta_desc || body.description).trim(),
          content: body.content,
          date: (body.date || "").trim(),
        },
      ])
      .select("*")
      .single();

    if (error) throw error;
    return NextResponse.json({ blog: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to create blog" },
      { status: 500 }
    );
  }
}
