import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <div className="space-y-4">
      {product.productOptions?.map((option) => (
        <div key={option.name} className="space-y-2">
          <Label className="text-sm font-medium text-zinc-300">
            {option.name}
          </Label>
          <Select
            value={selectedOptions[option.name || ""]}
            onValueChange={(value) =>
              setSelectedOptions({
                ...selectedOptions,
                [option.name || ""]: value || "",
              })
            }
          >
            <SelectTrigger className="w-full h-12 bg-zinc-900 border-zinc-700 text-white rounded-lg hover:border-zinc-600 focus:border-emerald-500 focus:ring-emerald-500/20">
              <SelectValue placeholder={`Select ${option.name?.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700">
              {option.choices?.map((choice) => (
                <SelectItem
                  key={choice.value}
                  value={choice.value || ""}
                  className="text-zinc-200 focus:bg-zinc-800 focus:text-white"
                >
                  {choice.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
