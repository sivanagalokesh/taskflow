import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StatsBar from '../components/StatsBar';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import SkeletonGrid from '../components/SkeletonGrid';
import Pagination from '../components/Pagination';
import { getTasks, getTaskStats, updateTask, deleteTask } from '../services/taskService';
import './Dashboard.css';

const DEFAULT_FILTERS = { status: '', search: '', sort: '-created_at', page: 1, limit: 9 };

export default function Dashboard() {
  const [tasks, setTasks]           = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [stats, setStats]           = useState(null);
  const [filters, setFilters]       = useState(DEFAULT_FILTERS);
  const [loading, setLoading]       = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError]           = useState('');
  const [busyTaskId, setBusyTaskId] = useState(null);

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await getTaskStats();
      setStats(res.data);
    } catch { /* stats are supplementary */ }
    finally { setStatsLoading(false); }
  }, []);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getTasks({
        status: filters.status || undefined,
        search: filters.search || undefined,
        sort: filters.sort,
        page: filters.page,
        limit: filters.limit,
      });
      setTasks(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { loadStats(); }, [loadStats]);

  useEffect(() => {
    const handle = setTimeout(loadTasks, filters.search ? 350 : 0);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.search, filters.sort, filters.page]);

  const handleComplete = async (id) => {
    setBusyTaskId(id);
    try {
      await updateTask(id, { status: 'Completed' });
      await Promise.all([loadTasks(), loadStats()]);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update task.');
    } finally { setBusyTaskId(null); }
  };

  const handleDelete = async (id) => {
    setBusyTaskId(id);
    try {
      await deleteTask(id);
      await Promise.all([loadTasks(), loadStats()]);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete task.');
    } finally { setBusyTaskId(null); }
  };

  const hasActiveFilters = Boolean(filters.status || filters.search);

  return (
    <div className="container dashboard">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__heading">
          <span className="dashboard__eyebrow">Your Workspace</span>
          <h1 className="dashboard__title">Dashboard</h1>
          <p className="dashboard__subtitle">
            Track, manage and ship your tasks faster.
          </p>
        </div>
        <Link to="/tasks/new" className="btn btn--primary btn--new-task">
          + New Task
        </Link>
      </div>

      {/* Stats */}
      <StatsBar stats={stats} loading={statsLoading} />

      {/* Filters */}
      <FilterBar filters={filters} onChange={setFilters} />

      {/* Error */}
      {error && <div className="alert alert--error">{error}</div>}

      {/* Content */}
      {loading ? (
        <SkeletonGrid count={filters.limit} />
      ) : tasks.length === 0 ? (
        <EmptyState hasFilters={hasActiveFilters} />
      ) : (
        <>
          <div className="task-grid">
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                onComplete={handleComplete}
                onDelete={handleDelete}
                busy={busyTaskId === task._id}
                index={index}
              />
            ))}
          </div>
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
          />
        </>
      )}
    </div>
  );
}
