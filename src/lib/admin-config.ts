// Admin configuration and role management
export const ADMIN_CONFIG = {
  // Define admin emails - in production, these should come from environment variables or a secure database
  adminEmails: [
    'admin@formex.com',
    'super@formex.com',
    'admin@gmail.com',
    'superadmin@gmail.com',
    // Add your actual admin emails here
  ],
  
  // Super admin emails (higher privileges)
  superAdminEmails: [
    'super@formex.com',
    'superadmin@gmail.com',
  ]
};

export const checkAdminRole = (email: string): 'super_admin' | 'admin' | 'customer' => {
  const normalizedEmail = email.toLowerCase();
  
  if (ADMIN_CONFIG.superAdminEmails.includes(normalizedEmail)) {
    return 'super_admin';
  }
  
  if (ADMIN_CONFIG.adminEmails.includes(normalizedEmail)) {
    return 'admin';
  }
  
  return 'customer';
};

export const isAdmin = (email: string): boolean => {
  const role = checkAdminRole(email);
  return role === 'admin' || role === 'super_admin';
};

export const isSuperAdmin = (email: string): boolean => {
  return checkAdminRole(email) === 'super_admin';
};