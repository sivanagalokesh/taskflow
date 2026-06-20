import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left decorative panel */}
      <div className="auth-page__left">
        <p className="auth-page__left-quote">
          "The attention to detail is what separates the ordinary from the&nbsp;extraordinary."
        </p>
        <span className="auth-page__left-attr">TaskFlow · Project Management</span>
      </div>

      {/* Right form panel */}
      <div className="auth-page__right">
        <div className="auth-card">
          <div className="auth-card__eyebrow">Create account</div>
          <h1 className="auth-card__title">Begin your<br />journey.</h1>
          <p className="auth-card__subtitle">Set up your workspace and start managing projects.</p>

          {error && <div className="alert alert--error">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="field__label" htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="input"
                value={form.name}
                onChange={handleChange}
                placeholder="Alex Johnson"
                required
                autoComplete="name"
              />
            </div>
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
                placeholder="Minimum 6 characters"
                required
                autoComplete="new-password"
              />
            </div>
            <div style={{ marginTop: '8px' }}>
              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={loading}
              >
                {loading ? <span className="spinner" /> : 'Create account'}
              </button>
            </div>
          </form>

          <p className="auth-card__footer">
            Have an account?
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
