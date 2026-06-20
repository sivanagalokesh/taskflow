import React from 'react';
import './FilterBar.css';

const STATUS_OPTIONS = ['All', 'Pending', 'In Progress', 'Completed'];

export default function FilterBar({ filters, onChange }) {
  const handleStatusChange = (status) => {
    onChange({ ...filters, status: status === 'All' ? '' : status, page: 1 });
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__tabs" role="tablist" aria-label="Filter tasks by status">
        {STATUS_OPTIONS.map((opt) => {
          const active = (filters.status || 'All') === opt;
          return (
            <button
              key={opt}
              type="button"
              role="tab"
              aria-selected={active}
              className={`filter-tab${active ? ' filter-tab--active' : ''}`}
              onClick={() => handleStatusChange(opt)}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="filter-bar__controls">
        <input
          type="search"
          className="filter-bar__search"
          placeholder="Search tasks…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value, page: 1 })}
          aria-label="Search tasks"
        />
        <select
          className="filter-bar__sort"
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value, page: 1 })}
          aria-label="Sort tasks"
        >
          <option value="-created_at">Newest first</option>
          <option value="created_at">Oldest first</option>
        </select>
      </div>
    </div>
  );
}
