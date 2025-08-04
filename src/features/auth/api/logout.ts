import { axiosInstance } from "shared/api/axiosInstance";

export interface LogoutResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
}

export const logoutRequest = async (): Promise<LogoutResponse> => {
  const response = await axiosInstance.post<LogoutResponse>("/logout");
  return response.data;
};
