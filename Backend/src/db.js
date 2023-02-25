const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    password: 'Cali',
    host: 'localhost',
    database: 'language_buddy',
    port: 5432
});

module.exports = pool;
