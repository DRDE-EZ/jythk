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
    <div className="min-h-screen bg-background">
      {/* Hero Banner Section - ONLY ONE */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {/* Background Image/Gradient */}
        {banner?.url ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${banner.url})` }}
            />
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        )}

        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 md:w-48 h-32 md:h-48 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 md:w-36 h-24 md:h-36 bg-secondary/15 rotate-45 blur-xl animate-bounce"></div>
          <div className="absolute top-2/3 left-1/2 w-20 md:w-28 h-20 md:h-28 bg-accent/20 rounded-lg blur-lg animate-pulse delay-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                {collection.name}
              </h1>
              <div className="w-32 md:w-40 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
              {collection.description && (
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                  {collection.description}
                </p>
              )}
            </div>
          </AnimatedSection>

          {/* Scroll Indicator */}
          <AnimatedSection delay={0.8}>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center animate-pulse">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Products Section */}
      <div className="relative z-20 bg-background">
        {/* Stats/Info Bar */}
        <AnimatedSection delay={0.2}>
          <div className="bg-muted/30 py-8 sm:py-12 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                    Products
                  </h2>
                  <p className="text-lg sm:text-xl text-muted-foreground">
                    Premium systems crafted for excellence
                  </p>
                </div>

                {/* Collection Stats */}
                <div className="flex gap-6 sm:gap-8 text-center">
                  <div className="group cursor-pointer">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                      <Suspense fallback="...">
                        <ProductCount collectionId={collection._id!} />
                      </Suspense>
                    </div>
                    <div className="text-sm sm:text-base text-muted-foreground font-medium">
                      Products
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-500 group-hover:scale-110 transition-transform duration-300">
                      ★★★★★
                    </div>
                    <div className="text-sm sm:text-base text-muted-foreground font-medium">
                      Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Products Grid */}
        <div className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Suspense fallback={<LoadingSkeleton />} key={page}>
              <Products collectionId={collection._id!} page={parseInt(page)} />
            </Suspense>
          </div>
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

  return (
    <AnimatedSection delay={0.6}>
      <div className="space-y-12">
        {/* Products Grid with Enhanced Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {collectionProducts.items.map((product: any, index: number) => (
            <AnimatedSection
              key={product._id}
              delay={0.1 * (index % 4)} // Stagger animation by row
            >
              <div className="group transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                <ProductClient product={product} />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <AnimatedSection delay={0.8}>
          <div className="flex justify-center pt-8">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-lg">
              <PaginationBar
                currentPage={page}
                totalPages={collectionProducts.totalPages || 1}
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
}

// Component to show product count
async function ProductCount({ collectionId }: { collectionId: string }) {
  const products = await queryProducts(await getWixServerClient(), {
    collectionIds: collectionId,
    itemLimit: 1, // Just get count
  });

  return <span>{products.totalCount || 0}</span>;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-12">
      {/* Loading header */}
      <div className="text-center space-y-4">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>

      {/* Loading grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[300px] w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>

      {/* Loading pagination */}
      <div className="flex justify-center">
        <Skeleton className="h-12 w-64 rounded-2xl" />
      </div>
    </div>
  );
}
