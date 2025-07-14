
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from 'pages/homePage'
import { LoginPage } from 'pages/loginPage'
import { ProtectedRoute } from 'shared/ui/ProtectedRoute'
import { RedirectIfAuth } from 'shared/ui/RedirectIfAuth'
import { FlightTablePage } from 'pages/flightTablePage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/*" element={
          <RedirectIfAuth>
            <LoginPage />
          </RedirectIfAuth>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/:airline/:route" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/favorites" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/favorites/:airline/:route" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/flight-table" element={
          <ProtectedRoute>
            <FlightTablePage />
          </ProtectedRoute>
        } />
        <Route path="*" element={
          <ProtectedRoute>
            <h1>Route does not exist</h1>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}