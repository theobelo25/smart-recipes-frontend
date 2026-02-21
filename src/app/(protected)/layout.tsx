"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/features/auth";
import { DashboardHeader } from "@/src/features/dashboard/components";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (!isInitialized) return;
    if (!accessToken) router.replace("/signin");
  }, [isInitialized, accessToken, router]);

  if (!isInitialized) return null;
  if (!accessToken) return null;

  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
