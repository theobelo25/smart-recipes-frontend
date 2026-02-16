import { ROUTE_BY_ID } from "./routes";

export const href = {
  dashboard: () => ROUTE_BY_ID.dashboard.path,
  signin: (redirect?: string) => {
    const base = ROUTE_BY_ID.signin.path;
    if (!redirect) return base;
    const safe = redirect.startsWith("/")
      ? redirect
      : ROUTE_BY_ID.dashboard.path;
    return `${base}?redirect=${encodeURIComponent(safe)}`;
  },
} as const;
