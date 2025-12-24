import { migration001 } from './migrations/001_init.sql';
import { migration002 } from './migrations/002_indexes.sql';
import { migration003 } from './migrations/003_create_settings_table';
import { db } from './sqlite';

const migrations = [migration001, migration002, migration003];

export async function runMigrations() {
  
  await db.runAsync(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY,
      applied_at INTEGER NOT NULL
    );
  `);

  
  const applied = await db.getAllAsync<{ id: number }>(
    'SELECT id FROM schema_migrations'
  );

  const appliedIds = new Set(applied.map(m => m.id));

  
  for (const migration of migrations) {
    if (!appliedIds.has(migration.id)) {
      console.log(`[DB] Running migration ${migration.id}`);

      await db.withTransactionAsync(async () => {
        await db.execAsync(migration.up);
        await db.runAsync(
          'INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?)',
          [migration.id, Date.now()]
        );
      });
    }
  }

  console.log('[DB] Migrations complete');
}
