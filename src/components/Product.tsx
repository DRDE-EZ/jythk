"use client";

import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "./WixImage";
import { useState } from "react";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;
  const description = product.additionalInfoSections?.[0]?.description;
  const [quantity, setQuantity] = useState(0);

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="overflow-hidden relative group rounded-xs shadow-sm">
        <WixImage
          height={600}
          width={600}
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          className="transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/75 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          {description && (
            <div
              className="text-md font-normal tracking-tight p-6 line-clamp-3 text-ellipsis overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}
        </div>
      </div>

      <div className="space-y-2 py-3">
        <h3 className="text-lg font-semibold tracking-tight text-gray-800">
          {product.name}
        </h3>

        {product.priceData?.formatted?.price ===
        product.priceData?.formatted?.discountedPrice ? (
          <p className="text-gray-500 text-base font-medium">
            {product.priceData?.formatted?.price}
          </p>
        ) : (
          <span className="text-gray-500 text-base font-medium">
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
