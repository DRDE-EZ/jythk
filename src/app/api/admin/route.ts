import { NextRequest, NextResponse } from 'next/server';
import { adminService, initializeDefaultAdmin } from '@/lib/admin-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const email = searchParams.get('email');

    switch (action) {
      case 'check':
        if (!email) {
          return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }
        
        const isAdmin = await adminService.isUserAdmin(email);
        const adminUser = await adminService.getAdminUser(email);
        
        return NextResponse.json({
          isAdmin,
          user: adminUser,
          timestamp: new Date().toISOString()
        });

      case 'init':
        if (!email) {
          return NextResponse.json({ error: 'Email required for initialization' }, { status: 400 });
        }
        
        const newAdmin = await initializeDefaultAdmin(email);
        
        return NextResponse.json({
          success: true,
          message: `Admin access granted to ${email}`,
          user: newAdmin
        });

      case 'list':
        const allAdmins = await adminService.getAllAdminUsers();
        return NextResponse.json({
          admins: allAdmins,
          count: allAdmins.length
        });

      default:
        return NextResponse.json({
          endpoints: {
            check: '/api/admin?action=check&email=your@email.com',
            init: '/api/admin?action=init&email=your@email.com',
            list: '/api/admin?action=list'
          }
        });
    }
  } catch (error: any) {
    console.error('Admin API error:', error);
    return NextResponse.json({
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, role, userData } = body;

    switch (action) {
      case 'create_admin':
        if (!email) {
          return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }
        
        const newAdmin = await adminService.promoteUserToAdmin(
          email, 
          role || 'admin'
        );
        
        return NextResponse.json({
          success: true,
          message: `Admin access granted to ${email}`,
          user: newAdmin
        });

      case 'update_admin':
        if (!email || !userData) {
          return NextResponse.json({ error: 'Email and userData required' }, { status: 400 });
        }
        
        const existingAdmin = await adminService.getAdminUser(email);
        if (!existingAdmin) {
          return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
        }
        
        const updatedAdmin = await adminService.updateAdminUser(
          existingAdmin.id, 
          userData
        );
        
        return NextResponse.json({
          success: true,
          user: updatedAdmin
        });

      case 'login':
        if (!email) {
          return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }
        
        await adminService.updateLastLogin(email);
        const user = await adminService.getAdminUser(email);
        
        return NextResponse.json({
          success: true,
          user,
          isAdmin: !!user
        });

      default:
        return NextResponse.json({
          error: 'Invalid action',
          availableActions: ['create_admin', 'update_admin', 'login']
        }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Admin POST API error:', error);
    return NextResponse.json({
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}