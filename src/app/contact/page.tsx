"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AnimatedSection from "@/components/AnimatedSection";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Message sent successfully!");
        form.reset();
      } else {
        toast.error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@jythk.com", "support@jythk.com"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+852 1234 5678", "+852 8765 4321"],
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Business District", "Hong Kong"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <AnimatedSection>
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-emerald-900/20 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
              Get In Touch
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
              Contact Us
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto">
              We&apos;re here to help. Reach out to us for any inquiries or support.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Main Content */}
      <AnimatedSection delay={0.2}>
        <section className="pb-16 sm:pb-20 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Side - Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Contact Information
                  </h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Have a question or need assistance? Our team is ready to help
                    you. Fill out the form or reach us directly through any of the
                    channels below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-colors"
                      >
                        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                          <Icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1 text-sm">
                            {item.title}
                          </h3>
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-zinc-400 text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Response Banner */}
                <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <h3 className="text-white font-semibold">Quick Response</h3>
                  </div>
                  <p className="text-zinc-400 text-sm">
                    We typically respond to all inquiries within 24 hours during
                    business days.
                  </p>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-800">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Send Us a Message
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2 text-zinc-300"
                      >
                        Full Name <span className="text-emerald-400">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your Name"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2 text-zinc-300"
                      >
                        Email Address <span className="text-emerald-400">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@email.com"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2 text-zinc-300"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+852..."
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2 text-zinc-300"
                      >
                        Subject <span className="text-emerald-400">*</span>
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="How can we help?"
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 text-zinc-300"
                    >
                      Message <span className="text-emerald-400">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us more about your inquiry..."
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 resize-none rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
