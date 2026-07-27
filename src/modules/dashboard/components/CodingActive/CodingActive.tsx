import clsx from 'clsx';
import { formatDistanceToNowStrict } from 'date-fns';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import useSWR from 'swr';

import {
  DEFAULT_WAKATIME_RANGE,
  isWakaTimeRange,
  WAKATIME_RANGE_OPTIONS,
  WakaTimeRange,
} from '@/common/constant/wakatime';
import { fetcher } from '@/services/fetcher';

import CodingActiveList from './CodingActiveList';
import Overview from './Overview';

interface CodingStats {
  last_update?: string;
  start_date?: string;
  end_date?: string;
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
  categories?: {
    name: string;
    percent?: number;
  }[];
}

const CodingActive = () => {
  const [range, setRange] = useState<WakaTimeRange>(DEFAULT_WAKATIME_RANGE);
  const { data, error, isLoading, isValidating } = useSWR<CodingStats>(
    `/api/read-stats?range=${range}`,
    fetcher,
    { keepPreviousData: true },
  );
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const selectedRange =
    WAKATIME_RANGE_OPTIONS.find((option) => option.value === range) ??
    WAKATIME_RANGE_OPTIONS[0];

  useEffect(() => {
    if (!data?.last_update) {
      setLastUpdate(null);
      return;
    }

    const updatedAt = new Date(data.last_update);

    if (Number.isNaN(updatedAt.getTime())) {
      setLastUpdate(null);
      return;
    }

    setLastUpdate(
      formatDistanceToNowStrict(updatedAt, {
        addSuffix: true,
      }),
    );
  }, [data?.last_update]);

  return (
    <section aria-labelledby='coding-activity-heading' aria-busy={isValidating}>
      <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
        <div>
          <p className='font-code text-xs font-medium uppercase text-blue-600 dark:text-blue-400'>
            WakaTime
          </p>
          <h2
            id='coding-activity-heading'
            className='mt-3 text-2xl font-medium text-neutral-950 dark:text-neutral-100'
          >
            Coding activity
          </h2>
          <p className='mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
            Coding time and language breakdown across{' '}
            {selectedRange.description}.
          </p>
        </div>
        <p className='text-xs text-neutral-500' aria-live='polite'>
          {isValidating && data
            ? 'Refreshing cached data…'
            : lastUpdate
              ? `Updated ${lastUpdate}`
              : 'Update time unavailable'}
        </p>
      </div>

      <div className='mt-6 flex min-h-[46px] items-center justify-between gap-3 border-y border-neutral-200 py-2 dark:border-neutral-800 sm:hidden'>
        <label
          htmlFor='wakatime-range'
          className='text-sm text-neutral-600 dark:text-neutral-400'
        >
          Period
        </label>
        <select
          id='wakatime-range'
          value={range}
          onChange={(event) => {
            if (isWakaTimeRange(event.target.value)) {
              setRange(event.target.value);
            }
          }}
          className='min-h-[44px] min-w-0 flex-1 bg-transparent text-right text-sm text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-neutral-100'
        >
          {WAKATIME_RANGE_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className='bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100'
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className='mt-6 hidden overflow-x-auto py-1 scrollbar-hide sm:block'>
        <div
          className='inline-flex min-w-max gap-1 border-b border-neutral-200 pb-1 dark:border-neutral-800'
          role='group'
          aria-label='WakaTime statistics range'
        >
          {WAKATIME_RANGE_OPTIONS.map((option) => {
            const isActive = option.value === range;

            return (
              <button
                key={option.value}
                type='button'
                aria-pressed={isActive}
                onClick={() => setRange(option.value)}
                className={clsx(
                  'flex min-h-[44px] items-center gap-2 rounded-md px-3 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 motion-reduce:transition-none',
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white',
                )}
              >
                <FiCheck
                  aria-hidden='true'
                  className={clsx(
                    'h-4 w-4',
                    isActive ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className='sr-only' aria-live='polite'>
        Showing WakaTime statistics for {selectedRange.label}.
      </p>

      {isLoading && !data ? (
        <p className='mt-8 border-y border-neutral-200 py-8 text-sm text-neutral-500 dark:border-neutral-800'>
          Loading coding activity…
        </p>
      ) : null}

      {error && !data ? (
        <div role='status' className='mt-8 border-l-2 border-amber-500 pl-4'>
          <p className='font-medium text-neutral-900 dark:text-neutral-100'>
            Activity data is temporarily unavailable.
          </p>
          <p className='mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
            WakaTime could not be reached. The rest of this portfolio remains
            available.
          </p>
        </div>
      ) : null}

      {error && data ? (
        <p className='mt-5 text-sm text-amber-700 dark:text-amber-300'>
          Showing the last available WakaTime data while the source refreshes.
        </p>
      ) : null}

      {data ? (
        <>
          <Overview data={data} totalLabel={selectedRange.totalLabel} />
          <CodingActiveList data={data} />
          <p className='mt-5 text-xs text-neutral-500'>
            Source:{' '}
            <Link
              href='https://wakatime.com/@parothegreat'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-blue-600 hover:underline dark:hover:text-blue-400'
            >
              WakaTime profile
            </Link>
          </p>
        </>
      ) : null}
    </section>
  );
};

export default CodingActive;
