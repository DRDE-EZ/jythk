import { getWixServerClient } from "@/lib/wix-client-server";
import { getLoggedInMember } from "@/wix-api/members";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Package, ShoppingBag, User, TrendingUp, Clock, CheckCircle } from "lucide-react";
import MemberInfoForm from "./MemberInfoForm";
import Orders from "./Orders";

export const metadata: Metadata = {
  title: "Dashboard | JYT HK",
  description: "Your personal dashboard to manage orders and account information",
};

export default async function Page() {
  const member = await getLoggedInMember(await getWixServerClient());

  // If no Wix member found, redirect to customer dashboard
  if (!member) {
    redirect("/customer-dashboard");
  }

  const firstName = member?.contact?.firstName || "User";

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
                  Welcome back, {firstName}!
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
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-blue-100 text-sm">Orders</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Package className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-blue-100 text-sm">Pending</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center col-span-2 lg:col-span-1">
                <TrendingUp className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">$1,234</div>
                <div className="text-blue-100 text-sm">Total Spent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    New Order
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">Place a new order</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Track Orders
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">View order status</p>
                </div>
                <Package className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Reorder
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">Reorder previous items</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Support
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">Get help & support</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders Section - Takes 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-blue-600" />
                    Recent Orders
                  </h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    12 Total
                  </span>
                </div>
              </div>
              <div className="p-6">
                <Orders />
              </div>
            </div>
          </div>

          {/* Profile Information - Takes 1/3 width */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Account Information
                </h2>
              </div>
              <div className="p-6">
                <MemberInfoForm loggedInMember={member!} />
              </div>
            </div>

            {/* Order Status Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pending</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Processing</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipped</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Delivered</span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
