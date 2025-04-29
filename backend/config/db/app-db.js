const { Pool } = require('pg');

const appDb = new Pool({
  user: 'mariamh',      // Replace with your actual username
  host: 'localhost',                   
  database: 'maternal_health_app',     // Your main app database name
  password: 'hersi123',  // Replace with your actual password
  port: 5432                           // Default PostgreSQL port
});

module.exports = appDb;