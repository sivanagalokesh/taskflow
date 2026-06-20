import React, { useState } from 'react';
import StatusChip from './StatusChip';
import './TaskCard.css';

const STATUS_ACCENT = {
  Pending:       'var(--status-pending)',
  'In Progress': 'var(--status-progress)',
  Completed:     'var(--status-completed)',
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function TaskCard({ task, onComplete, onDelete, busy, index }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const isCompleted = task.status === 'Completed';

  return (
    <article
      className={`task-card${isCompleted ? ' task-card--completed' : ''}`}
      style={{
        '--accent': STATUS_ACCENT[task.status] || 'var(--border-strong)',
        '--index':  index,
      }}
    >
      <div className="task-card__top">
        <StatusChip status={task.status} />
        <span className="task-card__date">{formatDate(task.created_at)}</span>
      </div>

      <h3 className="task-card__title">{task.title}</h3>
      <p className="task-card__description">{task.description}</p>

      <div className="task-card__divider" />

      <div className="task-card__actions">
        {!isCompleted ? (
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={() => onComplete(task._id)}
            disabled={busy}
          >
            {busy ? <span className="spinner" /> : 'Mark complete'}
          </button>
        ) : (
          <span style={{
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--status-completed)',
            fontWeight: 500,
          }}>
            Completed
          </span>
        )}

        <button
          type="button"
          className="btn btn--danger btn--sm"
          style={{ marginLeft: 'auto' }}
          onClick={() => {
            if (confirmingDelete) { onDelete(task._id); setConfirmingDelete(false); }
            else setConfirmingDelete(true);
          }}
          onBlur={() => setConfirmingDelete(false)}
          disabled={busy}
        >
          {confirmingDelete ? 'Confirm?' : 'Remove'}
        </button>
      </div>
    </article>
  );
}
