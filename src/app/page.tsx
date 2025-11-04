import RandomizedCategories from "@/components/RandomizedCategories";
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
                Formex Construction & Wholesale
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 md:w-40 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white/90 mb-8 md:mb-10 max-w-3xl leading-relaxed">
              Trusted imports. On-time supply for tomorrow’s builds.
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
              Why Choose Us?
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

      {/* Customer Dashboard Section */}
      <AnimatedSection delay={0.7}>
        <div className="bg-gradient-to-br from-blue-50 to-green-50 py-12 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">
                Manage Your Orders & Account
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Track orders, view purchase history, and manage your account all in one place.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-3 mb-12">
              {[
                {
                  icon: "📦",
                  title: "Order Tracking",
                  description: "Real-time updates on your order status and delivery timeline."
                },
                {
                  icon: "📊",
                  title: "Purchase History",
                  description: "Complete history of all your transactions and orders."
                },
                {
                  icon: "🔔",
                  title: "Smart Notifications",
                  description: "Get notified about order updates, delivery status, and special offers."
                }
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="text-4xl sm:text-5xl mb-4 text-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-center text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center bg-white rounded-2xl p-8 sm:p-10 shadow-lg">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
                Get Started Today
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Choose how you'd like to access your customer dashboard
              </p>
              
              <div className="flex flex-col gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 min-w-[200px]"
                >
                  <Link href="/customer-dashboard-demo">
                    <span className="relative z-10">🎯 Try Demo</span>
                    <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                  </Link>
                </Button>
                
                <div className="flex flex-col gap-3 items-center">
                  <Button
                    asChild
                    size="lg"
                    className="group relative overflow-hidden bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 min-w-[200px]"
                  >
                    <Link href="/customer-dashboard-protected">
                      <span className="relative z-10">🔐 Sign In / Register</span>
                      <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                    </Link>
                  </Button>
                  
                  <Button
                    asChild
                    size="lg"
                    className="group relative overflow-hidden bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 min-w-[200px]"
                  >
                    <Link href="/customer-dashboard-protected">
                      <span className="relative z-10">📊 My Dashboard</span>
                      <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <p>Demo: Explore features with sample data</p>
                <p>Sign In: Access your real account with Google or email</p>
              </div>
            </div>
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
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 px-10 py-4 text-xl font-semibold min-w-[200px]"
              >
                <Link href="/customer-dashboard-demo">My Dashboard</Link>
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
