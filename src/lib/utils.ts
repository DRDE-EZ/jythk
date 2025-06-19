import { products } from "@wix/stores";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function findVariant(
  product: products.Product,
  selectedOptions: Record<string, string>
) {
  if (!product.variants || product.variants.length === 0) {
    return null;
  }

  return (
    product.variants?.find((variant) => {
      const match = Object.entries(selectedOptions).every(
        ([key, value]) => variant.choices?.[key] === value
      );
      if (match) {
        console.log("Matched variant:", variant);
      }
      return match;
    }) ?? null
  );
}

export function checkInStock(
  product: products.Product,
  selectedOptions: Record<string, string>
) {
  const variant = findVariant(product, selectedOptions);

  if (variant) {
    // For variants, trust the inStock boolean from Wix
    // Don't rely on quantity as it might be 0 even when in stock
    const isInStock = variant.stock?.inStock === true;
    console.log("Variant stock check:", {
      variantId: variant._id,
      quantity: variant.stock?.quantity,
      inStock: variant.stock?.inStock,
      finalResult: isInStock,
    });
    return isInStock;
  }

  // Fallback to product-level stock check
  const productInStock =
    product.stock?.inventoryStatus === products.InventoryStatus.IN_STOCK ||
    product.stock?.inventoryStatus ===
      products.InventoryStatus.PARTIALLY_OUT_OF_STOCK;

  console.log("Product stock check:", {
    inventoryStatus: product.stock?.inventoryStatus,
    result: productInStock,
  });

  return productInStock;
}

export const stripHtml = (htmlString: string) => {
  return htmlString.replace(/<[^>]*>?/gm, "").trim();
};
