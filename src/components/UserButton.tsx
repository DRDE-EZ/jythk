"use client";

import useAuth from "@/hooks/auth";
import { Button } from "./ui/button";
import { members } from "@wix/members";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Check,
  LogInIcon,
  LogOutIcon,
  Monitor,
  Moon,
  Sun,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface UserButtonProps {
  loggedInMember: members.Member | null;
  className?: string;
}

export default function UserButton({
  loggedInMember,
  className,
}: UserButtonProps) {
  const { login, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className={cn("rounded-md hover:bg-white transition-all text-white hover:text-[#1a4ba8]", className)}
        >
          <UserIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-44 max-w-64 rounded-xs">
        {loggedInMember && (
          <>
            <DropdownMenuLabel>
              Logged in as{" "}
              {loggedInMember.contact?.firstName || loggedInMember.loginEmail}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>
                <UserIcon className="mr-1 size-4" />
                Profile
              </DropdownMenuItem>
            </Link>
          </>
        )}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => {
                  setTheme("system");
                  localStorage.setItem("theme-set-manually", "true");
                }}
              >
                <Monitor className="mr-2 size-4" />
                System Default
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTheme("light");
                  localStorage.setItem("theme-set-manually", "true");
                }}
              >
                <Sun className="mr-2 size-4" />
                Light
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTheme("dark");
                  localStorage.setItem("theme-set-manually", "true");
                }}
              >
                <Moon className="mr-2 size-4" />
                Dark
                {theme === "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {loggedInMember ? (
          <DropdownMenuItem onClick={() => logout()}>
            <LogOutIcon size={4} className="mr-1" />
            Logout
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => login()}>
            <LogInIcon size={4} className="mr-1" />
            Login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
