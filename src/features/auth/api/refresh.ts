import { axiosInstance } from 'shared/api/axiosInstance';

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
}

export const refreshRequest = async ()
  : Promise<RefreshResponse> => {
  const response = await axiosInstance.post<RefreshResponse>('/refresh');
  return response.data;
};
