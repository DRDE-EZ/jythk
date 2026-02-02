import { Building2, Globe2, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PartnerForm from "@/components/PartnerForm";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata = {
  title: "Our Partners | JYT HK",
  description:
    "Trusted partnerships with leading solar and renewable energy companies worldwide.",
};

export default function PartnersPage() {
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
    <div className="min-h-screen bg-background text-white">
      {/* Hero Section */}
      <AnimatedSection>
        <section className="relative py-20 sm:py-24 md:py-28 bg-gradient-to-b from-emerald-900/20 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
              Trusted Network
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
              Our Partners
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto">
              Collaborating with industry leaders to deliver world-class solar
              solutions
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Partnership Benefits */}
      <AnimatedSection delay={0.2}>
        <section className="bg-zinc-900/50 py-16 sm:py-20 border-y border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
                Benefits
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Why Partner With Us
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-all group">
                <div className="inline-flex p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-5">
                  <Globe2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Global Reach
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Access to international markets with our extensive distribution
                  network spanning 30+ countries.
                </p>
              </div>

              <div className="bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-all group">
                <div className="inline-flex p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-5">
                  <Award className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Quality Assurance
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Rigorous quality control standards and international
                  certifications ensure product excellence.
                </p>
              </div>

              <div className="bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-all group">
                <div className="inline-flex p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-5">
                  <Building2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Technical Support
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Comprehensive technical assistance and training programs for all
                  partner organizations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Strategic Partners */}
      <AnimatedSection delay={0.3}>
        <section className="py-16 sm:py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
                Industry Leaders
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Strategic Partners
              </h2>
              <p className="text-zinc-400 max-w-3xl mx-auto">
                We collaborate with the world&apos;s leading manufacturers and
                technology providers to ensure our clients receive the highest
                quality solar products and solutions.
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-4 sm:p-8 border border-zinc-800">
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
      </AnimatedSection>

      {/* Certifications */}
      <AnimatedSection delay={0.4}>
        <section className="bg-zinc-900/50 py-16 sm:py-20 border-y border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-5">
                <Award className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Certifications & Standards
              </h2>
              <p className="text-zinc-400 max-w-3xl mx-auto">
                Our commitment to quality is backed by numerous international
                certifications and compliance standards.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 p-4 sm:p-5 rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-all text-center"
                >
                  <div className="text-sm text-zinc-300 font-medium">{cert}</div>
                </div>
              ))}
            </div>

            {/* Certificates Image Display */}
            <div className="bg-zinc-900 rounded-xl p-4 sm:p-8 border border-zinc-800">
              <h3 className="text-xl font-bold mb-6 text-center text-white">
                Our Certifications & Awards
              </h3>
              <Image
                src="/certificates/certificates-awards.png"
                alt="JYT HK Certificates and Awards Collection"
                width={1400}
                height={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Partnership Form Section */}
      <AnimatedSection delay={0.5}>
        <section className="py-16 sm:py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
                Join Our Network
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                Become a Partner
              </h2>
              <p className="text-lg text-zinc-400">
                Fill out the form below and we&apos;ll get back to you within 24 hours
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6 sm:p-8 md:p-10 border border-zinc-800">
              <PartnerForm />
            </div>

            <div className="text-center mt-10">
              <p className="text-zinc-400 mb-6">
                Join our network of trusted partners and grow your business with
                Jingyuntong Hong Kong
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-zinc-700 hover:border-emerald-500 text-white hover:text-emerald-400 font-medium rounded-lg transition-all duration-300"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
