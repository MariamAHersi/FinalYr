require('dotenv').config();
// Import core modules
const session = require('express-session');
const express = require('express');

// Import database connections
const appDb = require('./config/db/app-db');
const trainingDb = require('./config/db/training-db');

// Import route handlers
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

// Initialize Express app
const app = express();
// Middleware to parse JSON bodies
app.use(express.json()); 

// 🔍 Debug: Check if session secret is loaded
console.log("SESSION_SECRET:", process.env.SESSION_SECRET);

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret', // Ensure secret exists
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use secure: true if using HTTPS
}));

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const appResult = await appDb.query('SELECT NOW()');
    const trainingResult = await trainingDb.query('SELECT NOW()');
    
    res.json({
      message: 'Databases connected successfully',
      appTime: appResult.rows[0].now,
      trainingTime: trainingResult.rows[0].now
    });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Mount auth routes under /api
app.use('/api', registerRoute);
app.use('/api', loginRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));