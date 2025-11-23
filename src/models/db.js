const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', '..', 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("DB connection error:", err);
    } else {
        console.log("SQLite DB connected:", dbPath);
    }
});

// Tábla létrehozása, ha nem létezik
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        name TEXT,
        password_hash TEXT,
        role TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;