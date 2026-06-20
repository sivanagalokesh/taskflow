import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left decorative panel */}
      <div className="auth-page__left">
        <p className="auth-page__left-quote">
          "Organisation is not a&nbsp;constraint — it is the foundation of&nbsp;elegance."
        </p>
        <span className="auth-page__left-attr">TaskFlow · Project Management</span>
      </div>

      {/* Right form panel */}
      <div className="auth-page__right">
        <div className="auth-card">
          <div className="auth-card__eyebrow">Sign in</div>
          <h1 className="auth-card__title">Welcome<br />back.</h1>
          <p className="auth-card__subtitle">Enter your credentials to access your workspace.</p>

          {error && <div className="alert alert--error">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="field__label" htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="input"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="input"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
            <div style={{ marginTop: '8px' }}>
              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={loading}
              >
                {loading ? <span className="spinner" /> : 'Sign in'}
              </button>
            </div>
          </form>

          <p className="auth-card__footer">
            No account?
            <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
