const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
      
      // If wildcard is used or origin matches exactly
      if (clientOrigin === '*' || origin === clientOrigin || origin === 'http://localhost:3000') {
        return callback(null, true);
      }
      
      // Fallback check to avoid deployment headaches on Render
      if (origin.includes('onrender.com') || origin.includes('localhost')) {
        return callback(null, true);
      }
      
      return callback(new Error('Blocked by CORS policy'), false);
    },
    credentials: true
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
