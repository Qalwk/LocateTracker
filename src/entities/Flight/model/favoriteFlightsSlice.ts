import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FavoriteFlightsState {
  ids: string[];
}

const persistedFavorites = localStorage.getItem('favoriteFlights');
const initialState: FavoriteFlightsState = {
  ids: persistedFavorites ? JSON.parse(persistedFavorites) : [],
};

export const favoriteFlightsSlice = createSlice({
  name: 'favoriteFlights',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter(id => id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteFlightsSlice.actions;
export default favoriteFlightsSlice.reducer;