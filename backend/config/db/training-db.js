const { Pool } = require('pg');

const trainingDb = new Pool({
  user: 'mariamh',      // Replace with your actual username
  host: 'localhost',
  database: 'maternal_health_training', // Your training database name
  password: 'hersi123',   // Replace with your actual password
  port: 5432
});

module.exports = trainingDb;