// Context: AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '@/lib/api';

interface User {
  _id: string;
  name: string;
  role: 'User' | 'Doctor'; // Modify based on your needs
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (auth: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    // Remove the token cookie on logout
    document.cookie = 'token=; Max-Age=0; path=/; secure; HttpOnly';
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='));

      if (!token) {
        setLoading(false);
        return;
      }

      // Set the token in axios headers
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${
        token.split('=')[1]
      }`;

      try {
        const response = await axiosInstance.get('/api/auth/user/me'); // Adjust if you have this endpoint

        if (response.data && response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        setUser,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
