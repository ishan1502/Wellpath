import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { User, Role } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage<User | null>('wellpath_user', null);
  const [user, setUser] = useState<User | null>(storedUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Sync state if local storage changes from another tab, or on initial load
    setUser(storedUser);
    setIsLoading(false);
  }, [storedUser]);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await authService.login(email);
      setStoredUser(loggedInUser);
      setUser(loggedInUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeStoredUser();
    setUser(null);
  };

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
