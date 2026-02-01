import {
  Building2,
  Sun,
  Battery,
  Wrench,
  ArrowRight,
  Zap,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import SolarPanel3D from "@/components/SolarPanel3DWrapper";

export const metadata = {
  title: "Project Inquiry | JYT HK",
  description:
    "Get a custom quote for your solar project - Solar Farms, BESS, Rooftop Installations, or Custom Solutions.",
};

export default function ProjectsPage() {
  const projectTypes = [
    {
      title: "Solar Farm",
      icon: Sun,
      description:
        "Large-scale ground-mounted solar installations for utility and commercial applications. From 1MW to 100MW+ capacity.",
      gradient: "from-yellow-500 to-orange-500",
      iconBg: "bg-gradient-to-br from-yellow-500 to-orange-500",
      features: [
        "Ground-mounted systems",
        "Utility-scale projects",
        "High-capacity generation",
        "Long-term ROI",
      ],
      link: "/quote?type=solar-farm",
    },
    {
      title: "BESS",
      icon: Battery,
      description:
        "Battery Energy Storage Systems for grid stabilization, peak shaving, and renewable energy integration.",
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      features: [
        "Energy storage solutions",
        "Grid stabilization",
        "Peak demand management",
        "Renewable integration",
      ],
      link: "/quote?type=bess",
    },
    {
      title: "Rooftop Installation",
      icon: Building2,
      description:
        "Commercial and industrial rooftop solar systems. Maximize unused roof space for clean energy generation.",
      gradient: "from-emerald-500 to-green-500",
      iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
      features: [
        "Commercial rooftops",
        "Industrial facilities",
        "Space optimization",
        "Immediate savings",
      ],
      link: "/quote?type=rooftop",
    },
    {
      title: "Custom Projects",
      icon: Wrench,
      description:
        "Tailored solar solutions for unique requirements. Floating solar, agrivoltaics, hybrid systems, and more.",
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      features: [
        "Floating solar",
        "Agrivoltaic systems",
        "Hybrid solutions",
        "Innovative designs",
      ],
      link: "/quote?type=custom",
    },
  ];

  const stats = [
    { number: "500+", label: "Projects Completed", icon: Building2 },
    { number: "2.5 GW", label: "Total Capacity Installed", icon: Zap },
    { number: "30+", label: "Countries Worldwide", icon: MapPin },
    { number: "3M+", label: "Tons CO2 Reduced", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Hero Section with 3D Model */}
      <section className="relative py-20 sm:py-24 md:py-28 bg-gradient-to-b from-emerald-900/20 to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left order-1">
              <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
                Project Solutions
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
                Start Your Project
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mb-6 mx-auto lg:mx-0"></div>
              <p className="text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0">
                Tell us about your project and get a customized quote within 24
                hours
              </p>
            </div>

            {/* Right: 3D Solar Panel Model */}
            <div className="order-2 relative flex items-center justify-center">
              <div className="relative w-full max-w-[450px] sm:max-w-[520px] lg:max-w-[580px]">
                {/* Glow effect behind model */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 rounded-full blur-2xl scale-150"></div>

                {/* 3D Model Container */}
                <div className="relative h-[340px] sm:h-[420px] lg:h-[480px]">
                  <SolarPanel3D />
                </div>

                {/* Interactive hint */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-zinc-500 bg-zinc-900/90 px-3 py-1.5 rounded-full border border-zinc-800">
                  <svg className="w-3 h-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <span>Drag to rotate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-zinc-900/50 py-12 sm:py-16 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group cursor-pointer">
                  <Icon className="w-8 h-8 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-zinc-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Types - Main Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
              Get Started
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              Choose Your Project Type
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Select the type of project you're interested in to get started
              with a customized inquiry form
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {projectTypes.map((project, index) => {
              const Icon = project.icon;
              return (
                <Link
                  key={index}
                  href={project.link}
                  className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 p-6 sm:p-8 hover:shadow-2xl"
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10">
                    {/* Icon with colored gradient */}
                    <div
                      className={`inline-flex p-3 rounded-xl ${project.iconBg} mb-5 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 mb-5 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-sm text-zinc-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold group-hover:gap-3 transition-all">
                      <span>Get Quote</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-zinc-900/50 py-16 sm:py-20 md:py-24 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
              Our Expertise
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Why Choose Jingyuntong Hong Kong?
            </h2>
            <p className="text-lg text-zinc-400">
              Your trusted partner for solar solutions worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Expert Engineering",
                description:
                  "Over 10 years of experience designing and implementing solar projects globally",
                icon: Wrench,
              },
              {
                title: "Quality Components",
                description:
                  "We source only the highest quality solar panels, inverters, and storage systems",
                icon: CheckCircle2,
              },
              {
                title: "Full Support",
                description:
                  "From initial consultation to post-installation support, we're with you every step",
                icon: Building2,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-800 text-center group hover:border-emerald-500/30 transition-colors"
                >
                  <div className="inline-flex p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-5">
                    <Icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Choose your project type above to fill out a customized inquiry
            form, or contact us directly
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-zinc-700 hover:border-emerald-500 text-white hover:text-emerald-400 font-semibold rounded-lg transition-all duration-300"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
