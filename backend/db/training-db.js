const { Pool } = require('pg');

const trainingDb = new Pool({
  user: 'mariamh',      
  host: 'localhost',
  database: 'maternal_health_training', 
  password: 'hersi123',   
  port: 5432
});

module.exports = trainingDb;