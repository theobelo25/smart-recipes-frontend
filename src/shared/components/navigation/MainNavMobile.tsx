"use client";
import Link from "next/link";
import { Button } from "@/src/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/shared/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/src/shared/ui/navigation-menu";
import UserMenu from "./UserMenu";
import { RouteMeta } from "../../routing/routes";

export default function MainNavMobile({ navLinks }: { navLinks: RouteMeta[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Menu</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Smart Recipes</SheetTitle>
        </SheetHeader>
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map((link) => {
              return (
                <NavigationMenuItem key={link.id}>
                  <NavigationMenuLink asChild>
                    <Link href={link.path}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <UserMenu />
      </SheetContent>
    </Sheet>
  );
}
