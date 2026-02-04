"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CarouselItem {
  name: string;
  slug: string;
  description: string;
  count: string;
}

interface InfiniteCarouselProps {
  items: CarouselItem[];
}

export default function InfiniteCarousel({ items }: InfiniteCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Quintuple the items for seamless infinite scroll
  const extendedItems = [...items, ...items, ...items, ...items, ...items];

  const CARD_WIDTH = 280;
  const GAP = 16;
  const ITEM_WIDTH = CARD_WIDTH + GAP;
  const SINGLE_SET_WIDTH = items.length * ITEM_WIDTH;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !isMobile) return;

    // Start in the middle (third set of items)
    container.scrollLeft = SINGLE_SET_WIDTH * 2;

    let isScrolling = false;
    let scrollEndTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (isScrolling) return;

      clearTimeout(scrollEndTimeout);
      scrollEndTimeout = setTimeout(() => {
        if (!container) return;

        const scrollLeft = container.scrollLeft;

        // If near the end, teleport back
        if (scrollLeft > SINGLE_SET_WIDTH * 3.5) {
          isScrolling = true;
          container.style.scrollBehavior = "auto";
          container.scrollLeft = scrollLeft - SINGLE_SET_WIDTH * 2;
          requestAnimationFrame(() => {
            container.style.scrollBehavior = "";
            isScrolling = false;
          });
        }
        // If near the start, teleport forward
        else if (scrollLeft < SINGLE_SET_WIDTH * 0.5) {
          isScrolling = true;
          container.style.scrollBehavior = "auto";
          container.scrollLeft = scrollLeft + SINGLE_SET_WIDTH * 2;
          requestAnimationFrame(() => {
            container.style.scrollBehavior = "";
            isScrolling = false;
          });
        }
      }, 100);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollEndTimeout);
    };
  }, [isMobile, SINGLE_SET_WIDTH]);

  // Card component
  const CategoryCard = ({
    category,
    showLearnMore = true,
  }: {
    category: CarouselItem;
    showLearnMore?: boolean;
  }) => (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative flex-shrink-0 w-[280px] md:w-auto snap-start bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 transition-all duration-300"
    >
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
        {category.name}
      </h3>
      <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
        {category.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-emerald-400 text-sm font-medium">
          {category.count} products
        </span>
        {!showLearnMore && (
          <ChevronRight className="w-5 h-5 text-emerald-400" />
        )}
      </div>
      {showLearnMore && (
        <span className="absolute bottom-6 right-6 flex items-center gap-1 text-emerald-400 text-sm font-medium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Learn more
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </Link>
  );

  return (
    <>
      {/* Mobile: Infinite scroll carousel */}
      <div className="md:hidden overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto -mx-6 px-6 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {extendedItems.map((category, index) => (
            <CategoryCard
              key={`mobile-${category.slug}-${index}`}
              category={category}
              showLearnMore={false}
            />
          ))}
        </div>
        {/* Swipe indicator */}
        <div className="flex items-center justify-center gap-2 mt-4 text-zinc-500 text-xs">
          <span>← Swipe to explore →</span>
        </div>
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((category) => (
          <CategoryCard
            key={`desktop-${category.slug}`}
            category={category}
            showLearnMore={true}
          />
        ))}
      </div>
    </>
  );
}
