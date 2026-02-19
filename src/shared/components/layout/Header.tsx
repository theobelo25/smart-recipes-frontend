"use client";
import { useAuthStore } from "@/src/features/auth";
import MainNavDesktop from "../navigation/MainNavDesktop";
import MainNavMobile from "../navigation/MainNavMobile";

import { HEADER_LINKS } from "@/src/shared/routing/routes";
import Link from "next/link";

export default function Header() {
  const isLoggedIn = useAuthStore((s) => !!s.accessToken);
  const links = HEADER_LINKS.filter((l) => !l.protected || isLoggedIn);

  return (
    <header className="flex w-full px-16 py-4 justify-between items-center">
      <Link href="/">
        <h1 className="text-3xl">Smart Recipes</h1>
      </Link>
      <div
        id="desktop-navigation"
        className="hidden md:flex w-[80%] justify-between"
      >
        <MainNavDesktop navLinks={links} />
      </div>
      <div id="mobile-navigation" className="md:hidden">
        <MainNavMobile navLinks={links} />
      </div>
    </header>
  );
}
