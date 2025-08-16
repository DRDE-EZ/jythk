"use client";

import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "./WixImage";
import { ArrowUpRight, Zap } from "lucide-react";

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
      <div className="group/card relative overflow-hidden rounded-sm bg-gradient-to-b from-background to-muted/20 border border-border/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
        {/* Discount Badge */}
        {isDiscounted && (
          <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            SALE
          </div>
        )}

        {/* Performance Indicator */}
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <div className="bg-primary/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <Zap className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-2xl">
          <WixImage
            height={400}
            width={400}
            mediaIdentifier={mainImage?.url}
            alt={mainImage?.altText}
            className="w-full h-full object-cover transition-all duration-700 group-hover/card:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

          {/* Description Overlay */}
          {description && (
            <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
              <div
                className="text-sm text-white/90 line-clamp-3 font-medium leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </div>
          )}

          {/* Hover Action Button */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover/card:opacity-100 translate-y-4 group-hover/card:translate-y-0 transition-all duration-300">
            <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full p-3 shadow-xl group-hover/card:bg-primary group-hover/card:text-white transition-colors duration-300">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Product Name */}
          <div className="space-y-1">
            <h3 className="font-bold text-lg sm:text-xl leading-tight text-foreground group-hover/card:text-primary transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>

            {/* Subtle underline animation */}
            <div className="w-0 group-hover/card:w-12 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out" />
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between">
            {isDiscounted ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-emerald-600">
                    {product.priceData?.formatted?.discountedPrice}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {product.priceData?.formatted?.price}
                  </span>
                </div>
                <div className="text-xs text-emerald-600 font-medium">
                  Limited Time Offer
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-xl font-bold text-foreground">
                  {product.priceData?.formatted?.price}
                </span>
                <div className="text-xs text-muted-foreground">
                  Premium Build
                </div>
              </div>
            )}

            {/* Performance Badge */}
            <div className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 px-2 py-1 rounded-md text-xs font-semibold">
                HIGH-PERF
              </div>
            </div>
          </div>

          {/* Bottom gradient line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        {/* Card glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 blur-xl" />
        </div>
      </div>
    </Link>
  );
}
