export function getAccessTokenExpiryMs(token: string): number | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    // base64url -> base64
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);

    const payload = JSON.parse(json) as { exp?: number };
    if (!payload.exp) return null;

    return payload.exp * 1000; // ms
  } catch {
    return null;
  }
}
