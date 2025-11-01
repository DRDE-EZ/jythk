"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert("Quote request submitted! We'll contact you within 24 hours.");
    setFormData({ name: "", email: "", company: "", phone: "", projectType: "", message: "" });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white text-black"
    >
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse"></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl"
            style={{ background: 'rgba(26,75,168,0.1)' }}
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-56 md:w-80 h-56 md:h-80 rounded-full blur-3xl"
            style={{ background: 'rgba(26,75,168,0.15)' }}
            animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 md:mb-6 text-black">
              About Formex
            </h1>
            <div className="w-16 md:w-24 h-1 mx-auto rounded-full" style={{ background: '#1a4ba8' }}></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed"
          >
            Trusted imports. On-time supply for tomorrow's builds.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 rounded-full mt-2"
              style={{ background: '#1a4ba8' }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Content Sections */}
      <div className="relative z-20 bg-white">
        {/* Mission Section */}
        <Section delay={0.2}>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-black">
                Our Mission
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4 md:mb-6">
                At Formex Construction & Wholesale, we&apos;re more than just a supplier — we&apos;re your trusted partner in building excellence across Slovakia and beyond.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Whether you&apos;re a contractor building residential developments, an industrial facility manager sourcing machinery, or a business owner needing reliable construction supplies, we deliver quality products on time, every time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gray-50 rounded-3xl border-2 border-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 md:w-24 h-16 md:h-24 mx-auto mb-4 md:mb-6 rounded-2xl flex items-center justify-center" style={{ background: '#1a4ba8' }}>
                    <svg
                      className="w-8 md:w-12 h-8 md:h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.5.5.08 1-.04 1.5-.04s1 .12 1.5.04C19.16 26.74 23 22.55 23 17V7L12 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-black">
                    Quality
                  </h3>
                  <p className="text-sm md:text-base text-gray-700">
                    Premium materials for lasting builds
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Values Section */}
        <Section delay={0.4}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-black">
              Why Choose Formex
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Fast Delivery",
                icon: (
                  <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Rocket body */}
                    <path d="M32 8L24 28L18 32L24 36L32 56L40 36L46 32L40 28L32 8Z" fill="#E8E8E8" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round"/>
                    {/* Rocket top */}
                    <path d="M32 8L28 18L32 22L36 18L32 8Z" fill="#FF6B6B" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round"/>
                    {/* Window */}
                    <circle cx="32" cy="28" r="4" fill="#4ECDC4" stroke="#000000" strokeWidth="2"/>
                    {/* Left fin */}
                    <path d="M24 28L18 32L24 36L24 28Z" fill="#4ECDC4" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round"/>
                    {/* Right fin */}
                    <path d="M40 28L46 32L40 36L40 28Z" fill="#4ECDC4" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round"/>
                    {/* Flames */}
                    <path d="M28 56L26 60L28 58L30 62L32 58L34 62L36 58L38 60L40 56" fill="#FFB84D" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                desc: "Swift logistics and on-time delivery ensuring your construction projects stay on schedule.",
              },
              {
                title: "Custom Orders",
                icon: (
                  <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Wrench */}
                    <path d="M14 38L20 44L28 36L26 34C26 34 22 30 20 28C18 26 14 22 14 22L8 28C8 28 12 32 14 34C16 36 14 38 14 38Z" fill="#C0C0C0" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round"/>
                    <circle cx="17" cy="31" r="3" fill="#FFB84D" stroke="#000000" strokeWidth="2"/>
                    {/* Hammer handle */}
                    <path d="M36 28L50 42" stroke="#FFB84D" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M36 28L50 42" stroke="#000000" strokeWidth="2.5" strokeLinecap="round"/>
                    {/* Hammer head */}
                    <rect x="46" y="34" width="14" height="8" rx="1" transform="rotate(45 53 38)" fill="#C0C0C0" stroke="#000000" strokeWidth="2.5"/>
                    <rect x="48" y="36" width="10" height="4" rx="0.5" transform="rotate(45 53 38)" fill="#7A7A7A"/>
                  </svg>
                ),
                desc: "Tailored bulk orders and specialized equipment sourcing for residential, commercial, and industrial projects.",
              },
              {
                title: "Quality Guaranteed",
                icon: (
                  <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Trophy base */}
                    <rect x="20" y="48" width="24" height="6" rx="2" fill="#8B6914" stroke="#000000" strokeWidth="2.5"/>
                    {/* Trophy stem */}
                    <rect x="28" y="42" width="8" height="6" fill="#8B6914" stroke="#000000" strokeWidth="2.5"/>
                    {/* Trophy cup */}
                    <path d="M18 20C18 20 18 36 32 36C46 36 46 20 46 20H18Z" fill="#FFB84D" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round"/>
                    {/* Trophy top rim */}
                    <ellipse cx="32" cy="20" rx="14" ry="3" fill="#FFDB4D" stroke="#000000" strokeWidth="2.5"/>
                    {/* Left handle */}
                    <path d="M18 22C18 22 12 22 12 28C12 34 18 34 18 34" stroke="#000000" strokeWidth="2.5" fill="none"/>
                    {/* Right handle */}
                    <path d="M46 22C46 22 52 22 52 28C52 34 46 34 46 34" stroke="#000000" strokeWidth="2.5" fill="none"/>
                    {/* Shine effect */}
                    <ellipse cx="26" cy="26" rx="3" ry="4" fill="#FFF" opacity="0.4"/>
                  </svg>
                ),
                desc: "Premium construction materials from trusted suppliers with comprehensive warranties and certifications.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 text-center transition-all duration-300 group-hover:shadow-2xl">
                  <div className="mb-4 md:mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-black">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Story Section */}
        <Section delay={0.6}>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-video bg-gray-100 rounded-3xl border-2 border-black overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl mb-2 md:mb-4">🏗️</div>
                    <p className="text-lg md:text-xl text-gray-700">
                      Building Slovakia's Future
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-black">
                Our Journey
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4 md:mb-6">
                Established with a vision to revolutionize construction supply chains in Slovakia, Formex has grown from a regional supplier to a trusted wholesale partner serving contractors, developers, and industrial facilities nationwide.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Every product is carefully sourced, quality-checked, and delivered with precision timing to ensure your projects run smoothly from foundation to finish.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Who We Are / Shop Section */}
        <Section delay={0.8}>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-black">
                Who We Are
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8 md:mb-12 px-4">
                We&apos;re not just product distributors — we&apos;re construction professionals, logistics experts, and partners in your success.
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <Link
                  href="/shop"
                  className="group relative inline-block"
                >
                  <div className="relative overflow-hidden rounded-2xl border-2 border-black px-8 md:px-12 py-6 md:py-8 bg-white transition-all duration-300 group-hover:shadow-2xl group-hover:border-4">
                    {/* Fill animation background */}
                    <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" style={{ background: '#1a4ba8' }}></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 transition-all duration-300" style={{ fontFamily: 'Arial, sans-serif', color: '#000000 !important' }}>
                        Ready to Start Your Dream Project?
                      </h3>
                      <div className="flex items-center justify-center gap-2 transition-all duration-300">
                        <span className="text-black group-hover:text-white font-semibold text-base md:text-lg">
                          Browse Products
                        </span>
                        <svg
                          className="w-5 md:w-6 h-5 md:h-6 text-black group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Section>

        {/* Custom Quote Form Section */}
        <Section delay={1.0} className="bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black">
                Request a Custom Quote
              </h2>
              <p className="text-lg text-gray-700">
                Need a bulk order or custom solution? Fill out the form and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border-2 border-black p-6 md:p-10 shadow-xl"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">Full Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    className="border-2 border-gray-300 focus:border-blue-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">Email Address *</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@company.com"
                    className="border-2 border-gray-300 focus:border-blue-600 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">Company Name</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Your Company Ltd."
                    className="border-2 border-gray-300 focus:border-blue-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">Phone Number</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+421 XXX XXX XXX"
                    className="border-2 border-gray-300 focus:border-blue-600 rounded-lg"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2 text-black">Project Type *</label>
                <Input
                  required
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  placeholder="e.g., Residential Development, Commercial Building, Industrial Facility"
                  className="border-2 border-gray-300 focus:border-blue-600 rounded-lg"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2 text-black">Project Details & Requirements *</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your project, required materials, quantities, and timeline..."
                  rows={6}
                  className="border-2 border-gray-300 focus:border-blue-600 rounded-lg"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white font-bold text-lg py-6 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ background: '#1a4ba8' }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Submit Quote Request
                  </span>
                )}
              </Button>
            </motion.form>
          </div>
        </Section>

        {/* Contact Us Section */}
        <Section delay={1.2}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black">
              Need Help?
            </h2>
            <p className="text-lg text-gray-700">
              Contact us for support or bulk inquiries
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl border-2 border-black p-8 md:p-12 shadow-xl">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform" style={{ background: '#1a4ba8' }}>
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-black">Email</h3>
                  <a href="mailto:info@formexconstruction.sk" className="text-gray-700 hover:text-blue-600 transition-colors">
                    info@formexconstruction.sk
                  </a>
                </div>

                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform" style={{ background: '#1a4ba8' }}>
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-black">Phone</h3>
                  <a href="tel:+421123456789" className="text-gray-700 hover:text-blue-600 transition-colors">
                    +421 123 456 789
                  </a>
                </div>

                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform" style={{ background: '#1a4ba8' }}>
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-black">Location</h3>
                  <p className="text-gray-700">
                    Bratislava, Slovakia
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t-2 border-gray-200">
                <p className="text-center text-gray-700">
                  <span className="font-bold text-black">International Orders:</span> We currently do offer international shipping. For bulk or B2B inquiries, please contact us directly.
                </p>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* Important Notes */}
        <Section delay={1.4}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-black mb-8">
                Important Notes
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl border-2 border-black p-8 md:p-12"
            >
              <p className="text-center text-black leading-relaxed text-base md:text-lg">
                These terms are subject to change without notice. Please check this page regularly for updates. By placing an order with Formex, you agree to these terms and conditions. All orders are subject to availability and acceptance.
              </p>
            </motion.div>
          </div>
        </Section>
      </div>
    </div>
  );
}

// Reusable Section Component
function Section({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay }}
      className={`py-16 md:py-20 lg:py-32 px-4 sm:px-6 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}
