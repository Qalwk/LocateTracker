export interface AuthContextType {
  isAuth: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}