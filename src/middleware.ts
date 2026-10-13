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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.png|icon.svg).*)"],
};
