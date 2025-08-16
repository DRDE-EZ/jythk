"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function AboutPage() {
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse"></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-56 md:w-80 h-56 md:h-80 bg-secondary/20 rounded-full blur-3xl"
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
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-foreground via-muted-foreground to-muted-foreground bg-clip-text text-transparent">
              About Us
            </h1>
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed"
          >
            Building the future of high-performance computing
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Content Sections */}
      <div className="relative z-20 bg-background">
        {/* Mission Section */}
        <Section delay={0.2}>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-4 md:mb-6">
                At MycroPc, we believe in more than just selling PCs — we build
                high-performance machines that power your passions.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Whether you&apos;re a gamer chasing ultra settings, a creator
                handling 4K workflows, or a professional needing rock-solid
                reliability, our custom-built PCs are tailored to your exact
                needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/10 rounded-3xl border border-border backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 md:w-24 h-16 md:h-24 mx-auto mb-4 md:mb-6 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-8 md:w-12 h-8 md:h-12 text-primary-foreground"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.5.5.08 1-.04 1.5-.04s1 .12 1.5.04C19.16 26.74 23 22.55 23 17V7L12 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
                    Performance
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Engineered for excellence
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Values Section */}
        <Section delay={0.4}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Our Values
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Performance",
                icon: "⚡",
                desc: "Uncompromising speed and power in every build",
              },
              {
                title: "Reliability",
                icon: "🛡️",
                desc: "Rock-solid systems you can depend on",
              },
              {
                title: "Support",
                icon: "🤝",
                desc: "Expert care that genuinely makes a difference",
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
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-card-foreground group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
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
              <div className="aspect-video bg-gradient-to-br from-muted to-card rounded-3xl border border-border overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl mb-2 md:mb-4">🚀</div>
                    <p className="text-lg md:text-xl text-muted-foreground">
                      Since 2025
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
                Our Journey
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-4 md:mb-6">
                Founded in 2025, we&apos;ve grown from a small local operation
                into a trusted name in the PC community.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Every system is rigorously tested, optimized, and backed by a
                support team that genuinely cares.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Team Section */}
        <Section delay={0.8} className="border-b border-border">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-destructive to-primary bg-clip-text text-transparent">
                Who We Are
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-8 md:mb-12 px-4">
                We&apos;re not just box shippers — we&apos;re builders, gamers,
                designers, and problem-solvers.
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <motion.a
                  href="/shop"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative block cursor-pointer"
                >
                  <div className="bg-gradient-to-r from-primary to-secondary p-1 rounded-2xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/25">
                    <div className="relative bg-background rounded-xl px-8 md:px-12 py-6 md:py-8 overflow-hidden">
                      {/* Fill animation background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:text-primary-foreground transition-all duration-300">
                          Welcome to the next level of computing.
                        </h3>
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                          <span className="text-primary-foreground font-medium text-sm md:text-base">
                            Shop Now
                          </span>
                          <svg
                            className="w-4 md:w-5 h-4 md:h-5 text-primary-foreground transform group-hover:translate-x-1 transition-transform duration-300"
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
                  </div>
                </motion.a>
              </motion.div>
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
