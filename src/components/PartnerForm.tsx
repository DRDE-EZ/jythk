"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Send } from "lucide-react";

export default function PartnerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      location: formData.get("location"),
      interest: formData.get("interest"),
      additionalInfo: formData.get("additionalInfo"),
    };

    try {
      const response = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Partner inquiry submitted successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-zinc-300 text-sm font-medium">
            Name <span className="text-emerald-400">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-zinc-300 text-sm font-medium">
            Email <span className="text-emerald-400">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-zinc-300 text-sm font-medium">
            Location <span className="text-emerald-400">*</span>
          </Label>
          <Input
            id="location"
            name="location"
            type="text"
            required
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
            placeholder="City, Country"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interest" className="text-zinc-300 text-sm font-medium">
            Interest <span className="text-emerald-400">*</span>
          </Label>
          <select
            id="interest"
            name="interest"
            required
            className="w-full h-10 px-3 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors"
          >
            <option value="" className="bg-zinc-800">Select your interest...</option>
            <option value="rooftop-installation" className="bg-zinc-800">Rooftop Installation</option>
            <option value="wholesale" className="bg-zinc-800">Wholesale</option>
            <option value="land-partnership" className="bg-zinc-800">Land Partnership</option>
            <option value="other" className="bg-zinc-800">Other</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo" className="text-zinc-300 text-sm font-medium">
          Additional Information
        </Label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          rows={4}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 resize-none transition-colors"
          placeholder="Tell us more about your project or partnership goals..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            Submit Partnership Inquiry
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
