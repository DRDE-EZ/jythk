import { NextRequest, NextResponse } from 'next/server';
import { getWixServerClient } from '@/lib/wix-client-server';
import { getLoggedInMember } from '@/wix-api/members';

// Production admin emails - these are the initial super admins
const SUPER_ADMIN_EMAILS = [
  'bernarddawson22@gmail.com',
  'super@formex.com',
  'superadmin@gmail.com'
];

// This would typically come from a database
// For production, replace this with actual database queries
function getAdminEmails(): string[] {
  // In production, fetch from your database
  // For now, we'll use a hardcoded list that can be extended via the management API
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('admin_emails_list');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse admin emails:', e);
      }
    }
  }
  
  return [
    ...SUPER_ADMIN_EMAILS,
    'admin@formex.com',
    'admin@gmail.com'
  ];
}

export async function GET(request: NextRequest) {
  try {
    const wixClient = await getWixServerClient();
    const loggedInMember = await getLoggedInMember(wixClient);

    if (!loggedInMember) {
      return NextResponse.json({ 
        role: 'guest',
        isAuthenticated: false,
        message: 'Not authenticated'
      }, { status: 401 });
    }

    const userEmail = loggedInMember.loginEmail?.toLowerCase().trim();
    
    if (!userEmail) {
      return NextResponse.json({ 
        role: 'customer',
        isAuthenticated: true,
        message: 'Email not found'
      }, { status: 200 });
    }

    // Check if super admin
    if (SUPER_ADMIN_EMAILS.includes(userEmail)) {
      return NextResponse.json({
        role: 'super_admin',
        isAuthenticated: true,
        email: userEmail,
        permissions: ['read', 'write', 'delete', 'manage_admins']
      });
    }

    // Check if regular admin
    const adminEmails = getAdminEmails();
    if (adminEmails.includes(userEmail)) {
      return NextResponse.json({
        role: 'admin',
        isAuthenticated: true,
        email: userEmail,
        permissions: ['read', 'write']
      });
    }

    // Regular customer
    return NextResponse.json({
      role: 'customer',
      isAuthenticated: true,
      email: userEmail,
      permissions: ['read']
    });

  } catch (error) {
    console.error('Admin check error:', error);
    return NextResponse.json({ 
      role: 'guest',
      isAuthenticated: false,
      error: 'Failed to check admin status'
    }, { status: 500 });
  }
}
