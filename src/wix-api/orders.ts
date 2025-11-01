import { UnifiedWixClient } from "@/lib/wix-client.base";

export async function getOrder(wixClient: UnifiedWixClient, orderId: string) {
  try {
    return await wixClient.orders.getOrder(orderId);
  } catch (error: unknown) {
    interface WixApiError {
      details?: {
        applicationError?: {
          code?: string;
        };
      };
    }
    const err = error as WixApiError;
    if (err.details?.applicationError?.code === "NOT_FOUND") {
      return null;
    } else {
      throw error;
    }
  }
}

export interface GetUserOrdersFilters {
  limit?: number;
  cursor?: string | null;
}

export async function getUserOrders(
  wixClient: UnifiedWixClient,
  { limit, cursor }: GetUserOrdersFilters
) {
  return wixClient.orders.searchOrders({
    cursorPaging: {
      limit,
      cursor,
    },
  });
}
