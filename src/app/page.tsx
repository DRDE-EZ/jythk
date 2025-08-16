import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { Suspense } from "react";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import SectionTitle from "@/components/SectionTitle";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { getWixServerClient } from "@/lib/wix-client-server";

export default async function Home() {
  return (
    <div className="max-w-full mx-auto space-y-0 pb-10">
      {/* Enhanced Hero Section */}
      <div className="relative w-full h-[600px] md:h-[760px] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full"
          src="/banner_video.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            objectFit: "cover",
            objectPosition: "center center",
            width: "100%",
            height: "100%",
            minWidth: "100%",
            minHeight: "100%",
          }}
        />

        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 flex flex-col items-center justify-center text-center gap-3 px-4">
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-1000"></div>
          </div>

          <AnimatedSection>
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 md:mb-8 leading-tight">
                Empowering Your Setup
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 md:w-40 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white/90 mb-8 md:mb-10 max-w-3xl leading-relaxed">
              Discover Raw Computing Power
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary text-primary-foreground px-10 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 min-w-[160px]"
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

          {/* Scroll indicator */}
          <AnimatedSection delay={1.2}>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center animate-pulse">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
              </div>
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
                { number: "500+", label: "Custom Builds" },
                { number: "24/7", label: "Support" },
                { number: "98%", label: "Satisfaction" },
                { number: "5★", label: "Reviews" },
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

      {/* Why Choose Us Section */}
      <AnimatedSection delay={0.4}>
        <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16 md:py-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
              Why Choose MycroPc?
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {[
              {
                icon: "🚀",
                title: "Performance First",
                description:
                  "Every component carefully selected for maximum performance and reliability.",
              },
              {
                icon: "🛠️",
                title: "Custom Built",
                description:
                  "Tailored to your exact needs, from gaming rigs to workstations.",
              },
              {
                icon: "🏆",
                title: "Quality Assured",
                description:
                  "Rigorous testing and premium warranties on every system we build.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-6 sm:p-8 md:p-10 rounded-3xl bg-card border border-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-3 cursor-pointer"
              >
                <div className="text-5xl sm:text-6xl md:text-7xl mb-6 transition-all duration-300 select-none touch-manipulation">
                  {feature.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-card-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Products Section */}
      <div className="bg-background">
        <div className="w-[95%] mx-auto py-12 sm:py-16 md:py-20">
          <Suspense fallback={<LoadingSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </div>

      {/* Categories Preview Section */}
      <AnimatedSection delay={0.6}>
        <div className="bg-muted/20 py-12 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
                Explore Our Categories
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From gaming beasts to professional workstations, find the
                perfect build for your needs.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
              {[
                {
                  title: "Gaming PCs",
                  description: "Ultimate gaming performance",
                  gradient: "from-red-500 to-orange-500",
                  href: "/shop?category=gaming",
                },
                {
                  title: "Workstations",
                  description: "Professional computing power",
                  gradient: "from-blue-500 to-purple-500",
                  href: "/shop?category=workstation",
                },
                {
                  title: "Custom",
                  description: "Tailored to your vision",
                  gradient: "from-green-500 to-teal-500",
                  href: "/shop?category=custom",
                },
              ].map((category) => (
                <Link key={category.title} href={category.href}>
                  <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transform hover:scale-105 transition-all duration-500">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}
                    ></div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 text-white">
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
                        {category.title}
                      </h3>
                      <p className="text-lg sm:text-xl text-white/90 mb-6 group-hover:text-white transition-colors">
                        {category.description}
                      </p>
                      <div className="w-16 h-16 rounded-full border-2 border-white/60 flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all duration-300">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Call to Action Section */}
      <AnimatedSection delay={0.8}>
        <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16 md:py-20">
          <div className="text-center bg-gradient-to-br from-primary/5 to-secondary/10 rounded-3xl p-8 sm:p-10 md:p-12 border border-border">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
              Ready to Build Your Dream PC?
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Let our experts help you create the perfect system for your needs
              and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="px-10 py-4 text-xl font-semibold min-w-[200px]"
              >
                <Link href="/contact">Get Custom Quote</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="px-10 py-4 text-xl font-semibold min-w-[200px]"
              >
                <Link href="/shop">Browse Products</Link>
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
          {featuredProducts.items.map((item, index) => (
            <AnimatedSection key={item._id} delay={0.1 * index}>
              <Product product={item} />
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
