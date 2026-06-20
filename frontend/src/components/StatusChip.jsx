import React from 'react';
import './StatusChip.css';

const STATUS_MAP = {
  Pending:     { color: 'var(--status-pending)',   label: 'Pending' },
  'In Progress': { color: 'var(--status-progress)', label: 'In Progress' },
  Completed:   { color: 'var(--status-completed)', label: 'Completed' },
};

export default function StatusChip({ status }) {
  const meta = STATUS_MAP[status] || { color: 'var(--ink-faint)', label: status };

  return (
    <span className="status-chip" data-status={status}>
      <span
        className="status-chip__dot"
        style={{ background: meta.color }}
        aria-hidden="true"
      />
      {meta.label}
    </span>
  );
}
