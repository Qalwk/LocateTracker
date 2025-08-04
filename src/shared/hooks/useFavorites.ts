import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "features/auth/api/favorites";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const {
    data: favorites = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    select: (data) => data.favorites,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: (data) => {
      queryClient.setQueryData(["favorites"], data);
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: (data) => {
      queryClient.setQueryData(["favorites"], data);
    },
  });

  const toggleFavorite = (flightId: string) => {
    if (favorites.includes(flightId)) {
      removeFavoriteMutation.mutate(flightId);
    } else {
      addFavoriteMutation.mutate(flightId);
    }
  };

  const isFavorite = (flightId: string) => favorites.includes(flightId);

  return {
    favorites,
    isLoading,
    error,
    toggleFavorite,
    isFavorite,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
  };
};
