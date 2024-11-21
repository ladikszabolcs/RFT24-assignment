import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { UserManagement } from './pages/UserManagement';
import { LectureManagement } from './pages/LectureManagement';
import { useAuthStore } from './store/authStore';

const queryClient = new QueryClient();

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {user && <Navbar />}
          <Routes>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/users"
              element={
                user?.role === 'admin' ? (
                  <UserManagement />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/lectures/manage"
              element={
                user?.role === 'admin' || user?.role === 'teacher' ? (
                  <LectureManagement />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="*"
              element={<Navigate to={user ? "/dashboard" : "/login"} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;