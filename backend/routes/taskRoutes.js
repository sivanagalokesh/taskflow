const express = require('express');
const {
  getTasks,
  getStats,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // all task routes require a logged-in user

// IMPORTANT: /stats must be registered before /:id, otherwise Express
// would try to treat "stats" as an :id param on the GET /:id-style route.
router.get('/stats', getStats);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
