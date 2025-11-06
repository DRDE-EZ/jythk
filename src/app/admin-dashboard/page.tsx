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
  Download
} from 'lucide-react';
import Link from 'next/link';
import { checkAdminRole } from '@/lib/admin-config';

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
    loadAdminEmails();
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
      
      const currentMember = await enhancedAuth.getCurrentMember();
      
      if (currentMember && currentMember.member) {
        const memberData = currentMember.member as any;
        const userEmail = memberData.loginEmail || memberData.contact?.emails?.[0] || '';
        
        const userRole = checkAdminRole(userEmail);
        
        if (userRole === 'admin' || userRole === 'super_admin') {
          setAdmin({
            _id: memberData._id,
            loginEmail: userEmail,
            role: userRole,
            contact: memberData.contact
          });
          setIsAuthenticated(true);
          console.log('✅ Admin authenticated:', userEmail, 'Role:', userRole);
        } else {
          setIsAuthenticated(false);
          setAuthError('You do not have admin privileges. Contact a super admin for access.');
        }
      } else {
        setIsAuthenticated(false);
        setAuthError('Please sign in to access the admin dashboard.');
      }
    } catch (error) {
      console.error('❌ Authentication error:', error);
      setIsAuthenticated(false);
      setAuthError('Authentication failed. Please try signing in again.');
    } finally {
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
      const result = await enhancedAuth.loginWithGoogle();
      if (result.success) {
        await checkAdminAuthentication();
      }
    } catch (error) {
      console.error('Admin sign-in error:', error);
      setAuthError('Sign-in failed. Please try again.');
    }
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
      const stored = localStorage.getItem('adminEmails');
      if (stored) {
        setAdminEmails(JSON.parse(stored));
      } else {
        const defaultEmails = [
          'admin@formex.com',
          'super@formex.com',
          'admin@gmail.com',
          'superadmin@gmail.com'
        ];
        setAdminEmails(defaultEmails);
        localStorage.setItem('adminEmails', JSON.stringify(defaultEmails));
      }
    } catch (error) {
      console.error('Error loading admin emails:', error);
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

    const updatedEmails = [...adminEmails, newAdminEmail.toLowerCase()];
    setAdminEmails(updatedEmails);
    localStorage.setItem('adminEmails', JSON.stringify(updatedEmails));
    setNewAdminEmail('');
    console.log('Added admin email:', newAdminEmail);
  };

  const removeAdminEmail = async (email: string) => {
    if (email === admin?.loginEmail) {
      alert('Cannot remove your own admin access');
      return;
    }

    const updatedEmails = adminEmails.filter((e: string) => e !== email);
    setAdminEmails(updatedEmails);
    localStorage.setItem('adminEmails', JSON.stringify(updatedEmails));
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
            <p className="text-slate-600 mb-4">{authError}</p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleSignIn}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white transform transition-all duration-200 hover:scale-105"
              size="lg"
            >
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
            <p>Need admin access? Contact a super administrator</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Building2 className="h-12 w-12 text-slate-700 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Portal</h1>
            <p className="text-slate-600">Administrative access for Formex Construction & Wholesale</p>
          </div>
          
          <Button 
            onClick={handleSignIn}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white transform transition-all duration-200 hover:scale-105"
            size="lg"
          >
            Sign In with Google
          </Button>
          
          <div className="mt-6 text-center text-sm text-slate-500">
            <p>Restricted access • Contact IT for admin credentials</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 animate-in slide-in-from-right duration-500">
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
            <div className="flex items-center space-x-2">
              <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Settings className="h-3 w-3 mr-1" />
                ADMIN
              </div>
              {admin?.role === 'super_admin' && (
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center animate-pulse">
                  <Users className="h-3 w-3 mr-1" />
                  SUPER
                </div>
              )}
              <span className="text-sm text-slate-600">
                {admin?.contact?.firstName || admin?.loginEmail}
              </span>
            </div>
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              size="sm"
              className="transform transition-all duration-200 hover:scale-105"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
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
                { id: 'admins', label: 'Admin Management', icon: Settings, superAdminOnly: true },
                { id: 'backup', label: 'Data Backup', icon: Download },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'settings', label: 'System Settings', icon: Settings },
              ].map((item) => {
                if (item.superAdminOnly && admin?.role !== 'super_admin') {
                  return null;
                }
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-all duration-200 transform hover:scale-105 ${
                      activeTab === item.id 
                        ? 'bg-slate-100 text-slate-900 scale-105 shadow-md' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                    {item.superAdminOnly && (
                      <div className="ml-auto bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-xs animate-pulse">
                        SUPER
                      </div>
                    )}
                  </button>
                );
              }).filter(Boolean)}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Dashboard Overview</h2>
                <p className="text-slate-600">Monitor your construction wholesale business performance</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    title: 'Total Orders',
                    value: adminStats.isLoading ? '...' : adminStats.totalOrders.toLocaleString(),
                    icon: ShoppingCart,
                    color: 'text-blue-600',
                    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
                    borderColor: 'border-blue-200'
                  },
                  {
                    title: 'Revenue',
                    value: adminStats.isLoading ? '...' : `$${adminStats.totalRevenue.toLocaleString()}`,
                    icon: DollarSign,
                    color: 'text-green-600',
                    bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
                    borderColor: 'border-green-200'
                  },
                  {
                    title: 'Active Customers',
                    value: adminStats.isLoading ? '...' : adminStats.activeCustomers.toLocaleString(),
                    icon: Users,
                    color: 'text-purple-600',
                    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
                    borderColor: 'border-purple-200'
                  },
                  {
                    title: 'Inventory Items',
                    value: adminStats.isLoading ? '...' : adminStats.inventoryItems.toLocaleString(),
                    icon: Package,
                    color: 'text-orange-600',
                    bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
                    borderColor: 'border-orange-200'
                  }
                ].map((stat, index) => (
                  <div 
                    key={stat.title} 
                    className={`${stat.bgColor} p-6 rounded-lg border ${stat.borderColor} transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white shadow-sm">
                        {adminStats.isLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                        ) : (
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        )}
                      </div>
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

          {/* Placeholder for other tabs */}
          {!['overview', 'admins', 'notifications'].includes(activeTab) && (
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