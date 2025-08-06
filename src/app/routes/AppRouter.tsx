import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { AuthProvider } from "shared/model/auth/context/AuthProvider";
import { ProtectedRoute } from "shared/ui/ProtectedRoute";
import { RedirectIfAuth } from "shared/ui/RedirectIfAuth";

const HomePage = React.lazy(() => import("pages/homePage"));
const FlightTablePage = React.lazy(() => import("pages/flightTablePage"));
const LoginPage = React.lazy(() => import("pages/loginPage"));
const AdminAddAccountPage = React.lazy(
  () => import("pages/adminAddAccountPage"),
);

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div>Загрузка страницы...</div>}>
          <Routes>
            <Route
              path="/login/*"
              element={
                <RedirectIfAuth>
                  <LoginPage />
                </RedirectIfAuth>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:airline/:route"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites/:airline/:route"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/flight-table"
              element={
                <ProtectedRoute>
                  <FlightTablePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-account"
              element={
                <ProtectedRoute onlyAdmin>
                  <AdminAddAccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <h1>Route does not exist</h1>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
