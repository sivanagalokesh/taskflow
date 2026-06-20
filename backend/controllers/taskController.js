const Task = require('../models/Task');

const ALLOWED_STATUSES = ['Pending', 'In Progress', 'Completed'];

// @route  GET /api/tasks
// Supports: ?status=Pending&search=login&sort=-created_at&page=1&limit=10
const getTasks = async (req, res, next) => {
  try {
    const { status, search, sort, page = 1, limit = 10 } = req.query;

    const query = { user: req.user.id };

    if (status) {
      if (!ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({ message: `Invalid status filter: ${status}` });
      }
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
    const skip = (pageNum - 1) * limitNum;

    // Default newest first; allow override e.g. sort=created_at for ascending
    const sortField = sort || '-created_at';

    const [tasks, total] = await Promise.all([
      Task.find(query).sort(sortField).skip(skip).limit(limitNum),
      Task.countDocuments(query),
    ]);

    res.status(200).json({
      data: tasks,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/tasks/stats
const getStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const [total, pending, inProgress, completed] = await Promise.all([
      Task.countDocuments({ user: userId }),
      Task.countDocuments({ user: userId, status: 'Pending' }),
      Task.countDocuments({ user: userId, status: 'In Progress' }),
      Task.countDocuments({ user: userId, status: 'Completed' }),
    ]);

    res.status(200).json({
      totalTasks: total,
      pendingTasks: pending,
      inProgressTasks: inProgress,
      completedTasks: completed,
    });
  } catch (err) {
    next(err);
  }
};

// @route  POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!description || description.trim().length < 20) {
      return res.status(400).json({ message: 'Description must be at least 20 characters' });
    }
    if (status && !ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Invalid status: ${status}` });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      status: status || 'Pending',
      user: req.user.id,
    });

    res.status(201).json({ data: task });
  } catch (err) {
    next(err);
  }
};

// @route  PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const { status, title, description } = req.body;
    const update = {};

    if (status !== undefined) {
      if (!ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({ message: `Invalid status: ${status}` });
      }
      update.status = status;
    }
    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
      update.title = title.trim();
    }
    if (description !== undefined) {
      if (description.trim().length < 20) {
        return res.status(400).json({ message: 'Description must be at least 20 characters' });
      }
      update.description = description.trim();
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      update,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ data: task });
  } catch (err) {
    next(err);
  }
};

// @route  DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully', data: task });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, getStats, createTask, updateTask, deleteTask };
