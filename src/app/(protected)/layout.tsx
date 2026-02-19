import { DashboardHeader } from "@/src/features/dashboard/components";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
