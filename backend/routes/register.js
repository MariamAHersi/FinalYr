const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const appDb = require('../config/db/app-db');

// POST /register - Handle user registration
router.post('/register', async (req, res) => {
  // Destructure user details from request body
  const { email, username, password } = req.body;

  // Validate all fields are present
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Hash the password with bcrypt (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique ID for the new user
    const userId = uuidv4();

    // Insert new user into the Users table
    await appDb.query(
      'INSERT INTO Users (Id, Email, Username, Password) VALUES ($1, $2, $3, $4)',
      [userId, email, username, hashedPassword]
    );

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Log and handle errors
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

module.exports = router;