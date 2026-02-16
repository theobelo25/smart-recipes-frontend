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
  const isAuthRoute = AUTH_PATH_PREFIXES.some((p) =>
    pathname.startsWith(p.path),
  );

  if (!isProtectedRoute && !isAuthRoute) return NextResponse.next();

  const refreshToken = request.cookies.get("refreshToken");

  if (isProtectedRoute && !refreshToken) {
    const signinUrl = new URL(ROUTE_BY_ID.signin.path, request.url);
    signinUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signinUrl);
  }

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
