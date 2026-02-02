"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Send, Building2, Sun, Battery, Wrench } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export default function QuotePage() {
  const searchParams = useSearchParams();
  const projectType = searchParams.get("type") || "custom";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectType: projectType,
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    projectCapacity: "",
    location: "",
    timeline: "",
    budget: "",
    additionalDetails: "",
  });

  const projectTypeInfo = {
    "solar-farm": {
      title: "Solar Farm",
      icon: Sun,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-500 to-orange-500",
      description: "Large-scale ground-mounted solar installations",
    },
    bess: {
      title: "BESS",
      icon: Battery,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
      description: "Battery Energy Storage Systems",
    },
    rooftop: {
      title: "Rooftop Installation",
      icon: Building2,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-500 to-green-500",
      description: "Commercial and industrial rooftop solar",
    },
    custom: {
      title: "Custom Project",
      icon: Wrench,
      color: "from-indigo-500 to-violet-500",
      bgColor: "bg-gradient-to-br from-indigo-500 to-violet-500",
      description: "Tailored solar solutions for unique requirements",
    },
  };

  const currentProject =
    projectTypeInfo[projectType as keyof typeof projectTypeInfo] ||
    projectTypeInfo.custom;
  const Icon = currentProject.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit quote request");

      toast.success(
        "Quote request sent! We'll get back to you within 24 hours."
      );

      // Reset form
      setFormData({
        projectType: projectType,
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        projectCapacity: "",
        location: "",
        timeline: "",
        budget: "",
        additionalDetails: "",
      });
    } catch (error) {
      console.error("Quote submission error:", error);
      toast.error("Failed to send quote request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-emerald-900/20 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            {/* Back Button */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>

            {/* Header */}
            <div className="text-center">
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${currentProject.bgColor} flex items-center justify-center shadow-lg`}
              >
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">
                {currentProject.title} Quote
              </h1>
              <p className="text-lg text-zinc-400">{currentProject.description}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Form Section */}
      <AnimatedSection delay={0.2}>
        <section className="pb-16 sm:pb-20 md:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-sm">
                      1
                    </span>
                    Contact Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="companyName"
                        className="text-zinc-300 text-sm font-medium"
                      >
                        Company Name <span className="text-emerald-400">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                        placeholder="Your Company Ltd."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="contactName"
                        className="text-zinc-300 text-sm font-medium"
                      >
                        Contact Name <span className="text-emerald-400">*</span>
                      </Label>
                      <Input
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-zinc-300 text-sm font-medium"
                      >
                        Email Address <span className="text-emerald-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-zinc-300 text-sm font-medium"
                      >
                        Phone Number <span className="text-emerald-400">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-zinc-800" />

                {/* Project Details */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-sm">
                      2
                    </span>
                    Project Details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="projectCapacity"
                        className="text-zinc-300 text-sm font-medium"
                      >
                        {projectType === "bess"
                          ? "Storage Capacity (MWh)"
                          : "Project Capacity (MW)"}
                      </Label>
                      <Input
                        id="projectCapacity"
                        name="projectCapacity"
                        value={formData.projectCapacity}
                        onChange={handleChange}
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                        placeholder={
                          projectType === "bess" ? "e.g., 50 MWh" : "e.g., 10 MW"
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="location"
                        className="text-zinc-300 text-sm font-medium"
                      >
                        Project Location
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                        placeholder="City, Country"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="timeline"
                        className="text-zinc-300 text-sm font-medium"
                      >
                        Expected Timeline
                      </Label>
                      <Input
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                        placeholder="e.g., Q2 2026"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="budget"
                        className="text-zinc-300 text-sm font-medium"
                      >
                        Estimated Budget
                      </Label>
                      <Input
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                        placeholder="e.g., $5M - $10M"
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-zinc-800" />

                {/* Additional Details */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-sm">
                      3
                    </span>
                    Additional Information
                  </h2>
                  <div className="space-y-2">
                    <Label
                      htmlFor="additionalDetails"
                      className="text-zinc-300 text-sm font-medium"
                    >
                      Project Details & Questions
                    </Label>
                    <Textarea
                      id="additionalDetails"
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleChange}
                      rows={5}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 resize-none rounded-lg"
                      placeholder="Tell us more about your project requirements, site conditions, grid connection details, or any specific questions..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending Request...
                      </span>
                    ) : (
                      <>
                        Request Quote
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-sm text-zinc-500 text-center mt-4">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
