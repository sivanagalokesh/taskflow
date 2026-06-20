import React from 'react';
import './Pagination.css';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Task list pagination">
      <button
        type="button"
        className="btn btn--ghost btn--sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>

      <span className="pagination__status">
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        type="button"
        className="btn btn--ghost btn--sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </nav>
  );
}
