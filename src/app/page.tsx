import Image from "next/image";
import banner from "@/assets/main-page-banner.jpg";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { Suspense } from "react";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import SectionTitle from "@/components/SectionTitle";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";

export default async function Home() {
  return (
    <div className="max-w-full mx-auto space-y-10 pb-10">
      <div className="relative w-full h-[400px] md:h-[600px]">
        <Image
          className="object-cover"
          src={banner}
          alt="PC Banner"
          fill
          priority
        />
        <div className="absolute inset-0 bg-black/35 text-center flex flex-col items-center justify-center gap-3 px-4">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-medium tracking-wide text-white mb-6 md:mb-10">
              Empowering Your Setup
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <h2 className="text-xl md:text-2xl tracking-wide text-white">
              Discover Raw Computing Power
            </h2>
            <Button
              variant={"ghost"}
              asChild
              size={"lg"}
              className="text-white border-white border w-[150px] rounded-xs px-6 py-3 mt-4 hover:bg-gray-200 transition-colors duration-300"
            >
              <Link href="/shop">Shop Now</Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
      <div className="w-[95%] mx-auto mt-18">
        <Suspense fallback={<LoadingSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </div>
    </div>
  );
}

async function FeaturedProducts() {
  const collection = await getCollectionBySlug("all-products");

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts({
    collectionIds: collection._id,
  });

  if (featuredProducts.items.length === 0) {
    return null;
  }
  return (
    <>
      <AnimatedSection delay={0.2}>
        <SectionTitle href="/shop" title="Our Products" />
        <hr className="border-t-3 mb-10 border-black" />
        <div className="flex flex-col gap-5 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.items.map((item) => (
            <AnimatedSection key={item._id}>
              <Product product={item} />
            </AnimatedSection>
          ))}
        </div>
        {/* <pre>{JSON.stringify(featuredProducts, null, 2)}</pre> */}
      </AnimatedSection>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-5 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-12">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}
