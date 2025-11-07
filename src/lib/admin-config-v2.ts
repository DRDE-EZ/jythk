// Production-ready Admin configuration and role management
// Uses API-based admin management instead of hardcoded emails

// Check admin role via API (async version for server-side or when you can await)
export const checkAdminRoleAsync = async (email: string): Promise<'super_admin' | 'admin' | 'customer'> => {
  if (!email) return 'customer';
  
  try {
    const response = await fetch(`/api/admin-config?action=check&email=${encodeURIComponent(email)}`);
    if (!response.ok) {
      console.error('Failed to check admin role:', response.statusText);
      return 'customer';
    }
    
    const data = await response.json();
    console.log('🔍 Admin role check:', { email, role: data.role });
    return data.role || 'customer';
  } catch (error) {
    console.error('Error checking admin role:', error);
    return 'customer';
  }
};

// Client-side synchronous version (uses cached data for immediate checks)
let cachedAdminStatus: Map<string, { role: 'super_admin' | 'admin' | 'customer', timestamp: number }> = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const checkAdminRole = (email: string): 'super_admin' | 'admin' | 'customer' => {
  if (!email) return 'customer';
  
  const normalizedEmail = email.toLowerCase().trim();
  const cached = cachedAdminStatus.get(normalizedEmail);
  
  // Return cached value if fresh
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('✅ Using cached admin role:', { email: normalizedEmail, role: cached.role });
    return cached.role;
  }
  
  // Fetch async and cache result
  checkAdminRoleAsync(normalizedEmail).then(role => {
    cachedAdminStatus.set(normalizedEmail, { role, timestamp: Date.now() });
    console.log('✅ Cached admin role:', { email: normalizedEmail, role });
  });
  
  // Return cached value or customer as default
  return cached?.role || 'customer';
};

export const isAdmin = (email: string): boolean => {
  const role = checkAdminRole(email);
  return role === 'admin' || role === 'super_admin';
};

export const isAdminAsync = async (email: string): Promise<boolean> => {
  const role = await checkAdminRoleAsync(email);
  return role === 'admin' || role === 'super_admin';
};

export const isSuperAdmin = (email: string): boolean => {
  const role = checkAdminRole(email);
  return role === 'super_admin';
};

export const isSuperAdminAsync = async (email: string): Promise<boolean> => {
  const role = await checkAdminRoleAsync(email);
  return role === 'super_admin';
};

// Add an admin email (must be called by super admin)
export const addAdminEmail = async (email: string, role: 'admin' | 'super_admin' = 'admin'): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add', email, role }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Clear cache for this email
      cachedAdminStatus.delete(email.toLowerCase().trim());
      console.log('✅ Added admin:', email, 'Role:', role);
    }
    
    return data.success || false;
  } catch (error) {
    console.error('Error adding admin:', error);
    return false;
  }
};

// Remove an admin email
export const removeAdminEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove', email }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Clear cache for this email
      cachedAdminStatus.delete(email.toLowerCase().trim());
      console.log('✅ Removed admin:', email);
    }
    
    return data.success || false;
  } catch (error) {
    console.error('Error removing admin:', error);
    return false;
  }
};

// Get admin list (super admin only)
export const getAdminList = async (): Promise<{ superAdmins: string[], admins: string[] }> => {
  try {
    const response = await fetch('/api/admin-config?action=list');
    if (!response.ok) {
      throw new Error('Failed to fetch admin list');
    }
    
    const data = await response.json();
    return {
      superAdmins: data.superAdmins || [],
      admins: data.admins || [],
    };
  } catch (error) {
    console.error('Error fetching admin list:', error);
    return { superAdmins: [], admins: [] };
  }
};

// Check if system is initialized
export const isSystemInitialized = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin-config?action=status');
    const data = await response.json();
    return data.initialized || false;
  } catch (error) {
    console.error('Error checking system status:', error);
    return false;
  }
};

// Clear admin cache (useful after login/logout)
export const clearAdminCache = () => {
  cachedAdminStatus.clear();
  console.log('🧹 Cleared admin role cache');
};
