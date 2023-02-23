// Archivo para conectarse a la base de datos postgres

const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'language_buddy',
    password: 'Cali',
    port: 5432
});

module.exports = pool;