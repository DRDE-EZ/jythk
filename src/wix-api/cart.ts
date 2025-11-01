import { WIX_STORES_APP_ID } from "@/lib/constants";
import { findVariant } from "@/lib/utils";
import { UnifiedWixClient } from "@/lib/wix-client.base";
import { products } from "@wix/stores";

export type WixCartError = {
  details?: {
    applicationError?: {
      code?: string;
    };
  };
};
export async function getCart(wixClient: UnifiedWixClient) {
  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch (error) {
    const err = error as WixCartError;
    // Handle both OWNED_CART_NOT_FOUND and CART_NOT_FOUND errors
    // CART_NOT_FOUND occurs when using API key authentication
    if (
      err.details?.applicationError?.code === "OWNED_CART_NOT_FOUND" ||
      err.details?.applicationError?.code === "CART_NOT_FOUND"
    ) {
      console.log("Cart not accessible with current authentication method");
      return null;
    } else {
      throw error;
    }
  }
}

export interface AddToCartValues {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export async function addToCart(
  wixClient: UnifiedWixClient,
  { product, selectedOptions, quantity }: AddToCartValues
) {
  const selectedVariant = findVariant(product, selectedOptions);

  return wixClient.currentCart.addToCurrentCart({
    lineItems: [
      {
        catalogReference: {
          appId: WIX_STORES_APP_ID,
          catalogItemId: product._id,
          options: selectedVariant
            ? {
                variantId: selectedVariant._id,
              }
            : {
                options: selectedOptions,
              },
        },
        quantity,
      },
    ],
  });
}

export interface UpdateCartItemQuantityValues {
  productId: string;
  newQuantity: number;
}

export async function updateCartItemQuantity(
  wixClient: UnifiedWixClient,
  { productId, newQuantity }: UpdateCartItemQuantityValues
) {
  return wixClient.currentCart.updateCurrentCartLineItemQuantity([
    {
      _id: productId,
      quantity: newQuantity,
    },
  ]);
}

export async function removeCartItem(wixClient: UnifiedWixClient, productId: string) {
  return wixClient.currentCart.removeLineItemsFromCurrentCart([productId]);
}

export async function clearCart(wixClient: UnifiedWixClient) {
  try {
    return await wixClient.currentCart.deleteCurrentCart();
  } catch (error) {
    const err = error as WixCartError;
    if (err.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
      return;
    } else {
      throw error;
    }
  }
}
