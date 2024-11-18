// contexts/AuthContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextType {
  isAdmin: boolean;
  user: User | null;
  updateAuthStatus: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  user: null,
  updateAuthStatus: async () => {},
  loading: true
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAdmin(false);
        setUser(null);
        return;
      }

      const res = await fetch('/api/auth/check', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        cache: 'no-store'
      });

      const data = await res.json();

      if (data.isLoggedIn && data.user) {
        setUser(data.user);
        setIsAdmin(data.user.role === 'ADMIN');
      } else {
        setIsAdmin(false);
        setUser(null);
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAdmin(false);
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, user, updateAuthStatus: checkAdminStatus, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);