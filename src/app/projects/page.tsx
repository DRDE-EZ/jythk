import { Building2, Sun, Battery, Wrench } from "lucide-react";
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

  const oldProjects = [
    {
      title: "Leshan Meiyi Photovoltaic Power Station",
      location: "Leshan, China",
      year: "2023",
      capacity: "50MW",
      type: "Ground-mounted Solar Farm",
      description: "One of the largest photovoltaic installations in Leshan region, providing clean energy to over 15,000 households.",
      status: "Operational",
      highlights: [
        "100,000+ solar panels installed",
        "Annual production: 65,000 MWh",
        "CO2 reduction: 55,000 tons/year",
      ],
    },
    {
      title: "Industrial Rooftop Solar Project",
      location: "Suzhou, Jiangsu",
      year: "2022",
      capacity: "12MW",
      type: "Commercial Rooftop",
      description: "Large-scale industrial rooftop installation featuring cutting-edge bifacial solar modules and smart monitoring systems.",
      status: "Operational",
      highlights: [
        "25,000 m² installation area",
        "30-year performance warranty",
        "Smart energy management system",
      ],
    },
    {
      title: "Urban PV Integration Project",
      location: "Hong Kong",
      year: "2023",
      capacity: "5MW",
      type: "Urban Integration",
      description: "Innovative building-integrated photovoltaic (BIPV) system combining aesthetics with energy generation.",
      status: "Operational",
      highlights: [
        "Architectural solar integration",
        "Zero carbon emissions",
        "Smart grid connectivity",
      ],
    },
    {
      title: "Agricultural Solar Hybrid Project",
      location: "Hebei Province",
      year: "2021",
      capacity: "30MW",
      type: "Agrivoltaic System",
      description: "Combining agricultural production with solar energy generation, maximizing land use efficiency.",
      status: "Operational",
      highlights: [
        "Dual land use optimization",
        "Crop protection benefits",
        "Community empowerment",
      ],
    },
    {
      title: "Off-Grid Solar Solution",
      location: "Remote Islands, Philippines",
      year: "2022",
      capacity: "2MW",
      type: "Off-Grid + Storage",
      description: "Complete off-grid solar solution with battery storage, bringing reliable electricity to remote communities.",
      status: "Operational",
      highlights: [
        "24/7 power availability",
        "Battery storage: 4MWh",
        "Diesel generator replacement",
      ],
    },
    {
      title: "Floating Solar Power Plant",
      location: "Anhui Province",
      year: "2021",
      capacity: "40MW",
      type: "Floating PV",
      description: "State-of-the-art floating solar installation on water reservoir, combining renewable energy with water conservation.",
      status: "Operational",
      highlights: [
        "Reduced water evaporation",
        "Improved panel efficiency",
        "Ecological benefits",
      ],
    },
  ];

  const projectStats = [
    { number: "500+", label: "Projects Completed", icon: Building2 },
    { number: "2.5 GW", label: "Total Capacity Installed", icon: Zap },
    { number: "30+", label: "Countries Worldwide", icon: MapPin },
    { number: "3M+ tons", label: "CO2 Emissions Reduced", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-blue-900/20 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <Building2 className="w-20 h-20 text-blue-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Our Projects
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Delivering innovative solar solutions that power communities and businesses worldwide
          </p>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => {
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

      {/* Featured Projects */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Featured Projects</h2>
          <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
            Explore our portfolio of successful solar energy installations across various sectors and regions.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 hover:border-blue-600 transition-all group"
              >
                <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-6 h-48 flex items-center justify-center relative overflow-hidden">
                  <Sun className="w-24 h-24 text-white/20 absolute" />
                  <div className="relative z-10 text-center">
                    <div className="text-4xl font-bold text-white mb-2">{project.capacity}</div>
                    <div className="text-blue-100">{project.type}</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                    <span className="mx-2">•</span>
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === "Operational" 
                        ? "bg-green-900/30 text-green-400 border border-green-800"
                        : "bg-blue-900/30 text-blue-400 border border-blue-800"
                    }`}>
                      {project.status}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                        <p className="text-gray-400 text-sm">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Project Types</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sun,
                title: "Ground-Mounted",
                description: "Large-scale solar farms on open land",
              },
              {
                icon: Building2,
                title: "Rooftop Systems",
                description: "Commercial and industrial rooftop installations",
              },
              {
                icon: Battery,
                title: "Off-Grid + Storage",
                description: "Complete energy independence solutions",
              },
              {
                icon: Zap,
                title: "Hybrid Systems",
                description: "Combined solar and traditional energy",
              },
            ].map((type, index) => {
              const Icon = type.icon;
              return (
                <div
                  key={index}
                  className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-blue-600 transition-all text-center"
                >
                  <Icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-gray-400 text-sm">{type.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your Solar Project
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let us help you design and implement a custom solar solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg"
            >
              <Link href="/shop">View Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
