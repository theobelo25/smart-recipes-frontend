import { baseAxios } from "./axios";
import { getAccessTokenExpiryMs } from "./auth/jwt.utils";

let refreshTimeout: NodeJS.Timeout | null = null;

export function scheduleSilentRefresh(
  accessToken: string,
  setAccessToken: (token: string | null) => void,
) {
  const exp = getAccessTokenExpiryMs(accessToken);
  if (!exp) return;

  const now = Date.now();
  const expiryTime = exp * 1000;

  // Refresh 1 minute before expiry
  const refreshTime = expiryTime - 60_000;

  const delay = refreshTime - now;

  if (delay <= 0) {
    refreshNow(setAccessToken);
    return;
  }

  refreshTimeout = setTimeout(() => {
    refreshNow(setAccessToken);
  }, delay);
}

export function clearSilentRefresh() {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
  }
}

async function refreshNow(setAccessToken: (token: string | null) => void) {
  try {
    const response = await baseAxios.post(
      "/auth/refresh",
      {},
      { withCredentials: true },
    );

    const newToken = response.data.accessToken;
    setAccessToken(newToken);

    // schedule next cycle
    scheduleSilentRefresh(newToken, setAccessToken);
  } catch {
    setAccessToken(null);
    clearSilentRefresh();
  }
}
