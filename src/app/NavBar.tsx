import Link from "next/link";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client-server";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import UserButton from "@/components/UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import LogoImage from "@/components/LogoImage";

export default async function NavBar() {
  const wixClient = await getWixServerClient();

  const [cart, loggedInMember] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
  ]);

  return (
    <header className="flex items-center justify-between sticky h-20 px-8 mx-auto bg-background shadow-sm top-0 z-50">
      {/* Left: Logo */}
      <LogoImage />

      {/* Center: Navigation Links */}
      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-14">
        <Link
          href="/shop"
          className="hover:-translate-y-1 transition-transform duration-200"
        >
          <span className="text-lg font-medium text-primary hover:text-gray-400">
            Shop
          </span>
        </Link>
        <Link
          href="/"
          className="hover:-translate-y-1 transition-transform duration-200"
        >
          <span className="text-lg font-medium text-primary hover:text-gray-400">
            Portfolio
          </span>
        </Link>
        <Link
          href="/"
          className="hover:-translate-y-1 transition-transform duration-200"
        >
          <span className="text-lg font-medium text-primary hover:text-gray-400">
            About
          </span>
        </Link>
      </nav>

      {/* Right: Cart */}
      <div className="flex items-center justify-center gap-3">
        <UserButton loggedInMember={loggedInMember} className="pt-[4px]" />
        <ShoppingCartButton initialData={cart} />
      </div>
    </header>
  );
}
