export type RouteMeta = Readonly<{
  id: string;
  path: "/" | `/${string}`;
  label?: string;
  protected?: boolean;
  showInHeader?: boolean;
}>;

export const ROUTES = [
  {
    id: "home",
    path: "/",
    label: "Home",
    protected: false,
    showInHeader: false,
  },
  {
    id: "dashboard",
    path: "/dashboard",
    label: "Dashboard",
    protected: true,
    showInHeader: true,
  },
  {
    id: "signin",
    path: "/signin",
    label: "Signin",
    protected: false,
    showInHeader: false,
  },
  {
    id: "signup",
    path: "/signup",
    label: "Sign Up",
    protected: false,
    showInHeader: false,
  },
] as const satisfies readonly RouteMeta[];

export type AppRoute = (typeof ROUTES)[number];
export type AppRouteId = AppRoute["id"];
export type AppRoutePath = AppRoute["path"];

/** Typed route lookup */
export const ROUTE_BY_ID = Object.fromEntries(
  ROUTES.map((r) => [r.id, r] as const),
) as Record<AppRouteId, AppRoute>;

/** Derived lists */
export const PROTECTED_PATH_PREFIXES = ROUTES.filter((r) => r.protected).map(
  (r) => r.path,
);
export const AUTH_PATH_PREFIXES = ROUTES.filter(
  (r) => r.id !== "home" && !r.protected,
).map((r) => ({
  id: r.id,
  path: r.path,
  label: r.label,
}));
export const HEADER_LINKS = ROUTES.filter(
  (r) => r.id !== "home" && r.showInHeader,
).map((r) => ({
  id: r.id,
  path: r.path,
  label: r.label,
}));
