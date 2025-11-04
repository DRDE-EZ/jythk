'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { AdminUser, adminService } from '@/lib/admin-service';

interface AdminContextType {
  isAdmin: boolean | null;
  adminUser: AdminUser | null;
  loading: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  checkAccess: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/admin?action=check&email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (data.isAdmin) {
        setIsAdmin(true);
        setAdminUser(data.user);
        localStorage.setItem('adminEmail', email);
        
        // Update last login
        await fetch('/api/admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', email })
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setAdminUser(null);
    localStorage.removeItem('adminEmail');
  };

  const checkAccess = async () => {
    try {
      // Try to get stored admin email
      const storedEmail = localStorage.getItem('adminEmail');
      if (storedEmail) {
        const success = await login(storedEmail);
        if (success) {
          setLoading(false);
          return;
        }
      }

      // Try default admin email
      const defaultEmail = 'bernarddawson22@gmail.com';
      const success = await login(defaultEmail);
      if (!success) {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Access check failed:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAccess();
  }, []);

  return (
    <AdminContext.Provider value={{
      isAdmin,
      adminUser,
      loading,
      login,
      logout,
      checkAccess
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}