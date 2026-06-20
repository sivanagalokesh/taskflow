import React from 'react';
import './SkeletonGrid.css';

export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className="task-grid" aria-hidden="true" aria-label="Loading tasks">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-line skeleton-line--chip" />
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-line skeleton-line--text" />
          <div className="skeleton-line skeleton-line--text-md" />
          <div className="skeleton-line skeleton-line--text-short" />
          <div className="skeleton-line skeleton-line--divider" />
          <div className="skeleton-line skeleton-line--action" />
        </div>
      ))}
    </div>
  );
}
