import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { signout } from "@/actions/auth.actions";

export default function MainNavMobile({
  navLinks,
}: {
  navLinks: { name: string; href: string }[];
}) {
  const accessToken = useAuthStore((s) => s.accessToken);

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
      </SheetContent>
    </Sheet>
  );
}
