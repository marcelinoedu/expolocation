import {
  COLLECTION_INTERVAL_OPTIONS,
  SYNC_INTERVAL_OPTIONS,
} from '@/constants/intervals';
import { settingsRepository } from '@/repositories/settings.repository';
import { Settings } from '@/types/settings';
import { useCallback, useEffect, useState } from 'react';

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await settingsRepository.get();
      console.log('Loaded settings:', data);
      setSettings(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(
    async (partial: Partial<Settings>) => {
      if (!settings) return;

      setUpdating(true);
      try {
        await settingsRepository.update(partial);
        const updated = await settingsRepository.get();
        setSettings(updated);
      } catch (err) {
        setError(err as Error);
      } finally {
        setUpdating(false);
      }
    },
    [settings]
  );

  useEffect(() => {
    load();
  }, [load]);

  return {
    // estado
    settings,
    loading,
    updating,
    error,

    // ações
    reload: load,
    update,

    // 🔑 opções permitidas (para UI)
    collectionIntervalOptions: COLLECTION_INTERVAL_OPTIONS,
    syncIntervalOptions: SYNC_INTERVAL_OPTIONS,
  };
}
