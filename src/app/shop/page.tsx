import PaginationBar from "@/components/PaginationBar";
import { Skeleton } from "@/components/ui/skeleton";
import { getWixServerClient } from "@/lib/wix-client-server";
import { ProductsSort, queryProducts } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductClient from "@/components/ProductClient";
import { SearchField } from "@/components/SearchButton";
import Link from "next/link";
import ReloadButton from "@/components/ReloadButton";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    collection?: string[];
    price_min?: string;
    price_max?: string;
    sort?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: q ? `Results for "${q}"` : "Shop | JYT HK",
    description: q
      ? `Search results for "${q}" - Find quality solar products`
      : "Browse our complete collection of solar products, components, and accessories",
  };
}

export default async function Page({ searchParams }: PageProps) {
  const {
    q,
    page = "1",
    collection: collectionIds,
    price_max,
    price_min,
    sort,
  } = await searchParams;

  return (
    <div className="space-y-8">
      <Suspense fallback={<ProductResultsSkeleton />} key={`${q}-${page}`}>
        <ProductResults
          q={q}
          page={parseInt(page)}
          collectionIds={collectionIds}
          price_min={price_min}
          price_max={price_max}
          sort={sort as ProductsSort}
        />
      </Suspense>
    </div>
  );
}

interface ProductResultsProps {
  q?: string;
  page: number;
  collectionIds?: string[];
  price_min?: string;
  price_max?: string;
  sort?: ProductsSort;
}

async function ProductResults({
  q,
  page,
  collectionIds,
  price_max,
  price_min,
  sort,
}: ProductResultsProps) {
  const pageSize = 8;

  try {
    const products = await queryProducts(await getWixServerClient(), {
      q,
      itemLimit: pageSize,
      skip: (page - 1) * pageSize,
      collectionIds,
      price_min,
      price_max,
      sort,
    });

    if (page > (products.totalPages || 1)) notFound();

    const title = q ? `Results for "${q}"` : "All Products";

    return (
      <div className="space-y-8 group-has-[[data-pending]]:animate-pulse">
        {/* Search Bar
        <div className="max-w-2xl mx-auto">
          <SearchField className="w-full" />
        </div> */}

        {/* Results Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {title}
          </h1>

          {/* Results Count */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <p className="text-sm sm:text-base font-medium text-zinc-400">
                <span className="font-bold text-white">
                  {products.totalCount}
                </span>{" "}
                {products.totalCount === 1 ? "product" : "products"} found
              </p>
            </div>
          </div>

          {q && (
            <p className="text-zinc-400 text-sm sm:text-base">
              Showing search results for{" "}
              <span className="font-semibold text-emerald-400">
                &quot;{q}&quot;
              </span>
            </p>
          )}
        </div>

        {/* Products Grid */}
        {products.items.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {products.items.map((product: any) => (
                <div key={product._id}>
                  <ProductClient product={product} />
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            <div className="flex justify-center pt-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <PaginationBar
                  currentPage={page}
                  totalPages={products.totalPages || 1}
                />
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16 space-y-6">
            <div className="w-24 h-24 mx-auto bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                No products found
              </h3>
              <p className="text-zinc-400 max-w-md mx-auto">
                {q
                  ? `We couldn't find any products matching "${q}". Try adjusting your search or filters.`
                  : "No products match your current filters. Try adjusting your selection."}
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-zinc-700 hover:border-emerald-500 text-white hover:text-emerald-400 rounded-lg font-medium transition-all duration-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset Filters
            </Link>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading products:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-8 text-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-red-400">
            Unable to Load Products
          </h3>
          <p className="text-zinc-400 max-w-md mx-auto">
            We&apos;re having trouble connecting to the product catalog. Please
            try again later.
          </p>
        </div>
        <ReloadButton className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black rounded-lg font-medium transition-colors">
          Try Again
        </ReloadButton>
      </div>
    );
  }
}

function ProductResultsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <Skeleton className="h-12 w-64 mx-auto bg-zinc-800" />
        <Skeleton className="h-8 w-48 mx-auto bg-zinc-800" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[280px] w-full rounded-xl bg-zinc-800" />
            <Skeleton className="h-6 w-3/4 bg-zinc-800" />
            <Skeleton className="h-4 w-1/2 bg-zinc-800" />
            <Skeleton className="h-8 w-full bg-zinc-800" />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center pt-8">
        <Skeleton className="h-12 w-64 rounded-xl bg-zinc-800" />
      </div>
    </div>
  );
}
