'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { enhancedAuth } from '@/lib/enhanced-auth';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Package, 
  ShoppingCart,
  Mail,
  AlertTriangle,
  Loader2,
  Shield,
  LogOut,
  DollarSign,
  TrendingUp,
  Bell,
  Settings
} from 'lucide-react';

interface AdminUser {
  loginEmail?: string;
  role?: 'super_admin' | 'admin';
  contact?: {
    firstName?: string;
    lastName?: string;
  };
}

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: any[];
  lowStockProducts: any[];
  isLoading: boolean;
}

// Loading Component
function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
        <p className="text-slate-600">{message}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authError, setAuthError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0,
    recentOrders: [],
    lowStockProducts: [],
    isLoading: true
  });
  const [nudges, setNudges] = useState<any[]>([]);
  const [nudgesLoading, setNudgesLoading] = useState(false);

  useEffect(() => {
    checkAdminAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardStats();
      if (activeTab === 'nudges') {
        loadNudges();
      }
    }
  }, [isAuthenticated, activeTab]);

  const checkAdminAuthentication = async () => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      // First check if user is authenticated with Wix
      const currentMember = await enhancedAuth.getCurrentMember();
      
      if (!currentMember || !currentMember.member) {
        // No authenticated user - must login
        console.log('❌ No authenticated user found');
        setIsAuthenticated(false);
        setAuthError('Please sign in with Google to access the admin dashboard.');
        setIsLoading(false);
        return;
      }
      
      // Now check admin privileges
      const response = await fetch('/api/admin/check');
      const data = await response.json();
      
      if (!response.ok || !data.isAuthenticated) {
        setIsAuthenticated(false);
        setAuthError(data.message || 'Please sign in with Google to access the admin dashboard.');
        setIsLoading(false);
        return;
      }
      
      if (data.role === 'customer' || data.role === 'guest') {
        setIsAuthenticated(false);
        setAuthError('You do not have admin access. Please contact a super administrator.');
        setIsLoading(false);
        return;
      }
      
      // Verify email exists and is valid
      if (!data.email || !data.email.includes('@')) {
        setIsAuthenticated(false);
        setAuthError('Invalid admin email. Please sign in with a valid Google account.');
        setIsLoading(false);
        return;
      }
      
      setAdmin({
        loginEmail: data.email,
        role: data.role,
        contact: {}
      });
      setIsAuthenticated(true);
      console.log('✅ Admin access granted:', data.role, data.email);
      setIsLoading(false);
    } catch (error) {
      console.error('❌ Authentication error:', error);
      setIsAuthenticated(false);
      setAuthError('Authentication failed. Please sign in with Google.');
      setIsLoading(false);
    }
  };

  const loadDashboardStats = async () => {
    try {
      setStats(prev => ({ ...prev, isLoading: true }));

      // Fetch real Wix data
      const [ordersRes, productsRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/products')
      ]);

      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();

      setStats({
        totalOrders: ordersData.totalOrders || 0,
        totalRevenue: ordersData.totalRevenue || 0,
        totalProducts: productsData.totalProducts || 0,
        totalCustomers: ordersData.totalCustomers || 0,
        recentOrders: ordersData.recentOrders || [],
        lowStockProducts: productsData.lowStockProducts || [],
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
      setStats(prev => ({ ...prev, isLoading: false }));
    }
  };

  const loadNudges = async () => {
    try {
      setNudgesLoading(true);
      const response = await fetch('/api/admin/nudges');
      const data = await response.json();
      
      if (response.ok && data.nudges) {
        setNudges(data.nudges);
      }
      setNudgesLoading(false);
    } catch (error) {
      console.error('Failed to load nudges:', error);
      setNudgesLoading(false);
    }
  };

  const toggleNudge = async (nudgeId: string) => {
    try {
      const response = await fetch('/api/admin/nudges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', nudgeId }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setNudges(nudges.map(n => 
          n.id === nudgeId ? { ...n, enabled: !n.enabled } : n
        ));
      }
    } catch (error) {
      console.error('Failed to toggle nudge:', error);
    }
  };

  const updateNudgeFrequency = async (nudgeId: string, frequency: string) => {
    try {
      const response = await fetch('/api/admin/nudges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'update', 
          nudgeId, 
          updates: { frequency } 
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setNudges(nudges.map(n => 
          n.id === nudgeId ? { ...n, frequency } : n
        ));
      }
    } catch (error) {
      console.error('Failed to update nudge:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setAuthError(null);
      await enhancedAuth.loginWithGoogle('/admin-dashboard');
    } catch (error) {
      console.error('Admin sign-in error:', error);
      setAuthError('Sign-in failed. Please try again.');
      setIsLoading(false);
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 border border-slate-200">
          <div className="text-center mb-8">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
            <p className="text-slate-600 mb-4">{authError}</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Need admin access?</strong> Contact bernarddawson22@gmail.com
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleSignIn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              <Mail className="h-5 w-5 mr-2" />
              Sign In with Google
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 border border-slate-200">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Admin Portal
            </h1>
            <p className="text-slate-600">Jingyuntong Hong Kong</p>
          </div>
          
          <Button 
            onClick={handleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
            size="lg"
          >
            <Mail className="h-5 w-5 mr-2" />
            Sign In with Google
          </Button>
          
          <div className="mt-6 text-center text-xs text-slate-500">
            <p className="flex items-center justify-center">
              <Shield className="h-3 w-3 mr-1" />
              Protected by Google OAuth 2.0
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-600">Jingyuntong Hong Kong</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-slate-900">
                {admin?.contact?.firstName || admin?.loginEmail?.split('@')[0]}
              </div>
              <div className="text-xs text-slate-500">
                {admin?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
              </div>
            </div>
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              size="sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Simple Navigation Tabs */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-slate-200 p-2">
          <div className="flex space-x-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'nudges', label: 'Nudges', icon: Bell },
              ...(admin?.role === 'super_admin' ? [{ id: 'settings', label: 'Settings', icon: Settings }] : [])
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h2>

            {/* Stats Grid */}
            {stats.isLoading ? (
              <LoadingSpinner message="Loading dashboard data..." />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <ShoppingCart className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalOrders}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-slate-900">${stats.totalRevenue.toLocaleString()}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Package className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Total Products</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalProducts}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <Users className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Total Customers</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalCustomers}</p>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Orders</h3>
                  {stats.recentOrders.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">No recent orders</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Order ID</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Customer</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Date</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">Total</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.recentOrders.slice(0, 10).map((order: any) => (
                            <tr key={order._id} className="border-b border-slate-100">
                              <td className="py-3 px-4 text-sm text-slate-900">{order.number}</td>
                              <td className="py-3 px-4 text-sm text-slate-900">
                                {order.buyerInfo?.email || 'Guest'}
                              </td>
                              <td className="py-3 px-4 text-sm text-slate-600">
                                {new Date(order._createdDate).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4 text-sm text-slate-900 text-right font-medium">
                                ${order.priceSummary?.total || 0}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                  {order.fulfillmentStatus || 'Pending'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Low Stock Alert */}
                {stats.lowStockProducts.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                      <h3 className="text-lg font-semibold text-amber-900">Low Stock Alert</h3>
                    </div>
                    <div className="space-y-2">
                      {stats.lowStockProducts.map((product: any) => (
                        <div key={product._id} className="flex items-center justify-between text-sm">
                          <span className="text-amber-900">{product.name}</span>
                          <span className="font-medium text-amber-700">
                            {product.stock?.quantity || 0} units remaining
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Other tabs - Coming Soon */}
        {activeTab === 'nudges' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Customer Nudges</h2>
            <p className="text-slate-600 mb-6">
              Automated email notifications to engage customers based on their behavior
            </p>

            {nudgesLoading ? (
              <LoadingSpinner message="Loading nudges..." />
            ) : (
              <div className="space-y-4">
                {nudges.map((nudge) => (
                  <div key={nudge.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{nudge.title}</h3>
                          <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${
                            nudge.enabled 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {nudge.enabled ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{nudge.description}</p>
                        
                        {/* Email Preview */}
                        <div className="bg-slate-50 rounded-lg p-4 mb-3">
                          <div className="text-xs font-medium text-slate-500 mb-2">Email Preview:</div>
                          <div className="text-sm text-slate-700 mb-1">
                            <strong>Subject:</strong> {nudge.emailSubject}
                          </div>
                          <div className="text-sm text-slate-700">
                            <strong>Body:</strong>
                            <div className="mt-1 whitespace-pre-wrap text-slate-600">
                              {nudge.emailBody.substring(0, 150)}...
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <span>Frequency: <strong className="text-slate-700 capitalize">{nudge.frequency}</strong></span>
                          <span>Target: <strong className="text-slate-700 capitalize">{nudge.targetAudience.replace('_', ' ')}</strong></span>
                          {nudge.totalSent > 0 && (
                            <span>Sent: <strong className="text-slate-700">{nudge.totalSent}</strong></span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant={nudge.enabled ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleNudge(nudge.id)}
                          className={nudge.enabled ? 'bg-green-600 hover:bg-green-700' : ''}
                        >
                          {nudge.enabled ? 'Enabled' : 'Enable'}
                        </Button>
                      </div>
                    </div>

                    {/* Frequency Selector (shown when enabled) */}
                    {nudge.enabled && nudge.frequency !== 'immediate' && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <label className="text-xs font-semibold text-blue-900 mb-2 block">
                          Send Frequency
                        </label>
                        <select 
                          value={nudge.frequency}
                          onChange={(e) => updateNudgeFrequency(nudge.id, e.target.value)}
                          className="w-full md:w-48 px-3 py-2 border border-blue-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                          <option value="immediate">Immediate</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    )}
                  </div>
                ))}

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    About Customer Nudges
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1 ml-7">
                    <li>• Automated emails are sent based on customer behavior</li>
                    <li>• Variables like {'{'}{'{'} customer_name {'}'}{'}'}  are automatically replaced</li>
                    <li>• Test emails first before enabling for all customers</li>
                    <li>• Monitor delivery rates to optimize engagement</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab !== 'dashboard' && activeTab !== 'nudges' && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
            <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h3>
            <p className="text-slate-600 mb-4">This section is being set up with real Wix data.</p>
            <Button 
              variant="outline"
              onClick={() => setActiveTab('dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
