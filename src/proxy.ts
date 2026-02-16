import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes, authRoutes } from "@/src/shared/config/routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((path) =>
    pathname.startsWith(path),
  );

  const isAuthRoute = authRoutes.some((path) => pathname.startsWith(path));

  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get("refreshToken");

  if (isProtectedRoute && !refreshToken) {
    const loginUrl = new URL("/signin", request.url);

    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && refreshToken) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    const redirectTo =
      redirectParam && redirectParam.startsWith("/")
        ? redirectParam
        : "/dashboard";

    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
