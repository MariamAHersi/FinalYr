require('dotenv').config();
// Import core modules
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

// Import database connections
const appDb = require('./db/app-db');
const trainingDb = require('./db/training-db');

// Initialize Express app
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json()); 
app.use(bodyParser.json());
app.use(cors());

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


// Your login route
app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Both email and password are required' });
    }
  
    try {
      // Query the database to find the user
      const result = await appDb.query('SELECT * FROM Users WHERE Email = $1', [email]);
      const user = result.rows[0];
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare the hashed password with the provided one
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Save user info in session
      req.session.userId = user.id;
      res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  });
  
  // Your registration route
  app.post('/users/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Both email and password are required' });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
  
    try {
      // Check if user already exists
      const result = await appDb.query('SELECT * FROM Users WHERE Email = $1', [email]);
      const existingUser = result.rows[0];
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new user into the database
      const userId = uuidv4(); // Generate unique user ID
      await appDb.query('INSERT INTO Users (id, email, password) VALUES ($1, $2, $3)', [userId, email, hashedPassword]);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  });
  
  // Logout Route
  app.post('/users/logout', (req, res) => {
    const { confirmLogout } = req.body;

    if (!confirmLogout) {
      return res.status(400).json({ message: 'Logout not confirmed' });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to log out' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });

  // Utility function to validate email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Route to save/update mother profile details
  app.post('/users/profile', async (req, res) => {
  const { firstName, lastName, email, age } = req.body;

  // Input validation
  if (!firstName || !lastName || !email || !age) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (isNaN(age) || age < 0) {
    return res.status(400).json({ message: 'Age must be a valid non-negative number' });
  }

  try {
    const result = await appDb.query(
      `INSERT INTO motherprofile (firstname, lastname, email, age)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [firstName, lastName, email, age]
    );

    res.status(201).json({ message: 'Profile saved', data: result.rows[0] });
  } catch (err) {
    console.error('Error saving profile:', err);
    res.status(500).json({ message: 'Error saving profile' });
  }
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));