import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from 'app/store';
import { LazyMotion, domAnimation } from 'framer-motion';
import { ApolloProvider } from '@apollo/client';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { AppRouter } from './app/routes';
import './index.css';
import { client } from 'shared/api/apolloClient';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <StrictMode>
          <LazyMotion features={domAnimation}>
            <AppRouter />
          </LazyMotion>
        </StrictMode>
      </Provider>
    </ApolloProvider>
  </QueryClientProvider>,
);
