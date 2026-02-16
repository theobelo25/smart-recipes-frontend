import MainNavDesktop from "../navigation/MainNavDesktop";
import MainNavMobile from "../navigation/MainNavMobile";

import { HEADER_LINKS } from "@/src/shared/routing/routes";

export default function Header() {
  return (
    <header className="flex w-full p-4 justify-between">
      <h1>Smart Recipes</h1>
      <div
        id="desktop-navigation"
        className="hidden md:flex w-[80%] justify-between"
      >
        <MainNavDesktop navLinks={HEADER_LINKS} />
      </div>
      <div id="mobile-navigation" className="md:hidden">
        <MainNavMobile navLinks={HEADER_LINKS} />
      </div>
    </header>
  );
}
