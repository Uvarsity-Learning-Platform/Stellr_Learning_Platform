import { useState } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthState } from '@/types';
import { AuthContext } from './AuthContext';
import type { AuthContextType } from '@/types/auth';

const defaultAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(defaultAuthState.user);
  const [isAuthenticated, setIsAuthenticated] = useState(defaultAuthState.isAuthenticated);
  const isLoading = defaultAuthState.isLoading;
  const [error, setError] = useState<string | null>(defaultAuthState.error);

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    setError(null);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// AuthContext is now exported from AuthContext.ts for Fast Refresh compatibility.