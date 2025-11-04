import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  getCheckoutUrlForCurrentCart,
  getCheckoutUrlForProduct,
  GetCheckoutUrlForProductValues,
} from "@/wix-api/checkout";
import { useState } from "react";
import { toast } from "sonner";

export function useCartCheckout() {
  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);
    try {
      const wixClient = wixBrowserClient;
      if (!wixClient) {
        // User is not authenticated, prompt them to login
        toast.error("Please log in to continue to checkout", {
          duration: 4000,
        });
        setPending(false);
        return null;
      }

      const checkoutUrl = await getCheckoutUrlForCurrentCart(wixClient);
      if (checkoutUrl === undefined) return null;
      window.location.href = checkoutUrl;
    } catch (error: any) {
      setPending(false);
      console.error(error);
      
      // Check for authentication-related errors
      if (error.message?.includes("No Public URL Found") || 
          error.message?.includes("verify that site is published") ||
          error.message?.includes("CART_NOT_FOUND")) {
        toast.error("Please log in to continue to checkout", {
          duration: 4000,
        });
      } else {
        toast.error("Failed to load checkout. Please try again.");
      }
    }
  }

  return { startCheckoutFlow, pending };
}

export function useBuyNow() {
  const [pending, setPending] = useState(false);

  async function startCheckoutFlow(values: GetCheckoutUrlForProductValues) {
    setPending(true);
    try {
      const wixClient = wixBrowserClient;
      if (!wixClient) {
        // User is not authenticated, prompt them to login
        toast.error("Please log in to continue to checkout", {
          duration: 4000,
        });
        setPending(false);
        return null;
      }

      const checkoutUrl = await getCheckoutUrlForProduct(wixClient, values);
      if (checkoutUrl === undefined) return null;
      window.location.href = checkoutUrl;
    } catch (error: any) {
      setPending(false);
      console.error(error);
      
      // Check for authentication-related errors
      if (error.message?.includes("No Public URL Found") || 
          error.message?.includes("verify that site is published") ||
          error.message?.includes("CART_NOT_FOUND")) {
        toast.error("Please log in to continue to checkout", {
          duration: 4000,
        });
      } else {
        toast.error("Failed to load checkout. Please try again.");
      }
    }
  }

  return { startCheckoutFlow, pending };
}
