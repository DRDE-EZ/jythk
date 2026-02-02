import { getProductBySlug, getRelatedProducts } from "@/wix-api/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { stripHtml } from "@/lib/utils";
import "react-medium-image-zoom/dist/styles.css";
import { getWixServerClient } from "@/lib/wix-client-server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { products } from "@wix/stores";
import { getLoggedInMember } from "@/wix-api/members";
import CreateProductReviewButton from "@/components/reviews/CreateProductReviewButton";
import { getProductReviews } from "@/wix-api/reviews";
import dynamic from "next/dynamic";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import RelatedProductsCarousel from "./RelatedProductsCarousel";

// Dynamic imports for better performance
const ProductDetails = dynamic(() => import("./ProductDetails"), {
  loading: () => <ProductDetailsLoadingSkeleton />,
});

const ProductReviews = dynamic(() => import("./ProductReviews"), {
  loading: () => <ProductReviewsLoadingSkeleton />,
});

// Loading skeleton for ProductDetails
function ProductDetailsLoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-xl bg-zinc-800" />
        <div className="flex gap-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-20 h-20 rounded-lg bg-zinc-800" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-6 w-24 rounded-full bg-zinc-800" />
        <Skeleton className="h-12 w-3/4 bg-zinc-800" />
        <Skeleton className="h-10 w-1/3 bg-zinc-800" />
        <Skeleton className="h-20 w-full bg-zinc-800" />
        <Skeleton className="h-px w-full bg-zinc-800" />
        <Skeleton className="h-14 w-full bg-zinc-800" />
        <div className="flex gap-3">
          <Skeleton className="h-14 flex-1 bg-zinc-800" />
          <Skeleton className="h-14 flex-1 bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

// Loading skeleton for ProductReviews
function ProductReviewsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full bg-zinc-800" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-zinc-800" />
              <Skeleton className="h-3 w-24 bg-zinc-800" />
            </div>
          </div>
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-3/4 bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
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
    <div className="min-h-screen bg-zinc-950">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-16">
        {/* Breadcrumb + Product Details */}
        <AnimatedSection>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <ProductDetails product={product} />
        </AnimatedSection>

        <div className="space-y-16 md:space-y-24 mt-16 md:mt-24">

        {/* Related Products Section */}
        <AnimatedSection delay={0.2}>
          <Suspense fallback={<RelatedProductsLoadingSkeleton />}>
            <RelatedProducts productId={product._id} />
          </Suspense>
        </AnimatedSection>

        {/* Reviews Section */}
        <AnimatedSection delay={0.3}>
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Customer Reviews
              </h2>
            </div>
            <Suspense fallback={<ProductReviewsLoadingSkeleton />}>
              <ProductReviewsSection product={product} />
            </Suspense>
          </div>
        </AnimatedSection>
        </div>
      </main>
    </div>
  );
}

interface RelatedProductsProps {
  productId: string;
}

async function RelatedProducts({ productId }: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(
    await getWixServerClient(),
    productId
  );

  if (!relatedProducts.length) return null;

  return <RelatedProductsCarousel products={relatedProducts} />;
}

function RelatedProductsLoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 bg-zinc-800" />
        <Skeleton className="h-5 w-80 bg-zinc-800" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[280px] w-full rounded-xl bg-zinc-800" />
            <Skeleton className="h-6 w-3/4 bg-zinc-800" />
            <Skeleton className="h-4 w-1/2 bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface ProductReviewsSectionProps {
  product: products.Product;
}

async function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  if (!product._id) return null;

  try {
    const wixClient = await getWixServerClient();

    const loggedInMember = await getLoggedInMember(wixClient);

    const existingReview = loggedInMember?.contactId
      ? (
          await getProductReviews(wixClient, {
            contactId: loggedInMember.contactId,
            productId: product._id,
          })
        ).items[0]
      : null;

    return (
      <div className="space-y-6">
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
          <CreateProductReviewButton
            product={product}
            loggedInMember={loggedInMember}
            hasExistingReview={!!existingReview}
          />
        </div>

        <ProductReviews product={product} />
      </div>
    );
  } catch (error: any) {
    // Check if the error is due to the Reviews app not being installed
    if (error?.details?.applicationError?.code === "APP_NOT_INSTALLED") {
      return (
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl text-center space-y-3">
          <p className="text-zinc-400">
            Reviews are currently unavailable.
          </p>
          <p className="text-sm text-zinc-500">
            To enable product reviews, install the Wix Reviews app from your Wix Dashboard.
          </p>
        </div>
      );
    }

    // Re-throw other errors
    throw error;
  }
}
