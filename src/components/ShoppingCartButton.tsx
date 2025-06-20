"use client";

import { useCart } from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import { useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

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
          className="pt-5 pb-4 pl-4 pr-5"
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
            <SheetTitle>
              Your cart{" "}
              <span className="text-base">
                ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex grow flex-col space-y-5 overflow-y-auto">
            <ul className="space-y-5">cart items</ul>
            <pre>{JSON.stringify(cartQuery.data, null, 2)}</pre>
          </div>
          <div className="flex items-center justify-between gap-5 px-5 pb-5">
            <div className="space-y-0.5">
              <p className="text-sm">Subtotal amount</p>
              <p className="font-bold">
                {/* @ts-expect-error */}
                {cartQuery.data?.subtotal?.formattedConvertedAmount}
              </p>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
            </div>
            <Button size="lg" className="rounded-xs hover:cursor-pointer">
              Checkout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
