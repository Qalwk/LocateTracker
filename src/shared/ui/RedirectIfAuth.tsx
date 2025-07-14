import { Navigate } from 'react-router';

import { useAuth } from 'shared/model/auth/model/authContext';

export function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth();
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}
