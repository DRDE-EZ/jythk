import { Metadata } from "next";
import { Globe, Clock, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Delivery Details",
  description: "Shipping and delivery information for JYT HK orders worldwide.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-[70vh] bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Delivery Details
        </h1>
        <p className="text-xl text-zinc-400 mb-12 max-w-2xl">
          We ship to 30+ countries with reliable logistics partners. Here&apos;s what you need to know about our delivery process.
        </p>

        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
            <Globe className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-white mb-2">Global Shipping</h2>
            <p className="text-zinc-400 text-sm">
              We deliver to over 30 countries with customs support included.
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
            <Clock className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-white mb-2">On-Time Delivery</h2>
            <p className="text-zinc-400 text-sm">
              99% on-time delivery rate with real-time tracking available.
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
            <Package className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-white mb-2">Secure Packaging</h2>
            <p className="text-zinc-400 text-sm">
              All products are professionally packed to ensure safe transit.
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Shipping Information</h2>
          <div className="space-y-4 text-zinc-400">
            <p>
              Delivery times vary depending on destination and order size. Standard international shipping typically takes 7-21 business days.
            </p>
            <p>
              For bulk orders and container shipments, our logistics team will provide a detailed timeline during the quotation process.
            </p>
            <p>
              All shipments include tracking numbers and customs documentation. For questions about a specific order, please contact us at{" "}
              <a href="mailto:info@jythk.com" className="text-emerald-400 hover:text-emerald-300">
                info@jythk.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
