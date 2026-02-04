import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client-server";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import UserButton from "@/components/UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import LogoImage from "@/components/LogoImage";
import MainNavigation from "./MainNavigation";
import { getCollections } from "@/wix-api/collections";

import MobileMenu from "./MobileMenu";
import { Suspense } from "react";

export default async function NavBar() {
  const wixClient = await getWixServerClient();

  // Safely fetch data, handling build-time errors
  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient).catch(() => null),
    getLoggedInMember(wixClient).catch(() => null),
    getCollections(wixClient).catch(() => []),
  ]);

  return (
    <header className="flex items-center justify-between sticky h-20 px-8 top-0 z-[60] w-full bg-zinc-900 border-b border-zinc-800/50">
      <Suspense>
        <MobileMenu collections={collections} loggedInMember={loggedInMember} />
      </Suspense>
      {/* Left: Logo */}
      <LogoImage />

      {/* Center: Navigation Links */}
      <MainNavigation
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex text-black"
        collections={collections}
      />

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        <UserButton
          loggedInMember={loggedInMember}
          className="hover:cursor-pointer hidden lg:flex"
        />
        <ShoppingCartButton initialData={cart} />
      </div>
    </header>
  );
}
