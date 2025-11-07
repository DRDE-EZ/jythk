// Admin configuration and role management
export const ADMIN_CONFIG = {
  // Default admin emails - these can be managed through localStorage
  defaultAdminEmails: [
    'admin@formex.com',
    'super@formex.com',
    'admin@gmail.com',
    'superadmin@gmail.com',
    'bernarddawson22@gmail.com',
    // Add your actual admin emails here
  ].map(e => e.toLowerCase().trim()),
  
  // Super admin emails (higher privileges)
  defaultSuperAdminEmails: [
    'super@formex.com',
    'superadmin@gmail.com',
    'bernarddawson22@gmail.com',
  ].map(e => e.toLowerCase().trim())
};

// Get admin emails from localStorage or use defaults
const getAdminEmails = (): string[] => {
  if (typeof window === 'undefined') return ADMIN_CONFIG.defaultAdminEmails;
  
  try {
    const stored = localStorage.getItem('adminEmails');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading admin emails:', error);
  }
  
  return ADMIN_CONFIG.defaultAdminEmails;
};

// Get super admin emails from localStorage or use defaults
const getSuperAdminEmails = (): string[] => {
  if (typeof window === 'undefined') return ADMIN_CONFIG.defaultSuperAdminEmails;
  
  try {
    const stored = localStorage.getItem('superAdminEmails');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading super admin emails:', error);
  }
  
  return ADMIN_CONFIG.defaultSuperAdminEmails;
};

export const checkAdminRole = (email: string): 'super_admin' | 'admin' | 'customer' => {
  const normalizedEmail = email.toLowerCase().trim();
  
  console.log('🔍 checkAdminRole called with:', {
    originalEmail: email,
    normalizedEmail: normalizedEmail
  });
  
  const superAdminEmails = getSuperAdminEmails();
  const adminEmails = getAdminEmails();
  
  console.log('📋 Admin lists:', {
    superAdminEmails: superAdminEmails,
    adminEmails: adminEmails,
    isSuperAdmin: superAdminEmails.includes(normalizedEmail),
    isAdmin: adminEmails.includes(normalizedEmail)
  });
  
  if (superAdminEmails.map(e => e.toLowerCase().trim()).includes(normalizedEmail)) {
    console.log('✅ User is SUPER ADMIN');
    return 'super_admin';
  }
  
  if (adminEmails.map(e => e.toLowerCase().trim()).includes(normalizedEmail)) {
    console.log('✅ User is ADMIN');
    return 'admin';
  }
  
  console.log('❌ User is CUSTOMER (no admin access)');
  return 'customer';
};

export const isAdmin = (email: string): boolean => {
  const role = checkAdminRole(email);
  return role === 'admin' || role === 'super_admin';
};

export const isSuperAdmin = (email: string): boolean => {
  return checkAdminRole(email) === 'super_admin';
};

// Helper function to add an admin email
export const addAdminEmail = (email: string): void => {
  if (typeof window === 'undefined') return;
  
  const adminEmails = getAdminEmails();
  if (!adminEmails.includes(email.toLowerCase())) {
    adminEmails.push(email.toLowerCase());
    localStorage.setItem('adminEmails', JSON.stringify(adminEmails));
  }
};

// Helper function to make current user an admin (for first-time setup)
export const makeCurrentUserAdmin = (email: string): void => {
  if (typeof window === 'undefined') return;
  
  addAdminEmail(email);
  console.log('✅ Added', email, 'as admin');
};