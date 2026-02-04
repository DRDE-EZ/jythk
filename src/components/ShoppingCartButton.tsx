"use client";

import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Minus, Plus, ShoppingCartIcon, Trash2, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import WixImage from "./WixImage";
import CheckoutButton from "./CheckoutButton";

interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
}

export default function ShoppingCartButton({
  initialData,
}: ShoppingCartButtonProps) {
  const [showSheet, setShowSheet] = useState(false);
  const cartQuery = useCart(initialData);
  const totalQuantity =
    cartQuery.data?.lineItems?.reduce(
      (acc: number, item: any) => acc + (item.quantity || 0),
      0,
    ) || 0;

  return (
    <>
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSheet(true)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-md text-white hover:bg-[#2a2a2a] transition-all"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-emerald-500 text-black text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-zinc-900">
            {totalQuantity < 10 ? totalQuantity : "9+"}
          </span>
        </Button>
      </div>

      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetContent hideCloseButton className="flex flex-col sm:max-w-md bg-zinc-950 border-zinc-800 p-0">
          {/* Header */}
          <SheetHeader className="px-6 pt-6 pb-4">
            <SheetTitle className="text-white text-lg font-bold flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <ShoppingCartIcon className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="flex-1">
                Your Cart
                <span className="text-sm font-medium text-zinc-500 ml-2">
                  ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
                </span>
              </span>
              <button
                onClick={() => setShowSheet(false)}
                className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </SheetTitle>
          </SheetHeader>

          <div className="h-px bg-zinc-800" />

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartQuery.isPending && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
              </div>
            )}

            {cartQuery.error && (
              <div className="px-6 py-8 text-center">
                <p className="text-red-400 text-sm">{cartQuery.error.message}</p>
              </div>
            )}

            {!cartQuery.isPending && !cartQuery.data?.lineItems?.length && (
              <div className="flex flex-col items-center justify-center py-20 px-6">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-5">
                  <ShoppingCartIcon className="w-7 h-7 text-zinc-500" />
                </div>
                <p className="text-lg font-semibold text-white mb-1">
                  Your cart is empty
                </p>
                <p className="text-sm text-zinc-500 mb-6">
                  Add some products to get started
                </p>
                <Link
                  href="/shop"
                  onClick={() => setShowSheet(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/20 transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            )}

            {cartQuery.data?.lineItems && cartQuery.data.lineItems.length > 0 && (
              <ul className="divide-y divide-zinc-800/80">
                {cartQuery.data.lineItems.map((item: any) => (
                  <ShoppingCartItem
                    key={item._id}
                    item={item}
                    onProductLinkClicked={() => setShowSheet(false)}
                  />
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-800">
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Subtotal</span>
                <span className="text-lg font-bold text-white">
                  {cartQuery.data?.subtotal?.formattedConvertedAmount ||
                    cartQuery.data?.subtotal?.formattedAmount ||
                    "$0.00"}
                </span>
              </div>
              <p className="text-xs text-zinc-600">
                Shipping and taxes calculated at checkout
              </p>
              <CheckoutButton
                disabled={!totalQuantity || cartQuery.isFetching}
                size="lg"
                className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed hover:cursor-pointer"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface ShoppingCartItemProps {
  item: currentCart.LineItem;
  onProductLinkClicked: () => void;
}

function ShoppingCartItem({
  item,
  onProductLinkClicked,
}: ShoppingCartItemProps) {
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemMutation = useRemoveCartItem();
  const productId = item._id;

  if (!productId) return null;

  const slug = item.url?.split("/").pop();

  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  return (
    <li className="flex gap-4 px-6 py-5">
      {/* Image */}
      <Link
        href={`/products/${slug}`}
        onClick={onProductLinkClicked}
        className="flex-shrink-0"
      >
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700">
          <WixImage
            mediaIdentifier={item.image}
            width={80}
            height={80}
            alt={item.productName?.translated || "Product image"}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
            <p className="text-sm font-semibold text-white truncate hover:text-emerald-400 transition-colors">
              {item.productName?.translated || "Item"}
            </p>
          </Link>

          {!!item.descriptionLines?.length && (
            <p className="text-xs text-zinc-500 mt-0.5 truncate">
              {item.descriptionLines
                .map(
                  (line) =>
                    line.colorInfo?.translated || line.plainText?.translated,
                )
                .join(", ")}
            </p>
          )}

          <p className="text-sm font-medium text-emerald-400 mt-1.5">
            {item.price?.formattedConvertedAmount}
            {item.fullPrice &&
              item.fullPrice.amount !== item.price?.amount && (
                <span className="text-zinc-600 line-through ml-2 text-xs">
                  {item.fullPrice.formattedConvertedAmount}
                </span>
              )}
          </p>
        </div>

        {/* Quantity + Remove */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-0.5">
            <button
              disabled={item.quantity === 1}
              onClick={() =>
                updateQuantityMutation.mutate({
                  productId,
                  newQuantity: !item.quantity ? 0 : item.quantity - 1,
                })
              }
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-10 text-center text-sm font-medium text-white">
              {item.quantity}
            </span>
            <button
              disabled={quantityLimitReached}
              onClick={() =>
                updateQuantityMutation.mutate({
                  productId,
                  newQuantity: !item.quantity ? 0 : item.quantity + 1,
                })
              }
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => removeItemMutation.mutate(productId)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </li>
  );
}
