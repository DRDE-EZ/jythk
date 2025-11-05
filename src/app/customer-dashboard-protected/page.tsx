'use client';

import { useState, useEffect } from 'react';
import { enhancedAuth } from '@/lib/enhanced-auth';
import { wixBrowserClient } from '@/lib/wix-client.browser';
import { getUserOrders } from '@/wix-api/orders';
import { Button } from '@/components/ui/button';
import { Package, Search, Filter, Eye, Calendar, DollarSign, Truck, CheckCircle, Clock, AlertCircle, LogIn, Mail } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Member {
  _id?: string;
  loginEmail?: string;
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
  const [showLogin, setShowLogin] = useState(false);

  // Use React Query to fetch real Wix orders
  const { data: ordersData, isLoading: ordersLoading, error: ordersError } = useQuery({
    queryKey: ['customer-orders', member?._id],
    queryFn: async () => {
      if (!wixBrowserClient || !member?._id) return null;
      return getUserOrders(wixBrowserClient, { limit: 10 });
    },
    enabled: !!wixBrowserClient && !!member?._id && isAuthenticated,
  });

  const orders = ordersData?.orders || [];

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
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
              <p className="text-sm text-gray-600">
                Welcome back, {member?.contact?.firstName || member?.loginEmail}
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  ✅ AUTHENTICATED WITH GMAIL
                </span>
              </p>
            </div>
            <Button
              onClick={() => enhancedAuth.logout()}
              variant="outline"
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${orders.reduce((sum, order) => sum + (order.priceSummary?.subtotal?.amount || 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(order => !order.fulfillmentStatus || order.fulfillmentStatus === 'NOT_FULFILLED').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(order => order.fulfillmentStatus === 'FULFILLED').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Card with Gmail */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Email Address</p>
              <p className="font-medium text-gray-900">{member?.loginEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Member ID</p>
              <p className="font-medium text-gray-900">{member?._id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-gray-900">
                {member?.contact?.firstName || 'Not provided'} {member?.contact?.lastName || ''}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Real Orders Section with Delivery Progress */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Your Orders {ordersLoading && '(Loading...)'}
            </h3>
          </div>
          
          {ordersLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your orders...</p>
            </div>
          ) : ordersError ? (
            <div className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600">Failed to load orders. Please try again.</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h4>
              <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
              <Button asChild>
                <a href="/shop">Start Shopping</a>
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {orders.map((order: any) => (
                <div key={order._id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        Order #{order.number || order._id?.slice(-8)}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order._createdDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Total: ${order.priceSummary?.subtotal?.amount?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.fulfillmentStatus === 'FULFILLED' ? 'bg-green-100 text-green-800' :
                        order.fulfillmentStatus === 'PARTIALLY_FULFILLED' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.fulfillmentStatus === 'FULFILLED' ? 'Delivered' :
                         order.fulfillmentStatus === 'PARTIALLY_FULFILLED' ? 'Shipped' :
                         order.fulfillmentStatus === 'NOT_FULFILLED' ? 'Processing' : 'Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Progress with Dots */}
                  <DeliveryProgress 
                    status={
                      order.fulfillmentStatus === 'FULFILLED' ? 'delivered' :
                      order.fulfillmentStatus === 'PARTIALLY_FULFILLED' ? 'shipped' :
                      order.fulfillmentStatus === 'NOT_FULFILLED' ? 'processing' : 'pending'
                    } 
                  />

                  {/* Order Items */}
                  {order.lineItems && order.lineItems.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Items:</h5>
                      <div className="space-y-2">
                        {order.lineItems.slice(0, 3).map((item: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.productName?.original} × {item.quantity}
                            </span>
                            <span className="font-medium">
                              ${item.price?.amount?.toFixed(2) || '0.00'}
                            </span>
                          </div>
                        ))}
                        {order.lineItems.length > 3 && (
                          <p className="text-sm text-gray-500">
                            +{order.lineItems.length - 3} more items
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}