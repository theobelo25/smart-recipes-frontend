"use client";

import { useEffect, useState } from "react";
import { apiRaw } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { LoadingSpinner } from "./common/LoadingSpinner";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setInitialized = useAuthStore((s) => s.setInitialized);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await apiRaw.post(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );

        setAccessToken(response.data.accessToken);
      } catch (err) {
        setAccessToken(null);
      } finally {
        setInitialized(true);
      }
    };

    initAuth();
  }, [setAccessToken, setInitialized]);

  if (!isInitialized) return <LoadingSpinner />; // or a loading spinner

  return <>{children}</>;
}
