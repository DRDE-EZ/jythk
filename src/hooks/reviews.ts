import { WixClient } from "@/lib/wix-client.base";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  createProductReview,
  CreateProductReviewValues,
} from "@/wix-api/reviews";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateProductReview() {
  return useMutation({
    mutationFn: (values: CreateProductReviewValues) => {
      if (!wixBrowserClient) {
        return Promise.reject(new Error("Wix client not initialized"));
      }
      return createProductReview(wixBrowserClient, values);
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to create a review.");
    },
  });
}
