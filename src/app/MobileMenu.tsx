"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { enhancedAuth } from "@/lib/enhanced-auth";
import { members } from "@wix/members";
import { collections } from "@wix/stores";
import {
  MenuIcon,
  ShoppingBag,
  Layers,
  ChevronRight,
  User,
  LogOut,
  LayoutDashboard,
  Briefcase,
  Handshake,
  Phone,
  Info,
  Globe,
  ArrowUpRight,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface MobileMenuProps {
  collections: collections.Collection[];
  loggedInMember: members.Member | null;
}

export default function MobileMenu({
  collections: collectionsList,
  loggedInMember,
}: MobileMenuProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);

  useEffect(() => {
    setIsOpen(false);
    setCollectionsExpanded(false);
  }, [pathname, searchParams]);

  const handleGoogleLogin = async () => {
    try {
      await enhancedAuth.loginWithGoogle("/customer-dashboard-protected");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";
      toast.error(message);
    }
  };

  const handleLogout = async () => {
    try {
      await enhancedAuth.logout();
    } catch {
      window.location.href = "/";
    }
  };

  const isActive = (href: string) => pathname === href;

  const pages = [
    {
      href: "/projects",
      label: "Projects",
      desc: "Our latest work",
      icon: Briefcase,
    },
    {
      href: "/partners",
      label: "Partners",
      desc: "Who we work with",
      icon: Handshake,
    },
    {
      href: "/contact",
      label: "Contact",
      desc: "Get in touch",
      icon: Phone,
    },
    {
      href: "/about",
      label: "About",
      desc: "Our story",
      icon: Info,
    },
    {
      href: "/portal",
      label: "Portal",
      desc: "Client access",
      icon: Globe,
    },
  ];

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="flex lg:hidden rounded-lg text-white hover:bg-zinc-800"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon className="!w-5 !h-5" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="left"
          hideCloseButton
          className="w-full !max-w-full bg-zinc-950 border-none p-0 overflow-y-auto"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>

          {/* ── Header with logo + close ──────── */}
          <div className="flex items-center justify-between px-6 pt-5">
            <Link
              href="/"
              className="flex items-center gap-3 group pt-1.5"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src="/partners/jyt-logo.png"
                alt="JYT Corp Logo"
                width={50}
                height={50}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-2xl font-bold text-white tracking-wider group-hover:text-emerald-400 transition-colors">
                JYT HK
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Accent divider */}
          <div className="mx-6 h-px bg-gradient-to-r from-emerald-500/60 via-emerald-500/20 to-transparent" />

          {/* ── Shop ──────────────────────────── */}
          <div className="px-5 pt-6 pb-2">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-3">
              Shop
            </p>

            <Link
              href="/shop"
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                isActive("/shop")
                  ? "bg-emerald-500/10 border border-emerald-500/25"
                  : "hover:bg-zinc-800/70"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  isActive("/shop")
                    ? "bg-emerald-500 text-black"
                    : "bg-zinc-800 text-emerald-400 group-hover:bg-emerald-500/20"
                }`}
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
              </div>
              <div className="flex-1">
                <span
                  className={`text-[15px] font-semibold block ${
                    isActive("/shop") ? "text-emerald-400" : "text-white"
                  }`}
                >
                  All Products
                </span>
                <span className="text-xs text-zinc-500">
                  Browse our full catalogue
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
            </Link>
          </div>

          {/* ── Collections ───────────────────── */}
          <div className="px-5 pb-2">
            <button
              onClick={() => setCollectionsExpanded(!collectionsExpanded)}
              className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl hover:bg-zinc-800/70 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-800 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <Layers className="w-[18px] h-[18px]" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[15px] font-semibold text-white block">
                  Collections
                </span>
                <span className="text-xs text-zinc-500">
                  {collectionsList.length} categories
                </span>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-zinc-600 transition-transform duration-300 ${
                  collectionsExpanded ? "rotate-90" : ""
                }`}
              />
            </button>

            {/* Expandable collection grid */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                collectionsExpanded
                  ? "max-h-[600px] opacity-100 mt-2"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-2 px-2 pb-2">
                {collectionsList.map((collection, index) => {
                  const active = isActive(`/collections/${collection.slug}`);
                  return (
                    <Link
                      key={collection._id}
                      href={`/collections/${collection.slug}`}
                      className={`relative flex flex-col justify-between p-3.5 rounded-xl border transition-all duration-200 group min-h-[72px] ${
                        active
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50"
                      }`}
                      style={{
                        transitionDelay: collectionsExpanded
                          ? `${index * 40}ms`
                          : "0ms",
                      }}
                    >
                      <span
                        className={`text-sm font-semibold block leading-snug ${
                          active ? "text-emerald-400" : "text-white"
                        }`}
                      >
                        {collection.name}
                      </span>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                          View
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-colors ${
                            active
                              ? "text-emerald-400"
                              : "text-zinc-600 group-hover:text-emerald-400"
                          }`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-6 h-px bg-zinc-800/80" />

          {/* ── Info ─────────────────────────── */}
          <div className="px-5 py-5">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-3">
              Info
            </p>

            <div className="space-y-1">
              {pages.map((page) => {
                const Icon = page.icon;
                const active = isActive(page.href);
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      active
                        ? "bg-emerald-500/10 border border-emerald-500/25"
                        : "hover:bg-zinc-800/70"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        active
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-zinc-800/80 text-zinc-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span
                        className={`text-[15px] font-medium block ${
                          active ? "text-emerald-400" : "text-white"
                        }`}
                      >
                        {page.label}
                      </span>
                      <span className="text-xs text-zinc-500">{page.desc}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-6 h-px bg-zinc-800/80" />

          {/* ── Account ───────────────────────── */}
          <div className="px-5 py-5">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-3">
              Account
            </p>

            {loggedInMember ? (
              <div className="space-y-1">
                {/* User info card */}
                <div className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-emerald-500/20">
                    {(
                      loggedInMember.contact?.firstName?.[0] || "U"
                    ).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-white truncate">
                      {loggedInMember.contact?.firstName || "Customer"}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {loggedInMember.loginEmail ||
                        loggedInMember.contact?.emails?.[0] ||
                        "Signed in"}
                    </p>
                  </div>
                </div>

                {/* Dashboard link */}
                <Link
                  href="/customer-dashboard-protected"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-zinc-800/70 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-zinc-800/80 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <LayoutDashboard className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[15px] font-medium text-white block">
                      My Dashboard
                    </span>
                    <span className="text-xs text-zinc-500">
                      Orders & settings
                    </span>
                  </div>
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-zinc-800/80 text-zinc-400 flex items-center justify-center group-hover:bg-red-500/20 group-hover:text-red-400 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[15px] font-medium text-zinc-400 group-hover:text-red-400 transition-colors block">
                      Sign out
                    </span>
                    <span className="text-xs text-zinc-600">
                      End your session
                    </span>
                  </div>
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-4 w-full px-4 py-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <User className="w-[18px] h-[18px] text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div className="flex-1 text-left">
                  <span className="text-[15px] font-semibold text-white block">
                    Sign In
                  </span>
                  <span className="text-xs text-zinc-500">
                    Continue with Google
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              </button>
            )}
          </div>

          {/* ── Footer ────────────────────────── */}
          <div className="mt-auto px-6 pb-8 pt-4">
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mb-4" />
            <p className="text-[11px] text-zinc-600 text-center tracking-wide">
              Jingyuntong Hong Kong
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
