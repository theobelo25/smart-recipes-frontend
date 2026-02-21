"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { AuthManager } from "@/src/shared/lib/auth/auth.manager";
import { LoadingSpinner } from "@/src/shared/components/LoadingSpinner";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setAuthManager = useAuthStore((s) => s.setAuthManager);
  const setInitialized = useAuthStore((s) => s.setInitialized);
  const setUser = useAuthStore((s) => s.setUser);

  const authManager = useAuthStore((s) => s.authManager);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  useEffect(() => {
    if (authManager) return;

    const mgr = new AuthManager(setAccessToken, setUser);
    setAuthManager(mgr);

    (async () => {
      try {
        await mgr.init();
      } finally {
        setInitialized(true);
      }
    })();
  }, [authManager, setAccessToken, setAuthManager, setInitialized, setUser]);

  if (!isInitialized) return <LoadingSpinner />;

  return <>{children}</>;
}
