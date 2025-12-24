import { db } from '@/database/sqlite';
import { Settings } from '@/types/settings';

class SettingsRepository {
  async get(): Promise<Settings> {
    const row = await db.getFirstAsync<any>(
      'SELECT * FROM settings WHERE id = 1'
    );

    return {
      device_id: row.device_id,
      device_model: row.device_model,
      os_version: row.os_version,
      collect_data: row.collect_data === 1,
      time_interval: row.time_interval,
      sync_data: row.sync_data === 1,
      time_to_sync_server: row.time_to_sync_server,
    };
  }

  async update(data: Partial<Settings>) {
    const fields = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');

    const values = Object.values(data).map(v =>
      typeof v === 'boolean' ? (v ? 1 : 0) : v
    );

    await db.runAsync(
      `UPDATE settings SET ${fields} WHERE id = 1`,
      values
    );
  }
}

export const settingsRepository = new SettingsRepository();
