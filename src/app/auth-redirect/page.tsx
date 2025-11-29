'use client';

import { useEffect, useState } from 'react';
import { enhancedAuth } from '@/lib/enhanced-auth';
import { isAdmin } from '@/lib/admin-config';

export default function AuthRedirect() {
  const [status, setStatus] = useState('Checking session...');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    async function checkAndRedirect() {
      try {
        console.log('🔍 Auth redirect - Attempt', attempts + 1);
        setStatus('Verifying your credentials...');
        
        // Get current member with retry logic
        let currentMember = await enhancedAuth.getCurrentMember();
        
        // If no member found on first try, wait and retry
        if ((!currentMember || !currentMember.member) && attempts < 3) {
          console.log('⏳ No member found, retrying in 1 second...');
          setStatus('Loading your account...');
          setAttempts(attempts + 1);
          setTimeout(checkAndRedirect, 1000);
          return;
        }
        
        if (!currentMember || !currentMember.member) {
          console.log('❌ No member found after retries, redirecting to customer dashboard');
          setStatus('Redirecting...');
          window.location.href = '/customer-dashboard-protected';
          return;
        }
        
        // Extract email
        const memberData = currentMember.member as any;
        const userEmail = memberData.loginEmail || memberData.contact?.emails?.[0] || '';
        
        console.log('✅ Auth redirect - User email:', userEmail);
        
        if (!userEmail || !userEmail.includes('@')) {
          console.log('❌ Invalid email, redirecting to customer dashboard');
          setStatus('Redirecting...');
          window.location.href = '/customer-dashboard-protected';
          return;
        }
        
        // Check if admin
        const isAdminUser = isAdmin(userEmail);
        
        console.log('🔍 Auth redirect - Is admin?', isAdminUser);
        
        // Redirect based on role
        if (isAdminUser) {
          console.log('✅ Admin detected - redirecting to admin dashboard');
          setStatus('Welcome Admin! Redirecting...');
          window.location.href = '/admin-dashboard';
        } else {
          console.log('👤 Regular user - redirecting to customer dashboard');
          setStatus('Welcome! Redirecting...');
          window.location.href = '/customer-dashboard-protected';
        }
      } catch (error) {
        console.error('❌ Auth redirect failed:', error);
        setStatus('Error occurred, redirecting...');
        // Default to customer dashboard on error
        setTimeout(() => {
          window.location.href = '/customer-dashboard-protected';
        }, 1000);
      }
    }
    
    // Start checking after component mounts
    const timer = setTimeout(checkAndRedirect, 500);
    return () => clearTimeout(timer);
  }, [attempts]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          borderTop: '4px solid white',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }} />
        <h2 style={{ margin: '0 0 10px', fontSize: '28px', fontWeight: 600 }}>
          Verifying your access
        </h2>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>
          {status}
        </p>
        {attempts > 0 && (
          <p style={{ margin: '10px 0 0', opacity: 0.7, fontSize: '14px' }}>
            Attempt {attempts + 1} of 4
          </p>
        )}
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
