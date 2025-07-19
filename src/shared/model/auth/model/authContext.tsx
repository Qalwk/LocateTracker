import { jwtDecode } from 'jwt-decode';
import { useMutation } from '@tanstack/react-query';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { refreshRequest } from 'features/auth/api/refresh';

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

  // async function refreshAccessToken() {
  //   const res = await fetch('http://localhost:3001/api/refresh', {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   if (res.ok) {
  //     const data = await res.json();
  //     localStorage.setItem('accessToken', data.accessToken);
  //     setIsAuth(true);
  //     console.log('new accessToken', data.accessToken);
  //     return true;
  //   } else {
  //     logout();
  //     return false;
  //   }
  // }

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
    // localStorage.setItem('refreshToken', refreshToken);
    setIsAuth(true);
  };

  const logout = async () => {
    await fetch('http://localhost:3001/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    localStorage.removeItem('accessToken');
    setIsAuth(false);
  };

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
