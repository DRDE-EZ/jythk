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
                { number: "500+", label: "Dream Projects" },
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

      {/* Customer Dashboard Section */}
      <AnimatedSection delay={0.4}>
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 py-16 sm:py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
                Project Management Portal
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Streamline your construction supply chain with our comprehensive order management system.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 mb-16">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  ),
                  title: "Order Management",
                  description: "Track deliveries, manage invoices, and monitor project timelines in real-time."
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: "Purchase Analytics",
                  description: "Detailed reporting on spending patterns, supplier performance, and cost optimization."
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM13 3a9 9 0 100 18h9a9 9 0 11-9-18z" />
                    </svg>
                  ),
                  title: "Supply Alerts",
                  description: "Automated notifications for delivery updates, stock availability, and price changes."
                }
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group bg-white p-8 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-lg mb-6 text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm">
              <div className="text-center mb-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-800">
                  Access Your Portal
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Choose the appropriate dashboard for your role and access level
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
                {/* Customer Dashboard */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Customer Portal</h4>
                  <p className="text-sm text-slate-600 mb-6">Track your orders, view purchase history, and manage account settings</p>
                  
                  <div className="space-y-3">
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full border-slate-300 hover:bg-slate-100 text-slate-700"
                    >
                      <Link href="/customer-dashboard-demo">
                        Try Demo Version
                      </Link>
                    </Button>
                    
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white"
                    >
                      <Link href="/customer-dashboard-protected">
                        Customer Sign In
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-xs text-slate-500">
                    <p>• Google OAuth authentication</p>
                    <p>• Automatic redirect for admin users</p>
                  </div>
                </div>

                {/* Admin Dashboard */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-3">Admin Portal</h4>
                  <p className="text-sm text-slate-200 mb-6">Manage inventory, oversee orders, and access administrative functions</p>
                  
                  <div className="space-y-3">
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full border-white/30 bg-white/10 hover:bg-white/20 text-white"
                    >
                      <Link href="/admin-dashboard-demo">
                        Admin Demo
                      </Link>
                    </Button>
                    
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-white text-slate-800 hover:bg-slate-100"
                    >
                      <Link href="/admin-dashboard">
                        Admin Access
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-xs text-slate-300">
                    <p>• Restricted to authorized emails</p>
                    <p>• Full system management access</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center text-sm text-slate-500">
                <p>Demo accounts include sample data for testing • Secure authentication via Google OAuth</p>
              </div>
            </div>
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
                asChild
                size="lg"
                className="px-10 py-4 text-xl font-semibold min-w-[200px]"
              >
                <Link href="/contact">Start Dream Project</Link>
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
