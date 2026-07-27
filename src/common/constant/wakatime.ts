export const WAKATIME_RANGE_OPTIONS = [
  {
    value: 'last_7_days',
    label: '7 Days',
    description: 'the last 7 days',
    totalLabel: '7-Day',
  },
  {
    value: 'last_30_days',
    label: '30 Days',
    description: 'the last 30 days',
    totalLabel: '30-Day',
  },
  {
    value: 'last_6_months',
    label: '6 Months',
    description: 'the last 6 months',
    totalLabel: '6-Month',
  },
  {
    value: 'all_time',
    label: 'All Time',
    description: 'all tracked time',
    totalLabel: 'All-Time',
  },
] as const;

export type WakaTimeRange = (typeof WAKATIME_RANGE_OPTIONS)[number]['value'];

export const DEFAULT_WAKATIME_RANGE: WakaTimeRange = 'last_7_days';

export const isWakaTimeRange = (value: unknown): value is WakaTimeRange =>
  WAKATIME_RANGE_OPTIONS.some((option) => option.value === value);
