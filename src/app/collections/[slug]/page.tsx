import AnimatedSection from "@/components/AnimatedSection";
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

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug
  );
  if (!collection?._id) notFound();

  return (
    <div className="space-y-5">
      <AnimatedSection>
        <h2 className="text-2xl font-bold mb-2">Products</h2>
        <Suspense fallback={LoadingSkeleton()}>
          <Products collectionId={collection._id} />
        </Suspense>
      </AnimatedSection>
    </div>
  );
}

interface ProductsProps {
  collectionId: string;
}

async function Products({ collectionId }: ProductsProps) {
  const collectionProducts = await queryProducts(await getWixServerClient(), {
    collectionIds: collectionId,
  });

  if (!collectionProducts.length) notFound();

  return (
    <div className="flex flex-col sm:grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {collectionProducts.items.map((p) => (
        <Product key={p._id} product={p} />
      ))}
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
