"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { refresh } from "../api/auth.api";

import { LoadingSpinner } from "@/src/shared/components/LoadingSpinner";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setInitialized = useAuthStore((s) => s.setInitialized);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { accessToken } = await refresh();

        setAccessToken(accessToken);
      } catch {
        setAccessToken(null);
      } finally {
        setInitialized(true);
      }
    };

    if (!isInitialized) initAuth();
  }, [setAccessToken, setInitialized, isInitialized]);

  if (!isInitialized) return <LoadingSpinner />;

  return <>{children}</>;
}
