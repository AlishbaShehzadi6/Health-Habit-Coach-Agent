// src/db.js
require('dotenv').config();
const Database = require('better-sqlite3');
const db = new Database(process.env.DB_PATH || './data/habit.db');
module.exports = db;
