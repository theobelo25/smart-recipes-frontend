import { User } from "@/src/features/auth";
import { baseAxios } from "../axios";
import { getAccessTokenExpiryMs } from "./jwt.utils";

type SetAccessToken = (token: string | null) => void;
type SetUser = (user: User | null) => void;

export class AuthManager {
  private refreshTimeout: ReturnType<typeof setTimeout> | null = null;
  private inFlightRefresh: Promise<string | null> | null = null;

  // increments whenever we "invalidate" current auth session (e.g. logout)
  private sessionVersion = 0;

  constructor(
    private readonly setAccessToken: SetAccessToken,
    private readonly setUser: SetUser,
    private readonly refreshEndpoint = "/auth/refresh",
  ) {}

  async init(): Promise<void> {
    await this.refreshNow();
  }

  onTokenUpdated(token: string | null) {
    this.clearTimer();

    if (!token) return;

    const expiryMs = getAccessTokenExpiryMs(token);
    if (!expiryMs) return;

    const oneMinute = 60_000;
    const refreshAt = expiryMs - oneMinute;
    const delay = refreshAt - Date.now();

    if (delay <= 0) {
      void this.refreshNow();
      return;
    }

    this.refreshTimeout = setTimeout(() => {
      void this.refreshNow();
    }, delay);
  }

  clear() {
    this.sessionVersion += 1; // ✅ invalidates any in-flight refresh result
    this.clearTimer();
    this.inFlightRefresh = null;
  }

  reset() {
    this.clearTimer();
    this.inFlightRefresh = null;
  }

  invalidateSession() {
    this.sessionVersion += 1;
    this.reset();
  }

  async refreshNow(): Promise<string | null> {
    if (this.inFlightRefresh) return this.inFlightRefresh;

    const versionAtStart = this.sessionVersion;

    this.inFlightRefresh = (async () => {
      try {
        const res = await baseAxios.post(this.refreshEndpoint, {});

        const newToken = res.data?.accessToken as string | undefined;
        if (!newToken) throw new Error("No accessToken returned");

        const user = res.data?.user as User | undefined;
        if (!user) throw new Error("No user found");

        // ✅ if logout happened mid-flight, ignore the result
        if (this.sessionVersion !== versionAtStart) return null;

        this.setUser(user);
        this.setAccessToken(newToken);
        return newToken;
      } catch {
        if (this.sessionVersion === versionAtStart) {
          this.setUser(null);
          this.setAccessToken(null);
          this.clear();
        }
        return null;
      } finally {
        this.inFlightRefresh = null;
      }
    })();

    return this.inFlightRefresh;
  }

  private clearTimer() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }
}
