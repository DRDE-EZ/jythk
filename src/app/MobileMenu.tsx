"use client";

import SearchButton from "@/components/SearchButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import UserButton from "@/components/UserButton";
import { members } from "@wix/members";
import { collections } from "@wix/stores";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  collections: collections.Collection[];
  loggedInMember: members.Member | null;
}

export default function MobileMenu({
  collections,
  loggedInMember,
}: MobileMenuProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="flex lg:hidden rounded-none"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-full bg-[#1f1f1f] border-gray-800">
          <SheetHeader>
            <SheetTitle className="text-white">JYT HK</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center space-y-6 py-8">
            <Link 
              href="/collections"
              className="text-lg font-semibold text-white hover:text-blue-400 transition-colors"
            >
              Collections
            </Link>
            <Link 
              href="/projects"
              className="text-lg font-semibold text-white hover:text-blue-400 transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/partners"
              className="text-lg font-semibold text-white hover:text-blue-400 transition-colors"
            >
              Partners
            </Link>
            <Link 
              href="/contact"
              className="text-lg font-semibold text-white hover:text-blue-400 transition-colors"
            >
              Contact
            </Link>
            <Link 
              href="/about"
              className="text-lg font-semibold text-white hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/portal"
              className="text-lg font-semibold text-white hover:text-blue-400 transition-colors"
            >
              Portal
            </Link>
            
            {loggedInMember ? (
              // Show dashboard option for logged-in users
              <div className="text-center mt-6 pt-6 border-t border-gray-800 w-full">
                <h3 className="text-lg font-semibold mb-4 text-white">Welcome back!</h3>
                <Link 
                  href="/customer-dashboard-protected"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  📊 My Dashboard
                </Link>
              </div>
            ) : (
              // Show login option for non-logged-in users
              <div className="text-center mt-6 pt-6 border-t border-gray-800 w-full">
                <h3 className="text-lg font-semibold mb-4 text-white">Get Started</h3>
                <UserButton loggedInMember={loggedInMember} />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
