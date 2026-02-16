// "use client";

// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useAuthStore } from "@/src/features/auth";
// import { getSafeRedirect } from "@/src/shared/lib";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const accessToken = useAuthStore((s) => s.accessToken);
  // const isInitialized = useAuthStore((s) => s.isInitialized);

  // useEffect(() => {
  //   if (isInitialized && accessToken) return;

  //   const redirectTo = getSafeRedirect(searchParams.get("redirect"));
  //   router.replace(redirectTo);
  // }, [accessToken, router, isInitialized, searchParams]);

  return <>{children}</>;
}
