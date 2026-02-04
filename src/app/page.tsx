import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import Link from "next/link";
import {
  Shield,
  Globe,
  Clock,
  Award,
  ChevronRight,
  ArrowRight,
  Zap,
  Sun,
} from "lucide-react";

export default async function Home() {
  return (
    <div className="max-w-full mx-auto space-y-0 pb-0">
      {/* ═══════ HERO ═══════ */}
      <div className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[80vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/building-bg.png"
            alt="Jingyuntong Hong Kong Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/70 to-zinc-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/30" />
        </div>

        {/* Decorative blurs */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-600/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-zinc-800/60 backdrop-blur-sm border border-zinc-700/50 rounded-full mb-8">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-zinc-300 text-sm font-medium">
                  ISO 9001 Certified &middot; 10+ Years in Business
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-8 tracking-tight">
                <span className="text-white">Jingyuntong</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-500 bg-clip-text text-transparent">
                  Hong Kong
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-xl sm:text-2xl text-zinc-300 mb-4 max-w-xl leading-relaxed font-light">
                Your trusted supplier for solar solutions & custom projects.
              </p>
              <p className="text-base text-zinc-500 mb-10 max-w-lg">
                Quality products, competitive pricing, reliable delivery to 30+
                countries worldwide.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.45}>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button
                  asChild
                  size="lg"
                  className="group bg-emerald-500 hover:bg-emerald-600 border-0 text-black px-8 h-14 text-base font-semibold transition-all duration-300 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                >
                  <Link href="/shop">
                    <span className="flex items-center gap-2.5">
                      Shop Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="group bg-white/5 backdrop-blur-sm border border-zinc-600 hover:border-zinc-500 hover:bg-white/10 text-white px-8 h-14 text-base font-semibold transition-all duration-300 rounded-xl"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      </div>

      {/* ═══════ STATS ═══════ */}
      <AnimatedSection delay={0.2}>
        <div className="bg-zinc-950 py-16 sm:py-20 border-b border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { number: "500+", label: "Projects Delivered" },
                { number: "30+", label: "Countries Served" },
                { number: "99%", label: "Client Satisfaction" },
                { number: "10+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label} className="group relative">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-zinc-500 font-medium">
                    {stat.label}
                  </div>
                  <div className="absolute -bottom-4 left-0 w-12 h-0.5 bg-emerald-500/30 group-hover:w-full group-hover:bg-emerald-500/60 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ FEATURED PROJECTS ═══════ */}
      <AnimatedSection delay={0.2}>
        <div className="bg-zinc-950 py-20 sm:py-24 md:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Sun className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">
                    Our Work
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  Featured Projects
                </h2>
              </div>
              <Button
                asChild
                className="group bg-transparent border border-zinc-700 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 px-6 h-11 text-sm font-medium transition-all duration-300 rounded-xl w-fit"
              >
                <Link href="/projects">
                  <span className="flex items-center gap-2">
                    View All
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  capacity: "50MW",
                  title: "Leshan Solar Farm",
                  description:
                    "Large-scale photovoltaic power station serving 15,000+ households across the region.",
                  location: "Leshan, China",
                  year: "2023",
                  tag: "Utility Scale",
                },
                {
                  capacity: "12MW",
                  title: "Industrial Rooftop",
                  description:
                    "Commercial rooftop installation with smart monitoring across 25,000 m\u00B2 of panels.",
                  location: "Suzhou, Jiangsu",
                  year: "2022",
                  tag: "Commercial",
                },
                {
                  capacity: "40MW",
                  title: "Floating Solar Plant",
                  description:
                    "Innovative floating PV installation on water reservoir, maximising unused surface area.",
                  location: "Anhui Province",
                  year: "2021",
                  tag: "Innovation",
                },
              ].map((project) => (
                <div
                  key={project.title}
                  className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-7 hover:border-emerald-500/40 transition-all duration-300 overflow-hidden"
                >
                  {/* Top tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400/70 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                      {project.tag}
                    </span>
                    <span className="text-xs text-zinc-600">{project.year}</span>
                  </div>

                  {/* Capacity */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {project.capacity.replace(/[A-Za-z]+/, "")}
                    </span>
                    <span className="text-lg font-medium text-zinc-500">
                      {project.capacity.replace(/[0-9]+/, "")}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-zinc-800">
                    <span className="text-xs text-zinc-500">
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 text-sm font-medium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Details
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ CATEGORIES ═══════ */}
      <AnimatedSection delay={0.2}>
        <div className="relative bg-zinc-900/30 py-20 sm:py-24 md:py-28 border-y border-zinc-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">
                    Product Range
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  Browse Our Categories
                </h2>
                <p className="text-zinc-400 text-lg mt-3 max-w-lg">
                  High-quality solar products and components for projects of
                  every scale.
                </p>
              </div>
              <Button
                asChild
                className="group bg-transparent border border-zinc-700 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 px-6 h-11 text-sm font-medium transition-all duration-300 rounded-xl w-fit"
              >
                <Link href="/shop">
                  <span className="flex items-center gap-2">
                    All Products
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </Button>
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

      {/* ═══════ WHY CHOOSE US ═══════ */}
      <AnimatedSection delay={0.2}>
        <div className="bg-zinc-950 py-20 sm:py-24 md:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center mb-14 md:mb-16">
              <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">
                Our Promise
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
                Why Choose Us
              </h2>
              <p className="text-lg text-zinc-400 max-w-xl mx-auto">
                Trusted by installers and developers worldwide
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {[
                {
                  icon: Shield,
                  title: "Quality Assured",
                  description:
                    "International standards with full certification on every product.",
                },
                {
                  icon: Globe,
                  title: "Global Delivery",
                  description:
                    "Shipping to 30+ countries with real-time tracking.",
                },
                {
                  icon: Clock,
                  title: "On-Time Delivery",
                  description:
                    "99% on-time rate. Your timelines matter to us.",
                },
                {
                  icon: Award,
                  title: "10+ Years",
                  description: "Trusted worldwide since 2014.",
                },
              ].map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-emerald-500/30 transition-all duration-300 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-5 group-hover:bg-emerald-500/15 group-hover:border-emerald-500/30 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ CTA ═══════ */}
      <AnimatedSection delay={0.2}>
        <div className="bg-zinc-950 pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

              {/* Corner glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 p-8 sm:p-12 md:p-16">
                {/* Left: Content */}
                <div className="flex-1 max-w-xl">
                  <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">
                    Partner With Us
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-5 leading-tight">
                    Looking for a{" "}
                    <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                      Trusted Supplier
                    </span>
                    ?
                  </h2>
                  <p className="text-zinc-400 text-lg leading-relaxed">
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
                    className="group bg-emerald-500 hover:bg-emerald-600 border-0 text-black px-8 h-14 text-base font-semibold transition-all duration-300 rounded-xl shadow-lg shadow-emerald-500/20 min-w-[180px]"
                  >
                    <Link href="/contact">
                      <span className="flex items-center justify-center gap-2">
                        Get a Quote
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="group bg-transparent border border-zinc-700 hover:border-emerald-500/50 text-white hover:text-emerald-400 px-8 h-14 text-base font-semibold transition-all duration-300 rounded-xl min-w-[180px]"
                  >
                    <Link href="/shop">Browse Products</Link>
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
