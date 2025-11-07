import { NextRequest, NextResponse } from 'next/server';
import { getWixServerClient } from '@/lib/wix-client-server';
import { getLoggedInMember } from '@/wix-api/members';

// Super admin emails - these are hardcoded and cannot be changed
const SUPER_ADMIN_EMAILS = [
  'bernarddawson22@gmail.com',
  'super@formex.com',
  'superadmin@gmail.com'
];

// For production: Store admin emails in Wix Site Properties or use Wix member labels
// This in-memory list will reset on server restart
// In a real production app, you'd use Wix Contacts API with custom labels
let adminEmailsList: string[] = [
  ...SUPER_ADMIN_EMAILS,
  'admin@formex.com',
  'admin@gmail.com'
];

// Helper function to check if user is super admin
async function isSuperAdmin(wixClient: any): Promise<{ isSuper: boolean; email?: string }> {
  try {
    const loggedInMember = await getLoggedInMember(wixClient);
    
    if (!loggedInMember || !loggedInMember.loginEmail) {
      return { isSuper: false };
    }

    const userEmail = loggedInMember.loginEmail.toLowerCase().trim();
    return {
      isSuper: SUPER_ADMIN_EMAILS.includes(userEmail),
      email: userEmail
    };
  } catch (error) {
    console.error('Error checking super admin status:', error);
    return { isSuper: false };
  }
}

// GET: List all admins (super admin only)
export async function GET(request: NextRequest) {
  try {
    const wixClient = await getWixServerClient();
    const { isSuper, email } = await isSuperAdmin(wixClient);

    if (!isSuper) {
      return NextResponse.json({ 
        error: 'Unauthorized. Only super admins can view admin list.'
      }, { status: 403 });
    }

    // TODO: In production, fetch from Wix Site Properties or member labels
    // For now, return in-memory list
    return NextResponse.json({
      superAdmins: SUPER_ADMIN_EMAILS,
      admins: adminEmailsList.filter((e: string) => !SUPER_ADMIN_EMAILS.includes(e)),
      totalAdmins: adminEmailsList.length,
      requestedBy: email,
      note: 'Using in-memory storage. Admin list will reset on server restart. Consider using Wix member labels for production.'
    });

  } catch (error) {
    console.error('Error fetching admin list:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch admin list'
    }, { status: 500 });
  }
}

// POST: Add or remove admin (super admin only)
export async function POST(request: NextRequest) {
  try {
    const wixClient = await getWixServerClient();
    const { isSuper, email: requestorEmail } = await isSuperAdmin(wixClient);

    if (!isSuper) {
      return NextResponse.json({ 
        error: 'Unauthorized. Only super admins can manage admins.'
      }, { status: 403 });
    }

    const body = await request.json();
    const { action, email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ 
        error: 'Invalid email address'
      }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ADD admin
    if (action === 'add') {
      // Check if already a super admin
      if (SUPER_ADMIN_EMAILS.includes(normalizedEmail)) {
        return NextResponse.json({
          error: 'User is already a super admin',
          email: normalizedEmail
        }, { status: 400 });
      }

      // Check if already an admin
      if (adminEmailsList.includes(normalizedEmail)) {
        return NextResponse.json({
          error: 'User is already an admin',
          email: normalizedEmail
        }, { status: 400 });
      }

      // Add to admin list
      adminEmailsList.push(normalizedEmail);

      // TODO: In production, save to Wix Site Properties or add member label
      console.log(`✅ Admin added: ${normalizedEmail} by ${requestorEmail}`);

      return NextResponse.json({
        success: true,
        message: `Successfully added ${normalizedEmail} as admin`,
        email: normalizedEmail,
        role: 'admin',
        totalAdmins: adminEmailsList.length,
        note: 'Admin added to in-memory list. Will reset on server restart.'
      });
    }

    // REMOVE admin
    if (action === 'remove') {
      // Prevent removing super admins
      if (SUPER_ADMIN_EMAILS.includes(normalizedEmail)) {
        return NextResponse.json({
          error: 'Cannot remove super admin',
          email: normalizedEmail
        }, { status: 400 });
      }

      // Check if user is an admin
      if (!adminEmailsList.includes(normalizedEmail)) {
        return NextResponse.json({
          error: 'User is not an admin',
          email: normalizedEmail
        }, { status: 400 });
      }

      // Remove from admin list
      adminEmailsList = adminEmailsList.filter((e: string) => e !== normalizedEmail);

      // TODO: In production, remove from Wix Site Properties or remove member label
      console.log(`✅ Admin removed: ${normalizedEmail} by ${requestorEmail}`);

      return NextResponse.json({
        success: true,
        message: `Successfully removed ${normalizedEmail} from admins`,
        email: normalizedEmail,
        totalAdmins: adminEmailsList.length
      });
    }

    return NextResponse.json({ 
      error: 'Invalid action. Use "add" or "remove"'
    }, { status: 400 });

  } catch (error) {
    console.error('Error managing admin:', error);
    return NextResponse.json({ 
      error: 'Failed to manage admin'
    }, { status: 500 });
  }
}
