"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

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
              Terms & Conditions
            </h1>
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed"
          >
            Shipping, delivery, and important policies
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
