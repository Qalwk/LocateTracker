import { jwtDecode } from 'jwt-decode';
import { useMutation } from '@tanstack/react-query';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { refreshRequest } from 'features/auth/api/refresh';
import { logoutRequest } from 'features/auth/api/logout';

interface AuthContextType {
  isAuth: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function isTokenExpired(token: string) {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem('token'));

  const navigate = useNavigate();

  async function refreshAccessToken() {
    try {
      const result = await refreshMutation.mutateAsync();
      localStorage.setItem('accessToken', result.accessToken);
      setIsAuth(true);
      console.log('new accessToken', result.accessToken);
      return true;
    } catch {
      logout();
      return false;
    }
  }

  const refreshMutation = useMutation({
    mutationFn: refreshRequest
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token || isTokenExpired(token)) {
        // Пытаемся обновить accessToken
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          logout();
          navigate('/login');
        }
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) setIsAuth(true);
  }, []);

  const login = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    setIsAuth(true);
  };

  const logout = () => {
    logoutMutation.mutate()
  };

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      setIsAuth(false);
    },
    onError: (error) => {
      console.error('Ошибка при выходе:', error);
    },
  });

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
