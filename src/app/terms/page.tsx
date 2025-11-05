"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useAnimation } from "framer-motion";
import { Truck, Package, Shield, Clock, Zap, Award } from "lucide-react";

// Interactive shipping animation background
const ShippingAnimation = () => {
  const [trucks, setTrucks] = useState<Array<{
    id: number;
    x: number;
    y: number;
    speed: number;
    size: number;
  }>>([]);

  useEffect(() => {
    const createTrucks = () => {
      const newTrucks = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: Math.random() * 0.5 + 0.2,
        size: Math.random() * 0.5 + 0.5,
      }));
      setTrucks(newTrucks);
    };

    createTrucks();
    window.addEventListener('resize', createTrucks);
    return () => window.removeEventListener('resize', createTrucks);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks(prev => prev.map(truck => ({
        ...truck,
        x: (truck.x + truck.speed + window.innerWidth) % window.innerWidth,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      {trucks.map(truck => (
        <motion.div
          key={truck.id}
          className="absolute text-blue-500"
          style={{
            left: truck.x,
            top: truck.y,
            fontSize: `${truck.size * 2}rem`,
          }}
          animate={{
            rotate: [0, 5, 0],
            scale: [truck.size, truck.size * 1.2, truck.size],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🚚
        </motion.div>
      ))}
      
      {/* Floating packages */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`package-${i}`}
          className="absolute text-orange-500 text-lg sm:text-xl md:text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        >
          📦
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced particle system for shipping theme
const ShippingParticles = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const colors = ['#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444'];
    const createParticles = () => {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
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
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `scale(${particle.size})`,
          }}
          animate={{
            scale: [particle.size, particle.size * 1.5, particle.size],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function TermsAndConditionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground"
    >
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-gray-50 to-orange-50"
      >
        {/* Shipping Particles Background */}
        <ShippingParticles />
        
        {/* Shipping Animation Background */}
        <ShippingAnimation />
        
        {/* Enhanced Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] md:bg-[size:100px_100px] animate-pulse"></div>
        </div>

        {/* Enhanced Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 lg:w-96 h-32 sm:h-48 md:h-64 lg:h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0], 
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 sm:w-40 md:w-56 lg:w-80 h-24 sm:h-40 md:h-56 lg:h-80 bg-orange-500/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, -80, 0], 
              y: [0, 60, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-20 sm:w-32 md:w-48 h-20 sm:h-32 md:h-48 bg-green-500/15 rounded-full blur-2xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.4, 1]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            {/* Shipping icon animation */}
            <motion.div
              className="mb-6 md:mb-8"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Truck className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mx-auto text-blue-600" />
            </motion.div>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent leading-tight">
              Shipping & Terms
            </h1>
            <motion.div 
              className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full"
              animate={{ width: [64, 120, 64] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto"
          >
            Fast, reliable shipping and transparent policies for your construction needs
          </motion.p>
          
          {/* Enhanced shipping stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 md:mt-12 max-w-4xl mx-auto"
          >
            {[
              { icon: Clock, label: "6-10 Days", desc: "Processing" },
              { icon: Truck, label: "24/7", desc: "Tracking" },
              { icon: Shield, label: "Secure", desc: "Delivery" },
              { icon: Award, label: "Premium", desc: "Service" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-lg sm:text-xl font-bold text-gray-800">{stat.label}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.desc}</div>
              </motion.div>
            ))}
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
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center cursor-pointer"
            whileHover={{ scale: 1.1, borderColor: "#3B82F6" }}
          >
            <motion.div
              className="w-1 h-3 bg-blue-600 rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Content Sections */}
      <div className="relative z-20 bg-background">
        {/* Shipping & Processing Section */}
        <Section delay={0.2}>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Processing & Shipping
              </h2>
              <div className="space-y-6 text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Processing Time:</strong>{" "}
                  Orders are typically built and dispatched within 6-10 business
                  days. Prebuilt systems ship faster; custom configurations may
                  require additional time depending on component availability.
                  We believe in delivering the best product we possibly can.
                </p>
                <p>
                  <strong className="text-foreground">
                    Shipping Rates & Carriers:
                  </strong>{" "}
                  We ship domestically via Royal Mail / DPD / UPS / DHL / FedEx,
                  depending on your location and product weight. Shipping fees
                  are calculated at checkout based on your delivery address and
                  chosen speed.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/10 rounded-xl border border-border backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 md:w-24 h-16 md:h-24 mx-auto mb-4 md:mb-6 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                    <svg
                      className="w-8 md:w-12 h-8 md:h-12 text-primary-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M12 11L4 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
                    Fast Delivery
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    10-12 business days
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Tracking & Support Section */}
        <Section delay={0.4}>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-video bg-gradient-to-br from-muted to-card rounded-xl border border-border overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl mb-2 md:mb-4">📦</div>
                    <p className="text-lg md:text-xl text-muted-foreground">
                      Real-time tracking
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Tracking & Support
              </h2>
              <div className="space-y-6 text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Tracking:</strong> Once
                  your order is shipped, you&apos;ll receive a confirmation
                  email with tracking details so you can monitor your delivery
                  in real time.
                </p>
                <p>
                  <strong className="text-foreground">Delivery Issues:</strong>{" "}
                  If your package is delayed, damaged, or lost in transit,
                  please contact us within 48 hours of the expected delivery
                  date. We&apos;ll assist in resolving the issue promptly.
                </p>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* International & Contact Section */}
        <Section delay={0.6} className="border-b border-border">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-destructive to-primary bg-clip-text text-transparent">
                International & Contact
              </h2>
              <div className="max-w-4xl mx-auto space-y-6 text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 md:mb-12">
                <p>
                  <strong className="text-foreground">
                    International Orders:
                  </strong>{" "}
                  We currently do offer international shipping. For bulk or B2B
                  inquiries, please contact us directly.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <div className="bg-gradient-to-r from-primary to-secondary p-1 rounded-xl">
                  <div className="bg-background rounded-lg px-8 md:px-12 py-6 md:py-8">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-foreground">
                      Need Help?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Contact us for support or bulk inquiries
                    </p>
                    <a
                      href="mailto:Mycropcuk@gmail.com"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-lg"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      mycropcuk@gmail.com
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Section>

        {/* Additional Terms Section */}
        <Section delay={0.8}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-foreground">
                Important Notes
              </h2>
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  These terms are subject to change without notice. Please check
                  this page regularly for updates. By placing an order with
                  MycroPC, you agree to these terms and conditions. All orders
                  are subject to availability and acceptance.
                </p>
              </div>
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
