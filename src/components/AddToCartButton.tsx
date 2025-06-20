import { products } from "@wix/stores";
import { ButtonProps } from "./ui/button";
import { FaCartArrowDown } from "react-icons/fa";
import { cn } from "@/lib/utils";
import LoadingButton from "./LoadingButton";
import { useAddItemToCart } from "@/hooks/cart";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  const mutation = useAddItemToCart();
  return (
    <LoadingButton
      onClick={() => mutation.mutate({ product, selectedOptions, quantity })}
      variant="default"
      className={cn(className, "")}
      loading={mutation.isPending}
      disabled={quantity < 1}
      {...props}
    >
      <span className="mr-1 ">
        <FaCartArrowDown />
      </span>
      Add to cart
    </LoadingButton>
  );
}
