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
import ProductClient from "@/components/ProductClient";

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
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-md" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

// Loading skeleton for ProductReviews
function ProductReviewsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/3" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 border rounded-lg space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
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
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12 md:space-y-16">
        {/* Product Details Section - Clean, no background */}
        <div className="py-4 md:py-6">
          <ProductDetails product={product} />
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center">
          <div className="flex-1 border-t border-border"></div>
          <div className="px-4">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* Related Products Section */}
        <div className="space-y-6">
          <Suspense fallback={<RelatedProductsLoadingSkeleton />}>
            <RelatedProducts productId={product._id} />
          </Suspense>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center">
          <div className="flex-1 border-t border-border"></div>
          <div className="px-4">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
          </div>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* Reviews Section */}
        <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
                Buyer Reviews
              </h2>
            </div>
            <Suspense fallback={<ProductReviewsLoadingSkeleton />}>
              <ProductReviewsSection product={product} />
            </Suspense>
          </div>
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

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Related Products
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        <p className="text-muted-foreground text-lg">
          Discover more premium systems you might like
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {relatedProducts.map((product: products.Product, index: number) => (
          <div
            key={product._id}
            className="group transform transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 hover:shadow-xl hover:shadow-primary/10"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <ProductClient product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedProductsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-1 w-24 mx-auto" />
        <Skeleton className="h-6 w-80 mx-auto" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[280px] w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full" />
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
      <div className="p-4 bg-muted/30 border border-border rounded-lg">
        <CreateProductReviewButton
          product={product}
          loggedInMember={loggedInMember}
          hasExistingReview={!!existingReview}
        />
      </div>

      <div className="space-y-4">
        <ProductReviews product={product} />
      </div>
    </div>
  );
}
