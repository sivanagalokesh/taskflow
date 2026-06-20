import React from 'react';
import './StatsBar.css';

const ITEMS = [
  { key: 'totalTasks',      label: 'Total Tasks',   color: 'var(--ink)',             icon: '◻' },
  { key: 'pendingTasks',    label: 'Pending',        color: 'var(--status-pending)',  icon: '◷' },
  { key: 'inProgressTasks', label: 'In Progress',    color: 'var(--status-progress)', icon: '◈' },
  { key: 'completedTasks',  label: 'Completed',      color: 'var(--accent)',          icon: '◼' },
];

export default function StatsBar({ stats, loading }) {
  return (
    <div className="stats-bar">
      {ITEMS.map((item) => (
        <div
          className="stats-bar__item"
          key={item.key}
          style={{ color: item.color }}
        >
          <span className="stats-bar__icon">{item.icon}</span>
          <span className="stats-bar__value">
            {loading ? '—' : (stats?.[item.key] ?? 0)}
          </span>
          <span className="stats-bar__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
