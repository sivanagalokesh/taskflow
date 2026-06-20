import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar-wrap">
      <header className="navbar">
        {/* Brand */}
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-name">TaskFlow</span>
          <span className="navbar__brand-sub">Project Management</span>
        </Link>

        {/* Nav links */}
        {isAuthenticated && (
          <nav className="navbar__links" aria-label="Main">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/tasks/new"
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              New Task
            </NavLink>
          </nav>
        )}

        {/* Actions */}
        <div className="navbar__actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '◑' : '○'}
          </button>

          {isAuthenticated ? (
            <div className="navbar__user">
              <div className="navbar__divider" />
              <span className="navbar__username">{user?.name}</span>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="navbar__user">
              <div className="navbar__divider" />
              <Link to="/login" className="btn btn--ghost btn--sm">Log in</Link>
              <Link to="/register" className="btn btn--primary btn--sm">Register</Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
