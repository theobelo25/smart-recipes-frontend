"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/src/shared/ui/navigation-menu";
import Link from "next/link";
import UserMenu from "./UserMenu";

export default function MainNavDesktop({
  navLinks,
}: {
  navLinks: { name: string; href: string }[];
}) {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          {navLinks.map((link) => {
            return (
              <NavigationMenuItem key={link.name}>
                <NavigationMenuLink asChild>
                  <Link href={link.href}>{link.name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <UserMenu />
    </>
  );
}
