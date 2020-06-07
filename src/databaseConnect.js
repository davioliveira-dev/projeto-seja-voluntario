const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database(
  './database/voluntarios.db',
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log('Database conectada com sucesso!');
  }
);

module.exports = database;
