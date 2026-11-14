import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Attaches the request pathname as a header so Server Components
 * (e.g. the root layout) can make path-aware decisions such as
 * excluding /admin/* from maintenance mode.
 */
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("x-pathname", req.nextUrl.pathname);
  return res;
}

export const config = {
  // Only /admin needs the x-pathname header (maintenance-mode exclusion
  // in the root layout). Matching every page made middleware run on all
  // storefront + bot traffic and burned ~half of the monthly Fluid CPU.
  matcher: ["/admin/:path*"],
};
