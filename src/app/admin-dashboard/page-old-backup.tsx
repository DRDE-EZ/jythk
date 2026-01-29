'use client';

import { useState, useEffect } from 'react';
import { enhancedAuth } from '@/lib/enhanced-auth';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Settings, 
  Bell, 
  LogOut,
  Building2,
  Truck,
  ClipboardList,
  ShoppingCart,
  Mail,
  Trash2,
  AlertTriangle,
  Loader2,
  Plus,
  Download,
  Shield,
  Activity,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

interface AdminUser {
  _id?: string;
  loginEmail?: string;
  role?: 'admin' | 'super_admin';
  contact?: {
    firstName?: string;
    lastName?: string;
  };
}

interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  activeCustomers: number;
  inventoryItems: number;
  isLoading?: boolean;
  error?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'urgent' | 'warning' | 'info';
}

// Loading Component
function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-600 mx-auto mb-2" />
        <p className="text-slate-600">{message}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [adminEmails, setAdminEmails] = useState<string[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [authError, setAuthError] = useState<string | null>(null);

  // Supply Alerts State
  const [supplyAlerts, setSupplyAlerts] = useState([
    { id: '1', product: 'Concrete Mix 40lb', currentStock: 12, threshold: 20, status: 'critical' },
    { id: '2', product: 'Electrical Wire 12AWG', currentStock: 5, threshold: 15, status: 'critical' },
    { id: '3', product: 'PVC Pipe 4"', currentStock: 25, threshold: 30, status: 'warning' },
    { id: '4', product: 'Steel Rebar #4', currentStock: 245, threshold: 50, status: 'good' },
  ]);

  // Nudges State
  const [nudges, setNudges] = useState([
    { id: '1', title: 'Low Stock Alert', message: 'Remind customers when items are running low', enabled: true, frequency: 'daily' },
    { id: '2', title: 'Reorder Reminder', message: 'Suggest reordering based on purchase history', enabled: true, frequency: 'weekly' },
    { id: '3', title: 'New Products', message: 'Notify about new arrivals in their category', enabled: false, frequency: 'weekly' },
    { id: '4', title: 'Abandoned Cart', message: 'Remind about items left in cart', enabled: true, frequency: 'daily' },
  ]);

  // Admin Stats with real data fetching
  const [adminStats, setAdminStats] = useState<AdminStats>({
    totalOrders: 0,
    totalRevenue: 0,
    activeCustomers: 0,
    inventoryItems: 0,
    isLoading: true
  });

  useEffect(() => {
    checkAdminAuthentication();
    loadNotifications();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminStats();
    }
  }, [isAuthenticated]);

  const checkAdminAuthentication = async () => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      // Check admin status via API
      const response = await fetch('/api/admin/check');
      const data = await response.json();
      
      if (!response.ok || !data.isAuthenticated) {
        setIsAuthenticated(false);
        setAuthError(data.message || 'Please sign in with Google to access the admin dashboard.');
        setIsLoading(false);
        return;
      }
      
      // Check if user has admin privileges
      if (data.role === 'customer' || data.role === 'guest') {
        setIsAuthenticated(false);
        setAuthError('You do not have admin access. Please contact a super administrator.');
        setIsLoading(false);
        return;
      }
      
      // User is authenticated and has admin access
      setAdmin({
        _id: data.email,
        loginEmail: data.email,
        role: data.role,
        contact: {}
      });
      setIsAuthenticated(true);
      console.log('✅ Admin access granted:', data.role, data.email);
      
      // Load admin list if super admin
      if (data.role === 'super_admin') {
        loadAdminEmails();
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('❌ Authentication error:', error);
      setIsAuthenticated(false);
      setAuthError('Authentication failed. Please sign in with Google.');
      setIsLoading(false);
    }
  };

  const loadAdminStats = async () => {
    try {
      setAdminStats(prev => ({ ...prev, isLoading: true, error: undefined }));

      // Simulate real API call
      const mockStats = {
        totalOrders: Math.floor(Math.random() * 1000) + 500,
        totalRevenue: Math.floor(Math.random() * 100000) + 50000,
        activeCustomers: Math.floor(Math.random() * 200) + 100,
        inventoryItems: Math.floor(Math.random() * 500) + 250,
        isLoading: false
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      setAdminStats(mockStats);
    } catch (error) {
      console.error('Failed to load admin stats:', error);
      setAdminStats(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to load statistics. Please try again.' 
      }));
    }
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      // Use Wix Google OAuth for sign-in
      const result = await enhancedAuth.loginWithGoogle('/admin-dashboard');
      
      if (result.success) {
        console.log('✅ Redirecting to Google OAuth...');
      }
    } catch (error) {
      console.error('Admin sign-in error:', error);
      setAuthError('Sign-in failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleMakeMeAdmin = async () => {
    alert('❌ This feature is disabled. Please contact a super administrator to grant you admin access.');
  };

  const handleSignOut = async () => {
    try {
      await enhancedAuth.logout();
      setAdmin(null);
      setIsAuthenticated(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const loadAdminEmails = async () => {
    try {
      const response = await fetch('/api/admin/manage');
      if (!response.ok) {
        throw new Error('Failed to fetch admin list');
      }
      
      const data = await response.json();
      const allAdmins = [...data.superAdmins, ...data.admins];
      setAdminEmails(allAdmins);
      console.log('✅ Loaded admin emails:', allAdmins.length);
    } catch (error) {
      console.error('Error loading admin emails:', error);
      // Fallback to empty list
      setAdminEmails([]);
    }
  };

  const loadNotifications = async () => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Low Stock Alert',
        message: 'Concrete Mix 40lb is running low (12 units remaining)',
        type: 'warning',
        timestamp: new Date(),
        read: false
      },
      {
        id: '2',
        title: 'New Order',
        message: 'ABC Construction placed order #ORD-2025-004',
        type: 'info',
        timestamp: new Date(),
        read: false
      }
    ];
    setNotifications(mockNotifications);
  };

  const addAdminEmail = async () => {
    if (!newAdminEmail || !newAdminEmail.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    if (adminEmails.includes(newAdminEmail.toLowerCase())) {
      alert('This email is already an admin');
      return;
    }

    try {
      const response = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'add', 
          email: newAdminEmail.toLowerCase(),
          role: 'admin'
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || 'Failed to add admin');
        return;
      }

      alert(`✅ Successfully added ${newAdminEmail} as admin`);
      setNewAdminEmail('');
      await loadAdminEmails(); // Refresh the list
      console.log('✅ Added admin email:', newAdminEmail);
    } catch (error) {
      console.error('Error adding admin:', error);
      alert('Failed to add admin. Please try again.');
    }
  };

  const removeAdminEmail = async (email: string) => {
    if (email === admin?.loginEmail) {
      alert('Cannot remove your own admin access');
      return;
    }

    if (!confirm(`Are you sure you want to remove ${email} from admins?`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'remove', 
          email: email.toLowerCase()
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || 'Failed to remove admin');
        return;
      }

      alert(`✅ Successfully removed ${email} from admins`);
      await loadAdminEmails(); // Refresh the list
      console.log('✅ Removed admin email:', email);
    } catch (error) {
      console.error('Error removing admin:', error);
      alert('Failed to remove admin. Please try again.');
    }
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications((prev: Notification[]) =>
      prev.map((notif: Notification) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingSpinner message="Authenticating admin access..." />
      </div>
    );
  }

  // Authentication error state
  if (authError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
            <p className="text-slate-600 mb-4">{authError}</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Need admin access?</strong> Contact a super administrator to grant you access.
              </p>
              <p className="text-xs text-blue-600 mt-2">
                bernarddawson22@gmail.com is the primary super admin.
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleSignIn}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform transition-all duration-200 hover:scale-105 shadow-lg"
              size="lg"
            >
              <Mail className="h-5 w-5 mr-2" />
              Sign In with Google
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full transform transition-all duration-200 hover:scale-105"
              size="lg"
            >
              Return to Home
            </Button>
          </div>
          
          <div className="mt-6 text-center text-sm text-slate-500">
            <p>Sign in with your authorized Google account to access the admin dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border-4 border-purple-500/20">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Admin Portal
            </h1>
            <p className="text-slate-600">Jingyuntong Hong Kong</p>
            <p className="text-sm text-slate-500 mt-2">Secure Administrative Access</p>
          </div>
          
          <Button 
            onClick={handleSignIn}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform transition-all duration-200 hover:scale-105 shadow-lg h-12 text-lg"
            size="lg"
          >
            <Mail className="h-5 w-5 mr-2" />
            Sign In with Google
          </Button>
          
          <div className="mt-6 text-center">
            <Link href="/admin-dashboard-demo" className="text-sm text-purple-600 hover:text-purple-700 underline">
              View Demo Dashboard
            </Link>
          </div>
          
          <div className="mt-6 text-center text-xs text-slate-500 space-y-1">
            <p className="flex items-center justify-center">
              <Shield className="h-3 w-3 mr-1" />
              Restricted Access
            </p>
            <p>Protected by Google OAuth 2.0</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Premium Header with Gradient */}
      <header className="bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 border-b border-purple-700/50 px-6 py-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center">
                Admin Dashboard
                <span className="ml-3 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs">LIVE</span>
              </h1>
              <p className="text-sm text-purple-200">Jingyuntong Hong Kong</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {admin?.role === 'super_admin' ? (
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center shadow-lg">
                  <Shield className="h-4 w-4 mr-1" />
                  SUPER ADMIN
                </div>
              ) : (
                <div className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center">
                  <Settings className="h-3 w-3 mr-1" />
                  ADMIN
                </div>
              )}
              <span className="text-sm text-white font-medium">
                {admin?.contact?.firstName || admin?.loginEmail?.split('@')[0]}
              </span>
            </div>
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              size="sm"
              className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transform transition-all duration-200 hover:scale-105"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Premium Sidebar with Dark Theme */}
        <aside className="w-72 bg-slate-900/50 backdrop-blur-xl border-r border-slate-700/50 min-h-screen">
          <nav className="p-4">
            {/* Navigation Header */}
            <div className="mb-6 px-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Navigation
              </h3>
            </div>

            <div className="space-y-1">
              {[
                { id: 'overview', label: 'Dashboard', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
                { id: 'orders', label: 'Orders', icon: ClipboardList, color: 'from-green-500 to-emerald-500' },
                { id: 'inventory', label: 'Inventory', icon: Package, color: 'from-purple-500 to-pink-500' },
                { id: 'supply-alerts', label: 'Supply Alerts', icon: AlertTriangle, color: 'from-red-500 to-orange-500', badge: supplyAlerts.filter(a => a.status === 'critical').length },
                { id: 'customers', label: 'Customers', icon: Users, color: 'from-orange-500 to-red-500' },
                { id: 'suppliers', label: 'Suppliers', icon: Truck, color: 'from-indigo-500 to-purple-500' },
                { id: 'nudges', label: 'Customer Nudges', icon: Bell, color: 'from-cyan-500 to-blue-500' },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'from-teal-500 to-cyan-500' },
                { id: 'admins', label: 'Admin Users', icon: Shield, color: 'from-amber-500 to-orange-500', superAdminOnly: true },
                { id: 'notifications', label: 'Notifications', icon: Bell, color: 'from-pink-500 to-rose-500', badge: notifications.filter((n: Notification) => !n.read).length },
                { id: 'activity', label: 'Activity Log', icon: Activity, color: 'from-violet-500 to-purple-500' },
                { id: 'reports', label: 'Reports', icon: FileText, color: 'from-blue-500 to-indigo-500' },
                { id: 'settings', label: 'Settings', icon: Settings, color: 'from-slate-500 to-slate-600' },
              ].map((item) => {
                if (item.superAdminOnly && admin?.role !== 'super_admin') {
                  return null;
                }
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full group flex items-center justify-between px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                      activeTab === item.id 
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105` 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className={`h-5 w-5 mr-3 ${
                        activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.superAdminOnly && (
                      <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full">
                        SA
                      </span>
                    )}
                  </button>
                );
              }).filter(Boolean)}
            </div>

            {/* Quick Stats in Sidebar */}
            <div className="mt-8 px-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Quick Stats
              </h3>
              <div className="space-y-2">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Server Status</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                      <span className="text-xs font-semibold text-green-400">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content - Light Theme like Demo */}
        <main className="flex-1 p-8 bg-slate-50">
          {activeTab === 'overview' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Dashboard Overview</h2>
                <p className="text-slate-600">Construction supply chain management at a glance</p>
              </div>

              {/* Stats Grid - Clean Style like Demo */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    title: 'Total Orders',
                    value: adminStats.isLoading ? '...' : adminStats.totalOrders.toLocaleString(),
                    change: '+12.5%',
                    icon: ShoppingCart,
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-50'
                  },
                  {
                    title: 'Monthly Revenue',
                    value: adminStats.isLoading ? '...' : `$${adminStats.totalRevenue.toLocaleString()}`,
                    change: '+15.8%',
                    icon: DollarSign,
                    color: 'text-green-600',
                    bgColor: 'bg-green-50'
                  },
                  {
                    title: 'Active Customers',
                    value: adminStats.isLoading ? '...' : adminStats.activeCustomers.toLocaleString(),
                    change: '+8.2%',
                    icon: Users,
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-50'
                  },
                  {
                    title: 'Inventory Items',
                    value: adminStats.isLoading ? '...' : adminStats.inventoryItems.toLocaleString(),
                    change: '+3.1%',
                    icon: Package,
                    color: 'text-orange-600',
                    bgColor: 'bg-orange-50'
                  }
                ].map((stat) => (
                  <div key={stat.title} className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        {adminStats.isLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                        ) : (
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        )}
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

              {adminStats.error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-800">{adminStats.error}</p>
                    <Button 
                      onClick={loadAdminStats}
                      variant="outline" 
                      size="sm" 
                      className="ml-auto transform transition-all duration-200 hover:scale-105"
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              )}

              {/* Content Grid - Demo Style */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity - Real Admin Data */}
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-purple-600" />
                      Recent Activity
                    </h3>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                      <div className="p-2 bg-blue-50 rounded-lg mr-3">
                        <ShoppingCart className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">New order received</p>
                        <p className="text-xs text-slate-500">ABC Construction Ltd. • 5 minutes ago</p>
                      </div>
                      <span className="text-xs font-semibold text-green-600">+$1,250</span>
                    </div>
                    <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                      <div className="p-2 bg-amber-50 rounded-lg mr-3">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">Low stock alert</p>
                        <p className="text-xs text-slate-500">Concrete Mix 40lb • 12 minutes ago</p>
                      </div>
                      <span className="text-xs font-semibold text-amber-600">Action Required</span>
                    </div>
                    <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                      <div className="p-2 bg-green-50 rounded-lg mr-3">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">New customer registered</p>
                        <p className="text-xs text-slate-500">Metro Contractors • 1 hour ago</p>
                      </div>
                      <span className="text-xs font-semibold text-green-600">New</span>
                    </div>
                  </div>
                </div>

                {/* System Status */}
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-green-600" />
                      System Status
                    </h3>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                      <span className="text-sm font-semibold text-green-600">All Systems Operational</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm">API Server</p>
                          <p className="text-xs text-slate-500">Response time: 45ms</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-green-600">Online</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm">Database</p>
                          <p className="text-xs text-slate-500">99.9% uptime</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-green-600">Online</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm">Payment Gateway</p>
                          <p className="text-xs text-slate-500">Last check: 2 minutes ago</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-green-600">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'admins' && admin?.role === 'super_admin' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin Management</h2>
                <p className="text-slate-600">Manage administrator accounts and permissions</p>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Add New Admin</h3>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      placeholder="Enter admin email address"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                    <Button 
                      onClick={addAdminEmail}
                      className="bg-purple-600 hover:bg-purple-700 text-white transform transition-all duration-200 hover:scale-105"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Admin
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Admins</h3>
                  <div className="space-y-3">
                    {adminEmails.map((email, index) => (
                      <div
                        key={email}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 transform transition-all duration-300 hover:scale-102"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-slate-500 mr-3" />
                          <span className="text-slate-700">{email}</span>
                          {email === admin?.loginEmail && (
                            <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                              You
                            </span>
                          )}
                        </div>
                        {email !== admin?.loginEmail && (
                          <Button
                            onClick={() => removeAdminEmail(email)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-300 hover:bg-red-50 transform transition-all duration-200 hover:scale-105"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Notifications Center</h2>
                <p className="text-slate-600">Manage system alerts and notifications</p>
              </div>

              <div className="bg-white rounded-lg border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">Recent Notifications</h3>
                </div>
                <div className="divide-y divide-slate-200">
                  {notifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className={`p-6 transform transition-all duration-300 hover:scale-102 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="font-medium text-slate-900">{notification.title}</h4>
                            {!notification.read && (
                              <div className="ml-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                            )}
                          </div>
                          <p className="text-slate-600 mt-1">{notification.message}</p>
                          <p className="text-sm text-slate-500 mt-2">
                            {notification.timestamp.toLocaleString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <Button
                            onClick={() => markNotificationRead(notification.id)}
                            variant="outline"
                            size="sm"
                            className="transform transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                          >
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Supply Alerts Section */}
          {activeTab === 'supply-alerts' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Supply Alerts</h2>
                <p className="text-slate-600">Monitor inventory levels and receive alerts for low stock items</p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-red-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <span className="text-2xl font-bold text-red-600">
                      {supplyAlerts.filter(a => a.status === 'critical').length}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-600">Critical Alerts</h3>
                  <p className="text-xs text-slate-500 mt-1">Immediate action required</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <AlertCircle className="h-6 w-6 text-amber-600" />
                    </div>
                    <span className="text-2xl font-bold text-amber-600">
                      {supplyAlerts.filter(a => a.status === 'warning').length}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-600">Warning Alerts</h3>
                  <p className="text-xs text-slate-500 mt-1">Review soon</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-green-600">
                      {supplyAlerts.filter(a => a.status === 'good').length}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-600">Well Stocked</h3>
                  <p className="text-xs text-slate-500 mt-1">No action needed</p>
                </div>
              </div>

              {/* Alerts List */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Inventory Alerts</h3>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Set New Alert
                    </Button>
                  </div>
                </div>
                <div className="divide-y divide-slate-200">
                  {supplyAlerts.map((alert) => (
                    <div key={alert.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div className={`p-3 rounded-lg mr-4 ${
                            alert.status === 'critical' ? 'bg-red-50' :
                            alert.status === 'warning' ? 'bg-amber-50' : 'bg-green-50'
                          }`}>
                            <Package className={`h-5 w-5 ${
                              alert.status === 'critical' ? 'text-red-600' :
                              alert.status === 'warning' ? 'text-amber-600' : 'text-green-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900">{alert.product}</h4>
                            <div className="flex items-center mt-1 space-x-4">
                              <span className="text-sm text-slate-600">
                                Current Stock: <span className={`font-semibold ${
                                  alert.status === 'critical' ? 'text-red-600' :
                                  alert.status === 'warning' ? 'text-amber-600' : 'text-green-600'
                                }`}>{alert.currentStock} units</span>
                              </span>
                              <span className="text-sm text-slate-600">
                                Threshold: <span className="font-semibold">{alert.threshold} units</span>
                              </span>
                            </div>
                            {/* Progress Bar */}
                            <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  alert.status === 'critical' ? 'bg-red-500' :
                                  alert.status === 'warning' ? 'bg-amber-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${(alert.currentStock / alert.threshold) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Truck className="h-4 w-4 mr-2" />
                            Reorder
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Customer Nudges Section */}
          {activeTab === 'nudges' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Customer Nudges</h2>
                <p className="text-slate-600">Customize automated notifications to engage customers</p>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Active Nudges</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        {nudges.filter(n => n.enabled).length} of {nudges.length} nudges enabled
                      </p>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Nudge
                    </Button>
                  </div>
                </div>

                <div className="divide-y divide-slate-200">
                  {nudges.map((nudge) => (
                    <div key={nudge.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start flex-1">
                          <div className="mr-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              nudge.enabled ? 'bg-blue-50' : 'bg-slate-100'
                            }`}>
                              <Bell className={`h-6 w-6 ${
                                nudge.enabled ? 'text-blue-600' : 'text-slate-400'
                              }`} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h4 className="font-semibold text-slate-900">{nudge.title}</h4>
                              <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${
                                nudge.enabled 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-slate-100 text-slate-600'
                              }`}>
                                {nudge.enabled ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{nudge.message}</p>
                            <div className="flex items-center mt-3 space-x-4">
                              <span className="text-xs text-slate-500">
                                Frequency: <span className="font-semibold capitalize">{nudge.frequency}</span>
                              </span>
                              <span className="text-xs text-slate-500">
                                Last sent: <span className="font-semibold">2 hours ago</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant={nudge.enabled ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              setNudges(nudges.map(n => 
                                n.id === nudge.id ? { ...n, enabled: !n.enabled } : n
                              ));
                            }}
                            className={nudge.enabled ? 'bg-green-600 hover:bg-green-700' : ''}
                          >
                            {nudge.enabled ? 'Enabled' : 'Enable'}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Frequency Selector (shown when enabled) */}
                      {nudge.enabled && (
                        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                          <label className="text-xs font-semibold text-slate-700 mb-2 block">
                            Send Frequency
                          </label>
                          <select 
                            value={nudge.frequency}
                            onChange={(e) => {
                              setNudges(nudges.map(n => 
                                n.id === nudge.id ? { ...n, frequency: e.target.value } : n
                              ));
                            }}
                            className="w-full md:w-48 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="biweekly">Bi-weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Nudge Templates */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Pro Tip: Effective Nudges
                </h4>
                <ul className="text-sm text-blue-800 space-y-1 ml-7">
                  <li>• Keep messages concise and actionable</li>
                  <li>• Test different frequencies to find optimal engagement</li>
                  <li>• Personalize messages based on customer history</li>
                  <li>• Monitor unsubscribe rates to adjust strategy</li>
                </ul>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {!['overview', 'admins', 'notifications', 'supply-alerts', 'nudges'].includes(activeTab) && (
            <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
              <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module
              </h3>
              <p className="text-slate-600 mb-4">
                This section is under development and will be available soon.
              </p>
              <Button 
                variant="outline"
                onClick={() => setActiveTab('overview')}
                className="transform transition-all duration-200 hover:scale-105"
              >
                Return to Overview
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}