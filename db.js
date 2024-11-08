const { Pool } = require('pg');

// Load environment variables
require('dotenv').config();

// PostgreSQL configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl:true
});

//create a method named 'query' in the exported object
module.exports = {
    query: function(text, params) {
        return pool.query(text, params);
    }
};