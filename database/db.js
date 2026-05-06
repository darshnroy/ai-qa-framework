const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./test.db');

db.run(`
CREATE TABLE IF NOT EXISTS results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  status TEXT,
  duration REAL,
  ai_analysis TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

module.exports = db;