import { configureStore } from '@reduxjs/toolkit';

import { favoriteFlightsSlice } from 'entities/Flight/model/favoriteFlightsSlice';

import { themeSlice } from 'shared/model/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    favoriteFlights: favoriteFlightsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
