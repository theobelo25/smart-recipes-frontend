import MainNavDesktop from "../navigation/MainNavDesktop";
import MainNavMobile from "../navigation/MainNavMobile";

const navLinks = [{ name: "Home", href: "/" }];

export default function Header() {
  return (
    <header className="flex w-full p-4 justify-between">
      <h1>Smart Recipes</h1>
      <div
        id="desktop-navigation"
        className="hidden md:flex w-[80%] justify-between"
      >
        <MainNavDesktop navLinks={navLinks} />
      </div>
      <div id="mobile-navigation" className="md:hidden">
        <MainNavMobile navLinks={navLinks} />
      </div>
    </header>
  );
}
