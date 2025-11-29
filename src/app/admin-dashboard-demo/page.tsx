'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  Filter,
  Download,
  Plus,
  Building2,
  Truck,
  ClipboardList,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardDemo() {
  const [activeTab, setActiveTab] = useState('overview');

  // Demo data for admin dashboard
  const demoStats = {
    totalOrders: 1247,
    totalRevenue: 89450.50,
    activeCustomers: 342,
    inventoryItems: 1580,
    pendingOrders: 23,
    lowStockItems: 8,
    monthlyGrowth: 15.8,
    averageOrderValue: 245.75
  };

  const demoOrders = [
    {
      id: 'ORD-2024-001',
      customer: 'ABC Construction Ltd.',
      amount: 1250.00,
      status: 'pending',
      date: '2024-11-05',
      items: 15
    },
    {
      id: 'ORD-2024-002', 
      customer: 'Premier Builders Inc.',
      amount: 875.50,
      status: 'shipped',
      date: '2024-11-04',
      items: 8
    },
    {
      id: 'ORD-2024-003',
      customer: 'Metro Contractors',
      amount: 2100.25,
      status: 'completed',
      date: '2024-11-03',
      items: 22
    }
  ];

  const demoInventory = [
    { name: 'Steel Rebar #4', stock: 245, lowStock: false, category: 'Steel' },
    { name: 'Concrete Mix 40lb', stock: 12, lowStock: true, category: 'Concrete' },
    { name: 'PVC Pipe 4"', stock: 89, lowStock: false, category: 'Plumbing' },
    { name: 'Electrical Wire 12AWG', stock: 5, lowStock: true, category: 'Electrical' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'shipped': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            <span className="font-medium">Admin Demo Mode</span>
            <span className="ml-2 text-blue-100">• Sample data for demonstration purposes</span>
          </div>
          <Link href="/admin-dashboard">
            <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-blue-600">
              Access Real Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-slate-700" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-600">Formex Construction & Wholesale</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <div className="text-sm text-slate-600">Demo Admin</div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'orders', label: 'Order Management', icon: ClipboardList },
                { id: 'inventory', label: 'Inventory', icon: Package },
                { id: 'customers', label: 'Customers', icon: Users },
                { id: 'suppliers', label: 'Suppliers', icon: Truck },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                    activeTab === item.id 
                      ? 'bg-slate-100 text-slate-900' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'overview' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Dashboard Overview</h2>
                <p className="text-slate-600">Construction supply chain management at a glance</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    title: 'Total Orders',
                    value: demoStats.totalOrders.toLocaleString(),
                    change: '+12.5%',
                    icon: ShoppingCart,
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-50'
                  },
                  {
                    title: 'Monthly Revenue',
                    value: `$${demoStats.totalRevenue.toLocaleString()}`,
                    change: `+${demoStats.monthlyGrowth}%`,
                    icon: DollarSign,
                    color: 'text-green-600',
                    bgColor: 'bg-green-50'
                  },
                  {
                    title: 'Active Customers',
                    value: demoStats.activeCustomers.toLocaleString(),
                    change: '+8.2%',
                    icon: Users,
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-50'
                  },
                  {
                    title: 'Inventory Items',
                    value: demoStats.inventoryItems.toLocaleString(),
                    change: '+3.1%',
                    icon: Package,
                    color: 'text-orange-600',
                    bgColor: 'bg-orange-50'
                  }
                ].map((stat) => (
                  <div key={stat.title} className="bg-white p-6 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <span className="text-sm font-medium text-green-600">{stat.change}</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Recent Orders</h3>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {demoOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg mr-3 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{order.id}</p>
                            <p className="text-sm text-slate-600">{order.customer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">${order.amount.toFixed(2)}</p>
                          <p className="text-sm text-slate-600">{order.items} items</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inventory Alerts */}
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Inventory Status</h3>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {demoInventory.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg mr-3 ${
                            item.lowStock ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                          }`}>
                            <Package className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{item.name}</p>
                            <p className="text-sm text-slate-600">{item.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            item.lowStock ? 'text-red-600' : 'text-slate-900'
                          }`}>
                            {item.stock} units
                          </p>
                          {item.lowStock && (
                            <p className="text-xs text-red-600">Low Stock</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg border border-slate-200 p-8 max-w-md mx-auto">
                <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
                </h3>
                <p className="text-slate-600 mb-4">
                  This section contains sample data and limited functionality in demo mode.
                </p>
                <div className="space-y-2">
                  <Button 
                    onClick={() => setActiveTab('overview')}
                    variant="outline" 
                    className="w-full"
                  >
                    Back to Overview
                  </Button>
                  <Link href="/admin-dashboard">
                    <Button className="w-full">
                      Access Full Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}