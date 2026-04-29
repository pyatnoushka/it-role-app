const Database = require('better-sqlite3');
const db = new Database('./db/data.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS it_role (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS question (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    answer_option_a TEXT NOT NULL,
    answer_option_b TEXT NOT NULL,
    answer_option_c TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    it_role_id INTEGER NOT NULL,
    FOREIGN KEY (it_role_id) REFERENCES it_role(id)
  );
`);

console.log('Database ready!');
module.exports = db;