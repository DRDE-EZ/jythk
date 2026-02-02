"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Shield, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Hero Section */}
      <AnimatedSection>
        <section className="relative py-20 sm:py-24 md:py-28 bg-gradient-to-b from-emerald-900/20 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
              Client Access
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
              Portal
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
              Access your dashboard to manage orders and track project progress
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Portal Access Cards */}
      <AnimatedSection delay={0.2}>
        <section className="pb-16 sm:pb-20 md:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Customer Dashboard */}
              <div className="bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-800 hover:border-zinc-700 transition-all">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                  <User className="w-7 h-7 text-emerald-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">Customer Portal</h3>
                <p className="text-zinc-400 mb-6">
                  Track orders, view purchase history, and manage your account
                </p>

                <div className="space-y-3">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full border-zinc-700 bg-transparent hover:bg-zinc-800 hover:border-zinc-600 text-white"
                  >
                    <Link href="/customer-dashboard-demo">
                      Try Demo
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold"
                  >
                    <Link href="/customer-dashboard-protected" className="flex items-center justify-center gap-2">
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 text-xs text-zinc-500 space-y-1">
                  <p>• Google OAuth authentication</p>
                  <p>• Automatic redirect for admin users</p>
                </div>
              </div>

              {/* Admin Dashboard */}
              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-700 hover:border-emerald-500/30 transition-all">
                <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-black" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">Admin Portal</h3>
                <p className="text-zinc-400 mb-6">
                  Manage inventory, oversee orders, and access admin functions
                </p>

                <div className="space-y-3">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full border-zinc-600 bg-transparent hover:bg-zinc-700 hover:border-zinc-500 text-white"
                  >
                    <Link href="/admin-dashboard-demo">
                      Admin Demo
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-white hover:bg-zinc-100 text-black font-semibold"
                  >
                    <Link href="/admin-dashboard" className="flex items-center justify-center gap-2">
                      Admin Access
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-700 text-xs text-zinc-500 space-y-1">
                  <p>• Restricted to authorized emails</p>
                  <p>• Full system management access</p>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-8 text-center">
              <p className="text-sm text-zinc-500">
                Demo accounts include sample data for testing
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection delay={0.3}>
        <section className="pb-24 sm:pb-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 sm:p-10">
              <p className="text-lg text-zinc-400 mb-6">
                New to our platform? Learn more about our services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-zinc-700 bg-transparent hover:bg-zinc-800 hover:border-zinc-600 text-white"
                >
                  <Link href="/about">About Us</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold"
                >
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
