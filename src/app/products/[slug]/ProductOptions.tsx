import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { checkInStock, cn } from "@/lib/utils";
import { products } from "@wix/stores";

interface ProductOptionsProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

export default function ProductOptions({
  product,
  selectedOptions,
  setSelectedOptions,
}: ProductOptionsProps) {
  return (
    <div className="space-y-2.5">
      {product.productOptions?.map((option) => (
        <Select
          key={option.name}
          value={selectedOptions[option.name || ""]}
          onValueChange={(value) =>
            setSelectedOptions({
              ...selectedOptions,
              [option.name || ""]: value || "",
            })
          }
        >
          <Label asChild>
            <span>{option.name}</span>
          </Label>
          <SelectTrigger className="w-full rounded-none mb-4">
            <SelectValue placeholder="Select a build" />
          </SelectTrigger>
          <SelectContent>
            {option.choices?.map((choice) => {
              const isInStock = checkInStock(product, {
                ...selectedOptions,
                [option.name || ""]: choice.value || "",
              });
              return (
                <SelectItem
                  key={choice.value}
                  value={choice.value || ""}
                  className={cn(
                    "",
                    !isInStock && "line-through text-muted-foreground"
                  )}
                  disabled={!isInStock}
                >
                  {choice.value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
