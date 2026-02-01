import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import Link from "next/link";
import { Shield, Globe, Clock, Award, ChevronRight } from "lucide-react";

export default async function Home() {
  return (
    <div className="max-w-full mx-auto space-y-0 pb-10">
      {/* Enhanced Hero Section with Building Background */}
      <div className="relative w-full h-[520px] md:h-[620px] flex items-center justify-center text-center gap-3 px-4 overflow-hidden">
        {/* Full brightness building background image */}
        <div className="absolute inset-0">
          <img
            src="/building-bg.png"
            alt="Jingyuntong Hong Kong Building"
            className="w-full h-full object-cover"
          />
          {/* Subtle dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 border border-zinc-700 rounded-full mb-6">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-zinc-300 text-sm">
                ISO 9001 Certified • 10+ Years in Business
              </span>
            </div>
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 md:mb-8 leading-tight">
                <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
                  Jingyuntong Hong Kong
                </span>
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 md:w-40 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white/90 mb-2 md:mb-3 max-w-3xl leading-relaxed">
              Your Trusted Supplier for Solar Solutions & Custom Projects
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 mb-8 md:mb-10 max-w-2xl mx-auto">
              Quality products, competitive pricing, reliable delivery
              worldwide.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button
                asChild
                size="lg"
                className="group bg-white hover:bg-white/90 border-0 text-black px-8 text-lg font-semibold transition-all duration-300 w-[180px] h-[52px] shadow-lg"
              >
                <Link href="/shop">
                  <span className="flex items-center justify-center gap-2">
                    Shop Now
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="group bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 hover:border-white/50 text-white px-8 text-lg font-semibold transition-all duration-300 w-[180px] h-[52px]"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Stats Section */}
      <AnimatedSection delay={0.2}>
        <div className="bg-zinc-900/50 py-12 sm:py-16 md:py-20 border-y border-zinc-800/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              {[
                { number: "500+", label: "Projects Delivered" },
                { number: "30+", label: "Countries Served" },
                { number: "99%", label: "Client Satisfaction" },
                { number: "10+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label} className="group cursor-pointer">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-base sm:text-lg md:text-xl text-zinc-400 font-semibold">
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
        <div className="bg-background py-16 sm:py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Featured Projects
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Delivering solar excellence across the globe
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  capacity: "50MW",
                  title: "Leshan Solar Farm",
                  description:
                    "Large-scale photovoltaic power station serving 15,000+ households.",
                  location: "Leshan, China",
                  year: "2023",
                },
                {
                  capacity: "12MW",
                  title: "Industrial Rooftop",
                  description:
                    "Commercial rooftop installation with smart monitoring across 25,000 m².",
                  location: "Suzhou, Jiangsu",
                  year: "2022",
                },
                {
                  capacity: "40MW",
                  title: "Floating Solar Plant",
                  description:
                    "Innovative floating PV installation on water reservoir.",
                  location: "Anhui Province",
                  year: "2021",
                },
              ].map((project) => (
                <div
                  key={project.title}
                  className="group relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/30 group-hover:bg-emerald-500 transition-colors duration-300" />

                  <div className="pl-4">
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-3xl sm:text-4xl font-bold text-emerald-400">
                        {project.capacity.replace(/[A-Za-z]+/, "")}
                      </span>
                      <span className="text-sm font-medium text-emerald-400/70">
                        {project.capacity.replace(/[0-9]+/, "")}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-zinc-500 text-xs">
                        <span>{project.location}</span>
                        <span>•</span>
                        <span>{project.year}</span>
                      </div>
                      <span className="flex items-center gap-1 text-emerald-400 text-sm font-medium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        View
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 md:mt-12">
              <Button
                asChild
                size="lg"
                className="group bg-transparent border border-zinc-700 hover:border-emerald-500 text-white hover:text-emerald-400 px-8 py-5 text-lg font-semibold transition-all duration-300"
              >
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Categories Preview Section */}
      <AnimatedSection delay={0.6}>
        <div className="relative bg-zinc-900/50 py-16 sm:py-20 md:py-24 border-y border-zinc-800/50">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-6">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
                Product Range
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground leading-tight">
                Browse Our Categories
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover high-quality solar products and components for your
                projects.
              </p>
            </div>
            <InfiniteCarousel
              items={[
                {
                  name: "Solar Cells",
                  slug: "solar-cells",
                  description:
                    "High-efficiency monocrystalline and polycrystalline cells for panel manufacturing.",
                  count: "15+",
                },
                {
                  name: "Solar Wafers",
                  slug: "solar-wafers",
                  description:
                    "Premium silicon wafers in various sizes for cell production.",
                  count: "8+",
                },
                {
                  name: "Off-Grid Solar Kits",
                  slug: "off-grid-solar-kits",
                  description:
                    "Complete standalone systems for remote locations and backup power.",
                  count: "12+",
                },
                {
                  name: "BESS",
                  slug: "bess",
                  description:
                    "Battery Energy Storage Systems for residential and commercial applications.",
                  count: "6+",
                },
                {
                  name: "Solar Accessories",
                  slug: "solar-accessories",
                  description:
                    "Mounting hardware, cables, connectors, and monitoring equipment.",
                  count: "25+",
                },
                {
                  name: "SCR Catalyst",
                  slug: "scr-catalyst",
                  description:
                    "Selective Catalytic Reduction systems for emission control.",
                  count: "4+",
                },
              ]}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection delay={0.7}>
        <div className="bg-background py-16 sm:py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10 md:mb-12">
              <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
                Our Promise
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Why Choose Us
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Trusted by installers and developers worldwide
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  icon: (
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
                  ),
                  title: "Quality Assured",
                  description:
                    "International standards with full certification.",
                },
                {
                  icon: (
                    <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
                  ),
                  title: "Global Delivery",
                  description: "Shipping to 30+ countries with tracking.",
                },
                {
                  icon: (
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
                  ),
                  title: "On-Time Delivery",
                  description: "99% on-time rate. Your timelines matter.",
                },
                {
                  icon: (
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
                  ),
                  title: "10+ Years",
                  description: "Trusted worldwide since 2014.",
                },
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-3 sm:mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Call to Action Section */}
      <AnimatedSection delay={0.8}>
        <div className="bg-background">
          <div className="max-w-6xl mx-auto px-6 mb-10">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
              {/* Subtle accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
                {/* Left: Content */}
                <div className="flex-1">
                  <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
                    Partner With Us
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    Looking for a{" "}
                    <span className="text-emerald-400">Trusted Supplier</span>?
                  </h2>
                  <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                    Quality products, competitive prices, and reliable delivery.
                    Your overseas partner for solar solutions and custom
                    projects.
                  </p>
                </div>

                {/* Right: Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 lg:flex-col xl:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="group relative overflow-hidden bg-emerald-500 hover:bg-emerald-600 border-0 text-black px-8 py-5 text-lg font-semibold transition-all duration-300 min-w-[180px]"
                  >
                    <Link href="/contact">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Get a Quote
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="group relative overflow-hidden bg-transparent border border-zinc-700 hover:border-emerald-500 text-white hover:text-emerald-400 px-8 py-5 text-lg font-semibold transition-all duration-300 min-w-[180px]"
                  >
                    <Link href="/shop">
                      <span className="relative z-10">Browse Products</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
