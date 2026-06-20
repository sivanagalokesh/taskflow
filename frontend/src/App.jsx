import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import GlowBackground from './components/GlowBackground';
import PageTransition from './components/PageTransition';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/global.css';
import './styles/ui.css';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GlowBackground />
        <BrowserRouter>
          {/* Navbar is outside auth routes so it shows on all pages */}
          <Navbar />
          <main style={{ position: 'relative', zIndex: 1 }}>
            <Routes>
              <Route path="/login"    element={<PageTransition><Login /></PageTransition>} />
              <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <Dashboard />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/new"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <AddTask />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
