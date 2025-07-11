import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './app/routes'
import './index.css'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import { AuthProvider } from 'shared/model/auth/model/authContext'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthProvider>
      <StrictMode>
        <AppRouter />
      </StrictMode>
    </AuthProvider>
  </Provider>
)
