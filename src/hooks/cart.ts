import { wixBrowserClient } from "@/lib/wix-client.browser";
import {
  addToCart,
  AddToCartValues,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
  UpdateCartItemQuantityValues,
} from "@/wix-api/cart";
import {
  MutationKey,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { toast } from "sonner";

const queryKey: QueryKey = ["cart"];

export function useCart(initialData: currentCart.Cart | null) {
  return useQuery({
    queryKey,
    queryFn: () => {
      if (!wixBrowserClient) {
        return Promise.resolve(null);
      }
      return getCart(wixBrowserClient);
    },
    initialData,
  });
}

export function useAddItemToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: AddToCartValues) => {
      if (!wixBrowserClient) {
        return Promise.reject(new Error("Wix client not initialized"));
      }
      return addToCart(wixBrowserClient, values);
    },
    onSuccess(data) {
      toast.success("Item added to cart");
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, data.cart);
    },
    onError(error) {
      console.log(error);
      toast.error("Failed to add item to cart.");
    },
  });
}

export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();
  const mutationKey: MutationKey = ["useUpdateCartItemQuantity"];

  return useMutation({
    mutationKey,
    mutationFn: (values: UpdateCartItemQuantityValues) => {
      if (!wixBrowserClient) {
        return Promise.reject(new Error("Wix client not initialized"));
      }
      return updateCartItemQuantity(wixBrowserClient, values);
    },
    onMutate: async ({ productId, newQuantity }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState =
        queryClient.getQueryData<currentCart.Cart>(queryKey);

      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.map((lineItem) =>
          lineItem._id === productId
            ? { ...lineItem, quantity: newQuantity }
            : lineItem
        ),
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.log(error);
      toast.warning("Something went wrong. Please try again.");
    },
    onSettled() {
      if (queryClient.isMutating({ mutationKey }) === 1) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => {
      if (!wixBrowserClient) {
        return Promise.reject(new Error("Wix client not initialized"));
      }
      return removeCartItem(wixBrowserClient, productId);
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState =
        queryClient.getQueryData<currentCart.Cart>(queryKey);

      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.filter(
          (lineItem) => lineItem._id !== productId
        ),
      }));
      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.log(error);
      toast.warning("Something went wrong. Please try again.");
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!wixBrowserClient) {
        return Promise.reject(new Error("Wix client not initialized"));
      }
      return clearCart(wixBrowserClient);
    },
    onSuccess() {
      queryClient.setQueryData(queryKey, null);
      queryClient.invalidateQueries({ queryKey });
    },
    retry: 3,
  });
}
