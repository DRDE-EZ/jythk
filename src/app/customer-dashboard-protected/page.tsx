'use client';

import { useState, useEffect } from 'react';
import { enhancedAuth } from '@/lib/enhanced-auth';
import { customerBackend } from '@/lib/customer-backend';
import { Button } from '@/components/ui/button';
import { Package, Search, Filter, Eye, Calendar, DollarSign, Truck, CheckCircle, Clock, AlertCircle, LogIn, Mail } from 'lucide-react';

interface Member {
  id?: string;
  loginEmail?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
  };
}

export default function ProtectedCustomerDashboard() {
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      // Try to get current member from Wix
      const currentMember = await enhancedAuth.getCurrentMember();
      
      if (currentMember && currentMember.member) {
        // User is authenticated with Wix
        setMember(currentMember.member as any); // Type assertion to handle version conflicts
        setIsAuthenticated(true);
        await loadCustomerData(currentMember.member._id || 'customer_1');
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

  const loadCustomerData = async (customerId: string) => {
    try {
      // Load customer data from backend
      const customerOrders = await customerBackend.getCustomerOrders(customerId);
      const customerTransactions = await customerBackend.getCustomerTransactions(customerId);
      const customerStats = await customerBackend.getCustomerStats(customerId);
      
      setOrders(customerOrders);
      setTransactions(customerTransactions);
      setStats(customerStats);
    } catch (error) {
      console.error('Failed to load customer data:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await enhancedAuth.loginWithGoogle('/customer-dashboard');
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
      await enhancedAuth.loginWithEmail('/customer-dashboard');
    } catch (error) {
      console.error('Email login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
                Welcome back, {member?.profile?.firstName || member?.loginEmail}
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  AUTHENTICATED
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
                <p className="text-2xl font-bold text-gray-900">{stats?.totalOrders || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">${stats?.totalSpent?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.pendingOrders || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Last Order</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats?.lastOrderDate ? new Date(stats.lastOrderDate).toLocaleDateString() : 'None'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}