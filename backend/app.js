require('dotenv').config();
const express = require('express');
const appDb = require('./config/db/app-db');
const trainingDb = require('./config/db/training-db');
const session = require('express-session');

const app = express();
app.use(express.json()); 

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

app.use(session({
    secret: process.env.SESSION_SECRET,  // Replace with something secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // if using HTTP. For HTTPS, set secure: true
  }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));