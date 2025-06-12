import Image from "next/image";
import { products } from "@wix/stores";
import banner from "@/assets/main-page-banner.jpg";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { delay } from "@/lib/utils";
import { Suspense } from "react";
import { getWixClient } from "@/lib/wix-client.base";
import Product from "@/components/Product";

export default async function Home() {
  return (
    <main className="max-w-full mx-auto space-y-10 py-10 ">
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
          <AnimatedSection>
            <h2 className="text-xl md:text-2xl tracking-wide text-white">
              Discover the Future of Computing
            </h2>
            <Button
              variant={"ghost"}
              asChild
              size={"lg"}
              className="text-white border-white border w-[150px] rounded-2xl px-6 py-3 mt-4 hover:bg-gray-200 transition-colors"
            >
              <Link href="/shop">Shop Now</Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
      <div className="w-[95%] mx-auto mt-18">
        <Suspense fallback="Loading featured products...">
          <FeaturedProducts />
        </Suspense>
      </div>
    </main>
  );
}

async function FeaturedProducts() {
  await delay(1000);
  const wixClient = getWixClient();
  const { collection } =
    await wixClient.collections.getCollectionBySlug("all-products");

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await wixClient.products
    .queryProducts()
    .hasSome("collectionIds", [collection._id])
    .descending("lastUpdated")
    .find();

  if (featuredProducts.items.length === 0) {
    return null;
  }
  return (
    <>
      <AnimatedSection>
        <h1 className="text-black text-7xl mb-10 font-medium tracking-tight">
          Our Products
        </h1>
        <hr className="border-t-3 mb-10 border-black" />
        <div className="flex flex-col gap-5 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.items.map((item) => (
            <AnimatedSection key={item._id}>
              <Product product={item} />
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>
    </>
  );
}
