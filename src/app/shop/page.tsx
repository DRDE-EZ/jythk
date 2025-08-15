import PaginationBar from "@/components/PaginationBar";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { getWixServerClient } from "@/lib/wix-client-server";
import { ProductsSort, queryProducts } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  searchParams: {
    q?: string;
    page?: string;
    collection?: string[];
    price_min?: string;
    price_max?: string;
    sort?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: q ? `Results for ${q}` : "Products",
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
  const title = q ? `Results for ${q}` : "Products";

  return (
    <div className="space-y-8 max-w-[85%] mx-auto">
      <h1 className="text-center text-3xl md:text-4xl font-bold">{title}</h1>
      <Suspense fallback={ProductResultsSkeleton()} key={`${q}-${page}`}>
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
    <div className="space-y-10 group-has-[[data-pending]]:animate-pulse">
      <p className="text-center text-xl">
        {products.totalCount}{" "}
        {products.totalCount === 1 ? "product" : "products"} found
      </p>
      <div className="flex flex-col sm:grid grid-cols-2 gap-10 xl:grid-cols-3 2xl:grid-cols-4">
        {products.items.map((i) => (
          <Product key={i._id} product={i} />
        ))}
      </div>
      <PaginationBar currentPage={page} totalPages={products.totalPages || 1} />
    </div>
  );
}

function ProductResultsSkeleton() {
  return (
    <>
      <p className="text-center text-xl">... products found</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-[22rem] w-full rounded-xs" />
        ))}
      </div>
    </>
  );
}
