import Order from "@/components/Order";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getLoggedInMember } from "@/wix-api/members";
import { getOrder } from "@/wix-api/orders";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClearCart from "./ClearCart";

export const metadata: Metadata = {
  title: "Order Confirmed - MycroPc",
  description: "Your order has been successfully placed and confirmed.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string }>;
}) {
  const { orderId } = await searchParams;
  const wixClient = await getWixServerClient();

  const [order, loggedInMember] = await Promise.all([
    getOrder(wixClient, orderId),
    getLoggedInMember(wixClient),
  ]);

  if (!order) {
    notFound();
  }

  const orderCreatedDate = order._createdDate
    ? new Date(order._createdDate)
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Success Hero Section */}
      <div className="bg-gradient-to-br from-green-50 via-green-50/50 to-white py-16 sm:py-20 md:py-24 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6">
            {/* Success Icon */}
            <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-full animate-pulse"></div>
              <div className="relative w-full h-full bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-600">
                Order Confirmed!
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full"></div>
              <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Thank you for your purchase! A confirmation email with order
                details has been sent to your email address.
              </p>
            </div>

            {/* Order Number Badge */}
            {order.number && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full border border-green-200">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="font-medium">Order #{order.number}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="space-y-8 md:space-y-12">
          {/* Order Details Section */}
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Order Details
              </h2>
              <div className="w-16 h-1 mx-auto rounded-full" style={{ background: '#1a4ba8' }}></div>
              <p className="text-gray-700">
                Review your purchase details below
              </p>
            </div>

            {/* Enhanced Order Component */}
            <div className="bg-white border-2 border-black rounded-xl shadow-sm overflow-hidden">
              <Order order={order} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {loggedInMember && (
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-medium transition-colors"
                style={{ background: '#1a4ba8' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#14396b'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#1a4ba8'}
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                View All Orders
              </Link>
            )}

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors"
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

          {/* What's Next Section */}
          <div className="bg-gray-50 border-2 border-black rounded-xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-black">
              What happens next?
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-black">Order Processing</h4>
                <p className="text-sm text-gray-700">
                  We&apos;ll start building your custom PC within 24 hours
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-black">Quality Testing</h4>
                <p className="text-sm text-gray-700">
                  Rigorous testing to ensure peak performance
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M12 11L4 7"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-black">Secure Shipping</h4>
                <p className="text-sm text-gray-700">
                  Carefully packaged and shipped with tracking
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clear Cart Component */}
      {orderCreatedDate &&
        orderCreatedDate.getTime() > Date.now() - 60000 * 5 && <ClearCart />}
    </div>
  );
}
