'use client';

import { useState, useEffect } from 'react';
import { customerBackend, Order } from '@/lib/customer-backend';

export default function SimpleAdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [newStatus, setNewStatus] = useState<Order['status']>('pending');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      // Load sample orders
      const allOrders = await customerBackend.getCustomerOrders('customer_1');
      setOrders(allOrders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async () => {
    if (!selectedOrder || !newStatus) return;
    
    try {
      await customerBackend.updateOrderStatus(selectedOrder, newStatus);
      await loadOrders(); // Reload orders
      alert('Order status updated successfully!');
      setSelectedOrder('');
    } catch (error) {
      console.error('Failed to update order:', error);
      alert('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">
                Welcome, Administrator! 
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  FULL ACCESS
                </span>
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Processing</h3>
            <p className="text-3xl font-bold text-orange-600">
              {orders.filter(o => o.status === 'processing').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Delivered</h3>
            <p className="text-3xl font-bold text-green-600">
              {orders.filter(o => o.status === 'delivered').length}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Order Update</h3>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Order
              </label>
              <select
                value={selectedOrder}
                onChange={(e) => setSelectedOrder(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Choose an order...</option>
                {orders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.id} - ${order.total} ({order.status})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Order['status'])}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button
              onClick={updateOrderStatus}
              disabled={!selectedOrder}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Update Status
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">All Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customerEmail}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.items.length} item(s)
                      <div className="text-xs text-gray-400">
                        {order.items.slice(0, 2).map(item => item.name).join(', ')}
                        {order.items.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ${order.total.toFixed(2)}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/admin-setup"
              className="block p-3 bg-blue-50 rounded border border-blue-200 hover:bg-blue-100 text-center"
            >
              <div className="text-blue-600 font-medium">Admin Setup</div>
              <div className="text-xs text-blue-500">Manage admin users</div>
            </a>
            <a
              href="/customer-dashboard"
              className="block p-3 bg-green-50 rounded border border-green-200 hover:bg-green-100 text-center"
            >
              <div className="text-green-600 font-medium">Customer View</div>
              <div className="text-xs text-green-500">See customer dashboard</div>
            </a>
            <a
              href="/wix-sdk-test"
              className="block p-3 bg-purple-50 rounded border border-purple-200 hover:bg-purple-100 text-center"
            >
              <div className="text-purple-600 font-medium">Wix SDK Test</div>
              <div className="text-xs text-purple-500">Test Wix integration</div>
            </a>
            <a
              href="/oauth-debug"
              className="block p-3 bg-orange-50 rounded border border-orange-200 hover:bg-orange-100 text-center"
            >
              <div className="text-orange-600 font-medium">OAuth Debug</div>
              <div className="text-xs text-orange-500">Debug authentication</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}