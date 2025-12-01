import { Building2, Sun, Battery, Wrench, ArrowRight, Zap, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Project Inquiry | JYT HK",
  description: "Get a custom quote for your solar project - Solar Farms, BESS, Rooftop Installations, or Custom Solutions.",
};

export default function ProjectsPage() {
  const projectTypes = [
    {
      title: "Solar Farm",
      icon: Sun,
      description: "Large-scale ground-mounted solar installations for utility and commercial applications. From 1MW to 100MW+ capacity.",
      gradient: "from-yellow-600 to-orange-600",
      features: ["Ground-mounted systems", "Utility-scale projects", "High-capacity generation", "Long-term ROI"],
      link: "/projects/solar-farm"
    },
    {
      title: "BESS",
      icon: Battery,
      description: "Battery Energy Storage Systems for grid stabilization, peak shaving, and renewable energy integration.",
      gradient: "from-blue-600 to-cyan-600",
      features: ["Energy storage solutions", "Grid stabilization", "Peak demand management", "Renewable integration"],
      link: "/projects/bess"
    },
    {
      title: "Rooftop Installation",
      icon: Building2,
      description: "Commercial and industrial rooftop solar systems. Maximize unused roof space for clean energy generation.",
      gradient: "from-green-600 to-emerald-600",
      features: ["Commercial rooftops", "Industrial facilities", "Space optimization", "Immediate savings"],
      link: "/projects/rooftop"
    },
    {
      title: "Custom Projects",
      icon: Wrench,
      description: "Tailored solar solutions for unique requirements. Floating solar, agrivoltaics, hybrid systems, and more.",
      gradient: "from-purple-600 to-pink-600",
      features: ["Floating solar", "Agrivoltaic systems", "Hybrid solutions", "Innovative designs"],
      link: "/projects/custom"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed", icon: Building2 },
    { number: "2.5 GW", label: "Total Capacity Installed", icon: Zap },
    { number: "30+", label: "Countries Worldwide", icon: MapPin },
    { number: "3M+ tons", label: "CO2 Emissions Reduced", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-blue-900/20 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <Wrench className="w-20 h-20 text-blue-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Start Your Project
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Tell us about your project and get a customized quote within 24 hours
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Types - Main Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Project Type</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Select the type of project you're interested in to get started with a customized inquiry form
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projectTypes.map((project, index) => {
              const Icon = project.icon;
              return (
                <Link
                  key={index}
                  href={project.link}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-blue-500 transition-all duration-300 p-8 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${project.gradient} mb-6`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-4 transition-all">
                      <span>Get Quote</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-blue-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose Jingyuntong Hong Kong?</h2>
            <p className="text-xl text-gray-400">Your trusted partner for solar solutions worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Engineering",
                description: "Over 10 years of experience designing and implementing solar projects globally",
                icon: Wrench
              },
              {
                title: "Quality Components",
                description: "We source only the highest quality solar panels, inverters, and storage systems",
                icon: CheckCircle2
              },
              {
                title: "Full Support",
                description: "From initial consultation to post-installation support, we're with you every step",
                icon: Building2
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 text-center">
                  <Icon className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Choose your project type above to fill out a customized inquiry form, or contact us directly
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
