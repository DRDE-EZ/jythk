import { getWixClient } from "@/lib/wix-client.base";
import Link from "next/link";
import logo from "@/assets/mycropc-logo2-copy.png";
import Image from "next/image";

async function getCart() {
  const wixClient = getWixClient();

  type WixCartError = {
    details?: {
      applicationError?: {
        code?: string;
      };
    };
  };

  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch (error) {
    const err = error as WixCartError;
    if (err.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
      return null;
    } else {
      throw error;
    }
  }
}

export default async function NavBar() {
  const cart = await getCart();

  const totalQuantity =
    cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  return (
    <header className="relative flex items-center justify-between h-20 px-8 mx-auto bg-background shadow-sm sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link href="/" className="inline-block">
          <Image src={logo} alt="MycroPC logo" width={190} height={70} />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-14">
        <Link
          href="/shop"
          className="hover:-translate-y-1 transition-transform duration-200"
        >
          <span className="text-lg font-medium text-gray-800 hover:text-gray-600">
            Shop
          </span>
        </Link>
        <Link
          href="/"
          className="hover:-translate-y-1 transition-transform duration-200"
        >
          <span className="text-lg font-medium text-gray-800 hover:text-gray-600">
            Portfolio
          </span>
        </Link>
        <Link
          href="/"
          className="hover:-translate-y-1 transition-transform duration-200"
        >
          <span className="text-lg font-medium text-gray-800 hover:text-gray-600">
            About
          </span>
        </Link>
      </nav>

      {/* Right: Cart */}
      <div className="flex items-center">
        <Link href="/">
          <span className="text-lg font-medium text-gray-800 hover:text-gray-600">
            Cart
          </span>
        </Link>
      </div>
    </header>
  );
}
