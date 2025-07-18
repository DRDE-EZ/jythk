"use client";

import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useState } from "react";

export default function SearchButton() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant={"ghost"} className="pt-[3px] rounded-xs">
            <SearchIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-xs">
          <DialogTitle>Search all items:</DialogTitle>
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
      <div className="relative m-5">
        <Input type="text" name="q" placeholder="Search" className="pe-10" />
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2" />
      </div>
    </form>
  );
}
