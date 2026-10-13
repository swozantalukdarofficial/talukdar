import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/supabase-server";
import { adminEmailFrom, logActivity } from "@/lib/activity";
import { getBlogDbClient } from "../route";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

const UPDATABLE = [
  "title",
  "slug",
  "category",
  "read_time",
  "image",
  "description",
  "meta_title",
  "meta_desc",
  "content",
  "date",
  "status",
  "published_at",
] as const;

/**
 * Extracts a Cloudinary public_id from a delivery URL, e.g.
 * https://res.cloudinary.com/<cloud>/image/upload/v123/ev-store/products/abc.jpg
 * -> "ev-store/products/abc"
 */
function extractPublicId(url: string): string | null {
  const m = url.match(
    /res\.cloudinary\.com\/[^/]+\/(?:image|video)\/upload\/(?:v\d+\/)?(.+)$/
  );
  if (!m) return null;
  return m[1].replace(/\.[a-zA-Z0-9]+$/, "");
}

/** Best-effort cover-image cleanup — never fails the surrounding operation. */
async function bestEffortDeleteCover(imageUrl: unknown) {
  try {
    if (typeof imageUrl !== "string") return;
    if (!imageUrl.includes("res.cloudinary.com")) return;
    const publicId = extractPublicId(imageUrl);
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (e: any) {
    console.error("[admin-blogs] cover cleanup failed:", e?.message || e);
  }
}

// GET /api/admin/blogs/[id] — single blog (admin only)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id } = await params;
    const { data, error } = await getBlogDbClient(req)
      .from("blogs")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json({ blog: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to load blog" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/blogs/[id] — update a blog (admin only)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const db = getBlogDbClient(req);

    const { data: existing, error: existErr } = await db
      .from("blogs")
      .select("id")
      .eq("id", id)
      .maybeSingle();
    if (existErr) throw existErr;
    if (!existing)
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    const updates: Record<string, string> = {};
    for (const field of UPDATABLE) {
      if (typeof body[field] === "string") updates[field] = body[field];
    }
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    // Validate publishing fields
    if (updates.status !== undefined && !["draft", "published"].includes(updates.status)) {
      return NextResponse.json(
        { error: 'Status must be "draft" or "published".' },
        { status: 400 }
      );
    }
    if (updates.published_at !== undefined) {
      const raw = updates.published_at.trim();
      if (!raw) {
        // Clearing the schedule: store NULL (treated as "no schedule")
        (updates as Record<string, string | null>).published_at = null;
      } else {
        const d = new Date(raw);
        if (isNaN(d.getTime())) {
          return NextResponse.json(
            { error: "Invalid published_at date." },
            { status: 400 }
          );
        }
        updates.published_at = d.toISOString();
      }
    }

    // If the slug is being changed, make sure it isn't taken by another post
    if (typeof updates.slug === "string") {
      const slug = updates.slug.trim();
      if (!slug) {
        return NextResponse.json(
          { error: 'Field "slug" is required.' },
          { status: 400 }
        );
      }
      updates.slug = slug;
      const { data: clash, error: clashErr } = await db
        .from("blogs")
        .select("id")
        .eq("slug", slug)
        .neq("id", id)
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
    }

    const { data, error } = await db
      .from("blogs")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    // Log the update (best-effort, never blocks)
    try {
      await logActivity(
        {
          adminEmail: adminEmailFrom(auth),
          action: "updated",
          entity: "blog",
          entityId: id,
          details: { title: data.title, slug: data.slug },
        },
        db
      );
    } catch (e: any) {
      console.error("[admin-blogs] activity log failed:", e?.message || e);
    }

    return NextResponse.json({ blog: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blogs/[id] — delete a blog + its Cloudinary cover (admin only)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id } = await params;
    const db = getBlogDbClient(req);

    const { data: row, error: fetchErr } = await db
      .from("blogs")
      .select("image, title")
      .eq("id", id)
      .maybeSingle();
    if (fetchErr) throw fetchErr;
    if (!row) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    const { error } = await db.from("blogs").delete().eq("id", id);
    if (error) throw error;

    // Log the deletion (best-effort, never blocks)
    try {
      await logActivity(
        {
          adminEmail: adminEmailFrom(auth),
          action: "deleted",
          entity: "blog",
          entityId: id,
          details: { title: row.title },
        },
        db
      );
    } catch (e: any) {
      console.error("[admin-blogs] activity log failed:", e?.message || e);
    }

    // Best-effort: remove the cover from Cloudinary too (never fails the delete)
    await bestEffortDeleteCover(row.image);

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to delete blog" },
      { status: 500 }
    );
  }
}
