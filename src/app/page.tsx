"use client";

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
import { useLanguage } from "@/i18n/context";

export default function Home() {
  const { t } = useLanguage();

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
                  {t("home", "heroBadge")}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-8 tracking-tight">
                <span className="text-white">{t("home", "heroTitle1")}</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-500 bg-clip-text text-transparent">
                  {t("home", "heroTitle2")}
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-xl sm:text-2xl text-zinc-300 mb-4 max-w-xl leading-relaxed font-light">
                {t("home", "heroSubtitle")}
              </p>
              <p className="text-base text-zinc-500 mb-10 max-w-lg">
                {t("home", "heroDescription")}
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
                      {t("common", "shopNow")}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="group bg-white/5 backdrop-blur-sm border border-zinc-600 hover:border-zinc-500 hover:bg-white/10 text-white px-8 h-14 text-base font-semibold transition-all duration-300 rounded-xl"
                >
                  <Link href="/about">{t("common", "learnMore")}</Link>
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
                { number: "500+", label: t("home", "statsProjectsDelivered") },
                { number: "30+", label: t("home", "statsCountriesServed") },
                { number: "99%", label: t("home", "statsClientSatisfaction") },
                { number: "10+", label: t("home", "statsYearsExperience") },
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
                    {t("home", "ourWork")}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  {t("home", "featuredProjects")}
                </h2>
              </div>
              <Button
                asChild
                className="group bg-transparent border border-zinc-700 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 px-6 h-11 text-sm font-medium transition-all duration-300 rounded-xl w-fit"
              >
                <Link href="/projects">
                  <span className="flex items-center gap-2">
                    {t("common", "viewAll")}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  capacity: "50MW",
                  title: t("home", "projectLeshanTitle"),
                  description: t("home", "projectLeshanDesc"),
                  location: t("home", "projectLeshanLocation"),
                  year: "2023",
                  tag: t("home", "projectUtilityScale"),
                },
                {
                  capacity: "12MW",
                  title: t("home", "projectRooftopTitle"),
                  description: t("home", "projectRooftopDesc"),
                  location: t("home", "projectRooftopLocation"),
                  year: "2022",
                  tag: t("home", "projectCommercial"),
                },
                {
                  capacity: "40MW",
                  title: t("home", "projectFloatingTitle"),
                  description: t("home", "projectFloatingDesc"),
                  location: t("home", "projectFloatingLocation"),
                  year: "2021",
                  tag: t("home", "projectInnovation"),
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
                      {t("common", "details")}
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
                    {t("home", "productRange")}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  {t("home", "browseCategories")}
                </h2>
                <p className="text-zinc-400 text-lg mt-3 max-w-lg">
                  {t("home", "categoriesDesc")}
                </p>
              </div>
              <Button
                asChild
                className="group bg-transparent border border-zinc-700 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 px-6 h-11 text-sm font-medium transition-all duration-300 rounded-xl w-fit"
              >
                <Link href="/shop">
                  <span className="flex items-center gap-2">
                    {t("common", "allProducts")}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>

            <InfiniteCarousel
              items={[
                {
                  name: t("home", "categorySolarCells"),
                  slug: "solar-cells",
                  description: t("home", "categorySolarCellsDesc"),
                  count: "15+",
                },
                {
                  name: t("home", "categorySolarWafers"),
                  slug: "solar-wafers",
                  description: t("home", "categorySolarWafersDesc"),
                  count: "8+",
                },
                {
                  name: t("home", "categoryOffGrid"),
                  slug: "off-grid-solar-kits",
                  description: t("home", "categoryOffGridDesc"),
                  count: "12+",
                },
                {
                  name: t("home", "categoryBess"),
                  slug: "bess",
                  description: t("home", "categoryBessDesc"),
                  count: "6+",
                },
                {
                  name: t("home", "categoryAccessories"),
                  slug: "solar-accessories",
                  description: t("home", "categoryAccessoriesDesc"),
                  count: "25+",
                },
                {
                  name: t("home", "categorySCR"),
                  slug: "scr-catalyst",
                  description: t("home", "categorySCRDesc"),
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
                {t("home", "ourPromise")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
                {t("home", "whyChooseUs")}
              </h2>
              <p className="text-lg text-zinc-400 max-w-xl mx-auto">
                {t("home", "whyChooseUsDesc")}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {[
                {
                  icon: Shield,
                  title: t("home", "qualityAssured"),
                  description: t("home", "qualityAssuredDesc"),
                },
                {
                  icon: Globe,
                  title: t("home", "globalDelivery"),
                  description: t("home", "globalDeliveryDesc"),
                },
                {
                  icon: Clock,
                  title: t("home", "onTimeDelivery"),
                  description: t("home", "onTimeDeliveryDesc"),
                },
                {
                  icon: Award,
                  title: t("home", "tenYears"),
                  description: t("home", "tenYearsDesc"),
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
                    {t("home", "partnerWithUs")}
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-5 leading-tight">
                    {t("home", "lookingForA")}{" "}
                    <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                      {t("home", "trustedSupplier")}
                    </span>
                    ?
                  </h2>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {t("home", "ctaDescription")}
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
                        {t("common", "getQuote")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="group bg-transparent border border-zinc-700 hover:border-emerald-500/50 text-white hover:text-emerald-400 px-8 h-14 text-base font-semibold transition-all duration-300 rounded-xl min-w-[180px]"
                  >
                    <Link href="/shop">{t("common", "browseProducts")}</Link>
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
