import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client-server";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import UserButton from "@/components/UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import LogoImage from "@/components/LogoImage";
import MainNavigation from "./MainNavigation";
import { getCollections } from "@/wix-api/collections";
import SearchButton from "@/components/SearchButton";
import MobileMenu from "./MobileMenu";
import { Suspense } from "react";

export default async function NavBar() {
  const wixClient = await getWixServerClient();

  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  return (
    <header className="flex items-center justify-between sticky h-20 px-8 shadow-md top-0 z-[60] w-full" style={{ backgroundColor: '#1a4ba8' }}>
      <Suspense>
        <MobileMenu collections={collections} loggedInMember={loggedInMember} />
      </Suspense>
      {/* Left: Logo */}
      <LogoImage />

      {/* Center: Navigation Links */}
      <MainNavigation
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex"
        collections={collections}
      />

      {/* Right: Cart */}
      <div className="flex items-center justify-center gap-3">
        <SearchButton className="hidden lg:flex" />
        <UserButton
          loggedInMember={loggedInMember}
          className="pt-[4px] hover:cursor-pointer hidden lg:flex"
        />
        <ShoppingCartButton initialData={cart} />
      </div>
    </header>
  );
}
