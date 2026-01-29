import { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Customer Support",
  description: "Get help with your orders, products, and account at JYT HK.",
};

export default function SupportPage() {
  return (
    <div className="min-h-[70vh] bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Customer Support
        </h1>
        <p className="text-xl text-zinc-400 mb-12 max-w-2xl">
          We&apos;re here to help. Reach out to our team for assistance with orders, products, or general inquiries.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <Mail className="w-8 h-8 text-emerald-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Email Support</h2>
            <p className="text-zinc-400 mb-4">
              Send us an email and we&apos;ll respond within 24 hours.
            </p>
            <a
              href="mailto:info@jythk.com"
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              info@jythk.com
            </a>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-2">Request a Quote</h2>
            <p className="text-zinc-400 mb-4">
              Need pricing for bulk orders or custom projects? Submit a quote request.
            </p>
            <Button asChild variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
              <Link href="/quote">Get a Quote</Link>
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
