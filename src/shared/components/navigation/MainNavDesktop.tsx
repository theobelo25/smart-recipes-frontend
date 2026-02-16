"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { signout } from "@/actions/auth.actions";

export default function MainNavDesktop({
  navLinks,
}: {
  navLinks: { name: string; href: string }[];
}) {
  const accessToken = useAuthStore((s) => s.accessToken);
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
      <NavigationMenu>
        <NavigationMenuList className="space-x-8">
          {accessToken ? (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <button type="button" onClick={signout}>
                  Logout
                </button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/login">Login</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/signup">Signup</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
