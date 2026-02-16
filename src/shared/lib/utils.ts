import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSafeRedirect(
  redirect: string | null,
  fallback = "/dashboard",
) {
  if (redirect && redirect.startsWith("/")) {
    return redirect;
  }

  return fallback;
}
