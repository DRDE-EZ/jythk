"use client";

import { useState, useEffect } from "react";
import { enhancedAuth } from "@/lib/enhanced-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, Filter, Download, Eye, Calendar, DollarSign, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  trackingNumber?: string;
  estimatedDelivery?: string;
}

interface Transaction {
  id: string;
  orderId: string;
  date: string;
  amount: number;
  type: 'payment' | 'refund';
  method: string;
  status: 'completed' | 'pending' | 'failed';
}

// Sample data - In production, this would come from your backend
const sampleOrders: Order[] = [
  {
    id: "ORD-2025-001",
    date: "2025-11-01",
    status: "delivered",
    total: 1250.00,
    items: [
      { name: "Steel Beam 6m", quantity: 2, price: 400.00 },
      { name: "Construction Bolts Pack", quantity: 5, price: 90.00 }
    ],
    trackingNumber: "TK123456789",
    estimatedDelivery: "2025-11-03"
  },
  {
    id: "ORD-2025-002",
    date: "2025-10-28",
    status: "shipped",
    total: 850.00,
    items: [
      { name: "Power Drill Professional", quantity: 1, price: 350.00 },
      { name: "Drill Bit Set", quantity: 2, price: 250.00 }
    ],
    trackingNumber: "TK987654321",
    estimatedDelivery: "2025-11-05"
  },
  {
    id: "ORD-2025-003",
    date: "2025-10-25",
    status: "processing",
    total: 2100.00,
    items: [
      { name: "Concrete Mixer Industrial", quantity: 1, price: 2100.00 }
    ]
  }
];

const sampleTransactions: Transaction[] = [
  {
    id: "TXN-001",
    orderId: "ORD-2025-001",
    date: "2025-11-01",
    amount: 1250.00,
    type: "payment",
    method: "Credit Card",
    status: "completed"
  },
  {
    id: "TXN-002",
    orderId: "ORD-2025-002",
    date: "2025-10-28",
    amount: 850.00,
    type: "payment",
    method: "PayPal",
    status: "completed"
  },
  {
    id: "TXN-003",
    orderId: "ORD-2025-003",
    date: "2025-10-25",
    amount: 2100.00,
    type: "payment",
    method: "Bank Transfer",
    status: "pending"
  }
];

export default function CustomerDashboard() {
  const [member, setMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'transactions'>('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get current member from Wix
        const currentMember = await enhancedAuth.getCurrentMember();
        
        if (currentMember && currentMember.member) {
          setMember(currentMember.member);
        } else {
          // If not authenticated, redirect to protected version
          window.location.href = '/customer-dashboard-protected';
          return;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // If authentication fails, redirect to protected version
        window.location.href = '/customer-dashboard-protected';
        return;
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'processing':
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'processing':
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'cancelled':
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredOrders = sampleOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTransactions = sampleTransactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h1>
          <p className="text-gray-600 mb-6">Please sign in with Google to view your orders and transactions.</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {member?.contact?.firstName || 'Customer'}
              </p>
            </div>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package className="w-4 h-4 mr-2" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'transactions'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Transactions
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              {activeTab === 'orders' ? (
                <>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </>
              ) : (
                <>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'orders' ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-medium">${(item.quantity * item.price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {order.trackingNumber && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Tracking</h4>
                        <p className="text-sm text-gray-600">
                          <strong>Number:</strong> {order.trackingNumber}
                        </p>
                        {order.estimatedDelivery && (
                          <p className="text-sm text-gray-600">
                            <strong>Est. Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Invoice
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${transaction.type === 'payment' ? 'bg-green-50' : 'bg-blue-50'}`}>
                      <DollarSign className={`w-5 h-5 ${transaction.type === 'payment' ? 'text-green-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{transaction.id}</h3>
                      <p className="text-sm text-gray-600">Order: {transaction.orderId}</p>
                      <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.type === 'payment' ? '-' : '+'}${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">{transaction.method}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {(activeTab === 'orders' ? filteredOrders : filteredTransactions).length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab} found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : `You haven't placed any orders yet.`}
            </p>
            <Link href="/shop">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}