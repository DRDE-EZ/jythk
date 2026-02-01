"use client";

import { Input } from "@/components/ui/input";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="bg-zinc-900/50 border-t border-zinc-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Jingyuntong Hong Kong
                  </h2>
                  <div className="mt-2 w-12 h-0.5 bg-emerald-500"></div>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400 max-w-sm">
                  Your trusted overseas supplier for solar solutions and custom
                  projects. Quality products delivered on time.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {[
                    {
                      name: "Twitter",
                      path: "M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z",
                    },
                    {
                      name: "LinkedIn",
                      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                    },
                    {
                      name: "WeChat",
                      path: "M18.574 11.347c-1.265-.826-2.897-1.347-4.674-1.347-3.866 0-7 2.687-7 6 0 1.593.719 3.048 1.903 4.133l-.477 1.867 2.156-1.078c.789.209 1.619.333 2.518.333 3.866 0 7-2.687 7-6 0-1.407-.552-2.71-1.426-3.908zM9.5 12a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM8.9 4c-3.314 0-6 2.239-6 5 0 1.327.563 2.537 1.497 3.454l-.375 1.546 1.694-.847c.658.174 1.35.289 2.084.313-.107-.361-.17-.739-.17-1.131 0-3.314 3.134-6 7-6 .208 0 .412.014.614.033C14.323 5.041 11.843 4 8.9 4z",
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      title={social.name}
                      className="flex w-9 h-9 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400"
                    >
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d={social.path}></path>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {/* Company */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-4">
                    Company
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { name: "About", href: "/about" },
                      { name: "Shop", href: "/shop" },
                      { name: "Projects", href: "/projects" },
                      { name: "Contact", href: "/contact" },
                    ].map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-4">
                    Support
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { name: "Help Center", href: "/support" },
                      { name: "Shipping", href: "/shipping" },
                      { name: "Terms", href: "/terms" },
                      { name: "Privacy", href: "/privacy" },
                    ].map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-4">
                    Contact
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="mailto:info@jythk.com"
                        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-200"
                      >
                        <Mail className="w-4 h-4" />
                        info@jythk.com
                      </a>
                    </li>
                    <li>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <MapPin className="w-4 h-4" />
                        Hong Kong SAR
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-semibold text-white mb-4">
                Newsletter
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                Subscribe for product updates and industry news.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-10"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent border border-zinc-700 hover:border-emerald-500 text-white hover:text-emerald-400 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} Jingyuntong Hong Kong. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
