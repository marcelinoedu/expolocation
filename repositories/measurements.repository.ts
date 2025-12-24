import { db } from '@/database/sqlite';
import { RawMeasurement } from '@/types/raw-measurement';

class MeasurementsRepository {
  async insert(data: RawMeasurement) {
    await db.runAsync(
      `
      INSERT INTO measurements (
        latitude,
        longitude,
        pressure_hpa,
        temperature_c,
        collected_at,
        source,
        synced
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.latitude,
        data.longitude,
        data.pressure_hpa,
        data.temperature_c,
        data.collected_at,
        data.source,
        data.synced,
      ]
    );
  }


  async getLatestMany(limit = 10): Promise<RawMeasurement[]> {
    const rows = await db.getAllAsync<RawMeasurement>(
      `
      SELECT *
      FROM measurements
      ORDER BY collected_at DESC
      LIMIT ?
      `,
      [limit]
    );

    return rows;
  }
}

export const measurementsRepository = new MeasurementsRepository();
