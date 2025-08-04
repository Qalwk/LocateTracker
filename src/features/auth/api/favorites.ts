import { axiosInstance } from "shared/api/axiosInstance";

export interface FavoritesResponse {
  favorites: string[];
}

export const getFavorites = async (): Promise<FavoritesResponse> => {
  const response = await axiosInstance.get<FavoritesResponse>("/favorites");
  return response.data;
};

export const addFavorite = async (
  flightId: string,
): Promise<FavoritesResponse> => {
  const response = await axiosInstance.post<FavoritesResponse>("/favorites", {
    flightId,
  });
  return response.data;
};

export const removeFavorite = async (
  flightId: string,
): Promise<FavoritesResponse> => {
  const response = await axiosInstance.delete<FavoritesResponse>(
    `/favorites/${flightId}`,
  );
  return response.data;
};
