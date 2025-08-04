import { refreshRequest } from "features/auth/api/refresh";

export async function refreshAccessToken() {
  try {
    const result = await refreshRequest();
    localStorage.setItem("accessToken", result.accessToken);
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to refresh token:", error);
    return null;
  }
}
