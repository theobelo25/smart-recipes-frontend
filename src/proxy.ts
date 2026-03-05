import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  PROTECTED_PATH_PREFIXES,
  AUTH_PATH_PREFIXES,
  ROUTE_BY_ID,
} from "@/src/shared/routing/routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_PATH_PREFIXES.some((p) =>
    pathname.startsWith(p),
  );
  const isAuthRoute = AUTH_PATH_PREFIXES.some((p) => pathname.startsWith(p));

  if (!isProtectedRoute && !isAuthRoute) return NextResponse.next();

  // Refresh token is set by the API (different origin), so it is not in
  // request.cookies here. Let the client handle auth: AuthInitializer will
  // call /auth/refresh with credentials; protected layout redirects to signin
  // if there is no accessToken after init.
  const refreshToken = request.cookies.get("refreshToken");

  if (isAuthRoute && refreshToken) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    const redirectTo =
      redirectParam && redirectParam.startsWith("/")
        ? redirectParam
        : ROUTE_BY_ID.dashboard.path;

    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all pathnames except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
