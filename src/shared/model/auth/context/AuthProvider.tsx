import { useMutation } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { logoutRequest } from 'features/auth/api/logout';
import { AuthContext } from './authContext';
import { isTokenExpired } from '../services/isTokenExpired';

import { refreshAccessToken } from '../services/refreshAccessToken';


export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem('token'));

  const navigate = useNavigate();
  
  const refreshMutation = useMutation({ mutationFn: refreshAccessToken });

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token || isTokenExpired(token)) {
        // Пытаемся обновить accessToken
        const refreshed = await refreshMutation.mutateAsync();
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