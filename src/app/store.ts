import { configureStore } from '@reduxjs/toolkit';
import themeReducer from 'shared/model/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});