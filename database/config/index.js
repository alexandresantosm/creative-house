import sqlite3 from "sqlite3";

const DATABASE_NAME = 'ideas';

sqlite3.verbose();

const database = new sqlite3.Database(`./database/${DATABASE_NAME}.db`);


database.serialize(async () => {
  const queryCreateTable = `
    CREATE TABLE IF NOT EXISTS ${DATABASE_NAME} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT,
      image_description TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      idea_url TEXT
    );
  `;

  await database.run(queryCreateTable);
});

export { database };