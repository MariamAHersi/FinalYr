require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'user123',
    database: process.env.DB_NAME || 'maternal_health_app',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'user123',
    database: process.env.DB_NAME || 'maternal_health_app',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'user123',
    database: process.env.DB_NAME || 'maternal_health_app',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  }
};
