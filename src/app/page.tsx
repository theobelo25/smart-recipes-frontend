"use client";

import Logo from "../shared/components/Logo";
import Link from "next/link";
import { Button } from "../shared/ui/button";
import { useAuthStore } from "@/src/features/auth";

export default function Home() {
  const isLoggedIn = useAuthStore((s) => !!s.accessToken);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-bg">
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-12 py-16 px-6 sm:py-24 sm:px-8 md:py-28 md:px-10 xl:flex-row xl:items-center xl:gap-16 xl:py-32 xl:px-16">
        <div className="relative w-full max-w-xs aspect-square sm:max-w-sm xl:w-[30%] xl:max-w-none shrink-0">
          <Logo className="text-primary" />
        </div>
        <div className="flex flex-col justify-center w-full max-w-md text-center xl:w-[30%] xl:max-w-none xl:text-right">
          <h2 className="text-4xl mb-8 sm:mb-12 xl:mb-12">
            Cook Smarter. Eat Better.
          </h2>
          <p className="text-xl mb-8 sm:text-2xl sm:mb-12 xl:mb-12">
            Turn the ingredients you already have into comforting, homemade
            meals. Smart Recipes helps you discover simple, delicious dishes
            without the stress of planning.
          </p>
          <div className="flex flex-row justify-center gap-6 sm:gap-8 xl:justify-end">
            {isLoggedIn ? (
              <Button className="text-xl py-5 px-6" variant={"outline"} asChild>
                <Link href={"/dashboard"}>Get started</Link>
              </Button>
            ) : (
              <>
                <Button className="text-xl py-5 px-6" variant={"outline"} asChild>
                  <Link href={"/signin"}>Signin</Link>
                </Button>
                <Button className="text-xl py-5 px-6" variant={"outline"} asChild>
                  <Link href={"/signup"}>Signup</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
