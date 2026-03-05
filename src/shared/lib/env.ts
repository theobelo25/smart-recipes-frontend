/**
 * API base URL for backend requests. Set via NEXT_PUBLIC_API_URL.
 * Used by axios instances and any code that needs the API origin.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";
