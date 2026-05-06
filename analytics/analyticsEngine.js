const db = require('../database/db');

function saveResult(name, status, duration) {
  db.run(
    `INSERT INTO results (name, status, duration) VALUES (?, ?, ?)`,
    [name, status, duration]
  );
}

module.exports = { saveResult };