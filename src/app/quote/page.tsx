"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Send, Building2, Sun, Battery, Wrench } from "lucide-react";
import Link from "next/link";

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
      title: "Solar Farm Quote",
      icon: Sun,
      color: "from-yellow-600 to-orange-600",
      description: "Large-scale ground-mounted solar installations"
    },
    "bess": {
      title: "BESS Quote",
      icon: Battery,
      color: "from-blue-600 to-cyan-600",
      description: "Battery Energy Storage Systems"
    },
    "rooftop": {
      title: "Rooftop Installation Quote",
      icon: Building2,
      color: "from-green-600 to-emerald-600",
      description: "Commercial and industrial rooftop solar"
    },
    "custom": {
      title: "Custom Project Quote",
      icon: Wrench,
      color: "from-purple-600 to-pink-600",
      description: "Tailored solar solutions"
    }
  };

  const currentProject = projectTypeInfo[projectType as keyof typeof projectTypeInfo] || projectTypeInfo.custom;
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

      toast.success("Quote request sent! We'll get back to you within 24 hours.");
      
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/projects" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${currentProject.color} flex items-center justify-center`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{currentProject.title}</h1>
          <p className="text-xl text-gray-400">{currentProject.description}</p>
        </div>

        {/* Quote Form */}
        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="bg-black border-gray-800 text-white"
                placeholder="Your Company Ltd."
              />
            </div>

            {/* Contact Name */}
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="bg-black border-gray-800 text-white"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-black border-gray-800 text-white"
                placeholder="john@company.com"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-black border-gray-800 text-white"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Project Capacity */}
            <div className="space-y-2">
              <Label htmlFor="projectCapacity">
                {projectType === "bess" ? "Storage Capacity (MWh)" : "Project Capacity (MW)"}
              </Label>
              <Input
                id="projectCapacity"
                name="projectCapacity"
                value={formData.projectCapacity}
                onChange={handleChange}
                className="bg-black border-gray-800 text-white"
                placeholder={projectType === "bess" ? "e.g., 50 MWh" : "e.g., 10 MW"}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Project Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="bg-black border-gray-800 text-white"
                placeholder="City, State/Province, Country"
              />
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <Label htmlFor="timeline">Expected Timeline</Label>
              <Input
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="bg-black border-gray-800 text-white"
                placeholder="e.g., Q2 2026"
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget">Estimated Budget</Label>
              <Input
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="bg-black border-gray-800 text-white"
                placeholder="e.g., $5M - $10M"
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label htmlFor="additionalDetails">Additional Project Details</Label>
            <Textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows={6}
              className="bg-black border-gray-800 text-white resize-none"
              placeholder="Tell us more about your project requirements, site conditions, grid connection details, or any specific questions you have..."
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r ${currentProject.color} hover:opacity-90 text-white font-semibold py-6 text-lg`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Send className="w-5 h-5 mr-2" />
                Request Quote
              </span>
            )}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            By submitting this form, you agree to our terms and privacy policy. We'll respond within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}
