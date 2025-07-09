import AnimatedSection from "@/components/AnimatedSection";
import PaginationBar from "@/components/PaginationBar";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug
  );

  if (!collection) notFound();

  const banner = collection.media?.mainMedia?.image;

  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      images: banner ? [{ url: banner.url! }] : [],
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page = "1" } = await searchParams;
  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug
  );
  if (!collection?._id) notFound();

  return (
    <div className="space-y-5">
      <AnimatedSection>
        <h2 className="text-2xl font-bold mb-2">Products</h2>
        <Suspense fallback={LoadingSkeleton()} key={page}>
          <Products collectionId={collection._id} page={parseInt(page)} />
        </Suspense>
      </AnimatedSection>
    </div>
  );
}

interface ProductsProps {
  collectionId: string;
  page: number;
}

async function Products({ collectionId, page }: ProductsProps) {
  const pageSize = 8;
  const collectionProducts = await queryProducts(await getWixServerClient(), {
    collectionIds: collectionId,
    itemLimit: pageSize,
    skip: (page - 1) * pageSize,
  });

  if (!collectionProducts.length) notFound();

  if (page > (collectionProducts.totalPages || 1)) notFound();

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {collectionProducts.items.map((p) => (
          <Product key={p._id} product={p} />
        ))}
      </div>
      <PaginationBar
        currentPage={page}
        totalPages={collectionProducts.totalPages || 1}
      />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col sm:grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[26rem] w-full rounded-xs" />
      ))}
    </div>
  );
}
