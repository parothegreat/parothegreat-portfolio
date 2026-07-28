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
          <p className='signal-label'>WakaTime</p>
          <h2
            id='coding-activity-heading'
            className='mt-3 text-2xl font-medium text-[var(--text-primary)]'
          >
            Coding activity
          </h2>
          <p className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
            Coding time and language breakdown across{' '}
            {selectedRange.description}.
          </p>
        </div>
        <p className='text-xs text-[var(--text-tertiary)]' aria-live='polite'>
          {isValidating && data
            ? 'Refreshing cached data…'
            : lastUpdate
              ? `Updated ${lastUpdate}`
              : 'Update time unavailable'}
        </p>
      </div>

      <div className='mt-6 flex min-h-[46px] items-center justify-between gap-3 border-y border-[var(--line-default)] py-2 sm:hidden'>
        <label
          htmlFor='wakatime-range'
          className='text-sm text-[var(--text-secondary)]'
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
          className='min-h-[44px] min-w-0 flex-1 bg-[var(--surface-1)] text-right text-sm text-[var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
        >
          {WAKATIME_RANGE_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className='bg-[var(--surface-1)] text-[var(--text-primary)]'
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className='mt-6 hidden overflow-x-auto py-1 scrollbar-hide sm:block'>
        <div
          className='inline-flex min-w-max gap-1 border-b border-[var(--line-default)] pb-1'
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
                  'flex min-h-[44px] items-center gap-2 rounded-md px-3 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] motion-reduce:transition-none',
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--circuit-500)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)]',
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
        <p className='mt-8 border-y border-[var(--line-default)] py-8 text-sm text-[var(--text-tertiary)]'>
          Loading coding activity…
        </p>
      ) : null}

      {error && !data ? (
        <div
          role='status'
          className='mt-8 border-l-2 border-[var(--signal-500)] pl-4'
        >
          <p className='font-medium text-[var(--text-primary)]'>
            Activity data is temporarily unavailable.
          </p>
          <p className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
            WakaTime could not be reached. The rest of this portfolio remains
            available.
          </p>
        </div>
      ) : null}

      {error && data ? (
        <p className='mt-5 text-sm text-[var(--signal-500)]'>
          Showing the last available WakaTime data while the source refreshes.
        </p>
      ) : null}

      {data ? (
        <>
          <Overview data={data} totalLabel={selectedRange.totalLabel} />
          <CodingActiveList data={data} />
          <p className='mt-5 text-xs text-[var(--text-tertiary)]'>
            Source:{' '}
            <Link
              href='https://wakatime.com/@parothegreat'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-[var(--circuit-500)] hover:underline'
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
