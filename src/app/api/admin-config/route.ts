import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// This would ideally be stored in a database
// For now, we'll use a simple JSON storage approach
// In production, replace this with your database (MongoDB, PostgreSQL, etc.)

interface AdminConfig {
  superAdmins: string[];
  admins: string[];
  initialized: boolean;
  createdAt: string;
}

// Temporary in-memory storage (replace with database in production)
let adminConfigStore: AdminConfig = {
  superAdmins: [],
  admins: [],
  initialized: false,
  createdAt: new Date().toISOString(),
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const email = searchParams.get('email');

    switch (action) {
      case 'check':
        if (!email) {
          return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }
        
        const normalizedEmail = email.toLowerCase().trim();
        const isSuperAdmin = adminConfigStore.superAdmins.includes(normalizedEmail);
        const isAdmin = adminConfigStore.admins.includes(normalizedEmail) || isSuperAdmin;
        
        return NextResponse.json({
          isAdmin,
          isSuperAdmin,
          role: isSuperAdmin ? 'super_admin' : isAdmin ? 'admin' : 'customer',
        });

      case 'list':
        // Only return list if user is super admin (check would be done here)
        return NextResponse.json({
          superAdmins: adminConfigStore.superAdmins,
          admins: adminConfigStore.admins,
          initialized: adminConfigStore.initialized,
        });

      case 'status':
        return NextResponse.json({
          initialized: adminConfigStore.initialized,
          hasAdmins: adminConfigStore.superAdmins.length > 0 || adminConfigStore.admins.length > 0,
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Admin config GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, role } = body;

    switch (action) {
      case 'initialize':
        // First-time setup - create initial super admin
        if (adminConfigStore.initialized) {
          return NextResponse.json({ error: 'System already initialized' }, { status: 400 });
        }

        if (!email || !email.includes('@')) {
          return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();
        adminConfigStore.superAdmins = [normalizedEmail];
        adminConfigStore.initialized = true;
        
        console.log('✅ Admin system initialized with super admin:', normalizedEmail);
        
        return NextResponse.json({
          success: true,
          message: 'Admin system initialized',
          superAdmin: normalizedEmail,
        });

      case 'add':
        // Add new admin (must be called by existing super admin)
        // TODO: Add authentication check here
        
        if (!email || !email.includes('@')) {
          return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
        }

        const emailToAdd = email.toLowerCase().trim();
        
        if (role === 'super_admin') {
          if (!adminConfigStore.superAdmins.includes(emailToAdd)) {
            adminConfigStore.superAdmins.push(emailToAdd);
          }
        } else {
          if (!adminConfigStore.admins.includes(emailToAdd)) {
            adminConfigStore.admins.push(emailToAdd);
          }
        }

        console.log('✅ Added admin:', emailToAdd, 'Role:', role);
        
        return NextResponse.json({
          success: true,
          message: 'Admin added successfully',
        });

      case 'remove':
        // Remove admin (must be called by super admin)
        // TODO: Add authentication check here
        
        if (!email) {
          return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        const emailToRemove = email.toLowerCase().trim();
        adminConfigStore.superAdmins = adminConfigStore.superAdmins.filter(e => e !== emailToRemove);
        adminConfigStore.admins = adminConfigStore.admins.filter(e => e !== emailToRemove);

        console.log('✅ Removed admin:', emailToRemove);
        
        return NextResponse.json({
          success: true,
          message: 'Admin removed successfully',
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Admin config POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
