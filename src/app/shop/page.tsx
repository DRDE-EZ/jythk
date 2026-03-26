import PaginationBar from "@/components/PaginationBar";
import { Skeleton } from "@/components/ui/skeleton";
import { getWixServerClient } from "@/lib/wix-client-server";
import { ProductsSort, queryProducts } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductClient from "@/components/ProductClient";
import AnimatedSection from "@/components/AnimatedSection";
import { ShopResultsHeader, ShopEmptyState, ShopErrorState } from "./ShopText";

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

    return (
      <div className="space-y-8 group-has-[[data-pending]]:animate-pulse">
        {/* Results Header */}
        <AnimatedSection>
          <ShopResultsHeader q={q} totalCount={products.totalCount} />
        </AnimatedSection>

        {/* Products Grid */}
        {products.items.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {products.items.map((product: any, index: number) => (
                <AnimatedSection key={product._id} delay={0.05 * (index % 6)}>
                  <ProductClient product={product} />
                </AnimatedSection>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {(products.totalPages || 1) > 1 && (
              <AnimatedSection delay={0.3}>
                <div className="flex justify-center pt-8">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <PaginationBar
                      currentPage={page}
                      totalPages={products.totalPages || 1}
                    />
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        ) : (
          <AnimatedSection>
            <ShopEmptyState q={q} />
          </AnimatedSection>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading products:", error);
    return <ShopErrorState />;
  }
}

function ProductResultsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Skeleton className="h-12 w-64 mx-auto bg-zinc-800" />
        <Skeleton className="h-8 w-48 mx-auto bg-zinc-800" />
      </div>

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

      <div className="flex justify-center pt-8">
        <Skeleton className="h-12 w-64 rounded-xl bg-zinc-800" />
      </div>
    </div>
  );
}
