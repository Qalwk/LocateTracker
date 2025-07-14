import { store } from 'app/store';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { AuthProvider } from 'shared/model/auth/model/authContext';

import { AppRouter } from './app/routes';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthProvider>
      <StrictMode>
        <AppRouter />
      </StrictMode>
    </AuthProvider>
  </Provider>,
);
