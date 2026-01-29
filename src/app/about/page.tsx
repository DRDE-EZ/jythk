import { Button } from "@/components/ui/button";
import { Building, Users, Globe, Award, Zap, Sun, Battery, Leaf, Target, Lightbulb, TrendingUp, Calendar, Factory, Recycle, Wind } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Us | JYT HK",
  description: "Learn about JYT HK - Your trusted overseas supplier for solar solutions and custom projects.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              About JYT HK
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Your trusted overseas supplier for innovative solar solutions and custom projects
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                Established in August 2002, Beijing Jingyuntong Technology Co., Ltd (hereinafter referred to as the "Company or JYT") is engaged in the research and development 
                of four major industries: i.e. high-end equipment, new materials, new energy power generation and energy conservation & environmental protection.
              </p>
              <p>
                The Company was listed on the Science and Technology Innovation Board of the Shanghai Stock Exchange in October 2015 (Stock Abbreviation: JYT; stock code: 601778).
              </p>
              <p>
                With years of industry experience and a commitment to innovation, we have established 
                ourselves as a trusted partner for businesses seeking renewable energy solutions.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900 to-black p-8 rounded-2xl border border-blue-800">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
                <div className="text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">30+</div>
                <div className="text-gray-400">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">99%</div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">10+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-blue-800 hover:border-blue-600 transition-all text-center">
              <Calendar className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-400 mb-2">2002</div>
              <p className="text-gray-400 text-sm">Company Founded</p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-blue-800 hover:border-blue-600 transition-all text-center">
              <Factory className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-400 mb-2">2005</div>
              <p className="text-gray-400 text-sm">First Manufacturing Plant</p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-blue-800 hover:border-blue-600 transition-all text-center">
              <Sun className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-400 mb-2">2010</div>
              <p className="text-gray-400 text-sm">Solar Division Launch</p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-blue-800 hover:border-blue-600 transition-all text-center">
              <Globe className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-400 mb-2">2013</div>
              <p className="text-gray-400 text-sm">International Expansion</p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-blue-800 hover:border-blue-600 transition-all text-center">
              <Award className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-400 mb-2">2015</div>
              <p className="text-gray-400 text-sm">Stock Exchange Listed</p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-blue-800 hover:border-blue-600 transition-all text-center">
              <TrendingUp className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-400 mb-2">2016</div>
              <p className="text-gray-400 text-sm">Market Leader Position</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Layout - 4 Major Sectors */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Business Divisions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/20 p-8 rounded-xl border border-blue-800 hover:border-blue-600 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl font-bold text-blue-400">01</div>
                <Building className="w-12 h-12 text-blue-400 mt-2" />
              </div>
              <h3 className="text-2xl font-bold mb-4">High-end Equipment</h3>
              <p className="text-gray-400">
                Advanced manufacturing equipment and precision instruments for industrial applications. 
                Specializing in automation systems, testing equipment, and production line solutions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/20 p-8 rounded-xl border border-blue-800 hover:border-blue-600 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl font-bold text-blue-400">02</div>
                <Battery className="w-12 h-12 text-blue-400 mt-2" />
              </div>
              <h3 className="text-2xl font-bold mb-4">New Materials</h3>
              <p className="text-gray-400">
                Research and development of cutting-edge materials including photovoltaic materials, 
                semiconductors, and advanced composites for renewable energy applications.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/20 p-8 rounded-xl border border-blue-800 hover:border-blue-600 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl font-bold text-blue-400">03</div>
                <Sun className="w-12 h-12 text-blue-400 mt-2" />
              </div>
              <h3 className="text-2xl font-bold mb-4">New Energy Power Generation</h3>
              <p className="text-gray-400">
                Comprehensive solar power solutions from design to installation. Serving commercial, 
                industrial, and utility-scale projects with cutting-edge PV technology.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/20 p-8 rounded-xl border border-blue-800 hover:border-blue-600 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl font-bold text-blue-400">04</div>
                <Leaf className="w-12 h-12 text-blue-400 mt-2" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Energy Conservation & Environmental Protection</h3>
              <p className="text-gray-400">
                Sustainable solutions for energy efficiency, waste reduction, and environmental protection. 
                Helping businesses reduce their carbon footprint and operational costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Responsibility */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Recycle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Our Environmental Impact</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Committed to sustainability and reducing global carbon emissions through renewable energy solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 p-8 rounded-xl border border-green-800 text-center">
              <Wind className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-400 mb-2">3.29B</div>
              <p className="text-gray-400">kWh Clean Energy Generated</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 p-8 rounded-xl border border-green-800 text-center">
              <Leaf className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-400 mb-2">11.7M</div>
              <p className="text-gray-400">Tons CO₂ Emissions Reduced</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 p-8 rounded-xl border border-green-800 text-center">
              <Sun className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-400 mb-2">2.5GW</div>
              <p className="text-gray-400">Total Installed Capacity</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-xl border border-blue-800">
            <p className="text-center text-lg text-gray-300">
              Our solar projects have contributed significantly to global carbon reduction efforts, 
              equivalent to planting millions of trees and powering thousands of homes with clean, 
              renewable energy. We continue to invest in sustainable technologies that benefit both 
              our clients and the planet.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Quality First</h3>
              <p className="text-gray-400">
                We source only the highest quality components and maintain rigorous quality control standards.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-400">
                Constantly researching and implementing the latest solar technology advancements.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Sustainability</h3>
              <p className="text-gray-400">
                Committed to reducing carbon footprints and promoting clean energy worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates & Awards */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Award className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Certificates & Awards</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Recognized for excellence in innovation, quality management, and environmental standards
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 md:p-12">
            <Image
              src="/certificates/certificates-awards.png"
              alt="JYT HK Certificates and Awards - Quality Management, Innovation, Environmental Standards"
              width={1400}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/20 p-6 rounded-xl border border-blue-800 text-center">
              <h3 className="font-bold text-lg mb-2">ISO Certified</h3>
              <p className="text-gray-400 text-sm">Quality Management Systems</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/20 p-6 rounded-xl border border-blue-800 text-center">
              <h3 className="font-bold text-lg mb-2">Innovation Awards</h3>
              <p className="text-gray-400 text-sm">Technology & Development</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/20 p-6 rounded-xl border border-blue-800 text-center">
              <h3 className="font-bold text-lg mb-2">Environmental Compliance</h3>
              <p className="text-gray-400 text-sm">Green Energy Standards</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/20 p-6 rounded-xl border border-blue-800 text-center">
              <h3 className="font-bold text-lg mb-2">Industry Recognition</h3>
              <p className="text-gray-400 text-sm">Leading Solar Solutions Provider</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <TrendingUp className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Go Solar?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join hundreds of satisfied clients who have made the switch to clean, renewable energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-transparent border-2 border-white text-white hover:text-black px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm min-w-[160px]"
            >
              <Link href="/contact">
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-transparent border-2 border-white text-white hover:text-black px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm min-w-[160px]"
            >
              <Link href="/projects">
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}


