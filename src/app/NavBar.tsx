import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client-server";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import UserButton from "@/components/UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import LogoImage from "@/components/LogoImage";
import MainNavigation from "./MainNavigation";
import { getCollections } from "@/wix-api/collections";

export default async function NavBar() {
  const wixClient = await getWixServerClient();

  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  return (
    <header className="flex items-center justify-between sticky h-20 px-8 mx-auto bg-background shadow-sm top-0 z-50">
      {/* Left: Logo */}
      <LogoImage />

      {/* Center: Navigation Links */}

      <MainNavigation
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex"
        collections={collections}
      />

      {/* Right: Cart */}
      <div className="flex items-center justify-center gap-3">
        <UserButton
          loggedInMember={loggedInMember}
          className="pt-[4px] hover:cursor-pointer "
        />
        <ShoppingCartButton initialData={cart} />
      </div>
    </header>
  );
}
