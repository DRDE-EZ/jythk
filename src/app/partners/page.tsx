import { Building2, Handshake, Globe2, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Our Partners | JYT HK",
  description: "Trusted partnerships with leading solar and renewable energy companies worldwide.",
};

export default function PartnersPage() {
  const partners = [
    { name: "JA Solar", category: "Solar Panels" },
    { name: "Trina Solar", category: "Solar Modules" },
    { name: "Canadian Solar", category: "PV Solutions" },
    { name: "Jinko Solar", category: "Solar Products" },
    { name: "LONGi", category: "Solar Technology" },
    { name: "Huawei", category: "Smart Energy" },
    { name: "Sungrow", category: "Inverters" },
    { name: "GCL", category: "Silicon Materials" },
    { name: "Risen Energy", category: "Solar Modules" },
    { name: "Astronergy", category: "PV Modules" },
    { name: "Seraphim", category: "Solar Panels" },
    { name: "Jolywood", category: "N-type Modules" },
    { name: "DAS Solar", category: "Solar Products" },
    { name: "Tbea", category: "Energy Equipment" },
    { name: "Hoymiles", category: "Microinverters" },
    { name: "Growatt", category: "Solar Inverters" },
    { name: "Goodwe", category: "PV Inverters" },
    { name: "Kehua", category: "Power Solutions" },
    { name: "Sineng", category: "Inverter Technology" },
    { name: "SAJ", category: "Solar Inverters" },
    { name: "KSTAR", category: "Power Electronics" },
    { name: "Chint", category: "Electrical Equipment" },
    { name: "Talesun", category: "Solar Modules" },
    { name: "Runergy", category: "PV Products" },
    { name: "Boviet Solar", category: "Solar Panels" },
    { name: "Suntech", category: "PV Solutions" },
    { name: "Yingli", category: "Solar Energy" },
    { name: "Hanwha Q CELLS", category: "Solar Cells" },
  ];

  const certifications = [
    "ISO 9001 Quality Management",
    "ISO 14001 Environmental Management",
    "ISO 45001 Occupational Health & Safety",
    "TUV Certification",
    "CE Certification",
    "UL Certification",
    "IEC Standards Compliance",
    "OHSAS 18001",
    "Carbon Footprint Verification",
    "Green Building Certification",
    "Energy Star Certification",
    "PV Cycle Membership",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-blue-900/20 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <Handshake className="w-20 h-20 text-blue-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Our Partners
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Collaborating with industry leaders to deliver world-class solar solutions
          </p>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Partner With Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] p-8 rounded-xl border border-gray-800 hover:border-blue-600 transition-all">
              <Globe2 className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Global Reach</h3>
              <p className="text-gray-400">
                Access to international markets with our extensive distribution network spanning 30+ countries.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-8 rounded-xl border border-gray-800 hover:border-blue-600 transition-all">
              <Award className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Quality Assurance</h3>
              <p className="text-gray-400">
                Rigorous quality control standards and international certifications ensure product excellence.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-8 rounded-xl border border-gray-800 hover:border-blue-600 transition-all">
              <Building2 className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Technical Support</h3>
              <p className="text-gray-400">
                Comprehensive technical assistance and training programs for all partner organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Strategic Partners</h2>
          <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
            We collaborate with the world's leading manufacturers and technology providers to ensure 
            our clients receive the highest quality solar products and solutions.
          </p>
          
          <div className="bg-white rounded-xl p-8 mb-8">
            <Image
              src="/partners/partner-logos.png"
              alt="Our Strategic Partners - Leading Solar and Renewable Energy Companies"
              width={1400}
              height={700}
              className="w-full h-full object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Award className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Certifications & Standards</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our commitment to quality is backed by numerous international certifications and compliance standards.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-900/20 to-gray-900/20 p-6 rounded-xl border border-blue-800 hover:border-blue-600 transition-all text-center"
              >
                <div className="text-white font-semibold">{cert}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Become a Partner
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join our network of trusted partners and grow your business with JYT HK.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
