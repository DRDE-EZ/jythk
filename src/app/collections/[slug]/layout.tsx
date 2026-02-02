import { Skeleton } from "@/components/ui/skeleton";
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
    <Suspense fallback={<LoadingSkeleton />}>
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

  return <main className="min-h-screen bg-zinc-950">{children}</main>;
}

function LoadingSkeleton() {
  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Hero skeleton */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-end">
          <Skeleton className="h-12 w-64 bg-zinc-800 mb-4" />
          <Skeleton className="h-6 w-96 bg-zinc-800 mb-2" />
          <Skeleton className="h-6 w-80 bg-zinc-800" />
        </div>
      </div>

      {/* Products skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
    </main>
  );
}
