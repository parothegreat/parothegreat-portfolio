import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { BsGithub } from 'react-icons/bs';
import useSWR from 'swr';

import { fetcher } from '@/services/fetcher';
import {
  GithubContributionData,
  GithubContributionDay,
} from '@/services/github';

const LEVEL_STYLES = [
  'bg-neutral-200 dark:bg-neutral-800',
  'bg-emerald-200 dark:bg-emerald-950',
  'bg-emerald-400 dark:bg-emerald-800',
  'bg-emerald-500 dark:bg-emerald-600',
  'bg-emerald-700 dark:bg-emerald-400',
];

const monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: 'UTC',
});

const formatMonth = (date: string) =>
  monthFormatter.format(new Date(`${date}T00:00:00Z`));

const splitIntoWeeks = (days: GithubContributionDay[]) =>
  Array.from({ length: Math.ceil(days.length / 7) }, (_, index) =>
    days.slice(index * 7, index * 7 + 7),
  );

const GithubContributions = () => {
  const { data, error, isLoading, isValidating } =
    useSWR<GithubContributionData>('/api/github-contributions', fetcher, {
      keepPreviousData: true,
    });
  const chartRef = useRef<HTMLDivElement>(null);
  const weeks = useMemo(() => splitIntoWeeks(data?.days ?? []), [data?.days]);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || !data) {
      return;
    }

    const showLatest = () => {
      if (chart.clientWidth) {
        chart.scrollLeft = chart.scrollWidth;
      }
    };
    const observer = new ResizeObserver(showLatest);

    showLatest();
    observer.observe(chart);

    return () => observer.disconnect();
  }, [data]);

  const days = data?.days ?? [];
  const thisWeek = days.slice(-7).reduce((total, day) => total + day.count, 0);
  const bestDay = days.reduce(
    (best, day) => (day.count > best ? day.count : best),
    0,
  );
  const average = days.length
    ? Math.round((data?.totalContributions ?? 0) / days.length)
    : 0;
  const monthLabels = weeks.flatMap((week, index) => {
    const firstOfMonth = week.find((day) => day.date.endsWith('-01'));
    return firstOfMonth
      ? [{ name: formatMonth(firstOfMonth.date), index }]
      : [];
  });

  return (
    <section aria-labelledby='github-activity-heading' aria-busy={isValidating}>
      <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
        <div>
          <p className='font-code text-xs font-medium uppercase text-blue-600 dark:text-blue-400'>
            GitHub
          </p>
          <h2
            id='github-activity-heading'
            className='mt-3 flex items-center gap-2 text-2xl font-medium text-neutral-950 dark:text-neutral-100'
          >
            <BsGithub aria-hidden='true' className='h-5 w-5' />
            Contributions
          </h2>
          <p className='mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
            Public contribution activity from the last year.
          </p>
        </div>
        <Link
          href='https://github.com/parothegreat'
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-neutral-500 hover:text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-blue-400'
        >
          @parothegreat
        </Link>
      </div>

      {isLoading && !data ? (
        <p className='mt-8 border-y border-neutral-200 py-8 text-sm text-neutral-500 dark:border-neutral-800'>
          Loading GitHub contributions…
        </p>
      ) : null}

      {error && !data ? (
        <div role='status' className='mt-8 border-l-2 border-amber-500 pl-4'>
          <p className='font-medium text-neutral-900 dark:text-neutral-100'>
            GitHub activity is temporarily unavailable.
          </p>
          <p className='mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
            Visit the public profile to view the latest contribution history.
          </p>
        </div>
      ) : null}

      {error && data ? (
        <p className='mt-5 text-sm text-amber-700 dark:text-amber-300'>
          Showing the last available GitHub data while the source refreshes.
        </p>
      ) : null}

      {data ? (
        <>
          <div className='mt-8 border-y border-neutral-200 dark:border-neutral-800'>
            <div className='py-6'>
              <p className='font-code text-xs uppercase text-neutral-500'>
                Last year
              </p>
              <p className='mt-2 text-3xl font-medium text-neutral-950 dark:text-neutral-50 sm:text-4xl'>
                {data.totalContributions.toLocaleString('en-US')} contributions
              </p>
            </div>
            <dl className='grid grid-cols-3 border-t border-neutral-200 dark:border-neutral-800'>
              {[
                { label: 'This week', value: thisWeek },
                { label: 'Best day', value: bestDay },
                { label: 'Average', value: `${average} / day` },
              ].map((metric, index) => (
                <div
                  key={metric.label}
                  className={
                    index
                      ? 'min-w-0 border-l border-neutral-200 px-3 py-4 dark:border-neutral-800 sm:px-5'
                      : 'min-w-0 px-3 py-4 sm:px-5'
                  }
                >
                  <dt className='text-xs text-neutral-500'>{metric.label}</dt>
                  <dd className='mt-2 break-words text-sm font-medium text-neutral-900 dark:text-neutral-100 sm:text-base'>
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            ref={chartRef}
            tabIndex={0}
            role='img'
            aria-label={`${data.totalContributions} GitHub contributions in the last year. Best day: ${bestDay} contributions.`}
            className='mt-8 overflow-x-auto pb-3 scrollbar-hide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
          >
            <div className='w-max min-w-[720px]'>
              <div
                className='ml-8 grid h-5 gap-[3px] font-code text-[10px] text-neutral-500'
                style={{
                  gridTemplateColumns: `repeat(${weeks.length}, 10px)`,
                }}
                aria-hidden='true'
              >
                {monthLabels.map((month) => (
                  <span
                    key={`${month.name}-${month.index}`}
                    style={{ gridColumnStart: month.index + 1 }}
                  >
                    {month.name}
                  </span>
                ))}
              </div>

              <div className='flex gap-2'>
                <div
                  className='grid w-6 gap-[3px] font-code text-[9px] text-neutral-500'
                  style={{ gridTemplateRows: 'repeat(7, 10px)' }}
                  aria-hidden='true'
                >
                  <span />
                  <span>Mon</span>
                  <span />
                  <span>Wed</span>
                  <span />
                  <span>Fri</span>
                  <span />
                </div>
                <div
                  className='grid gap-[3px]'
                  style={{
                    gridAutoFlow: 'column',
                    gridAutoColumns: '10px',
                    gridTemplateRows: 'repeat(7, 10px)',
                  }}
                  aria-hidden='true'
                >
                  {days.map((day) => (
                    <span
                      key={day.date}
                      title={`${day.count} contributions on ${day.date}`}
                      className={`h-[10px] w-[10px] rounded-[2px] ${
                        LEVEL_STYLES[day.level] ?? LEVEL_STYLES[0]
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='mt-2 flex items-center justify-between gap-4 text-xs text-neutral-500'>
            <span>Swipe to review the full year</span>
            <span className='flex items-center gap-1' aria-hidden='true'>
              Less
              {LEVEL_STYLES.map((style, index) => (
                <i
                  key={style}
                  className={`h-[10px] w-[10px] rounded-[2px] ${style}`}
                  title={`Contribution level ${index}`}
                />
              ))}
              More
            </span>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default GithubContributions;
