import { getWixServerClient } from "@/lib/wix-client-server";
import { getOrder } from "@/wix-api/orders";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Order from "@/components/Order"; // Using the full detailed component

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { orderId } = await params;
  const order = await getOrder(await getWixServerClient(), orderId);

  return {
    title: order?.number
      ? `Order #${order.number} - MycroPc`
      : "Order Details - MycroPc",
    description:
      "View your order details, shipping information, and order status.",
  };
}

export default async function OrderDetailsPage({ params }: PageProps) {
  const { orderId } = await params;
  const order = await getOrder(await getWixServerClient(), orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-muted/30 via-muted/20 to-background py-12 sm:py-16 md:py-20 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                href="/profile"
                className="hover:text-primary transition-colors"
              >
                Profile
              </Link>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-foreground">Order Details</span>
            </nav>

            {/* Header Content */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Order #{order.number}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              <p className="text-lg sm:text-xl text-muted-foreground">
                View all details for your order including items, shipping, and
                status
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Profile
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <Order order={order} />
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-muted/30 border border-border rounded-xl p-6 md:p-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Need Help?
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Order Questions</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Have questions about your order status, shipping, or need to
                make changes?
              </p>
              <Link
                href={`mailto:support@mycropc.com?subject=Order #${order.number} Question`}
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Support
              </Link>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Order Tracking</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Once your order ships, you&apos;ll receive tracking information
                via email.
              </p>
              <div className="text-sm text-muted-foreground">
                Estimated processing: 6-10 business days
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
