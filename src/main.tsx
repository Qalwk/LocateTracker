import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './app/routes'
import './index.css'
import { Provider } from 'react-redux'
import { store } from 'app/store'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <AppRouter />
    </StrictMode>
  </Provider>
)
