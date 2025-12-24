export const migration001 = {
  id: 1,
  up: `
    CREATE TABLE IF NOT EXISTS measurements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      latitude REAL NOT NULL,
      longitude REAL NOT NULL,

      pressure_hpa REAL NOT NULL,
      temperature_c REAL NOT NULL,

      collected_at INTEGER NOT NULL,
      source TEXT NOT NULL
    );
  `,
};
