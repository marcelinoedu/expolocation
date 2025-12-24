import { runMigrations } from '@/database/migrations';
import { initSettingsIfNeeded } from '@/services/init-settings';

export async function bootstrapApp() {
  await runMigrations();
  await initSettingsIfNeeded();
}
