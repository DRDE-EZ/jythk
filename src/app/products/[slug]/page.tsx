import { getProductBySlug } from "@/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { Metadata } from "next";
import { stripHtml } from "@/lib/utils";
import "react-medium-image-zoom/dist/styles.css";
import { getWixServerClient } from "@/lib/wix-client-server";

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
    </main>
  );
}
