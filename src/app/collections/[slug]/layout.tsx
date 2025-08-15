import AnimatedSection from "@/components/AnimatedSection";
import { Skeleton } from "@/components/ui/skeleton";
import WixImage from "@/components/WixImage";
import { cn } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getCollectionBySlug } from "@/wix-api/collections";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <Suspense fallback={LoadingSkeleton()}>
      <CollectionsLayout params={params}>{children}</CollectionsLayout>
    </Suspense>
  );
}

async function CollectionsLayout({ children, params }: LayoutProps) {
  const { slug } = await params;

  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug
  );

  if (!collection) notFound();

  const banner = collection.media?.mainMedia?.image;

  return (
    <main className="mx-auto max-w-[90%] space-y-10 px-5 py-10">
      <div className="flex flex-col gap-10 ">
        {banner && (
          <AnimatedSection>
            <div className="relative hidden sm:block">
              <WixImage
                mediaIdentifier={banner.url}
                width={1280}
                height={400}
                alt={banner.altText}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
              <h1 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-3xl font-bold text-white lg:text-4xl">
                {collection.name}
              </h1>
            </div>
          </AnimatedSection>
        )}
        <AnimatedSection>
          <h1
            className={cn(
              "mx-auto text-2xl font-bold md:text-3xl text-primary",
              banner && "sm:hidden"
            )}
          >
            {collection.name}
          </h1>
        </AnimatedSection>
      </div>
      {children}
    </main>
  );
}

function LoadingSkeleton() {
  return (
    <main className="mx-auto max-w-[90%] space-y-10 px-5 py-10">
      <Skeleton className="mx-auto h-12 w-48 sm:block sm:aspect-[1280/400] sm:h-full sm:w-full rounded-xs" />
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Products</h2>
      </div>
      <div className="flex flex-col sm:grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-[26rem] w-full" />
        ))}
      </div>
    </main>
  );
}
