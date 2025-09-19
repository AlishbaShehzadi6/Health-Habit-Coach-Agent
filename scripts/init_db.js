// scripts/init_db.js
require('dotenv').config();
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = process.env.DB_PATH || './data/habit.db';
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new Database(dbPath);

db.exec(`
CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, email TEXT, created_at TEXT);
CREATE TABLE IF NOT EXISTS habits (
  id TEXT PRIMARY KEY, user_id TEXT, type TEXT, duration_minutes INTEGER,
  preferred_start TEXT, preferred_end TEXT, location TEXT, created_at TEXT
);
CREATE TABLE IF NOT EXISTS habit_events (id TEXT PRIMARY KEY, habit_id TEXT, timestamp TEXT, completed INTEGER);
`);

console.log('DB initialized at', dbPath);
db.close();
