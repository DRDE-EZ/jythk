"use client";

import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "./WixImage";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;
  const description = product.additionalInfoSections?.[0]?.description;

  const isDiscounted =
    product.priceData?.formatted?.price !==
    product.priceData?.formatted?.discountedPrice;

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="relative group/card rounded-none overflow-hidden transition-all duration-300 hover:scale-[1.025] hover:shadow-2xl bg-white dark:bg-zinc-900">
        {/* Image */}
        <div className="relative">
          <WixImage
            height={600}
            width={600}
            mediaIdentifier={mainImage?.url}
            alt={mainImage?.altText}
            className="w-full h-auto object-cover transition-transform duration-500"
          />

          {/* Hover panel */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center px-4 text-center",
              "opacity-0 group-hover/card:opacity-100 transition-opacity duration-300",
              "bg-black/60 backdrop-blur-sm"
            )}
          >
            {description && (
              <div
                className="text-sm md:text-base font-medium text-white p-4 rounded-lg max-h-48 overflow-hidden line-clamp-10"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
          </div>
        </div>
        <div
          className={cn(
            "absolute bottom-3 right-3",
            "transition-opacity duration-300 ease-in-out",
            "opacity-100 sm:opacity-0 sm:group-hover/card:opacity-100",
            "pointer-events-none sm:pointer-events-auto"
          )}
        >
          <div className="bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full p-1 shadow-md">
            <ArrowUpRight className="w-4 h-4 text-black dark:text-white" />
          </div>
        </div>

        {/* Name + Pricing */}
        <div className="px-4 py-3 space-y-1 transition-colors duration-300">
          <h3 className="text-base md:text-lg line-clamp-1 font-semibold tracking-tight text-primary-800 dark:text-white">
            {product.name}
          </h3>

          {isDiscounted ? (
            <div className="text-base font-medium text-gray-400">
              <span className="line-through mr-2">
                {product.priceData?.formatted?.price}
              </span>
              <span className="text-emerald-500 font-semibold">
                {product.priceData?.formatted?.discountedPrice}
              </span>
            </div>
          ) : (
            <p className="text-base font-medium text-gray-500 dark:text-gray-300">
              {product.priceData?.formatted?.price}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
