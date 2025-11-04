'use client';

import { useState } from 'react';

export default function AdminSetupPage() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const initializeAdmin = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin?action=init&email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (data.success) {
        setResult({
          type: 'success',
          message: `🎉 Admin access granted to ${email}!`,
          data: data
        });
      } else {
        setResult({
          type: 'error',
          message: data.error || 'Failed to create admin',
          data: data
        });
      }
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Network error occurred',
        data: error
      });
    } finally {
      setLoading(false);
    }
  };

  const checkAdminStatus = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin?action=check&email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      setResult({
        type: data.isAdmin ? 'info' : 'warning',
        message: data.isAdmin ? 
          `✅ ${email} has admin access` : 
          `❌ ${email} does not have admin access`,
        data: data
      });
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Failed to check admin status',
        data: error
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Admin Setup
          </h1>
          
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              Set up admin access for your account. This will give you access to the admin dashboard
              where you can manage orders, users, and system settings.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-blue-800 font-medium mb-2">What you'll get:</h3>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>✅ Access to admin dashboard</li>
                <li>✅ Order management capabilities</li>
                <li>✅ User management (create other admins)</li>
                <li>✅ System analytics and reports</li>
                <li>✅ Backend service access</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@your-domain.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={initializeAdmin}
                disabled={loading || !email}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-medium"
              >
                {loading ? 'Setting up...' : 'Make Me Admin'}
              </button>
              
              <button
                onClick={checkAdminStatus}
                disabled={loading || !email}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 disabled:bg-gray-400 font-medium"
              >
                {loading ? 'Checking...' : 'Check Status'}
              </button>
            </div>
          </div>

          {result && (
            <div className={`mt-6 p-4 rounded-md ${
              result.type === 'success' ? 'bg-green-50 border border-green-200' :
              result.type === 'info' ? 'bg-blue-50 border border-blue-200' :
              result.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
              'bg-red-50 border border-red-200'
            }`}>
              <h3 className={`font-medium mb-2 ${
                result.type === 'success' ? 'text-green-800' :
                result.type === 'info' ? 'text-blue-800' :
                result.type === 'warning' ? 'text-yellow-800' :
                'text-red-800'
              }`}>
                {result.message}
              </h3>
              
              {result.type === 'success' && (
                <div className="mt-4 space-y-2">
                  <a
                    href="/admin"
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Go to Admin Dashboard
                  </a>
                </div>
              )}
              
              <details className="mt-3">
                <summary className={`cursor-pointer text-sm ${
                  result.type === 'success' ? 'text-green-700' :
                  result.type === 'info' ? 'text-blue-700' :
                  result.type === 'warning' ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  View Details
                </summary>
                <pre className="mt-2 text-xs bg-white p-2 rounded border overflow-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-800 font-medium mb-2">Quick Access Links:</h3>
            <div className="space-y-1 text-sm">
              <a href="/admin" className="block text-blue-600 hover:text-blue-800">
                🛠️ Admin Dashboard
              </a>
              <a href="/customer-dashboard" className="block text-blue-600 hover:text-blue-800">
                👤 Customer Dashboard
              </a>
              <a href="/oauth-debug" className="block text-blue-600 hover:text-blue-800">
                🔧 OAuth Debug Tools
              </a>
              <a href="/wix-sdk-test" className="block text-blue-600 hover:text-blue-800">
                🧪 Wix SDK Testing
              </a>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-yellow-800 font-medium mb-2">Important Notes:</h3>
            <ul className="text-yellow-700 space-y-1 text-sm">
              <li>• This creates a local admin account (stored in memory)</li>
              <li>• In production, you'd want to use a database</li>
              <li>• Admin access is separate from Wix OAuth authentication</li>
              <li>• You can create additional admin users from the admin dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}