import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 md:py-24">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
            Project Management Portal
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Streamline your construction supply chain with our comprehensive order management system.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
              title: "Order Management",
              description: "Track deliveries, manage invoices, and monitor project timelines in real-time."
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Purchase Analytics",
              description: "Detailed reporting on spending patterns, supplier performance, and cost optimization."
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              ),
              title: "Supply Alerts",
              description: "Automated notifications for delivery updates, stock availability, and price changes."
            }
          ].map((feature) => (
            <div
              key={feature.title}
              className="group bg-white p-8 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-lg mb-6 text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Portal Access Cards */}
        <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-800">
              Access Your Portal
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Choose the appropriate dashboard for your role and access level
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Customer Dashboard */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Customer Portal</h3>
              <p className="text-sm text-slate-600 mb-6">Track your orders, view purchase history, and manage account settings</p>
              
              <div className="space-y-3">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-slate-300 hover:bg-slate-100 text-slate-700"
                >
                  <Link href="/customer-dashboard-demo">
                    Try Demo Version
                  </Link>
                </Button>
                
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white"
                >
                  <Link href="/customer-dashboard-protected">
                    Customer Sign In
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1">
                <p>• Google OAuth authentication</p>
                <p>• Automatic redirect for admin users</p>
              </div>
            </div>

            {/* Admin Dashboard */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-3">Admin Portal</h3>
              <p className="text-sm text-slate-200 mb-6">Manage inventory, oversee orders, and access administrative functions</p>
              
              <div className="space-y-3">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-white/30 bg-white/10 hover:bg-white/20 text-white"
                >
                  <Link href="/admin-dashboard-demo">
                    Admin Demo
                  </Link>
                </Button>
                
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-slate-800 hover:bg-slate-100"
                >
                  <Link href="/admin-dashboard">
                    Admin Access
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/20 text-xs text-slate-300 space-y-1">
                <p>• Restricted to authorized emails</p>
                <p>• Full system management access</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center text-sm text-slate-500">
            <p>Demo accounts include sample data for testing • Secure authentication via Google OAuth</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-slate-600 mb-6">
            New to our platform? Learn more about our services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-300 hover:bg-slate-100"
            >
              <Link href="/about">About Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#1a4ba8] hover:bg-[#14396b] text-white"
            >
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
