const sqlite3 = require("sqlite3").verbose();
require('dotenv').config();

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.message);
  } else {
    console.log("Conexión exitosa a la base de datos.");
  }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        rol TEXT NOT NULL DEFAULT 'user'
    )`);
});

module.exports = db;