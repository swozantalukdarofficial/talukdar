import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// On-demand revalidation for storefront pages after admin edits.
// Called from the admin panel (behind AdminClientGuard) after
// product create/update/delete so price changes appear instantly
// instead of waiting for the ISR window.
// On-demand only: no time-based revalidation anywhere in the app, so these
// are the only paths the admin can refresh. "/" with type "layout" refreshes
// the root layout (settings/categories) and every page beneath it.
const ALLOWED_PREFIXES = [
  "/",
  "/products",
  "/blog",
  "/sitemap.xml",
  "/api/products-feed",
];

function isAllowed(path: string): boolean {
  if (typeof path !== "string" || !path.startsWith("/")) return false;
  // Block path traversal / query tricks
  if (path.includes("..") || path.includes("\\")) return false;
  return ALLOWED_PREFIXES.some(
    (p) => path === p || path.startsWith(p + "/")
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const paths: string[] = Array.isArray(body?.paths) ? body.paths : [];

    const valid = [...new Set(paths.filter(isAllowed))].slice(0, 20);
    if (valid.length === 0) {
      return NextResponse.json(
        { error: "No valid paths provided" },
        { status: 400 }
      );
    }

    for (const p of valid) {
      // Route handlers (e.g. /api/products-feed) take no type argument —
      // revalidatePath(path) alone invalidates the handler.
      if (p.startsWith("/api/")) {
        revalidatePath(p);
      } else {
        // "/" needs layout revalidation to refresh nested product data
        revalidatePath(p, p === "/" ? "layout" : "page");
      }
    }

    return NextResponse.json({ revalidated: valid });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
