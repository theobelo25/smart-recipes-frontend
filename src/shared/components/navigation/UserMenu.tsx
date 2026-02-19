import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/src/shared/ui/navigation-menu";
import Link from "next/link";
import { useAuthStore } from "@/src/features/auth";
import { signout } from "@/src/features/auth";
import { AUTH_LINKS } from "../../routing/routes";
import { DarkModeToggle } from "@/src/shared/components/layout/DarkModeToggle";

export default function UserMenu() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const signout = useAuthStore((s) => s.signout);

  const handleSignout = async () => {
    try {
      await signout();
    } finally {
      signout();
      setAccessToken(null);

      window.location.assign("/signin"); // hard redirect = middleware runs for sure
    }
  };

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-8">
        <NavigationMenuItem>
          <DarkModeToggle />
        </NavigationMenuItem>
        {accessToken ? (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <button type="button" onClick={handleSignout}>
                Sign out
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ) : (
          <>
            {AUTH_LINKS.map((link) => (
              <NavigationMenuItem key={link.id}>
                <NavigationMenuLink asChild>
                  <Link href={link.path}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
