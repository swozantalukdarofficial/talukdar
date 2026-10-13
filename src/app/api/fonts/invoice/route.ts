import { NextResponse } from "next/server";

// Serves full-charset TTF URLs for Noto Sans Bengali (used by PDF invoices).
// Why server-side? Browsers forbid overriding the User-Agent header, so a
// direct Google Fonts fetch from the client returns woff2 files split into
// unicode-range subsets — @react-pdf/renderer can only use one file per
// weight and would render tofu for ৳ or Latin. Server-side we CAN send a
// legacy UA, and Google returns full-charset TTFs (one file per weight).
// The client registers these URLs with Font.register().

const GOOGLE_FONTS_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;700&display=swap";
// Legacy UA without woff2 support -> Google serves full-charset TTFs.
const LEGACY_UA =
  "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(GOOGLE_FONTS_CSS_URL, {
      headers: { "User-Agent": LEGACY_UA },
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      throw new Error(`Google Fonts CSS fetch failed: ${res.status}`);
    }
    const css = await res.text();
    const fonts = css
      .split("@font-face")
      .slice(1)
      .map((block) => {
        const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
        const url = block.match(/url\((https:[^)]+)\)/)?.[1];
        return weight && url ? { fontWeight: Number(weight), src: url } : null;
      })
      .filter(
        (f): f is { fontWeight: number; src: string } => f !== null
      );
    if (fonts.length === 0) {
      throw new Error("No @font-face blocks found in Google Fonts CSS");
    }
    return NextResponse.json(
      { fonts },
      { headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" } }
    );
  } catch (err) {
    console.error("[api/fonts/invoice] failed:", err);
    return NextResponse.json(
      { error: "Font list unavailable" },
      { status: 502 }
    );
  }
}
