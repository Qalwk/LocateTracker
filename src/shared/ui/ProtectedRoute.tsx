import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

import { useAuth } from 'shared/model/auth/context/authContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({
  children,
}: ProtectedRouteProps): React.ReactElement {
  const auth = useAuth();
  if (!auth?.isAuth) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
