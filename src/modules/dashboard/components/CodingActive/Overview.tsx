import { formatDate } from '@/common/helpers';

interface OverviewProps {
  data?: {
    human_readable_total?: string;
    human_readable_daily_average?: string;
    best_day?: {
      text?: string;
      date?: string;
    };
    languages?: {
      name: string;
      percent?: number;
    }[];
    start_date?: string;
    end_date?: string;
  };
  totalLabel: string;
}

const Overview = ({ data, totalLabel }: OverviewProps) => {
  const total = data?.human_readable_total || 'N/A';
  const dailyAverage = data?.human_readable_daily_average || 'N/A';
  const bestDayTime = data?.best_day?.text || 'N/A';
  const bestDayDate = data?.best_day?.date;
  const topLanguage = data?.languages?.[0];
  const topLanguageText = topLanguage
    ? `${topLanguage.name} (${Math.round(topLanguage.percent ?? 0)}%)`
    : 'N/A';
  const dateRange =
    data?.start_date && data?.end_date
      ? `${formatDate(data.start_date, 'MMM d')} – ${formatDate(
          data.end_date,
          'MMM d, yyyy',
        )}`
      : 'Date range unavailable';
  const bestDay = bestDayDate
    ? `${bestDayTime} · ${formatDate(bestDayDate, 'MMM d')}`
    : bestDayTime;
  const secondaryMetrics = [
    { label: 'Daily average', value: dailyAverage },
    { label: 'Best day', value: bestDay },
    { label: 'Top language', value: topLanguageText },
  ];

  return (
    <div className='mt-8 border-y border-neutral-200 dark:border-neutral-800 lg:grid lg:grid-cols-[1.1fr_1fr]'>
      <div className='py-7 lg:pr-10'>
        <p className='font-code text-xs uppercase text-neutral-500'>
          {totalLabel} coding time
        </p>
        <p className='mt-3 text-4xl font-medium text-neutral-950 dark:text-neutral-50 sm:text-5xl'>
          {total}
        </p>
        <p className='mt-3 text-sm text-neutral-500'>{dateRange}</p>
      </div>

      <dl className='grid grid-cols-2 border-t border-neutral-200 dark:border-neutral-800 lg:border-l lg:border-t-0'>
        {secondaryMetrics.map((metric, index) => (
          <div
            key={metric.label}
            className={[
              'min-w-0 px-4 py-5 sm:px-5',
              index === 0
                ? 'border-r border-neutral-200 dark:border-neutral-800'
                : '',
              index === 2
                ? 'col-span-2 border-t border-neutral-200 dark:border-neutral-800'
                : '',
            ].join(' ')}
          >
            <dt className='text-xs text-neutral-500'>{metric.label}</dt>
            <dd className='mt-2 break-words text-sm font-medium text-neutral-900 dark:text-neutral-100 sm:text-base'>
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Overview;
