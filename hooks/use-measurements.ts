import { measurementsRepository } from '@/repositories/measurements.repository';
import { RawMeasurement } from '@/types/raw-measurement';
import { useCallback, useEffect, useState } from 'react';

export function useLatestMeasurements(limit = 10) {
  const [measurements, setMeasurements] =
    useState<RawMeasurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data =
        await measurementsRepository.getLatestMany(limit);
      setMeasurements(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    measurements, 
    loading,
    error,
    reload: load,
  };
}
