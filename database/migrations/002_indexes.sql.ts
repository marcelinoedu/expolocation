export const migration002 = {
  id: 2,
  up: `
    CREATE INDEX IF NOT EXISTS idx_measurements_collected_at
      ON measurements(collected_at);
  `,
};
