// Admin user management and role system
import { members } from '@wix/members';
import { getServerWixClient } from './wix-client-official';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin' | 'customer';
  permissions: AdminPermission[];
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

export interface AdminPermission {
  resource: 'orders' | 'products' | 'customers' | 'analytics' | 'settings' | 'users';
  actions: ('read' | 'write' | 'delete' | 'admin')[];
}

// Default admin permissions
const ADMIN_PERMISSIONS: AdminPermission[] = [
  { resource: 'orders', actions: ['read', 'write'] },
  { resource: 'products', actions: ['read', 'write'] },
  { resource: 'customers', actions: ['read', 'write'] },
  { resource: 'analytics', actions: ['read'] },
  { resource: 'settings', actions: ['read'] }
];

const SUPER_ADMIN_PERMISSIONS: AdminPermission[] = [
  { resource: 'orders', actions: ['read', 'write', 'delete', 'admin'] },
  { resource: 'products', actions: ['read', 'write', 'delete', 'admin'] },
  { resource: 'customers', actions: ['read', 'write', 'delete', 'admin'] },
  { resource: 'analytics', actions: ['read', 'admin'] },
  { resource: 'settings', actions: ['read', 'write', 'admin'] },
  { resource: 'users', actions: ['read', 'write', 'delete', 'admin'] }
];

class AdminService {
  // In-memory admin users storage (in production, use database)
  private adminUsers: AdminUser[] = [
    {
      id: 'admin_1',
      email: 'admin@your-domain.com', // Change this to your email
      role: 'super_admin',
      permissions: SUPER_ADMIN_PERMISSIONS,
      createdAt: new Date().toISOString(),
      isActive: true,
      profile: {
        firstName: 'System',
        lastName: 'Administrator'
      }
    }
  ];

  // Check if user is admin
  async isUserAdmin(email: string): Promise<boolean> {
    const user = this.adminUsers.find(u => u.email === email && u.isActive);
    return !!user;
  }

  // Get admin user by email
  async getAdminUser(email: string): Promise<AdminUser | null> {
    return this.adminUsers.find(u => u.email === email && u.isActive) || null;
  }

  // Create new admin user
  async createAdminUser(userData: {
    email: string;
    role: 'admin' | 'super_admin';
    profile?: {
      firstName?: string;
      lastName?: string;
      phone?: string;
    };
  }): Promise<AdminUser> {
    const newUser: AdminUser = {
      id: `admin_${Date.now()}`,
      email: userData.email,
      role: userData.role,
      permissions: userData.role === 'super_admin' ? SUPER_ADMIN_PERMISSIONS : ADMIN_PERMISSIONS,
      createdAt: new Date().toISOString(),
      isActive: true,
      profile: userData.profile
    };

    this.adminUsers.push(newUser);
    return newUser;
  }

  // Update admin user
  async updateAdminUser(userId: string, updates: Partial<AdminUser>): Promise<AdminUser | null> {
    const userIndex = this.adminUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) return null;

    this.adminUsers[userIndex] = { ...this.adminUsers[userIndex], ...updates };
    return this.adminUsers[userIndex];
  }

  // Get all admin users
  async getAllAdminUsers(): Promise<AdminUser[]> {
    return this.adminUsers.filter(u => u.isActive);
  }

  // Check user permissions
  async hasPermission(
    email: string, 
    resource: AdminPermission['resource'], 
    action: AdminPermission['actions'][0]
  ): Promise<boolean> {
    const user = await this.getAdminUser(email);
    if (!user) return false;

    const permission = user.permissions.find(p => p.resource === resource);
    return permission ? permission.actions.includes(action) : false;
  }

  // Update last login
  async updateLastLogin(email: string): Promise<void> {
    const userIndex = this.adminUsers.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      this.adminUsers[userIndex].lastLogin = new Date().toISOString();
    }
  }

  // Make user admin (for you to call manually)
  async promoteUserToAdmin(
    email: string, 
    role: 'admin' | 'super_admin' = 'admin'
  ): Promise<AdminUser> {
    // Check if user already exists
    let existingUser = await this.getAdminUser(email);
    
    if (existingUser) {
      // Update existing user role
      existingUser.role = role;
      existingUser.permissions = role === 'super_admin' ? SUPER_ADMIN_PERMISSIONS : ADMIN_PERMISSIONS;
      return existingUser;
    }

    // Create new admin user
    return await this.createAdminUser({
      email,
      role,
      profile: {
        firstName: email.split('@')[0],
        lastName: 'Admin'
      }
    });
  }

  // Get Wix member info and merge with admin data
  async getAdminWithWixData(email: string): Promise<{
    admin: AdminUser | null;
    wixMember: any | null;
    isWixMember: boolean;
  }> {
    const admin = await this.getAdminUser(email);
    
    try {
      const wixClient = getServerWixClient();
      // Try to get member from Wix
      const members = await wixClient.members.queryMembers()
        .eq('loginEmail', email)
        .find();
      
      const wixMember = members.items.length > 0 ? members.items[0] : null;
      
      return {
        admin,
        wixMember,
        isWixMember: !!wixMember
      };
    } catch (error) {
      console.error('Failed to fetch Wix member data:', error);
      return {
        admin,
        wixMember: null,
        isWixMember: false
      };
    }
  }
}

// Export singleton
export const adminService = new AdminService();

// Helper functions for admin checks
export async function requireAdmin(email: string): Promise<AdminUser> {
  const user = await adminService.getAdminUser(email);
  if (!user) {
    throw new Error('Admin access required');
  }
  return user;
}

export async function requirePermission(
  email: string, 
  resource: AdminPermission['resource'], 
  action: AdminPermission['actions'][0]
): Promise<void> {
  const hasPermission = await adminService.hasPermission(email, resource, action);
  if (!hasPermission) {
    throw new Error(`Permission denied: ${action} on ${resource}`);
  }
}

// Initialize default admin (call this once to set up your admin account)
export async function initializeDefaultAdmin(adminEmail: string): Promise<AdminUser> {
  console.log(`🔧 Setting up admin access for: ${adminEmail}`);
  return await adminService.promoteUserToAdmin(adminEmail, 'super_admin');
}