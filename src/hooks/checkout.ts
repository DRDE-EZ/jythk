import { wixBrowserClient } from "@/lib/wix-client.browser";
import { getCheckoutUrlForCurrentCart } from "@/wix-api/checkout";
import { useState } from "react";
import { toast } from "sonner";

export function useCartCheckout() {
  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);
    try {
      const wixClient = wixBrowserClient;
      if (!wixClient) return null;

      const checkoutUrl = await getCheckoutUrlForCurrentCart(wixClient);
      if (checkoutUrl === undefined) return null;
      window.location.href = checkoutUrl;
    } catch (error) {
      setPending(false);
      console.error(error);
      toast.error("Failed to load checkout. Please try again.");
    }
  }

  return { startCheckoutFlow, pending };
}
