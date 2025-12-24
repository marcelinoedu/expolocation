import { measurementsRepository } from '@/repositories/measurements.repository';
import { getLocation } from '@/sensors';
import { RawMeasurement } from '@/types/raw-measurement';
import { now } from '@/utils/time';

export async function collectAndSaveMeasurement(source: string): Promise<void> {

  const [location] = await Promise.all([
    getLocation(),
  ]);

  const measurement: RawMeasurement = {
    latitude: location.latitude,
    longitude: location.longitude,

    pressure_hpa: 0,
    temperature_c: 0,

    collected_at: now(),
    source: source as 'background' | 'manual' | 'other',
    synced: false,
  };

   await measurementsRepository.insert(measurement);
}
