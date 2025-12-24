export const migration003 = {
  id: 3,
  up: `
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),

      device_id TEXT NOT NULL,
      device_model TEXT NOT NULL,
      os_version TEXT NOT NULL,

      collect_data INTEGER NOT NULL DEFAULT 1,
      time_interval INTEGER NOT NULL DEFAULT 60,

      sync_data INTEGER NOT NULL DEFAULT 1,
      time_to_sync_server INTEGER NOT NULL DEFAULT 300
    );

    INSERT OR IGNORE INTO settings (id, device_id, device_model, os_version)
    VALUES (1, '', '', '');
  `,
};
