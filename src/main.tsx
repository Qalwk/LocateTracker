import { store } from 'app/store';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { domAnimation, LazyMotion } from "framer-motion"

import { AppRouter } from './app/routes';
import './index.css';

import { StagewiseToolbar } from '@stagewise/toolbar-react';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <StrictMode>
        <LazyMotion features={domAnimation}>
          <AppRouter />
          <StagewiseToolbar  />
        </LazyMotion>
      </StrictMode>
    </Provider>,
  </QueryClientProvider>
);
