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
  addToLocalCart,
  clearLocalCart,
  convertLocalCartToWixFormat,
  getLocalCart,
  removeFromLocalCart,
  updateLocalCartItemQuantity,
} from "@/lib/local-cart";
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
    queryFn: async () => {
      // Try Wix cart first (if user is authenticated)
      if (wixBrowserClient) {
        try {
          const wixCart = await getCart(wixBrowserClient);
          if (wixCart) {
            return wixCart;
          }
        } catch (error) {
          console.log("Wix cart not available, using local cart");
        }
      }
      
      // Fallback to local cart
      const localCart = getLocalCart();
      return convertLocalCartToWixFormat(localCart);
    },
    initialData,
  });
}

export function useAddItemToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: AddToCartValues) => {
      // Try Wix cart first (if user is authenticated)
      if (wixBrowserClient) {
        try {
          return await addToCart(wixBrowserClient, values);
        } catch (error) {
          console.log("Wix cart not available, using local cart");
        }
      }
      
      // Fallback to local cart
      const localCart = addToLocalCart(
        values.product,
        values.selectedOptions,
        values.quantity
      );
      
      return {
        cart: convertLocalCartToWixFormat(localCart)
      };
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
    mutationFn: async (values: UpdateCartItemQuantityValues) => {
      // Try Wix cart first (if user is authenticated)
      if (wixBrowserClient) {
        try {
          return await updateCartItemQuantity(wixBrowserClient, values);
        } catch (error) {
          console.log("Wix cart not available, using local cart");
        }
      }
      
      // Fallback to local cart - we need to extract product info from the current cart
      const currentCartData = queryClient.getQueryData<any>(queryKey);
      const lineItem = currentCartData?.lineItems?.find((item: any) => item._id === values.productId);
      
      if (lineItem) {
        const localCart = updateLocalCartItemQuantity(
          lineItem.productId || values.productId,
          lineItem.selectedOptions || {},
          values.newQuantity
        );
        
        return {
          cart: convertLocalCartToWixFormat(localCart)
        };
      }
      
      throw new Error("Item not found in cart");
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
    mutationFn: async (productId: string) => {
      // Try Wix cart first (if user is authenticated)
      if (wixBrowserClient) {
        try {
          return await removeCartItem(wixBrowserClient, productId);
        } catch (error) {
          console.log("Wix cart not available, using local cart");
        }
      }
      
      // Fallback to local cart - we need to extract product info from the current cart
      const currentCartData = queryClient.getQueryData<any>(queryKey);
      const lineItem = currentCartData?.lineItems?.find((item: any) => item._id === productId);
      
      if (lineItem) {
        const localCart = removeFromLocalCart(
          lineItem.productId || productId,
          lineItem.selectedOptions || {}
        );
        
        return {
          cart: convertLocalCartToWixFormat(localCart)
        };
      }
      
      throw new Error("Item not found in cart");
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
    mutationFn: async () => {
      // Try Wix cart first (if user is authenticated)
      if (wixBrowserClient) {
        try {
          return await clearCart(wixBrowserClient);
        } catch (error) {
          console.log("Wix cart not available, using local cart");
        }
      }
      
      // Fallback to local cart
      const localCart = clearLocalCart();
      return convertLocalCartToWixFormat(localCart);
    },
    onSuccess() {
      queryClient.setQueryData(queryKey, null);
      queryClient.invalidateQueries({ queryKey });
    },
    retry: 3,
  });
}
