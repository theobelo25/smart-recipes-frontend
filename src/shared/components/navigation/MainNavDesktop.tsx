"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/src/shared/ui/navigation-menu";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { RouteMeta } from "../../routing/routes";

export default function MainNavDesktop({
  navLinks,
}: {
  navLinks: RouteMeta[];
}) {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          {navLinks.map((link) => (
            <NavigationMenuItem key={link.id}>
              <NavigationMenuLink asChild>
                <Link href={link.path}>{link.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <UserMenu />
    </>
  );
}
