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
      (acc, item) => acc + (item.quantity || 0),
      0
    ) || 0;

  return (
    <>
      <div className="relative">
        <Button
          variant={"ghost"}
          size="icon"
          onClick={() => setShowSheet(true)}
          className="pt-5 pb-4 pl-4 pr-5 hover:cursor-pointer rounded-xs"
        >
          <ShoppingCartIcon />
          <span className="absolute top-0 right-0 translate-y-1 -translate-x-1 size-4 bg-primary text-xs text-primary-foreground flex items-center justify-center rounded-full">
            {totalQuantity < 10 ? totalQuantity : "9+"}
          </span>
        </Button>
      </div>
      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetContent className="flex flex-col sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="px-5 pt-2">
              Your cart{" "}
              <span className="text-base">
                ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
              </span>
            </SheetTitle>
          </SheetHeader>
          <hr />
          <div className="flex grow flex-col space-y-6 overflow-y-auto pt-2">
            <ul className="space-y-8 px-5 -mt-1">
              {cartQuery.data?.lineItems?.map((item) => (
                <ShoppingCartItem
                  key={item._id}
                  item={item}
                  onProductLinkClicked={() => setShowSheet(false)}
                />
              ))}
            </ul>
            {cartQuery.isPending && (
              <Loader2 className="mx-auto mt-5 animate-spin" />
            )}
            {cartQuery.error && (
              <p className="text-destructive">{cartQuery.error.message}</p>
            )}
            {!cartQuery.isPending && !cartQuery.data?.lineItems?.length && (
              <div className="flex grow items-center justify-center text-center">
                <div className="space-y-1.5">
                  <p className="text-lg font-semibold">Your cart is empty</p>
                  <Link
                    href="/shop"
                    className="text-primary hover:underline"
                    onClick={() => setShowSheet(false)}
                  >
                    Start shopping now
                  </Link>
                </div>
              </div>
            )}
            {/* <pre>{JSON.stringify(cartQuery.data, null, 2)}</pre> */}
          </div>
          <hr />
          <div className="flex items-center justify-between gap-5 px-5 pb-5">
            <div className="space-y-0.5">
              <p className="text-sm">Subtotal amount:</p>
              <p className="font-bold">
                {/* @ts-expect-error */}
                {cartQuery.data?.subtotal?.formattedConvertedAmount}
              </p>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
            </div>
            <CheckoutButton
              disabled={!totalQuantity || cartQuery.isFetching}
              size="lg"
              className="rounded-none hover:cursor-pointer"
            />
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
