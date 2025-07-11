import PaginationBar from "@/components/PaginationBar";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { delay } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client-server";
import { queryProducts } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  searchParams: {
    q?: string;
    page?: string;
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
  const { q, page = "1" } = await searchParams;
  const title = q ? `Results for ${q}` : "Products";

  return (
    <main className="flex flex-col justify-center items-center gap-10 px-5 py-10 lg:flex-row lg:items-start">
      <div className="px-5">filter sidebar</div>
      <div className="w-full space-y-5">
        <div className="flex justify-center lg:justify-end px-5">
          sort filter
        </div>
        <div className="space-y-8 max-w-[85%] mx-auto">
          <h1 className="text-center text-3xl md:text-4xl font-bold">
            {title}
          </h1>
          <Suspense fallback={ProductResultsSkeleton()} key={`${q}-${page}`}>
            <ProductResults q={q} page={parseInt(page)} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

interface ProductResultsProps {
  q?: string;
  page: number;
}

async function ProductResults({ q, page }: ProductResultsProps) {
  await delay(2000);

  const pageSize = 8;

  const products = await queryProducts(await getWixServerClient(), {
    q,
    itemLimit: pageSize,
    skip: (page - 1) * pageSize,
  });

  if (page > (products.totalPages || 1)) notFound();

  return (
    <div className="space-y-10">
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
