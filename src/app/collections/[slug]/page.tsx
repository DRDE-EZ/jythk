import AnimatedSection from "@/components/AnimatedSection";
import PaginationBar from "@/components/PaginationBar";
import ProductClient from "@/components/ProductClient";
import { Skeleton } from "@/components/ui/skeleton";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronDown, Cpu, Zap, Award } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
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

  const banner = collection.media?.mainMedia?.image;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Full-Width Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        {/* Background Image */}
        {banner?.url ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{ backgroundImage: `url(${banner.url})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950" />
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl" />

        {/* Content - Right Aligned */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex flex-col justify-end pb-12 md:pb-16 lg:pb-20">
            <AnimatedSection>
              <div className="max-w-2xl">
                {/* Collection Label */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                    Collection
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
                  {collection.name}
                </h1>

                {/* Accent Line */}
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mb-6" />

                {/* Description */}
                {collection.description && (
                  <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-xl">
                    {collection.description}
                  </p>
                )}

                {/* Quick Stats */}
                <div className="flex items-center gap-6 mt-8">
                  <Suspense fallback={<Skeleton className="h-10 w-24 bg-zinc-800" />}>
                    <ProductCountBadge collectionId={collection._id!} />
                  </Suspense>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll Indicator */}
        <AnimatedSection delay={0.6}>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
            <span className="text-xs text-zinc-500 uppercase tracking-widest">Explore</span>
            <ChevronDown className="w-5 h-5 text-zinc-500 animate-bounce" />
          </div>
        </AnimatedSection>
      </div>

      {/* Products Section */}
      <div className="relative z-20">
        {/* Section Header */}
        <AnimatedSection delay={0.2}>
          <div className="border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      Browse Collection
                    </h2>
                  </div>
                  <p className="text-zinc-400 md:ml-5">
                    Handpicked systems designed to deliver exceptional performance
                  </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700 rounded-full">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-zinc-300">Premium Components</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700 rounded-full">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-zinc-300">High Performance</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700 rounded-full">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-zinc-300">Quality Assured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Suspense fallback={<LoadingSkeleton />} key={page}>
            <Products collectionId={collection._id!} page={parseInt(page)} />
          </Suspense>
        </div>
      </div>
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

  const totalPages = collectionProducts.totalPages || 1;

  return (
    <AnimatedSection delay={0.4}>
      <div className="space-y-12">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collectionProducts.items.map((product: any, index: number) => (
            <AnimatedSection
              key={product._id}
              delay={0.05 * (index % 4)}
            >
              <ProductClient product={product} />
            </AnimatedSection>
          ))}
        </div>

        {/* Pagination - Only show if more than 1 page */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <PaginationBar
                currentPage={page}
                totalPages={totalPages}
              />
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

// Badge component showing product count
async function ProductCountBadge({ collectionId }: { collectionId: string }) {
  const products = await queryProducts(await getWixServerClient(), {
    collectionIds: collectionId,
    itemLimit: 1,
  });

  const count = products.totalCount || 0;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg">
      <span className="text-2xl font-bold text-emerald-400">{count}</span>
      <span className="text-sm text-zinc-400">
        {count === 1 ? "Product" : "Products"} Available
      </span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-12">
      {/* Loading grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[300px] w-full rounded-xl bg-zinc-800" />
            <Skeleton className="h-6 w-3/4 bg-zinc-800" />
            <Skeleton className="h-4 w-1/2 bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
