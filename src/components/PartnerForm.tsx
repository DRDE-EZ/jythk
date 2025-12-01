"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white text-lg">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          className="bg-gray-900/50 border-gray-700 text-white focus:border-blue-500"
          placeholder="Your full name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white text-lg">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="bg-gray-900/50 border-gray-700 text-white focus:border-blue-500"
          placeholder="your@email.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-white text-lg">
          Location <span className="text-red-500">*</span>
        </Label>
        <Input
          id="location"
          name="location"
          type="text"
          required
          className="bg-gray-900/50 border-gray-700 text-white focus:border-blue-500"
          placeholder="City, Country"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interest" className="text-white text-lg">
          Interest <span className="text-red-500">*</span>
        </Label>
        <select
          id="interest"
          name="interest"
          required
          className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-700 text-white rounded-md focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select your interest...</option>
          <option value="rooftop-installation">Rooftop Installation</option>
          <option value="wholesale">Wholesale</option>
          <option value="land-partnership">Land Partnership</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo" className="text-white text-lg">
          Additional Information
        </Label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          rows={4}
          className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-700 text-white rounded-md focus:border-blue-500 focus:outline-none resize-none"
          placeholder="Tell us more about your project or partnership goals..."
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
      >
        {isSubmitting ? "Submitting..." : "Submit Partnership Inquiry"}
      </Button>
    </form>
  );
}
