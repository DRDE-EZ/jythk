'use client';

import { useState, useEffect } from 'react';
import { enhancedAuth } from '@/lib/enhanced-auth';
import { wixBrowserClient } from '@/lib/wix-client.browser';
import { getUserOrders } from '@/wix-api/orders';
import { Button } from '@/components/ui/button';
import { Package, Search, Filter, Eye, Calendar, DollarSign, Truck, CheckCircle, Clock, AlertCircle, LogIn, Mail, Home, User, Settings, ShoppingBag, Bell, ChevronRight, Plus, LogOut } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface Member {
  _id?: string;
  loginEmail?: string;
  _createdDate?: string;
  contact?: {
    firstName?: string;
    lastName?: string;
    emails?: string[];
  };
}

export default function ProtectedCustomerDashboard() {
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Computed values for dashboard
  const authLoading = isLoading;

  // Use React Query to fetch real Wix orders
  const { data: ordersData, isLoading: ordersLoading, error: ordersError, refetch } = useQuery({
    queryKey: ['customer-orders', member?._id],
    queryFn: async () => {
      if (!wixBrowserClient || !member?._id) return null;
      return getUserOrders(wixBrowserClient, { limit: 20 });
    },
    enabled: !!wixBrowserClient && !!member?._id && isAuthenticated,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const orders = ordersData?.orders || [];
  const totalSpent = orders.reduce((sum: number, order: any) => sum + (order.priceSummary?.subtotal?.amount || 0), 0);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      // Try to get current member from Wix
      const currentMember = await enhancedAuth.getCurrentMember();
      
      if (currentMember && currentMember.member) {
        // User is authenticated with Wix - extract real Gmail
        const memberData = currentMember.member as any;
        const userEmail = memberData.loginEmail || memberData.contact?.emails?.[0] || 'user@gmail.com';
        
        setMember({
          _id: memberData._id,
          loginEmail: userEmail,
          contact: memberData.contact
        });
        setIsAuthenticated(true);
        
        console.log('✅ Authenticated user:', userEmail);
        console.log('✅ Member ID:', memberData._id);
      } else {
        // User is not authenticated
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      // User is not authenticated, show login option
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 rounded-full animate-pulse bg-blue-600"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-blue-600" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-blue-600" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );

  // Breadcrumb navigation
  const Breadcrumb = () => (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link href="/" className="hover:text-blue-600 flex items-center">
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-gray-900 font-medium">Dashboard</span>
    </nav>
  );

  // Quick actions sidebar
  const QuickActions = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/shop">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/profile">
            <User className="w-4 h-4 mr-2" />
            Edit Profile
          </Link>
        </Button>
        <Button 
          onClick={() => refetch()} 
          className="w-full justify-start" 
          variant="outline"
          disabled={ordersLoading}
        >
          {ordersLoading ? <LoadingSpinner /> : <Package className="w-4 h-4 mr-2" />}
          Refresh Orders
        </Button>
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/customer-dashboard-demo">
            <Eye className="w-4 h-4 mr-2" />
            View Demo
          </Link>
        </Button>
      </div>
    </div>
  );

  // Recent activity timeline
  const RecentActivity = () => {
    const recentOrders = orders.slice(0, 3);
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Recent Activity
        </h3>
        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order: any, index: number) => (
              <div key={order._id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    Order #{order.number || order._id?.slice(-8)} placed
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order._createdDate).toLocaleDateString()} • 
                    ${order.priceSummary?.subtotal?.amount?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    order.fulfillmentStatus === 'FULFILLED' ? 'bg-green-100 text-green-800' :
                    order.fulfillmentStatus === 'PARTIALLY_FULFILLED' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.fulfillmentStatus === 'FULFILLED' ? 'Delivered' :
                     order.fulfillmentStatus === 'PARTIALLY_FULFILLED' ? 'Shipped' :
                     'Processing'}
                  </span>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full" 
                onClick={() => setActiveTab('orders')}
              >
                View All Orders
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No recent activity</p>
            <Button asChild className="mt-3" size="sm">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Tab navigation
  const TabNavigation = () => (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        {[
          { id: 'overview', label: 'Overview', icon: DollarSign },
          { id: 'orders', label: 'Orders', icon: Package },
          { id: 'account', label: 'Account', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );

  // Login handlers for unauthenticated state
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await enhancedAuth.loginWithGoogle('/customer-dashboard-protected');
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    try {
      setIsLoading(true);
      await enhancedAuth.loginWithEmail('/customer-dashboard-protected');
    } catch (error) {
      console.error('Email login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Delivery Progress Component with Dots
  const DeliveryProgress = ({ status }: { status: string }) => {
    const stages = [
      { key: 'pending', label: 'Order Placed', icon: Package },
      { key: 'processing', label: 'Processing', icon: Clock },
      { key: 'shipped', label: 'Shipped', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: CheckCircle }
    ];

    const getCurrentStageIndex = () => {
      switch (status) {
        case 'pending': return 0;
        case 'processing': return 1;
        case 'shipped': return 2;
        case 'delivered': return 3;
        default: return 0;
      }
    };

    const currentStage = getCurrentStageIndex();

    return (
      <div className="w-full py-4">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200">
            <div 
              className="h-full bg-blue-500 transition-all duration-1000 ease-out"
              style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
            />
          </div>

          {/* Stage Dots */}
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = index <= currentStage;
            const isCurrent = index === currentStage;
            
            return (
              <div key={stage.key} className="flex flex-col items-center relative z-10">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500
                  ${isActive 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                  }
                  ${isCurrent ? 'ring-4 ring-blue-200 animate-pulse' : ''}
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                    {stage.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Package className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Customer Dashboard
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to access your orders and account information
            </p>
          </div>
          
          <div className="bg-white py-8 px-6 shadow rounded-lg">
            <div className="space-y-4">
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700"
              >
                <Mail className="h-5 w-5" />
                {isLoading ? 'Signing in...' : 'Sign in with Google'}
              </Button>
              
              <Button
                onClick={handleEmailLogin}
                disabled={isLoading}
                variant="outline"
                className="w-full flex items-center justify-center gap-3"
              >
                <LogIn className="h-5 w-5" />
                {isLoading ? 'Signing in...' : 'Sign in with Email'}
              </Button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>

          {/* Demo access for testing */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-yellow-800 font-medium mb-2">Demo Access</h3>
            <p className="text-yellow-700 text-sm mb-3">
              Want to see the dashboard without logging in? Try the demo version:
            </p>
            <a
              href="/customer-dashboard-demo"
              className="inline-block bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700"
            >
              View Demo Dashboard
            </a>
          </div>

          <div className="text-center">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Show authenticated dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        {/* Header with user greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back{member?.contact?.firstName ? `, ${member.contact.firstName}` : ''}!
          </h1>
          <p className="text-gray-600 mt-2 flex items-center">
            Manage your orders and account information
            <span className="ml-3 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              ✅ Authenticated
            </span>
          </p>
        </div>

        {/* Tab Navigation */}
        <TabNavigation />

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <Package className="w-8 h-8 text-blue-600" />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                        <div className="text-2xl font-bold text-gray-900">
                          {ordersLoading ? <LoadingSpinner /> : orders.length}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <DollarSign className="w-8 h-8 text-green-600" />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
                        <div className="text-2xl font-bold text-gray-900">
                          {ordersLoading ? <LoadingSpinner /> : `$${totalSpent.toFixed(2)}`}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <User className="w-8 h-8 text-purple-600" />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                        <div className="text-2xl font-bold text-gray-900">
                          {authLoading ? <LoadingSpinner /> : 
                           member?._createdDate ? new Date(member._createdDate).getFullYear() : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveTab('orders')}
                      >
                        View All
                      </Button>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {ordersLoading ? (
                      <div className="px-6 py-12 text-center">
                        <LoadingSpinner />
                        <p className="text-gray-500 mt-2">Loading orders...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="px-6 py-12 text-center">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-4">Start shopping to see your orders here</p>
                        <Button asChild>
                          <Link href="/shop">Browse Products</Link>
                        </Button>
                      </div>
                    ) : (
                      orders.slice(0, 3).map((order: any) => (
                        <div key={order._id} className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                Order #{order.number || order._id?.slice(-8)}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {new Date(order._createdDate).toLocaleDateString()} • 
                                ${order.priceSummary?.subtotal?.amount?.toFixed(2) || '0.00'}
                              </p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                order.fulfillmentStatus === 'FULFILLED' ? 'bg-green-100 text-green-800' :
                                order.fulfillmentStatus === 'PARTIALLY_FULFILLED' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.fulfillmentStatus === 'FULFILLED' ? 'Delivered' :
                                 order.fulfillmentStatus === 'PARTIALLY_FULFILLED' ? 'Shipped' :
                                 'Processing'}
                              </span>
                              <DeliveryProgress status={order.fulfillmentStatus} />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">All Orders</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => refetch()}
                      disabled={ordersLoading}
                    >
                      {ordersLoading ? <LoadingSpinner /> : <Package className="w-4 h-4 mr-2" />}
                      Refresh
                    </Button>
                  </div>
                </div>
                
                {ordersLoading ? (
                  <div className="px-6 py-12 text-center">
                    <LoadingSpinner />
                    <p className="text-gray-500 mt-2">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
                    <Button asChild>
                      <Link href="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {orders.map((order: any) => (
                      <div key={order._id} className="px-6 py-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                              <h4 className="text-lg font-medium text-gray-900">
                                Order #{order.number || order._id?.slice(-8)}
                              </h4>
                              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                order.fulfillmentStatus === 'FULFILLED' ? 'bg-green-100 text-green-800' :
                                order.fulfillmentStatus === 'PARTIALLY_FULFILLED' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.fulfillmentStatus === 'FULFILLED' ? 'Delivered' :
                                 order.fulfillmentStatus === 'PARTIALLY_FULFILLED' ? 'Shipped' :
                                 'Processing'}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                              <div>
                                <span className="font-medium">Date:</span>
                                <p>{new Date(order._createdDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <span className="font-medium">Total:</span>
                                <p>${order.priceSummary?.subtotal?.amount?.toFixed(2) || '0.00'}</p>
                              </div>
                              <div>
                                <span className="font-medium">Items:</span>
                                <p>{order.lineItems?.length || 0} item(s)</p>
                              </div>
                              <div>
                                <span className="font-medium">Payment:</span>
                                <p className={order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-yellow-600'}>
                                  {order.paymentStatus === 'PAID' ? 'Paid' : 'Pending'}
                                </p>
                              </div>
                            </div>

                            {/* Order Items */}
                            {order.lineItems && order.lineItems.length > 0 && (
                              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <h5 className="font-medium text-gray-900 mb-2">Items:</h5>
                                <div className="space-y-2">
                                  {order.lineItems.map((item: any, index: number) => (
                                    <div key={index} className="flex justify-between text-sm">
                                      <span>{item.productName?.original || 'Product'} x {item.quantity}</span>
                                      <span>${item.price?.amount?.toFixed(2) || '0.00'}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Delivery Progress */}
                            <div className="mb-4">
                              <h5 className="font-medium text-gray-900 mb-2">Delivery Progress:</h5>
                              <DeliveryProgress status={order.fulfillmentStatus} />
                            </div>

                            {/* Shipping Address */}
                            {order.shippingInfo?.logistics?.shippingDestination?.address && (
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Shipping to:</span>
                                <p>
                                  {order.shippingInfo.logistics.shippingDestination.address.addressLine1}, 
                                  {order.shippingInfo.logistics.shippingDestination.address.city}, 
                                  {order.shippingInfo.logistics.shippingDestination.address.subdivision} 
                                  {order.shippingInfo.logistics.shippingDestination.address.zipCode}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {order.fulfillmentStatus === 'FULFILLED' && (
                              <Button variant="outline" size="sm">
                                Reorder
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'account' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h3>
                
                {authLoading ? (
                  <div className="text-center py-8">
                    <LoadingSpinner />
                    <p className="text-gray-500 mt-2">Loading account information...</p>
                  </div>
                ) : member ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                          {member.contact?.firstName || 'Not provided'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                          {member.contact?.lastName || 'Not provided'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                          {member.loginEmail || 'Not provided'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Member Since
                        </label>
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                          {member._createdDate ? new Date(member._createdDate).toLocaleDateString() : 'Unknown'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <div className="flex space-x-4">
                        <Button asChild>
                          <Link href="/profile">Edit Profile</Link>
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            enhancedAuth.logout();
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Unable to load account information</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1 space-y-6">
            <QuickActions />
            {activeTab === 'overview' && <RecentActivity />}
          </div>
        </div>
      </div>
    </div>
  );
}