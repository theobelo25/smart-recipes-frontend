"use client";

import { useEffect, useState } from "react";
import { apiRaw } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Wrap in try/catch so any Axios error is handled
        const response = await apiRaw.post(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );
        if (response?.data?.accessToken) {
          console.log(response?.data?.accessToken);
          setAccessToken(response.data.accessToken);
        } else {
          setAccessToken(null); // no token returned
        }
      } catch (err) {
        // Refresh token missing / invalid
        console.log("No refresh token or user not logged in");
        setAccessToken(null); // ensure Zustand is cleared
      } finally {
        // Always mark loading as finished
        setIsLoading(false);
      }
    };

    // Call without letting errors escape
    initAuth().catch((err) => {
      console.error("Unexpected error in AuthInitializer", err);
      setIsLoading(false); // still finish loading
    });
  }, [setAccessToken]);

  if (isLoading) return null; // or a loading spinner

  return <>{children}</>;
}
