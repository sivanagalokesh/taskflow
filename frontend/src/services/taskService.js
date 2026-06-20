import api from './api';

// params: { status, search, sort, page, limit }
export const getTasks = (params = {}) => api.get('/tasks', { params });

export const getTaskStats = () => api.get('/tasks/stats');

export const createTask = (payload) => api.post('/tasks', payload);

export const updateTask = (id, payload) => api.put(`/tasks/${id}`, payload);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);
