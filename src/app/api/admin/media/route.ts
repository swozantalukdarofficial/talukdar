import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase-server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

const FOLDER_PREFIX = "ev-store/products/";

export interface MediaImage {
  public_id: string;
  url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  created_at: string;
}

// GET /api/admin/media — list images in the store's Cloudinary folder (admin only)
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor") || undefined;

    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: FOLDER_PREFIX,
      max_results: 100,
      next_cursor: cursor,
    });

    const images: MediaImage[] = (result.resources || []).map((r: any) => ({
      public_id: r.public_id,
      url: r.secure_url,
      width: r.width,
      height: r.height,
      bytes: r.bytes,
      format: r.format,
      created_at: r.created_at,
    }));

    return NextResponse.json({
      images,
      next_cursor: result.next_cursor || null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to list media" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/media?public_id=... — delete an image (admin only)
export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const publicId = searchParams.get("public_id") || "";

    if (!publicId) {
      return NextResponse.json(
        { error: "public_id is required" },
        { status: 400 }
      );
    }
    // Safety: only allow deleting images inside our own folder
    if (!publicId.startsWith(FOLDER_PREFIX)) {
      return NextResponse.json(
        { error: "Can only delete images in the store media folder." },
        { status: 400 }
      );
    }

    await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete image" },
      { status: 500 }
    );
  }
}
