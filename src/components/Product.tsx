"use client";

import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "./WixImage";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;
  const description = product.additionalInfoSections?.[0]?.description;
  const { theme } = useTheme();
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="overflow-hidden relative group/product rounded-xs shadow-sm">
        <WixImage
          height={600}
          width={600}
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          className="transition-transform duration-300  group-hover/product:scale-105"
        />

        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center text-center bg-white/65 opacity-0 group-hover/product:opacity-100 translate-y-4 group-hover/product:translate-y-0 transition-all duration-300 ease-in-out"
          )}
        >
          {description && (
            <div
              className="text-md text-gray-800 font-normal tracking-tight p-6 line-clamp-3 text-ellipsis overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}
        </div>
      </div>

      <div className="space-y-2 py-3">
        <h3 className="text-lg font-semibold tracking-tight text-primary-800">
          {product.name}
        </h3>

        {product.priceData?.formatted?.price ===
        product.priceData?.formatted?.discountedPrice ? (
          <p className="text-gray-400 text-base font-medium">
            {product.priceData?.formatted?.price}
          </p>
        ) : (
          <span className="text-gray-400 text-base font-medium">
            <span className="text-gray-300 text-base font-medium line-through mr-2">
              {product.priceData?.formatted?.price}
            </span>
            {product.priceData?.formatted?.discountedPrice}
          </span>
        )}
      </div>
    </Link>
  );
}
