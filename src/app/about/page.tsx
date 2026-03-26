"use client";

import { useRef, useEffect, useState } from "react";
import {
  Building2,
  Globe,
  Award,
  Sun,
  Battery,
  Leaf,
  Target,
  Lightbulb,
  TrendingUp,
  Calendar,
  Factory,
  ArrowRight,
  ChevronRight,
  Play,
  X,
  ZoomIn,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/i18n/context";

// Animated counter hook
function useCountUp(
  end: number,
  duration: number = 2000,
  startOnView: boolean = true,
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }
  }, [startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  useEffect(() => {
    if (!startOnView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  return { count, ref };
}

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { t } = useLanguage();

  const timeline = [
    {
      year: "2002",
      label: t("about", "timelineCompanyFounded"),
      description: t("about", "timelineCompanyFoundedDesc"),
      icon: Calendar,
    },
    {
      year: "2005",
      label: t("about", "timelineFirstPlant"),
      description: t("about", "timelineFirstPlantDesc"),
      icon: Factory,
    },
    {
      year: "2010",
      label: t("about", "timelineSolarLaunch"),
      description: t("about", "timelineSolarLaunchDesc"),
      icon: Sun,
    },
    {
      year: "2013",
      label: t("about", "timelineGlobalExpansion"),
      description: t("about", "timelineGlobalExpansionDesc"),
      icon: Globe,
    },
    {
      year: "2015",
      label: t("about", "timelineIPO"),
      description: t("about", "timelineIPODesc"),
      icon: Award,
    },
    {
      year: "2024",
      label: t("about", "timelineMarketLeader"),
      description: t("about", "timelineMarketLeaderDesc"),
      icon: TrendingUp,
    },
  ];

  const businessDivisions = [
    {
      title: t("about", "highEndEquipment"),
      description: t("about", "highEndEquipmentDesc"),
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t("about", "newMaterials"),
      description: t("about", "newMaterialsDesc"),
      icon: Battery,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: t("about", "newEnergy"),
      description: t("about", "newEnergyDesc"),
      icon: Sun,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t("about", "environmentalProtection"),
      description: t("about", "environmentalProtectionDesc"),
      icon: Leaf,
      color: "from-emerald-500 to-green-500",
    },
  ];

  const coreValues = [
    {
      title: t("about", "qualityFirst"),
      description: t("about", "qualityFirstDesc"),
      icon: Target,
    },
    {
      title: t("about", "innovation"),
      description: t("about", "innovationDesc"),
      icon: Lightbulb,
    },
    {
      title: t("about", "sustainability"),
      description: t("about", "sustainabilityDesc"),
      icon: Leaf,
    },
  ];

  // Stats with animated counters
  const stat1 = useCountUp(500, 2000);
  const stat2 = useCountUp(30, 1500);
  const stat3 = useCountUp(99, 1800);
  const stat4 = useCountUp(10, 1200);

  return (
    <div className="min-h-screen bg-background text-white overflow-x-hidden">
      {/* Hero Section - Cinematic */}
      <section className="relative py-24 sm:py-32 md:py-40 bg-gradient-to-b from-emerald-900/30 via-emerald-900/10 to-transparent overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-6">
                {t("about", "heroLabel")}
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                {t("about", "heroTitle1")}
                <span className="block text-emerald-400">{t("about", "heroTitle2")}</span>
              </h1>

              <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                {t("about", "heroSubtitle")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section - Bold & Impactful */}
      <AnimatedSection delay={0.2}>
        <section className="relative -mt-8 sm:-mt-12 z-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  {
                    ref: stat1.ref,
                    count: stat1.count,
                    suffix: "+",
                    label: t("about", "statProjects"),
                    sublabel: t("about", "statDelivered"),
                  },
                  {
                    ref: stat2.ref,
                    count: stat2.count,
                    suffix: "+",
                    label: t("about", "statCountries"),
                    sublabel: t("about", "statServed"),
                  },
                  {
                    ref: stat3.ref,
                    count: stat3.count,
                    suffix: "%",
                    label: t("about", "statClient"),
                    sublabel: t("about", "statSatisfaction"),
                  },
                  {
                    ref: stat4.ref,
                    count: stat4.count,
                    suffix: "+",
                    label: t("about", "statYears"),
                    sublabel: t("about", "statExperience"),
                  },
                ].map((stat, index) => (
                  <div key={index} ref={stat.ref} className="text-center group">
                    <div className="relative inline-block">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                        {stat.count}
                      </span>
                      <span className="text-2xl sm:text-3xl font-bold text-emerald-400">
                        {stat.suffix}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm sm:text-base font-semibold text-white">
                        {stat.label}
                      </div>
                      <div className="text-xs sm:text-sm text-zinc-500">
                        {stat.sublabel}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Story Section - Split Layout */}
      <AnimatedSection delay={0.3}>
        <section className="py-20 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Content */}
              <div>
                <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
                  {t("about", "ourStory")}
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  {t("about", "fromBeijing")}
                </h2>
                <div className="space-y-4 text-zinc-400 text-lg leading-relaxed">
                  <p>
                    {t("about", "storyP1")}{" "}
                    <span className="text-white font-medium">
                      {t("about", "storyCompanyName")}
                    </span>{" "}
                    {t("about", "storyP1End")}
                  </p>
                  <p>
                    {t("about", "storyP2")}
                  </p>
                  <p>
                    {t("about", "storyP3Start")}{" "}
                    <span className="text-emerald-400">
                      {t("about", "stockCode")}
                    </span>
                    {t("about", "storyP3End")}
                  </p>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="relative">
                <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-8 border border-zinc-800 overflow-hidden">
                  {/* Accent corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/20 rounded-bl-3xl rounded-tr-2xl" />

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                        <Building2 className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">
                          JYT Corp
                        </div>
                        <div className="text-zinc-500 text-sm">
                          {t("about", "stockCode")}
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-zinc-700" />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <div className="text-emerald-400 text-2xl font-bold">
                          2.5 GW
                        </div>
                        <div className="text-zinc-500 text-sm">
                          {t("about", "installedCapacity")}
                        </div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <div className="text-emerald-400 text-2xl font-bold">
                          3.29B
                        </div>
                        <div className="text-zinc-500 text-sm">
                          {t("about", "kwhGenerated")}
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Leaf className="w-5 h-5" />
                        <span className="font-semibold">
                          {t("about", "co2Reduced")}
                        </span>
                      </div>
                      <div className="text-zinc-400 text-sm mt-1">
                        {t("about", "equivalentTrees")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Timeline Section - Horizontal Scroll on Mobile */}
      <AnimatedSection delay={0.2}>
        <section className="bg-zinc-900/50 py-16 sm:py-20 md:py-24 border-y border-zinc-800/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
                {t("about", "ourJourney")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {t("about", "milestones")}
              </h2>
            </div>

            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden overflow-hidden -mx-4 px-4">
              <div
                ref={timelineRef}
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {timeline.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 w-[240px] snap-start bg-zinc-900 border border-zinc-800 rounded-xl p-5 relative overflow-hidden group"
                    >
                      {/* Year badge */}
                      <div className="absolute top-0 right-0 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                        {item.year}
                      </div>

                      <div className="mt-4">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20 mb-4">
                          <Icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="font-bold text-white mb-1">
                          {item.label}
                        </h3>
                        <p className="text-zinc-500 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center gap-2 mt-2 text-zinc-500 text-xs">
                <span>{t("about", "swipeToExplore")}</span>
              </div>
            </div>

            {/* Desktop: Timeline with connecting line */}
            <div className="hidden md:block relative">
              {/* Connecting line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

              <div className="grid grid-cols-6 gap-4 lg:gap-6">
                {timeline.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="relative group">
                      {/* Dot on timeline */}
                      <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-900 border-2 border-emerald-500 rounded-full group-hover:bg-emerald-500 transition-colors z-10" />

                      <div className="pt-8 text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-emerald-400 mb-3">
                          {item.year}
                        </div>
                        <div className="bg-zinc-900/80 border border-zinc-800 group-hover:border-emerald-500/30 rounded-xl p-4 transition-all">
                          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20 mx-auto mb-3">
                            <Icon className="w-5 h-5 text-emerald-400" />
                          </div>
                          <h3 className="font-bold text-white text-sm mb-1">
                            {item.label}
                          </h3>
                          <p className="text-zinc-500 text-xs">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Business Divisions - Bento Grid */}
      <AnimatedSection delay={0.2}>
        <section className="py-16 sm:py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
                {t("about", "whatWeDo")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t("about", "fourPillars")}
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                {t("about", "fourPillarsDesc")}
              </p>
            </div>

            {/* Bento-style grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {businessDivisions.map((division, index) => {
                const Icon = division.icon;
                const isLarge = index === 0 || index === 3;

                return (
                  <div
                    key={index}
                    className={`group relative bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 sm:p-8 overflow-hidden transition-all duration-300 ${
                      isLarge ? "md:row-span-1" : ""
                    }`}
                  >
                    {/* Gradient accent */}
                    <div
                      className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${division.color}`}
                    />

                    {/* Background glow on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${division.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />

                    <div className="relative z-10">
                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${division.color} mb-5 shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                        {division.title}
                      </h3>

                      <p className="text-zinc-400 leading-relaxed">
                        {division.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>{t("about", "learnMoreText")}</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Core Values - Horizontal on Desktop */}
      <AnimatedSection delay={0.2}>
        <section className="bg-zinc-900/50 py-16 sm:py-20 border-y border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
              {/* Left: Title */}
              <div className="lg:w-1/3 text-center lg:text-left">
                <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
                  {t("about", "ourFoundation")}
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  {t("about", "valuesGuideUs")}
                </h2>
                <p className="text-zinc-400">
                  {t("about", "valuesDesc")}
                </p>
              </div>

              {/* Right: Values */}
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
                {coreValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={index}
                      className="group text-center sm:text-left px-4 sm:px-0"
                    >
                      <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 mx-auto sm:mx-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-black" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-zinc-500 text-sm">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Certificates Section - With Lightbox */}
      <AnimatedSection delay={0.2}>
        <section className="py-16 sm:py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-14">
              <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-5">
                <Award className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t("about", "certificatesAwards")}
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                {t("about", "recognizedExcellence")}
              </p>
            </div>

            {/* Clickable Image */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="group relative bg-zinc-900 rounded-2xl p-4 sm:p-6 md:p-8 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all duration-300"
            >
              <Image
                src="/certificates/certificates-awards.png"
                alt="JYT HK Certificates and Awards"
                width={1400}
                height={800}
                className="w-full h-auto rounded-xl"
                priority
              />
              {/* Hover overlay */}
              <div className="absolute inset-4 sm:inset-6 md:inset-8 bg-black/0 group-hover:bg-black/40 rounded-xl flex items-center justify-center transition-all duration-300">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">
                    {t("about", "clickToView")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Image Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Hint text */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-500 text-sm">
            {t("about", "tapToClose")}
          </div>

          {/* Image container with zoom */}
          <div
            className="relative max-w-[95vw] max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/certificates/certificates-awards.png"
              alt="JYT HK Certificates and Awards - Full View"
              width={2800}
              height={1600}
              className="w-auto h-auto max-w-none cursor-zoom-in active:cursor-grabbing"
              style={{ maxHeight: "85vh", width: "auto" }}
              priority
            />
          </div>
        </div>
      )}

      {/* CTA Section - Engaging */}
      <AnimatedSection delay={0.2}>
        <section className="pt-4 sm:pt-6 md:pt-6 pb-32 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-emerald-900/30 to-zinc-900 rounded-3xl p-8 sm:p-12 md:p-16 border border-emerald-500/20 overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl" />

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                  <Play className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-medium">
                    {t("about", "readyToStart")}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  {t("about", "buildFuture")}
                </h2>

                <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
                  {t("about", "ctaDesc")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
                  >
                    {t("common", "contactUs")}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 hover:border-emerald-500/50 text-white hover:text-emerald-400 font-semibold rounded-xl transition-all duration-300"
                  >
                    {t("common", "viewProjects")}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
