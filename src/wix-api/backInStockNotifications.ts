import { WIX_STORES_APP_ID } from "@/lib/constants";
import { findVariant } from "@/lib/utils";
import { WixClient } from "@/lib/wix-client.base";
import { products } from "@wix/stores";

import { backInStockSettings } from "@wix/ecom";

async function startCollectingRequests(appId: string) {
  const response = await backInStockSettings.startCollectingRequests(appId);

  return response;
}

export interface BackInStockNotificationRequestValues {
  email: string;
  itemUrl: string;
  product: products.Product;
  selectedOptions: Record<string, string>;
}

export async function createBackInStockNotificationRequest(
  wixClient: WixClient,
  {
    email,
    itemUrl,
    product,
    selectedOptions,
  }: BackInStockNotificationRequestValues
) {
  const catalogInfo = await wixClient.products.queryProducts().limit(1).find();
  console.log("Product data:", catalogInfo.items[0]);
  const selectedVariant = findVariant(product, selectedOptions);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = await startCollectingRequests(WIX_STORES_APP_ID);

  await wixClient.backInStockNotifications.createBackInStockNotificationRequest(
    {
      email,
      itemUrl,
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
    },
    {
      name: product.name || undefined,
      price: product.priceData?.discountedPrice?.toFixed(2),
      image: product.media?.mainMedia?.image?.url,
    }
  );
}
