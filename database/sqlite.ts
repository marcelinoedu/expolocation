import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "measurements.db";

export const db = SQLite.openDatabaseSync(DATABASE_NAME);

export async function executeSql(
  query: string,
  params: any[] = []
): Promise<SQLite.SQLiteRunResult> {
  return db.runAsync(query, params);
}

export async function queryAll<T = any>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  return db.getAllAsync<T>(query, params);
}

export async function executeTransaction(
  statements: { query: string; params?: any[] }[]
): Promise<void> {
  await db.withTransactionAsync(async () => {
    for (const { query, params = [] } of statements) {
      await db.runAsync(query, params);
    }
  });
}
