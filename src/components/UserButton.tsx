"use client";

import { enhancedAuth } from "@/lib/enhanced-auth";
import { isAdmin } from "@/lib/admin-config";
import { Button } from "./ui/button";
import { members } from "@wix/members";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  LogOutIcon,
  UserIcon,
  Package,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UserButtonProps {
  loggedInMember: members.Member | null;
  className?: string;
}

export default function UserButton({
  loggedInMember,
  className,
}: UserButtonProps) {

  const handleGoogleLogin = async () => {
    try {
      console.log("🔑 Starting Google sign-in...");
      await enhancedAuth.loginWithGoogle('/customer-dashboard-protected');
    } catch (error) {
      console.error("❌ Login error:", error);
      const message = error instanceof Error ? error.message : "Login failed. Please try again.";
      toast.error(message);
    }
  };

  const handleLogout = async () => {
    try {
      await enhancedAuth.logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback logout
      window.location.href = "/";
    }
  };

  // Check if user is admin
  const userEmail = loggedInMember?.loginEmail || loggedInMember?.contact?.emails?.[0] || '';
  const userIsAdmin = userEmail ? isAdmin(userEmail) : false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className={cn("rounded-md hover:bg-[#2a2a2a] transition-all text-white", className)}
        >
          <UserIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48 max-w-64 rounded-lg">
        {loggedInMember ? (
          <>
            <DropdownMenuLabel className="font-medium">
              {loggedInMember.contact?.firstName || "Customer"}
              {userIsAdmin && (
                <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                  Admin
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userIsAdmin && (
              <>
                <Link href="/admin-dashboard">
                  <DropdownMenuItem className="cursor-pointer">
                    <Shield className="mr-2 size-4" />
                    🔐 Admin Dashboard
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
              </>
            )}
            <Link href="/customer-dashboard-protected">
              <DropdownMenuItem className="cursor-pointer">
                <Package className="mr-2 size-4" />
                📊 My Dashboard
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
              <LogOutIcon className="mr-2 size-4" />
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={handleGoogleLogin} className="cursor-pointer">
            <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
