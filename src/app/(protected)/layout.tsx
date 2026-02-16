"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/features/auth";
import Header from "@/src/shared/components/layout/Header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  useEffect(() => {
    if (isInitialized && !accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router, isInitialized]);

  if (!isInitialized) return null;
  if (!accessToken) return null;

  return (
    <>
      <Header />
      {children}
    </>
  );
}
