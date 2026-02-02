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

  const timeline = [
    {
      year: "2002",
      label: "Company Founded",
      description: "Beijing Jingyuntong Technology established",
      icon: Calendar,
    },
    {
      year: "2005",
      label: "First Plant",
      description: "Manufacturing operations begin",
      icon: Factory,
    },
    {
      year: "2010",
      label: "Solar Launch",
      description: "Entering renewable energy sector",
      icon: Sun,
    },
    {
      year: "2013",
      label: "Global Expansion",
      description: "International market presence",
      icon: Globe,
    },
    {
      year: "2015",
      label: "IPO",
      description: "Listed on Shanghai Stock Exchange",
      icon: Award,
    },
    {
      year: "2024",
      label: "Market Leader",
      description: "500+ projects worldwide",
      icon: TrendingUp,
    },
  ];

  const businessDivisions = [
    {
      title: "High-end Equipment",
      description:
        "Advanced manufacturing equipment and precision instruments for industrial applications.",
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "New Materials",
      description:
        "Cutting-edge photovoltaic materials, semiconductors, and advanced composites.",
      icon: Battery,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "New Energy",
      description:
        "Comprehensive solar power solutions from design to utility-scale installation.",
      icon: Sun,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Environmental Protection",
      description:
        "Sustainable solutions for energy efficiency and carbon footprint reduction.",
      icon: Leaf,
      color: "from-emerald-500 to-green-500",
    },
  ];

  const coreValues = [
    {
      title: "Quality First",
      description: "Rigorous standards and international certifications.",
      icon: Target,
    },
    {
      title: "Innovation",
      description: "Leading edge solar technology advancements.",
      icon: Lightbulb,
    },
    {
      title: "Sustainability",
      description: "Committed to clean energy worldwide.",
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
                About Us
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                Powering the Future with
                <span className="block text-emerald-400">Clean Energy</span>
              </h1>

              <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                From a small tech company in Beijing to a global leader in
                renewable energy solutions — this is our story.
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
                    label: "Projects",
                    sublabel: "Delivered",
                  },
                  {
                    ref: stat2.ref,
                    count: stat2.count,
                    suffix: "+",
                    label: "Countries",
                    sublabel: "Served",
                  },
                  {
                    ref: stat3.ref,
                    count: stat3.count,
                    suffix: "%",
                    label: "Client",
                    sublabel: "Satisfaction",
                  },
                  {
                    ref: stat4.ref,
                    count: stat4.count,
                    suffix: "+",
                    label: "Years",
                    sublabel: "Experience",
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
                  Our Story
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  From Beijing to the World
                </h2>
                <div className="space-y-4 text-zinc-400 text-lg leading-relaxed">
                  <p>
                    Established in August 2002,{" "}
                    <span className="text-white font-medium">
                      Beijing Jingyuntong Technology Co., Ltd
                    </span>{" "}
                    began with a vision to revolutionize how the world generates
                    and consumes energy.
                  </p>
                  <p>
                    Today, we operate across four major industries: high-end
                    equipment, new materials, new energy power generation, and
                    energy conservation & environmental protection.
                  </p>
                  <p>
                    Listed on the Shanghai Stock Exchange in 2015{" "}
                    <span className="text-emerald-400">
                      (Stock Code: 601778)
                    </span>
                    , we continue to push the boundaries of what's possible in
                    renewable energy.
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
                          Stock Code: 601778
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
                          Installed Capacity
                        </div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <div className="text-emerald-400 text-2xl font-bold">
                          3.29B
                        </div>
                        <div className="text-zinc-500 text-sm">
                          kWh Generated
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Leaf className="w-5 h-5" />
                        <span className="font-semibold">
                          11.7M tons CO₂ reduced
                        </span>
                      </div>
                      <div className="text-zinc-400 text-sm mt-1">
                        Equivalent to planting millions of trees
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
                Our Journey
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Milestones That Define Us
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
                <span>← Swipe to explore →</span>
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
                What We Do
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Four Pillars of Innovation
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Our diversified portfolio drives sustainable growth across
                multiple industries
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
                        <span>Learn more</span>
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
                  Our Foundation
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Values That Guide Us
                </h2>
                <p className="text-zinc-400">
                  The principles that drive our commitment to excellence.
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
                Certificates & Awards
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Recognized for excellence in innovation and quality
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
                    Click to view
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
            Tap anywhere to close • Pinch to zoom
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
                    Ready to Start?
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  Let's Build the Future Together
                </h2>

                <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
                  Join hundreds of satisfied clients who have made the switch to
                  clean, renewable energy.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
                  >
                    Contact Us
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 hover:border-emerald-500/50 text-white hover:text-emerald-400 font-semibold rounded-xl transition-all duration-300"
                  >
                    View Projects
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
