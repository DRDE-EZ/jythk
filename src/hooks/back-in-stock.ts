import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  BackInStockNotificationRequestValues,
  createBackInStockNotificationRequest,
} from "@/wix-api/backInStockNotifications";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateBackInStockNotificationRequest() {
  return useMutation({
    mutationFn: (values: BackInStockNotificationRequestValues) => {
      if (!wixBrowserClient) {
        return Promise.reject(new Error("Wix client not initialized"));
      }

      return createBackInStockNotificationRequest(wixBrowserClient, values);
    },
    onError(error) {
      console.error(error);
      if (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).details.applicationError.code ===
        "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXISTS"
      ) {
        toast.warning("You are already subscribed to this product.");
      } else {
        toast.warning("Something went wrong. Please try again.");
      }
    },
  });
}
