"use client";
import { useAuthStore } from "@/src/features/auth";
import { Card, CardContent, CardHeader } from "@/src/shared/ui/card";
import { Separator } from "@/src/shared/ui/separator";
import Link from "next/link";
import { DashboardNavigation } from "./DashboardNavigation";
import { Button } from "@/src/shared/ui/button";

export function DashboardHeader() {
  const user = useAuthStore((s) => s.user);

  return (
    <section className="w-full py-8 px-6 sm:py-10 sm:px-8 md:px-10 xl:py-12 xl:px-24">
      <Card>
        <CardHeader className="flex flex-col gap-4 items-start xl:flex-row xl:justify-between xl:items-center">
          <h2 className="w-full text-3xl sm:text-4xl xl:text-5xl">{`Welcome ${user?.username}!`}</h2>
        </CardHeader>
        <Separator className="bg-[rgb(230,242,234)] w-full" />
        <CardContent className="flex flex-col gap-4 xl:flex-row xl:justify-between">
          <ul className="flex flex-wrap gap-4 sm:gap-8">
            <li>
              <Link href={"/dashboard/edit-profile"}>Edit Profile</Link>
            </li>
            <li>
              <Link href={"/dashboard/change-password"}>Change Password</Link>
            </li>
          </ul>
          <Link href={"/generate"}>Generate Recipes</Link>
        </CardContent>
      </Card>
      <DashboardNavigation />
    </section>
  );
}
