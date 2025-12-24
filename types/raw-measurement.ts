export type RawMeasurement = {
  latitude: number;
  longitude: number;
  pressure_hpa: number;
  temperature_c: number;
  collected_at: number; 
  source: 'background' | 'manual' | 'other';
  synced: boolean;
};
