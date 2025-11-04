"use client";

import { useSimpleAuth } from "@/hooks/simple-auth";
import { Button } from "@/components/ui/button";
import { Package, ShoppingBag, User, TrendingUp, Clock, CheckCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SimpleProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useSimpleAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/simple-login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/20">
                  <User className="w-10 h-10 lg:w-12 lg:h-12 text-blue-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              
              {/* Welcome Text */}
              <div className="text-white">
                <h1 className="text-3xl lg:text-4xl font-bold">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-blue-100 mt-2 text-lg">
                  Manage your orders and account settings
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 lg:mt-0 grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <ShoppingBag className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-blue-100 text-sm">Total Orders</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Package className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2</div>
                <div className="text-blue-100 text-sm">Pending</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <TrendingUp className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">$2,450</div>
                <div className="text-blue-100 text-sm">Total Spent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Account Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Account Info</h2>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-lg text-gray-900 font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <p className="text-lg text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Member Since</label>
                  <p className="text-lg text-gray-900">
                    {new Date(user.loginTime).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Account Type</label>
                  <p className="text-lg text-gray-900">Premium Member</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Demo Account:</strong> This is a simplified account system. 
                  Full Wix integration coming soon!
                </p>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                <Button asChild variant="outline">
                  <Link href="/shop">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>

              {/* Sample Orders */}
              <div className="space-y-4">
                {[
                  {
                    id: "ORD-001",
                    date: "Nov 1, 2025",
                    status: "Delivered",
                    total: "$450.00",
                    items: "Construction Tools Set",
                    statusColor: "text-green-600 bg-green-50"
                  },
                  {
                    id: "ORD-002", 
                    date: "Oct 28, 2025",
                    status: "Processing",
                    total: "$1,200.00",
                    items: "Steel Beam Package",
                    statusColor: "text-blue-600 bg-blue-50"
                  },
                  {
                    id: "ORD-003",
                    date: "Oct 25, 2025", 
                    status: "Shipped",
                    total: "$800.00",
                    items: "Hardware Supplies",
                    statusColor: "text-purple-600 bg-purple-50"
                  }
                ].map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{order.id}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-1">{order.items}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:text-right">
                        <p className="text-lg font-bold text-gray-900">{order.total}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State for No Orders */}
              <div className="text-center py-8 border-t border-gray-200 mt-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Ready to place your first order?</p>
                <Button asChild>
                  <Link href="/shop">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Browse Products
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}