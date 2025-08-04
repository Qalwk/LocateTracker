import { useMutation } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

import { logoutRequest } from "features/auth/api/logout";

import { isTokenExpired } from "../services/isTokenExpired";
import { refreshAccessToken } from "../services/refreshAccessToken";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(
    () => !!localStorage.getItem("accessToken"),
  );
  const [user, setUser] = useState<{
    username: string;
    email: string;
    role: string;
    company: string | null;
  } | null>(() => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  });

  const navigate = useNavigate();

  const refreshMutation = useMutation({ mutationFn: refreshAccessToken });

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token || isTokenExpired(token)) {
        // Пытаемся обновить accessToken
        const refreshed = await refreshMutation.mutateAsync();
        if (!refreshed) {
          logout();
          navigate("/login");
        }
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setIsAuth(true);
  }, []);

  const login = (
    accessToken: string,
    userData: {
      username: string;
      email: string;
      role: string;
      company: string | null;
    },
  ) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsAuth(true);
    setUser(userData);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      setIsAuth(false);
      setUser(null);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("Ошибка при выходе:", error);
    },
  });

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
