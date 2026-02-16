import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/src/shared/ui/navigation-menu";
import Link from "next/link";
import { useAuthStore } from "@/src/features/auth";
import { signout } from "@/src/features/auth";
import { AUTH_PATH_PREFIXES } from "../../routing/routes";

export default function UserMenu() {
  const accessToken = useAuthStore((s) => s.accessToken);

  const handleSignout = async () => {
    try {
      await signout();
    } finally {
      useAuthStore.getState().signout(); // clear accessToken in memory
      window.location.assign("/signin"); // hard redirect = middleware runs for sure
    }
  };

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-8">
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
            {AUTH_PATH_PREFIXES.map((link) => (
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
