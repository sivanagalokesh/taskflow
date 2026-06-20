import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTask } from '../services/taskService';
import './AddTask.css';

const MIN_DESC = 20;

export default function AddTask() {
  const navigate = useNavigate();
  const [form, setForm]             = useState({ title: '', description: '', status: 'Pending' });
  const [errors, setErrors]         = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting]   = useState(false);

  const validate = () => {
    const next = {};
    if (!form.title.trim())
      next.title = 'Title is required.';
    if (form.description.trim().length < MIN_DESC)
      next.description = `Add ${MIN_DESC - form.description.trim().length} more characters.`;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      await createTask(form);
      navigate('/');
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Could not create task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const descLen      = form.description.trim().length;
  const descProgress = Math.min(descLen / MIN_DESC, 1);
  const descDone     = descLen >= MIN_DESC;

  return (
    <div className="container add-task">
      <div className="add-task__card">
        {/* Breadcrumb */}
        <nav className="add-task__breadcrumb">
          <Link to="/">Dashboard</Link>
          <span>/</span>
          <span>New Task</span>
        </nav>

        <h1 className="add-task__title">New Task</h1>
        <p className="add-task__subtitle">Fill in the details to add a task to your workspace.</p>

        {submitError && <div className="alert alert--error">{submitError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="title">Task title</label>
            <input
              id="title"
              name="title"
              type="text"
              className={`input${errors.title ? ' input--error' : ''}`}
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Design the onboarding flow"
            />
            {errors.title && <span className="field__error">{errors.title}</span>}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className={`textarea${errors.description ? ' textarea--error' : ''}`}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the task in detail…"
            />
            <div className="add-task__progress">
              <div
                className={`add-task__progress-fill${descDone ? ' add-task__progress-fill--complete' : ''}`}
                style={{ width: `${descProgress * 100}%` }}
              />
            </div>
            {errors.description ? (
              <span className="field__error">{errors.description}</span>
            ) : (
              <span className="field__hint">
                {descDone ? 'Looks good.' : `${MIN_DESC - descLen} more characters required`}
              </span>
            )}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="status">Initial status</label>
            <select id="status" name="status" className="select" value={form.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          <div className="add-task__actions">
            <Link to="/" className="btn btn--ghost">Cancel</Link>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? <span className="spinner" /> : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
