import { store } from 'app/store';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { domAnimation, LazyMotion } from "framer-motion"

import { AppRouter } from './app/routes';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <LazyMotion features={domAnimation}>
        <AppRouter />
      </LazyMotion>
    </StrictMode>
  </Provider>,
);
