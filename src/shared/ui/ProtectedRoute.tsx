import type { ReactNode } from "react";
import { Navigate } from "react-router";

import { useAuth } from "shared/model/auth/context/authContext";

interface ProtectedRouteProps {
  children: ReactNode;
  onlyAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  onlyAdmin = false,
}: ProtectedRouteProps): React.ReactElement {
  const auth = useAuth();
  if (!auth?.isAuth) {
    return <Navigate to="/login" />;
  }
  if (onlyAdmin && auth.user?.role !== "admin") {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}
