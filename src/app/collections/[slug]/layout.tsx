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

  return (
    <main className="mx-auto max-w-[90%] space-y-10 px-5 py-10">
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
