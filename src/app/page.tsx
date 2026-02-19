import Logo from "../shared/components/Logo";
import Link from "next/link";
import { Button } from "../shared/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-bg">
      <main className="flex min-h-screen w-full flex-row items-center justify-center py-32 px-16 sm:items-start">
        <div className="relative w-[30%] aspect-square">
          <Logo className="text-primary" />
        </div>
        <div className="flex flex-col justify-center w-[30%] aspect-square">
          <h2 className="text-right text-4xl mb-12">
            Cook Smarter. Eat Better.
          </h2>
          <p className="text-right text-2xl mb-12">
            Turn the ingredients you already have into comforting, homemade
            meals. Smart Recipes helps you discover simple, delicious dishes
            without the stress of planning.
          </p>
          <div className="flex flex-row justify-end gap-8">
            <Button className="text-xl py-5 px-6" variant={"outline"} asChild>
              <Link href={"/signin"}>Signin</Link>
            </Button>
            <Button className="text-xl py-5 px-6" variant={"outline"} asChild>
              <Link href={"/signup"}>Signup</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
