// Local storage fallback cart for when user is not authenticated
import { products } from "@wix/stores";

export interface LocalCartItem {
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  quantity: number;
  selectedOptions: Record<string, string>;
  imageUrl?: string;
  variantId?: string;
}

export interface LocalCart {
  items: LocalCartItem[];
  totalQuantity: number;
  subtotal: number;
}

const LOCAL_CART_KEY = "wix-local-cart";

export function getLocalCart(): LocalCart {
  if (typeof window === "undefined") {
    return { items: [], totalQuantity: 0, subtotal: 0 };
  }

  try {
    const stored = localStorage.getItem(LOCAL_CART_KEY);
    if (!stored) {
      return { items: [], totalQuantity: 0, subtotal: 0 };
    }

    const cart: LocalCart = JSON.parse(stored);
    return cart;
  } catch (error) {
    console.error("Failed to parse local cart:", error);
    return { items: [], totalQuantity: 0, subtotal: 0 };
  }
}

export function saveLocalCart(cart: LocalCart): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save local cart:", error);
  }
}

export function addToLocalCart(
  product: products.Product,
  selectedOptions: Record<string, string>,
  quantity: number
): LocalCart {
  const cart = getLocalCart();
  
  // Create unique key for this product variant
  const itemKey = `${product._id}-${JSON.stringify(selectedOptions)}`;
  
  // Find existing item
  const existingItemIndex = cart.items.findIndex(
    (item) => 
      item.productId === product._id && 
      JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
  );

  const price = product.price?.price || product.price?.discountedPrice || 0;
  const imageUrl = product.media?.mainMedia?.image?.url;

  if (existingItemIndex >= 0) {
    // Update existing item
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    const newItem: LocalCartItem = {
      productId: product._id!,
      productName: product.name!,
      productSlug: product.slug!,
      price,
      quantity,
      selectedOptions,
      imageUrl,
    };
    cart.items.push(newItem);
  }

  // Recalculate totals
  cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  saveLocalCart(cart);
  return cart;
}

export function updateLocalCartItemQuantity(
  productId: string,
  selectedOptions: Record<string, string>,
  newQuantity: number
): LocalCart {
  const cart = getLocalCart();
  
  const itemIndex = cart.items.findIndex(
    (item) => 
      item.productId === productId && 
      JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
  );

  if (itemIndex >= 0) {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = newQuantity;
    }
  }

  // Recalculate totals
  cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  saveLocalCart(cart);
  return cart;
}

export function removeFromLocalCart(
  productId: string,
  selectedOptions: Record<string, string>
): LocalCart {
  const cart = getLocalCart();
  
  cart.items = cart.items.filter(
    (item) => 
      !(item.productId === productId && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
  );

  // Recalculate totals
  cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  saveLocalCart(cart);
  return cart;
}

export function clearLocalCart(): LocalCart {
  const emptyCart: LocalCart = { items: [], totalQuantity: 0, subtotal: 0 };
  saveLocalCart(emptyCart);
  return emptyCart;
}

// Convert local cart to Wix cart format for consistency
export function convertLocalCartToWixFormat(localCart: LocalCart) {
  return {
    _id: "local-cart",
    lineItems: localCart.items.map((item, index) => ({
      _id: `local-${index}`,
      productName: {
        original: item.productName,
        translated: item.productName, // Add translated field for compatibility
      },
      url: `/products/${item.productSlug}`,
      quantity: item.quantity,
      price: {
        amount: item.price.toString(),
        formattedAmount: `$${item.price.toFixed(2)}`,
        formattedConvertedAmount: `$${item.price.toFixed(2)}`, // Add this field
      },
      image: item.imageUrl,
      productId: item.productId,
      selectedOptions: item.selectedOptions,
    })),
    subtotal: {
      amount: localCart.subtotal.toString(),
      formattedAmount: `$${localCart.subtotal.toFixed(2)}`,
    },
  };
}