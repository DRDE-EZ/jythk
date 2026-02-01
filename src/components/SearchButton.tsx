"use client";

import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useState } from "react";

interface SearchButtonProps {
  className?: string;
}

export default function SearchButton({ className }: SearchButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className={cn(className)}>
          <Button
            size="icon"
            variant={"ghost"}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#2a2a2a] hover:scale-105 transition-all"
          >
            <SearchIcon className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-xs bg-white border-2 border-black">
          <DialogTitle className="text-black font-bold text-lg">Search all items:</DialogTitle>
          <SearchField onSubmitSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface SearchFieldProps {
  className?: string;
  onSubmitSuccess?: () => void;
}

export function SearchField({ className, onSubmitSuccess }: SearchFieldProps) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/shop?q=${encodeURIComponent(q)}`);
    onSubmitSuccess?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="GET"
      action="/shop"
      className={cn("grow", className)}
    >
      <div className="relative">
        <Input
          type="text"
          name="q"
          placeholder="Search products..."
          className="pe-12 py-6 text-base bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors"
        >
          <SearchIcon className="size-5 text-black" />
        </button>
      </div>
    </form>
  );
}
