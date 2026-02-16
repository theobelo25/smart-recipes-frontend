// "use client";

// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useAuthStore } from "@/src/features/auth";
import Header from "@/src/shared/components/layout/Header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  // const pathname = usePathname();
  // const accessToken = useAuthStore((s) => s.accessToken);
  // const isInitialized = useAuthStore((s) => s.isInitialized);

  // useEffect(() => {
  //   if (isInitialized && !accessToken) {
  //     router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  //   }
  // }, [accessToken, router, isInitialized, pathname]);

  // if (!isInitialized || !accessToken) return null;

  return (
    <>
      <Header />
      {children}
    </>
  );
}
