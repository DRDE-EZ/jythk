'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { enhancedAuth } from '@/lib/enhanced-auth';
import { checkAdminRole, ADMIN_CONFIG } from '@/lib/admin-config';
import { Button } from '@/components/ui/button';
import { Shield, Mail, CheckCircle, XCircle } from 'lucide-react';

export default function AdminTestPage() {
  const [memberData, setMemberData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const currentMember = await enhancedAuth.getCurrentMember();
      
      console.log('Full member data:', currentMember);
      
      if (currentMember && currentMember.member) {
        const member = currentMember.member as any;
        
        // Try all possible email fields
        const possibleEmails = {
          loginEmail: member.loginEmail,
          contactEmails: member.contact?.emails,
          profileEmails: member.profile?.emails,
          email: member.email,
        };
        
        const extractedEmail = 
          member.loginEmail || 
          member.contact?.emails?.[0] || 
          member.profile?.emails?.[0] ||
          member.email ||
          '';
        
        const role = checkAdminRole(extractedEmail);
        
        setMemberData({
          ...member,
          possibleEmails,
          extractedEmail,
          role,
          isAdmin: role === 'admin' || role === 'super_admin',
        });
      } else {
        setError('No member data found. Please sign in.');
      }
    } catch (err: any) {
      console.error('Auth check error:', err);
      setError(err.message || 'Failed to check authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await enhancedAuth.loginWithGoogle('/admin-test');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Authentication Test</h1>
            <p className="text-slate-600">Debug tool to verify admin access configuration</p>
          </div>

          {error && !memberData && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Authentication Error</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
              <Button 
                onClick={handleGoogleLogin}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                Sign In with Google
              </Button>
            </div>
          )}

          {memberData && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className={`p-6 rounded-lg border-2 ${
                memberData.isAdmin 
                  ? 'bg-green-50 border-green-500' 
                  : 'bg-red-50 border-red-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {memberData.isAdmin ? (
                      <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600 mr-3" />
                    )}
                    <div>
                      <h3 className="text-xl font-bold">
                        {memberData.isAdmin ? 'Admin Access Granted' : 'No Admin Access'}
                      </h3>
                      <p className="text-sm">
                        Role: <span className="font-semibold">{memberData.role}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Detection */}
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Email Detection</h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded border">
                    <p className="text-sm text-slate-600 mb-1">Extracted Email (Used for Check):</p>
                    <p className="font-mono font-bold text-lg">
                      {memberData.extractedEmail || '(none)'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded border">
                    <p className="text-sm text-slate-600 mb-2">All Email Fields Found:</p>
                    <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto">
{JSON.stringify(memberData.possibleEmails, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Admin Configuration */}
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Admin Configuration</h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded border">
                    <p className="text-sm text-slate-600 mb-2">Super Admin Emails:</p>
                    <ul className="space-y-1">
                      {ADMIN_CONFIG.defaultSuperAdminEmails.map((email) => (
                        <li 
                          key={email} 
                          className={`font-mono text-sm ${
                            email === memberData.extractedEmail?.toLowerCase().trim()
                              ? 'text-green-600 font-bold'
                              : 'text-slate-600'
                          }`}
                        >
                          • {email}
                          {email === memberData.extractedEmail?.toLowerCase().trim() && (
                            <span className="ml-2 text-xs bg-green-100 px-2 py-1 rounded">MATCH</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded border">
                    <p className="text-sm text-slate-600 mb-2">Admin Emails:</p>
                    <ul className="space-y-1">
                      {ADMIN_CONFIG.defaultAdminEmails
                        .filter(email => !ADMIN_CONFIG.defaultSuperAdminEmails.includes(email))
                        .map((email) => (
                          <li 
                            key={email} 
                            className={`font-mono text-sm ${
                              email === memberData.extractedEmail?.toLowerCase().trim()
                                ? 'text-green-600 font-bold'
                                : 'text-slate-600'
                            }`}
                          >
                            • {email}
                            {email === memberData.extractedEmail?.toLowerCase().trim() && (
                              <span className="ml-2 text-xs bg-green-100 px-2 py-1 rounded">MATCH</span>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Full Member Data */}
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Full Member Data (Debug)</h3>
                <pre className="text-xs bg-slate-800 text-green-400 p-4 rounded overflow-auto max-h-96">
{JSON.stringify(memberData, null, 2)}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button 
                  onClick={checkAuth}
                  variant="outline"
                  className="flex-1"
                >
                  Refresh Check
                </Button>
                <Button 
                  onClick={() => window.location.href = '/admin-dashboard'}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Go to Admin Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
