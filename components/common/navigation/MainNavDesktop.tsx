import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

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
      <NavigationMenu>
        <NavigationMenuList className="space-x-8">
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
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
