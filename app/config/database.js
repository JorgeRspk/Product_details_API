const knex = require('knex');

// Obtener valores de variables de entorno
const knexConfig = {
  client: 'pg',
  connection: {
    user: process.env.USERNAME,
    host: process.env.DATABASE_URL,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWD,
    port: 5432,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
};

// Crear una instancia de Knex
const knexInstance = knex(knexConfig);

module.exports = knexInstance;