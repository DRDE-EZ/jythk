"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Message sent successfully!');
        form.reset();
      } else {
        toast.error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">Get In Touch</h1>
          <p className="text-xl text-gray-400">
            We're here to help. Reach out to us for any inquiries or support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
              <p className="text-gray-400 text-lg mb-8">
                Have a question or need assistance? Our team is ready to help you. 
                Fill out the form or reach us directly through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email Us</h3>
                  <p className="text-gray-400">info@jythk.com</p>
                  <p className="text-gray-400">support@jythk.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Call Us</h3>
                  <p className="text-gray-400">+852 1234 5678</p>
                  <p className="text-gray-400">+852 8765 4321</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Visit Us</h3>
                  <p className="text-gray-400">123 Business District</p>
                  <p className="text-gray-400">Hong Kong</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Business Hours</h3>
                  <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-400">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg">
              <h3 className="text-white font-bold text-xl mb-2">Quick Response</h3>
              <p className="text-blue-100">
                We typically respond to all inquiries within 24 hours during business days.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                  Full Name *
                </label>
                <Input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="Your Name" 
                  className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                  Email Address *
                </label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="you@email.com" 
                  className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-300">
                  Phone Number
                </label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  placeholder="+852..." 
                  className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">
                  Subject *
                </label>
                <Input 
                  id="subject" 
                  name="subject" 
                  type="text" 
                  required 
                  placeholder="How can we help?" 
                  className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                  Message *
                </label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={6} 
                  required 
                  placeholder="Tell us more about your inquiry..." 
                  className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}