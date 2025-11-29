'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { enhancedAuth } from '@/lib/enhanced-auth';
import { Button } from '@/components/ui/button';
import { Shield, Mail, CheckCircle, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminSetupWizard() {
  const router = useRouter();
  const [step, setStep] = useState<'check' | 'login' | 'initialize' | 'complete'>('check');
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<{initialized: boolean; hasAdmins: boolean} | null>(null);

  useEffect(() => {
    checkSystemStatus();
  }, []);

  const checkSystemStatus = async () => {
    try {
      setIsLoading(true);
      
      // Check if admin system is already initialized
      const statusRes = await fetch('/api/admin-config?action=status');
      const status = await statusRes.json();
      setSystemStatus(status);

      if (status.initialized) {
        // System already set up, check if current user is logged in
        const member = await enhancedAuth.getCurrentMember();
        if (member && member.member) {
          const memberData = member.member as any;
          const email = memberData.loginEmail || memberData.contact?.emails?.[0] || '';
          
          if (email) {
            setCurrentUser({ email, name: memberData.contact?.firstName || 'User' });
            
            // Check if they're already an admin
            const checkRes = await fetch(`/api/admin-config?action=check&email=${encodeURIComponent(email)}`);
            const checkData = await checkRes.json();
            
            if (checkData.isAdmin) {
              setStep('complete');
              setTimeout(() => router.push('/admin-dashboard'), 2000);
            } else {
              setError('System is already initialized. Please contact an existing administrator.');
              setStep('complete');
            }
          }
        } else {
          setError('System is already initialized. Please contact an existing administrator.');
          setStep('complete');
        }
      } else {
        // System not initialized, proceed with setup
        setStep('login');
      }
    } catch (err) {
      console.error('Error checking system status:', err);
      setError('Failed to check system status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await enhancedAuth.loginWithGoogle('/admin-setup-wizard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setIsLoading(false);
    }
  };

  const handleInitializeAdmin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!currentUser?.email) {
        const member = await enhancedAuth.getCurrentMember();
        if (!member || !member.member) {
          setError('Please sign in first');
          setStep('login');
          return;
        }

        const memberData = member.member as any;
        const email = memberData.loginEmail || memberData.contact?.emails?.[0] || '';
        setCurrentUser({ email, name: memberData.contact?.firstName || 'User' });
      }

      // Initialize the admin system with current user as super admin
      const res = await fetch('/api/admin-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'initialize',
          email: currentUser.email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStep('complete');
        setTimeout(() => router.push('/admin-dashboard'), 2000);
      } else {
        setError(data.error || 'Failed to initialize admin system');
      }
    } catch (err: any) {
      setError(err.message || 'Initialization failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && step === 'check') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-white text-lg">Checking admin system status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Admin Setup Wizard
            </h1>
            <p className="text-slate-600">
              Initialize your admin panel for the first time
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Step: Login */}
          {step === 'login' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  First Time Setup
                </h3>
                <p className="text-blue-800 text-sm">
                  This appears to be the first time setting up the admin panel. 
                  Sign in with your Google account to become the super administrator.
                </p>
              </div>

              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </>
                )}
              </Button>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm">
                  <strong>Note:</strong> The first person to sign in will become the Super Administrator 
                  with full system access. Choose wisely!
                </p>
              </div>
            </div>
          )}

          {/* Step: Initialize */}
          {step === 'initialize' && currentUser && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3">Signed in as:</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {currentUser.name?.charAt(0)?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{currentUser.name}</p>
                    <p className="text-slate-600 text-sm">{currentUser.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">You will receive:</h3>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    Full administrative access to all features
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    Ability to add and manage other administrators
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    Access to all customer data and analytics
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    System configuration and settings management
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleInitializeAdmin}
                disabled={isLoading}
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  <>
                    Initialize Admin Panel
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Step: Complete */}
          {step === 'complete' && !error && (
            <div className="text-center space-y-6">
              <div className="inline-block p-6 bg-green-50 rounded-full">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Setup Complete!</h3>
                <p className="text-slate-600">
                  Redirecting you to the admin dashboard...
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-slate-500 text-sm">
              Formex Construction & Wholesale Admin System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
