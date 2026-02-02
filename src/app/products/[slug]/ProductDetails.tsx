"use client";

import { products } from "@wix/stores";
import ProductOptions from "./ProductOptions";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductMedia from "./ProductMedia";
import { Label } from "@/components/ui/label";
import {
  Minus,
  Plus,
  Share2,
  ChevronDown,
  Package,
  Truck,
  Shield,
  Check,
} from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import BackInStockNotificationButton from "@/components/BackInStockNotificationButton";
import BuyNowButton from "@/components/BuyNowButton";

export default function ProductDetails({
  product,
}: {
  product: products.Product;
}) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0]?.value || "",
      }))
      ?.reduce(
        (acc, curr) => ({
          ...acc,
          ...curr,
        }),
        {}
      ) || {}
  );

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs">("description");
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const selectedVariant = findVariant(product, selectedOptions);
  const inStock = checkInStock(product, selectedOptions);

  const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
    const selectedChoice = option.choices?.find(
      (choice) => choice.description === selectedOptions[option.name || ""]
    );
    return selectedChoice?.media?.items ?? [];
  });

  const isDiscounted =
    selectedVariant?.variant?.priceData?.formatted?.price !==
    selectedVariant?.variant?.priceData?.formatted?.discountedPrice;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="w-full">
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Column - Media */}
        <div className="w-full">
          <ProductMedia
            media={
              !!selectedOptionsMedia?.length
                ? selectedOptionsMedia
                : product.media?.items
            }
          />
        </div>

        {/* Right Column - Product Info */}
        <div className="flex flex-col space-y-6 lg:sticky lg:top-28 lg:self-start">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {isDiscounted && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-500 to-green-600 text-white">
                SALE
              </span>
            )}
            {inStock ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Check className="w-3 h-3" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                Out of Stock
              </span>
            )}
          </div>

          {/* Product Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {product.name}
            </h1>
            {product.ribbon && (
              <p className="text-emerald-400 text-sm font-medium">{product.ribbon}</p>
            )}
          </div>

          {/* Price Section */}
          <div className="flex items-baseline gap-4">
            {isDiscounted ? (
              <>
                <span className="text-3xl sm:text-4xl font-bold text-emerald-400">
                  {selectedVariant?.variant?.priceData?.formatted?.discountedPrice}
                </span>
                <span className="text-xl text-zinc-500 line-through">
                  {selectedVariant?.variant?.priceData?.formatted?.price}
                </span>
              </>
            ) : (
              <span className="text-3xl sm:text-4xl font-bold text-white">
                {selectedVariant?.variant?.priceData?.formatted?.price || product.priceData?.formatted?.price}
              </span>
            )}
          </div>

          {/* Short Description */}
          {product.description && (() => {
            const plainText = product.description.replace(/<[^>]*>/g, '');
            const isLong = plainText.length > 150;
            return (
              <div className="space-y-2">
                <p className={`text-zinc-400 text-base leading-relaxed transition-all duration-300 ${
                  !showFullDescription && isLong ? 'line-clamp-2' : ''
                }`}>
                  {showFullDescription ? plainText : (isLong ? plainText.slice(0, 150) : plainText)}
                  {!showFullDescription && isLong && '...'}
                </p>
                {isLong && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors flex items-center gap-1"
                  >
                    {showFullDescription ? 'Show less' : 'Read more'}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFullDescription ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            );
          })()}

          {/* Divider */}
          <div className="h-px bg-zinc-800" />

          {/* Product Options */}
          {product.productOptions && product.productOptions.length > 0 && (
            <div className="space-y-4">
              <ProductOptions
                product={product}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-zinc-300">Quantity</Label>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1 || !inStock}
                className="w-12 h-12 flex items-center justify-center bg-zinc-800 border border-zinc-700 rounded-l-lg text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-16 h-12 flex items-center justify-center bg-zinc-900 border-y border-zinc-700 text-white font-medium">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={!inStock}
                className="w-12 h-12 flex items-center justify-center bg-zinc-800 border border-zinc-700 rounded-r-lg text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {inStock ? (
              <>
                <AddToCartButton
                  product={product}
                  selectedOptions={selectedOptions}
                  quantity={quantity}
                  className="flex-1 h-14 text-base font-semibold bg-emerald-500 hover:bg-emerald-600 text-black rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25"
                />
                <BuyNowButton
                  product={product}
                  selectedOptions={selectedOptions}
                  quantity={quantity}
                  className="flex-1 h-14 text-base font-semibold bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded-lg transition-all duration-200"
                />
              </>
            ) : (
              <BackInStockNotificationButton
                product={product}
                selectedOptions={selectedOptions}
                className="w-full h-14 text-base font-semibold"
              />
            )}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-zinc-800/50 border border-zinc-800">
              <Package className="w-5 h-5 text-emerald-400 mb-2" />
              <span className="text-xs text-zinc-400">Quality Assured</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-zinc-800/50 border border-zinc-800">
              <Truck className="w-5 h-5 text-emerald-400 mb-2" />
              <span className="text-xs text-zinc-400">Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-zinc-800/50 border border-zinc-800">
              <Shield className="w-5 h-5 text-emerald-400 mb-2" />
              <span className="text-xs text-zinc-400">Secure Payment</span>
            </div>
          </div>

          {/* Share Button */}
          <div className="relative pt-2">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share this product
              <ChevronDown className={`w-4 h-4 transition-transform ${showShareMenu ? 'rotate-180' : ''}`} />
            </button>

            <div className={`absolute top-full left-0 mt-2 p-3 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl z-10 transition-all duration-200 ${
              showShareMenu
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}>
              <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name || '')}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-700 text-white hover:bg-blue-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-700 text-white hover:bg-blue-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-700 text-white hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '');
                      setShowShareMenu(false);
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-700 text-white hover:bg-emerald-500 transition-colors"
                    title="Copy link"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      {(product.description || product.additionalInfoSections?.length) && (
        <div className="mt-16 pt-16 border-t border-zinc-800">
          {/* Tab Navigation */}
          <div className="flex gap-1 p-1.5 bg-zinc-800/50 rounded-xl w-fit mb-8 border border-zinc-800">
            <button
              onClick={() => setActiveTab("description")}
              className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === "description"
                  ? "text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {activeTab === "description" && (
                <span className="absolute inset-0 bg-emerald-500 rounded-lg animate-in fade-in zoom-in-95 duration-200" />
              )}
              <span className="relative">Description</span>
            </button>
            {product.additionalInfoSections && product.additionalInfoSections.length > 0 && (
              <button
                onClick={() => setActiveTab("specs")}
                className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "specs"
                    ? "text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {activeTab === "specs" && (
                  <span className="absolute inset-0 bg-emerald-500 rounded-lg animate-in fade-in zoom-in-95 duration-200" />
                )}
                <span className="relative">Specifications</span>
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 overflow-hidden">
            <div
              key={activeTab}
              className="animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              {activeTab === "description" && product.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="prose prose-invert prose-emerald max-w-none
                    prose-headings:text-white prose-headings:font-bold
                    prose-p:text-zinc-300 prose-p:leading-relaxed
                    prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white
                    prose-ul:text-zinc-300 prose-ol:text-zinc-300
                    prose-li:marker:text-emerald-500"
                />
              )}

              {activeTab === "specs" && product.additionalInfoSections && (
                <div className="space-y-6">
                  {product.additionalInfoSections.map((section, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <span className="w-1 h-5 bg-emerald-500 rounded-full" />
                        {section.title}
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{ __html: section.description || "" }}
                        className="prose prose-invert prose-emerald max-w-none text-zinc-300
                          prose-p:leading-relaxed
                          prose-ul:text-zinc-300 prose-ol:text-zinc-300
                          prose-li:marker:text-emerald-500"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
