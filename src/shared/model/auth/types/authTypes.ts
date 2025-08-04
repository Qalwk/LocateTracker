export interface AuthContextType {
  isAuth: boolean;
  user: {
    username: string;
    email: string;
    role: string;
    company: string | null;
  } | null;
  login: (
    accessToken: string,
    userData: {
      username: string;
      email: string;
      role: string;
      company: string | null;
    },
  ) => void;
  logout: () => void;
}
