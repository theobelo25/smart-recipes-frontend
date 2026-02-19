"use client";
import { useAuthStore } from "@/src/features/auth";
import { Card, CardContent, CardHeader } from "@/src/shared/ui/card";
import { Separator } from "@/src/shared/ui/separator";
import Link from "next/link";
import { DashboardNavigation } from "./DashboardNavigation";

export function DashboardHeader() {
  const user = useAuthStore((s) => s.user);

  return (
    <section className="w-full py-12 px-64">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="w-full text-5xl">{`Welcome ${user?.username}!`}</h2>
          <div className="aspect-square rounded-full">
            <p>Avatar</p>
          </div>
        </CardHeader>
        <Separator className="bg-[rgb(230,242,234)] w-full" />
        <CardContent className="flex justify-between">
          <ul className="flex gap-8">
            <li>
              <Link href={"/dashboard/edit-profile"}>Edit Profile</Link>
            </li>
            <li>
              <Link href={"/dashboard/change-password"}>Change Password</Link>
            </li>
          </ul>
        </CardContent>
      </Card>
      <DashboardNavigation />
    </section>
  );
}
