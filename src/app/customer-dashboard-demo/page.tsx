'use client';

import { useState, useEffect } from 'react';
import { customerBackend } from '@/lib/customer-backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Search, Filter, Eye, Calendar, DollarSign, Truck, CheckCircle, Clock, AlertCircle, LogIn } from 'lucide-react';

export default function CustomerDashboardDemo() {
  const [orders, setOrders] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadDemoData();
  }, []);

  const loadDemoData = async () => {
    try {
      // Load demo customer data
      const customerOrders = await customerBackend.getCustomerOrders('customer_1');
      const customerTransactions = await customerBackend.getCustomerTransactions('customer_1');
      const customerStats = await customerBackend.getCustomerStats('customer_1');
      
      setOrders(customerOrders);
      setTransactions(customerTransactions);
      setStats(customerStats);
    } catch (error) {
      console.error('Failed to load demo data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some((item: any) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading demo dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
              <p className="text-sm text-gray-600">
                Demo Account - Sample Customer Data
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  DEMO MODE
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href="/customer-dashboard-protected"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In for Real Account
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-blue-600 mr-3" />
            <div className="flex-1">
              <h3 className="text-blue-800 font-bold text-lg">Welcome to the Demo Dashboard!</h3>
              <p className="text-blue-700 text-sm mt-1">
                This is a demonstration with sample order data. Ready to track your real orders? 
                <strong> Create an account</strong> or <strong>sign in</strong> to access your personal dashboard.
              </p>
            </div>
            <div className="flex gap-2 ml-4">
              <a
                href="/customer-dashboard-protected"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Sign In / Register
              </a>
            </div>
          </div>
        </div>
      </div>

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

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search orders by ID or item name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Orders ({filteredOrders.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
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
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                        {order.trackingNumber && (
                          <div className="text-xs text-blue-600">
                            Tracking: {order.trackingNumber}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {order.items.length} item(s)
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.items.slice(0, 2).map((item: any) => item.name).join(', ')}
                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span className="ml-2 text-sm text-gray-900 capitalize">
                          {order.status}
                        </span>
                      </div>
                      {order.estimatedDelivery && order.status === 'shipped' && (
                        <div className="text-xs text-gray-500 mt-1">
                          Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        ${order.total.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'You haven\'t placed any orders yet.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <div className="space-x-4">
            <a
              href="/customer-dashboard-protected"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Sign In to Access Your Real Account
            </a>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}