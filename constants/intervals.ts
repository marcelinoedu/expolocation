export type IntervalOption = {
  label: string;
  value: number;
};


export const COLLECTION_INTERVAL_OPTIONS: IntervalOption[] = [
  { label: '1 minuto', value: 60 },
  { label: '2 minutos', value: 120 },
  { label: '5 minutos', value: 300 },
  { label: '10 minutos', value: 600 },
];


export const SYNC_INTERVAL_OPTIONS: IntervalOption[] = [
  { label: '5 minutos', value: 300 },
  { label: '15 minutos', value: 900 },
  { label: '30 minutos', value: 1800 },
  { label: '1 hora', value: 3600 },
];
