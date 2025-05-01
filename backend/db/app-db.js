const { Pool } = require('pg');

const appDb = new Pool({
  user: 'mariamh',      
  host: 'localhost',                   
  database: 'maternal_health_app',     
  password: 'hersi123',  
  port: 5432                          
});

module.exports = appDb;