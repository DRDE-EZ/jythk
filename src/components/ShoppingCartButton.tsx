"use client";

import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, ShoppingCartIcon, X } from "lucide-react";
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
      0
    ) || 0;

  return (
    <>
      <div className="relative">
        <Button
          variant={"ghost"}
          size="icon"
          onClick={() => setShowSheet(true)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#2a2a2a] hover:scale-105 transition-all"
        >
          <ShoppingCartIcon />
          <span className="absolute top-0 right-0 translate-y-1 -translate-x-1 w-5 h-5 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-[#1f1f1f]">
            {totalQuantity < 10 ? totalQuantity : "9+"}
          </span>
        </Button>
      </div>
      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetContent className="flex flex-col sm:max-w-lg bg-white">
          <SheetHeader className="bg-white">
            <SheetTitle className="px-5 pt-2 text-black">
              Your cart{" "}
              <span className="text-base text-gray-700">
                ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
              </span>
            </SheetTitle>
          </SheetHeader>
          <hr className="border-gray-200" />
          <div className="flex grow flex-col space-y-6 overflow-y-auto pt-2 bg-white">
            <ul className="space-y-8 px-5 -mt-1">
              {cartQuery.data?.lineItems?.map((item: any) => (
                <ShoppingCartItem
                  key={item._id}
                  item={item}
                  onProductLinkClicked={() => setShowSheet(false)}
                />
              ))}
            </ul>
            {cartQuery.isPending && (
              <Loader2 className="mx-auto mt-5 animate-spin text-[#1a4ba8]" />
            )}
            {cartQuery.error && (
              <p className="text-red-600">{cartQuery.error.message}</p>
            )}
            {!cartQuery.isPending && !cartQuery.data?.lineItems?.length && (
              <div className="flex grow items-center justify-center text-center bg-white">
                <div className="space-y-1.5">
                  <p className="text-lg font-semibold text-black">Your cart is empty</p>
                  <Link
                    href="/shop"
                    className="hover:underline"
                    style={{ color: '#1a4ba8' }}
                    onClick={() => setShowSheet(false)}
                  >
                    Start shopping now
                  </Link>
                </div>
              </div>
            )}
            {/* <pre>{JSON.stringify(cartQuery.data, null, 2)}</pre> */}
          </div>
          <hr className="border-gray-200" />
          <div className="flex items-center justify-between gap-5 px-5 pb-5 bg-white">
            <div className="space-y-0.5">
              <p className="text-sm text-black">Subtotal amount:</p>
              <p className="font-bold text-black">
                {cartQuery.data?.subtotal?.formattedConvertedAmount || 
                 cartQuery.data?.subtotal?.formattedAmount || 
                 "$0.00"}
              </p>
              <p className="text-xs text-gray-600">
                Shipping and taxes calculated at checkout
              </p>
            </div>
            <CheckoutButton
              disabled={!totalQuantity || cartQuery.isFetching}
              size="lg"
              className="rounded-none hover:cursor-pointer"
            />
            {!totalQuantity && (
              <p className="text-xs text-gray-500 text-center mt-1">
                Add items to enable checkout
              </p>
            )}
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
    <li className="flex items-center gap-4">
      <div className="relative size-fit flex-none">
        <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
          <div className="w-[110px] h-[110px] flex-none overflow-hidden">
            <WixImage
              mediaIdentifier={item.image}
              width={110}
              height={110}
              alt={item.productName?.translated || "Product image"}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <button
          className="absolute -right-1 -top-1 border bg-background rounded-xs p-0.5 hover:cursor-pointer"
          onClick={() => removeItemMutation.mutate(productId)}
        >
          <X className="size-3" />
        </button>
      </div>

      <div className="space-y-1.5 text-sm">
        <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
          <p className="font-bold">{item.productName?.translated || "Item"}</p>
        </Link>
        {!!item.descriptionLines?.length && (
          <p>
            {item.descriptionLines
              .map(
                (line) =>
                  line.colorInfo?.translated || line.plainText?.translated
              )
              .join(", ")}
          </p>
        )}
        <div className="flex items-center gap-2">
          {item.quantity} x {item.price?.formattedConvertedAmount}
          {item.fullPrice && item.fullPrice.amount !== item.price?.amount && (
            <span className="text-muted-foreground line-through">
              {item.fullPrice.formattedConvertedAmount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            className="rounded-xs"
            size="sm"
            disabled={item.quantity === 1}
            onClick={() =>
              updateQuantityMutation.mutate({
                productId,
                newQuantity: !item.quantity ? 0 : item.quantity - 1,
              })
            }
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xs"
            disabled={quantityLimitReached}
            onClick={() =>
              updateQuantityMutation.mutate({
                productId,
                newQuantity: !item.quantity ? 0 : item.quantity + 1,
              })
            }
          >
            +
          </Button>
          {quantityLimitReached && <span>Quantity limit reached</span>}
        </div>
      </div>
    </li>
  );
}
