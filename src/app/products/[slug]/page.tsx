import { getProductBySlug, getRelatedProducts } from "@/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { Metadata } from "next";
import { delay, stripHtml } from "@/lib/utils";
import "react-medium-image-zoom/dist/styles.css";
import { getWixServerClient } from "@/lib/wix-client-server";
import { Suspense } from "react";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await getProductBySlug(await getWixServerClient(), slug);

  if (!product?._id) notFound();

  const mainImage = product.media?.mainMedia?.image;

  return {
    title: product.name,
    description: stripHtml(product.description || ""),
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText ?? product.name ?? "",
            },
          ]
        : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const product = await getProductBySlug(await getWixServerClient(), slug);

  if (!product?._id) notFound();

  return (
    <main className="max-w-full mx-auto mt-10 space-y-10 pb-10 lg:pt-3">
      <ProductDetails product={product} />
      <hr />
      <Suspense fallback={RelatedProductsLoadingSkeleton()}>
        <RelatedProducts productId={product._id} />
      </Suspense>
    </main>
  );
}

interface RelatedProductsProps {
  productId: string;
}

async function RelatedProducts({ productId }: RelatedProductsProps) {
  await delay(2000);

  const relatedProducts = await getRelatedProducts(
    await getWixServerClient(),
    productId
  );

  if (!relatedProducts.length) return null;

  return (
    <div className="space-y-5 px-8">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="flex flex-col gap-5 sm:grid grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function RelatedProductsLoadingSkeleton() {
  return (
    <div className="space-y-5 px-8">
      <Skeleton className="w-44 h-[2rem]" />
      <div className="flex flex-col gap-5 sm:grid grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[26rem] w-full" />
        ))}
      </div>
    </div>
  );
}
