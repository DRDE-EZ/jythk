"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useAnimation } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  HardHat, 
  Truck, 
  Building, 
  Settings, 
  Shield, 
  Clock, 
  Users, 
  Award,
  Zap,
  Target
} from "lucide-react";
import Link from "next/link";

// Interactive particle system for background
const ParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }));
      setParticles(newParticles);
    };

    createParticles();
    window.addEventListener('resize', createParticles);
    return () => window.removeEventListener('resize', createParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-500 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            transform: `scale(${particle.size})`,
          }}
          animate={{
            scale: [particle.size, particle.size * 1.5, particle.size],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced construction animation component
const ConstructionAnimation = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: [0, 360],
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    });
  }, [controls]);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-5">
      {/* Animated construction elements */}
      <motion.div
        className="absolute top-10 right-10 text-4xl sm:text-6xl"
        animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        🏗️
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 left-10 text-3xl sm:text-5xl"
        animate={{ x: [0, 20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        🚜
      </motion.div>
      
      <motion.div
        className="absolute top-1/3 left-1/4 text-4xl sm:text-6xl"
        animate={controls}
      >
        🚚
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 right-1/3 text-3xl sm:text-5xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        ⚒️
      </motion.div>
      
      <motion.div
        className="absolute top-2/3 right-1/4 text-2xl sm:text-4xl"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        🔨
      </motion.div>
    </div>
  );
};

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
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100"
      >
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Animated Background Grid with better responsiveness */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:75px_75px] md:bg-[size:100px_100px] animate-pulse"></div>
        </div>

        {/* Enhanced Construction Equipment Background */}
        <ConstructionAnimation />

        {/* Floating Orbs with improved responsiveness */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 lg:w-96 h-32 sm:h-48 md:h-64 lg:h-96 rounded-full blur-3xl"
            style={{ background: 'rgba(26,75,168,0.1)' }}
            animate={{ 
              x: [0, 50, 0], 
              y: [0, -25, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 sm:w-40 md:w-56 lg:w-80 h-24 sm:h-40 md:h-56 lg:h-80 rounded-full blur-3xl"
            style={{ background: 'rgba(26,75,168,0.15)' }}
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 30, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-20 sm:w-32 md:w-48 h-20 sm:h-32 md:h-48 rounded-full blur-2xl"
            style={{ background: 'rgba(255,165,0,0.1)' }}
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 md:mb-6 text-black leading-tight">
              About Formex
            </h1>
            <motion.div 
              className="w-12 sm:w-16 md:w-24 h-1 mx-auto rounded-full" 
              style={{ background: '#1a4ba8' }}
              animate={{ width: [48, 96, 48] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto"
          >
            Trusted imports. On-time supply for tomorrow's builds.
          </motion.p>
          
          {/* Enhanced Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 md:mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(26,75,168,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-2xl text-sm sm:text-base md:text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Explore Our Story
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1 h-3 rounded-full mt-2"
              style={{ background: '#1a4ba8' }}
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
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
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-black flex items-center justify-center relative overflow-hidden">
                {/* Construction badge */}
                <div className="absolute top-4 right-4">
                  <HardHat className="w-8 h-8 text-orange-500" />
                </div>
                <div className="text-center">
                  <div className="w-16 md:w-24 h-16 md:h-24 mx-auto mb-4 md:mb-6 rounded-2xl flex items-center justify-center relative" style={{ background: '#1a4ba8' }}>
                    <Shield className="w-8 md:w-12 h-8 md:h-12 text-white" />
                    {/* Certification badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-black">
                    Certified Quality
                  </h3>
                  <p className="text-sm md:text-base text-gray-700">
                    Premium materials for lasting builds
                  </p>
                </div>
                {/* Construction pattern */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400 opacity-20"></div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Values Section */}
        <Section delay={0.4}>
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-black">
              Why Choose Formex
            </h2>
            <motion.div
              className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full"
              animate={{ width: [64, 96, 64] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: "Lightning Fast Delivery",
                icon: (
                  <div className="relative">
                    <Truck className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-blue-600" />
                    <Zap className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-yellow-500 absolute -top-1 -right-1" />
                  </div>
                ),
                desc: "Swift logistics and on-time delivery ensuring your construction projects stay on schedule with real-time tracking.",
                badge: "24/7 Service",
                color: "blue"
              },
              {
                title: "Custom Construction Solutions",
                icon: (
                  <div className="relative">
                    <Settings className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-orange-600" />
                    <HardHat className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-orange-400 absolute -bottom-1 -right-1" />
                  </div>
                ),
                desc: "Tailored bulk orders and specialized equipment sourcing for residential, commercial, and industrial projects of any scale.",
                badge: "Bulk Orders",
                color: "orange"
              },
              {
                title: "Certified Quality Assurance",
                icon: (
                  <div className="relative">
                    <Award className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-green-600" />
                    <Shield className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-green-400 absolute -top-1 -right-1" />
                  </div>
                ),
                desc: "Premium construction materials from trusted suppliers with comprehensive warranties, certifications, and quality guarantees.",
                badge: "ISO Certified",
                color: "green"
              },
              {
                title: "Expert Construction Team",
                icon: (
                  <div className="relative">
                    <Users className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-purple-600" />
                    <Building className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-purple-400 absolute -bottom-1 -right-1" />
                  </div>
                ),
                desc: "Professional construction consultants and project managers ready to support your builds from planning to completion.",
                badge: "15+ Years",
                color: "purple"
              },
              {
                title: "On-Site Support",
                icon: (
                  <div className="relative">
                    <Target className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-red-600" />
                    <Clock className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-red-400 absolute -top-1 -right-1" />
                  </div>
                ),
                desc: "Field engineers and technical support available for installation guidance, troubleshooting, and project optimization.",
                badge: "Emergency Service",
                color: "red"
              },
              {
                title: "Sustainable Building",
                icon: (
                  <div className="relative">
                    <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-green-700 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl">
                      🌱
                    </div>
                    <Shield className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-green-500 absolute -top-1 -right-1" />
                  </div>
                ),
                desc: "Eco-friendly construction materials and sustainable building solutions that meet environmental standards and regulations.",
                badge: "Green Certified",
                color: "green"
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                className="group relative"
              >
                <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-6 md:p-8 text-center transition-all duration-300 group-hover:shadow-2xl h-full flex flex-col relative overflow-hidden">
                  {/* Animated background gradient on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br from-${value.color}-50 to-${value.color}-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  />
                  
                  {/* Badge */}
                  <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <motion.span 
                      className={`bg-${value.color}-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {value.badge}
                    </motion.span>
                  </div>
                  
                  <div className="mb-4 md:mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300 mt-2 sm:mt-4 relative z-10">
                    {value.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-black relative z-10">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed flex-grow relative z-10">
                    {value.desc}
                  </p>
                  
                  {/* Enhanced construction pattern footer */}
                  <motion.div 
                    className="mt-4 sm:mt-6 h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-20 rounded-full relative z-10"
                    whileHover={{ opacity: 0.4, height: 8 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Floating construction icons */}
                  <motion.div
                    className="absolute top-2 right-2 text-lg opacity-5 group-hover:opacity-20 transition-opacity duration-300"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    🔧
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Construction Statistics Section */}
        <Section delay={0.5} className="bg-gradient-to-r from-blue-50 to-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black">
              Our Construction Impact
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Powering Slovakia's construction industry with reliable supply chains and quality materials
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                number: "500+",
                label: "Projects Completed",
                icon: <Building className="w-8 h-8 text-blue-600" />,
                color: "blue"
              },
              {
                number: "50K+",
                label: "Materials Delivered (Tons)",
                icon: <Truck className="w-8 h-8 text-orange-600" />,
                color: "orange"
              },
              {
                number: "200+",
                label: "Construction Partners",
                icon: <Users className="w-8 h-8 text-green-600" />,
                color: "green"
              },
              {
                number: "15+",
                label: "Years Experience",
                icon: <Award className="w-8 h-8 text-purple-600" />,
                color: "purple"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="bg-white rounded-2xl border-2 border-black p-6 text-center transition-all duration-300 group-hover:shadow-xl">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-black">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-700 font-medium">
                    {stat.label}
                  </div>
                  {/* Construction accent */}
                  <div className={`mt-4 h-1 w-full rounded-full bg-${stat.color}-500 opacity-20`}></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Construction equipment showcase */}
          <div className="mt-16 grid grid-cols-3 md:grid-cols-6 gap-8 opacity-60">
            {['🚛', '🏗️', '🚜', '⚒️', '🔨', '⛏️'].map((emoji, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl mb-2">{emoji}</div>
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
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-gray-100 rounded-3xl border-2 border-black overflow-hidden relative">
                {/* Construction site illustration */}
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Sky and buildings background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-200 to-blue-100"></div>
                  
                  {/* Construction elements */}
                  <div className="relative z-10 text-center">
                    <div className="flex justify-center items-end space-x-4 mb-4">
                      {/* Buildings being constructed */}
                      <div className="bg-gray-300 w-12 h-16 rounded-t-lg border-2 border-gray-400 relative">
                        <div className="absolute top-2 left-2 right-2 bottom-2 bg-blue-200 rounded opacity-50"></div>
                        <HardHat className="w-4 h-4 text-orange-500 absolute -top-2 left-1/2 transform -translate-x-1/2" />
                      </div>
                      <div className="bg-gray-300 w-16 h-20 rounded-t-lg border-2 border-gray-400 relative">
                        <div className="absolute top-2 left-2 right-2 bottom-2 bg-blue-200 rounded opacity-50"></div>
                        <Building className="w-4 h-4 text-blue-600 absolute top-1 left-1/2 transform -translate-x-1/2" />
                      </div>
                      <div className="bg-gray-300 w-10 h-12 rounded-t-lg border-2 border-gray-400 relative">
                        <div className="absolute top-1 left-1 right-1 bottom-1 bg-blue-200 rounded opacity-50"></div>
                      </div>
                    </div>
                    
                    {/* Construction vehicles */}
                    <div className="flex justify-center space-x-6 mb-2">
                      <motion.div
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Truck className="w-8 h-8 text-orange-600" />
                      </motion.div>
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🏗️
                      </motion.div>
                    </div>
                    
                    <p className="text-lg md:text-xl text-gray-700 font-semibold">
                      Building Slovakia's Future
                    </p>
                  </div>
                  
                  {/* Construction safety stripes */}
                  <div className="absolute bottom-0 left-0 right-0 h-3 bg-yellow-400 opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-black to-transparent opacity-20" style={{background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'}}></div>
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
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-black transition-all duration-300" style={{ fontFamily: 'Arial, sans-serif' }}>
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
        <Section delay={1.0} className="bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <div className="bg-orange-100 rounded-full p-4 border-2 border-orange-300">
                  <HardHat className="w-12 h-12 text-orange-600" />
                </div>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black">
                Request a Construction Quote
              </h2>
              <p className="text-lg text-gray-700">
                Professional construction supply estimates for projects of any scale. Our experts will provide detailed pricing within 24 hours.
              </p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border-2 border-black p-6 md:p-10 shadow-xl relative overflow-hidden"
            >
              {/* Construction warning stripes */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
              <div className="absolute top-0 left-0 right-0 h-3 opacity-30" style={{background: 'repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(0,0,0,0.1) 15px, rgba(0,0,0,0.1) 30px)'}}></div>
              
              {/* Form content with better spacing */}
              <div className="mt-4">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-600" />
                      Full Name *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      className="border-2 border-gray-300 focus:border-blue-600 rounded-lg h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-600" />
                      Email Address *
                    </label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@company.com"
                      className="border-2 border-gray-300 focus:border-blue-600 rounded-lg h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black flex items-center">
                      <Building className="w-4 h-4 mr-2 text-blue-600" />
                      Company Name
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Construction Company Ltd."
                      className="border-2 border-gray-300 focus:border-blue-600 rounded-lg h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-blue-600" />
                      Phone Number
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+421 XXX XXX XXX"
                      className="border-2 border-gray-300 focus:border-blue-600 rounded-lg h-12"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2 text-black flex items-center">
                    <HardHat className="w-4 h-4 mr-2 text-orange-600" />
                    Construction Project Type *
                  </label>
                  <select
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    className="w-full border-2 border-gray-300 focus:border-blue-600 rounded-lg h-12 px-3 bg-white"
                  >
                    <option value="">Select project type...</option>
                    <option value="residential">Residential Development</option>
                    <option value="commercial">Commercial Building</option>
                    <option value="industrial">Industrial Facility</option>
                    <option value="infrastructure">Infrastructure Project</option>
                    <option value="renovation">Renovation/Refurbishment</option>
                    <option value="custom">Custom Construction</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2 text-black flex items-center">
                    <Settings className="w-4 h-4 mr-2 text-green-600" />
                    Project Details & Material Requirements *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your construction project:
• Project size and scope
• Required materials (concrete, steel, equipment, etc.)
• Estimated quantities
• Timeline and delivery requirements
• Any special specifications or certifications needed"
                    rows={8}
                    className="border-2 border-gray-300 focus:border-blue-600 rounded-lg"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white font-bold text-lg py-6 rounded-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden"
                    style={{ background: '#1a4ba8' }}
                  >
                    {/* Button background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <span className="relative z-10">
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                          Processing Request...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-5 h-5" />
                          Submit Construction Quote Request
                        </span>
                      )}
                    </span>
                  </Button>
                </motion.div>

                {/* Trust indicators */}
                <div className="mt-6 flex justify-center items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-green-500" />
                    SSL Secured
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-blue-500" />
                    24hr Response
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1 text-purple-500" />
                    Free Estimates
                  </div>
                </div>
              </div>
            </motion.form>
          </div>
        </Section>

        {/* Contact Us Section */}
        <Section delay={1.2}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-700">
              Ready to start your construction project? Contact our experts today
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl border-2 border-black p-8 md:p-12 shadow-xl relative overflow-hidden">
              {/* Construction pattern background */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="w-12 h-12 mx-auto mb-4 text-[#1a4ba8]" />
                  <h3 className="font-bold text-lg mb-2 text-black">Email Support</h3>
                  <a href="mailto:info@formexconstruction.sk" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    info@formexconstruction.sk
                  </a>
                  <p className="text-sm text-gray-500 mt-1">24/7 Response</p>
                </motion.div>

                <motion.div 
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="w-12 h-12 mx-auto mb-4 text-[#1a4ba8]" />
                  <h3 className="font-bold text-lg mb-2 text-black">Call Direct</h3>
                  <a href="tel:+421123456789" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    +421 123 456 789
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Emergency Hotline</p>
                </motion.div>

                <motion.div 
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-[#1a4ba8]" />
                  <h3 className="font-bold text-lg mb-2 text-black">Visit Our Warehouse</h3>
                  <p className="text-gray-700 font-medium">
                    Bratislava, Slovakia
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Open Mon-Sat</p>
                </motion.div>
              </div>

              <div className="mt-10 pt-8 border-t-2 border-gray-200 relative">
                {/* Construction tools decoration */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-20">
                  <div className="text-lg">🔨</div>
                  <div className="text-lg">⚒️</div>
                  <div className="text-lg">🔧</div>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-center mb-3">
                    <Truck className="w-6 h-6 text-blue-600 mr-2" />
                    <span className="font-bold text-black text-lg">International Construction Projects</span>
                  </div>
                  <p className="text-center text-gray-700">
                    We now offer international shipping and cross-border construction supply services. For bulk orders, B2B partnerships, or large-scale project support, contact our international team directly.
                  </p>
                </div>
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
