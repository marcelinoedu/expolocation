export const migration004 = {
  id: 4,
  up: `
    ALTER TABLE measurements
    ADD COLUMN synced INTEGER NOT NULL DEFAULT 0;
  `,
};
