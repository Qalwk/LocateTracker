import { axiosInstance } from "shared/api/axiosInstance";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
  role: string;
  company: string | null;
}

export const loginRequest = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/login", data);
  return response.data;
};
