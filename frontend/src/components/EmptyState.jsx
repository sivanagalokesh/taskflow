import React from 'react';
import { Link } from 'react-router-dom';
import './EmptyState.css';

export default function EmptyState({ hasFilters }) {
  return (
    <div className="empty-state">
      <div className="empty-state__mark" aria-hidden="true">∅</div>
      {hasFilters ? (
        <>
          <h3>Nothing found</h3>
          <p>No tasks match the current filters. Try adjusting your search or status selection.</p>
        </>
      ) : (
        <>
          <h3>Your workspace is clear</h3>
          <p>Create your first task and begin bringing order to your projects.</p>
          <Link to="/tasks/new" className="btn btn--primary">
            Create a task
          </Link>
        </>
      )}
    </div>
  );
}
