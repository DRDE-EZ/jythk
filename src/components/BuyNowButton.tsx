import { products } from "@wix/stores";
import { ButtonProps } from "./ui/button";
import { useBuyNow } from "@/hooks/checkout";
import { FaDollarSign } from "react-icons/fa";
import LoadingButton from "./LoadingButton";

interface BuyNowButtonProps extends ButtonProps {
  product: products.Product;
  quantity: number;
  selectedOptions: Record<string, string>;
}

export default function BuyNowButton({
  product,
  quantity,
  selectedOptions,
  className,
  ...props
}: BuyNowButtonProps) {
  const { startCheckoutFlow, pending } = useBuyNow();

  return (
    <LoadingButton
      variant="default"
      loading={pending}
      className={className}
      onClick={() => startCheckoutFlow({ product, quantity, selectedOptions })}
      {...props}
    >
      <FaDollarSign />
      Buy now
    </LoadingButton>
  );
}
