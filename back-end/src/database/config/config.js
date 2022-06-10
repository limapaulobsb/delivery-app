require('dotenv').config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE } = process.env;

const options = {
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE,
  dialect: 'mysql',
};

module.exports = {
  development: {
    ...options,
    database: `${DATABASE}-dev`,
  },
  test: {
    ...options,
    database: `${DATABASE}-test`,
  },
  production: {
    ...options,
  },
};
