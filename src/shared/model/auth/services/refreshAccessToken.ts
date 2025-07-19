import { refreshRequest } from 'features/auth/api/refresh';

export async function refreshAccessToken() {
  const result = await refreshRequest();
  localStorage.setItem('accessToken', result.accessToken);
  return result;
}