"use client";

import { products } from "@wix/stores";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductClient from "@/components/ProductClient";

interface RelatedProductsCarouselProps {
  products: products.Product[];
}

export default function RelatedProductsCarousel({ products: relatedProducts }: RelatedProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const totalItems = relatedProducts.length;

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate visible items based on screen width
  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  }, []);

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount());
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [getVisibleCount]);

  // Navigate to previous set of items
  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? Math.max(0, totalItems - visibleCount) : newIndex;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalItems, visibleCount, isTransitioning]);

  // Navigate to next set of items
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      const maxIndex = Math.max(0, totalItems - visibleCount);
      return newIndex > maxIndex ? 0 : newIndex;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalItems, visibleCount, isTransitioning]);

  // Calculate the maximum scroll index
  const maxIndex = Math.max(0, totalItems - visibleCount);

  if (totalItems === 0) return null;

  // Mobile version: horizontal scroll with snap
  if (isMobile) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Related Products
            </h2>
          </div>
          <p className="text-zinc-400 ml-5">
            Discover more products you might like
          </p>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent -mx-4 px-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {relatedProducts.map((product, index) => (
            <div
              key={product._id || index}
              className="flex-shrink-0 w-[280px] snap-start"
            >
              <ProductClient product={product} />
            </div>
          ))}
        </div>

        {/* Scroll hint for mobile */}
        <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
          <ChevronLeft className="w-4 h-4" />
          <span>Swipe to see more</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    );
  }

  // Desktop version: sliding carousel
  return (
    <div className="space-y-8">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Related Products
            </h2>
          </div>
          <p className="text-zinc-400 ml-5">
            Discover more products you might like
          </p>
        </div>

        {/* Navigation Arrows */}
        {totalItems > visibleCount && (
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevious}
              disabled={isTransitioning}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 hover:border-emerald-500/50 disabled:opacity-50 transition-all duration-200"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 hover:border-emerald-500/50 disabled:opacity-50 transition-all duration-200"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Products Sliding Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {relatedProducts.map((product, index) => (
            <div
              key={product._id || index}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <ProductClient product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      {totalItems > visibleCount && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              disabled={isTransitioning}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-emerald-500"
                  : "w-2 bg-zinc-700 hover:bg-zinc-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
