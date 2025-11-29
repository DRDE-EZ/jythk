import RandomizedCategories from "@/components/RandomizedCategories";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SectionTitle from "@/components/SectionTitle";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { getWixServerClient } from "@/lib/wix-client-server";
import ProductClient from "@/components/ProductClient";

export default async function Home() {
  return (
    <div className="max-w-full mx-auto space-y-0 pb-10">
      {/* Enhanced Hero Section */}
      <div className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center bg-gradient-to-b from-black/20 via-black/40 to-black/60 text-center gap-3 px-4">
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <AnimatedSection>
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 md:mb-8 leading-tight">
                JYT HK
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 md:w-40 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white/90 mb-8 md:mb-10 max-w-3xl leading-relaxed">
              Your Overseas Supplier for Solar Solutions & Custom Projects
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/95 text-primary-foreground px-10 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm min-w-[160px]"
              >
                <Link href="/shop">
                  <span className="relative z-10">Shop Now</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-transparent border-2 border-white text-white hover:text-black px-10 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm min-w-[160px]"
              >
                <Link href="/about">
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Stats Section */}
      <AnimatedSection delay={0.2}>
        <div className="bg-muted/30 py-12 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              {[
                { number: "500+", label: "Projects Delivered" },
                { number: "30+", label: "Countries Served" },
                { number: "99%", label: "Client Satisfaction" },
                { number: "10+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label} className="group cursor-pointer">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-base sm:text-lg md:text-xl text-muted-foreground font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Projects Section */}
      <AnimatedSection delay={0.4}>
        <div className="bg-background py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground">
                Featured Projects
              </h2>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Delivering solar excellence across the globe
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/20 p-8 rounded-2xl border border-blue-800 hover:border-blue-600 transition-all">
                <div className="text-5xl font-bold text-blue-400 mb-4">50MW</div>
                <h3 className="text-2xl font-bold text-white mb-3">Leshan Solar Farm</h3>
                <p className="text-gray-400 mb-4">Large-scale photovoltaic power station serving 15,000+ households in Leshan region.</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span>Leshan, China</span>
                  <span>•</span>
                  <span>2023</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-900/20 to-gray-900/20 p-8 rounded-2xl border border-teal-800 hover:border-teal-600 transition-all">
                <div className="text-5xl font-bold text-teal-400 mb-4">12MW</div>
                <h3 className="text-2xl font-bold text-white mb-3">Industrial Rooftop</h3>
                <p className="text-gray-400 mb-4">Commercial rooftop installation with smart monitoring across 25,000 m² facility.</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span>Suzhou, Jiangsu</span>
                  <span>•</span>
                  <span>2022</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-900/20 to-gray-900/20 p-8 rounded-2xl border border-green-800 hover:border-green-600 transition-all">
                <div className="text-5xl font-bold text-green-400 mb-4">40MW</div>
                <h3 className="text-2xl font-bold text-white mb-3">Floating Solar Plant</h3>
                <p className="text-gray-400 mb-4">Innovative floating PV installation on water reservoir with ecological benefits.</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span>Anhui Province</span>
                  <span>•</span>
                  <span>2021</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-semibold"
              >
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Categories Preview Section */}
      <AnimatedSection delay={0.6}>
        <div className="bg-muted/20 py-12 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
                Explore a Random Category
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover new collections and inspiration for your next project.
              </p>
            </div>
            {/* Server component renders a randomized grid of categories */}
            <RandomizedCategories limit={6} />
          </div>
        </div>
      </AnimatedSection>

      {/* Call to Action Section */}
      <AnimatedSection delay={0.8}>
        <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16 md:py-20">
          <div className="text-center bg-gradient-to-br from-primary/5 to-secondary/10 rounded-3xl p-8 sm:p-10 md:p-12 border border-border">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-black leading-tight">
              Ready to Start Your Dream Project?
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Let our team help you source quality materials and supplies for your construction project within your budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="outline"
                asChild
                size="lg"
                className="px-10 py-4 text-xl font-semibold min-w-[200px] border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <Link href="/contact">Custom Quote Form</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="px-10 py-4 text-xl font-semibold min-w-[200px] border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <Link href="/shop">Browse Products</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="px-10 py-4 text-xl font-semibold min-w-[200px] border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <Link href="/portal">Access Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

async function FeaturedProducts() {
  const wixClient = await getWixServerClient();

  const collection = await getCollectionBySlug(wixClient, "all-products");

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts(wixClient, {
    collectionIds: collection._id,
    itemLimit: 8,
  });

  if (featuredProducts.items.length === 0) {
    return null;
  }

  return (
    <>
      <AnimatedSection delay={0.2}>
        <div className="text-center mb-12 md:mb-16">
          <SectionTitle href="/shop" title="Our Products" />
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mt-6 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated selection of high-performance systems
          </p>
        </div>
        <hr className="border-t-2 mb-10 border-primary/20 max-w-32 mx-auto" />
        <div className="flex flex-col w-[95%] sm:w-[100%] mx-auto gap-5 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.items.map((item: any, index: number) => (
            <AnimatedSection key={item._id} delay={0.1 * index}>
              <ProductClient product={item} />
            </AnimatedSection>
          ))}
        </div>
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
