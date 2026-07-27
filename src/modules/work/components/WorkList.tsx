import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

import {
  WORK_STATUS_LABELS,
  WorkItem,
} from '@/data/work';

interface WorkListProps {
  items: WorkItem[];
  compact?: boolean;
}

const WorkList = ({ items, compact = false }: WorkListProps) => {
  return (
    <ol className='border-t border-neutral-200 dark:border-neutral-800'>
      {items.map((item) => (
        <li
          key={item.id}
          id={item.slug}
          className='border-b border-neutral-200 py-6 dark:border-neutral-800 sm:py-7'
        >
          <article className='grid gap-4 sm:grid-cols-[52px_minmax(0,1fr)] lg:grid-cols-[52px_minmax(0,1fr)_180px] lg:gap-6'>
            <p className='font-code text-xs text-neutral-500'>
              {String(item.index).padStart(2, '0')}
            </p>
            <div className='min-w-0'>
              <div className='flex flex-wrap items-center gap-3'>
                <h3 className='text-lg font-medium text-neutral-950 dark:text-neutral-100'>
                  {item.title}
                </h3>
                <span className='inline-flex items-center gap-1.5 font-code text-[11px] uppercase text-neutral-500'>
                  <span
                    aria-hidden='true'
                    className='h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400'
                  />
                  {WORK_STATUS_LABELS[item.status]}
                </span>
              </div>
              <p className='mt-2 max-w-2xl text-[15px] leading-6 text-neutral-600 dark:text-neutral-400'>
                {item.shortDescription}
              </p>
              <p
                className='mt-4 break-words font-code text-xs leading-5 text-neutral-500'
                aria-label={`Stack: ${item.stack.join(', ')}`}
              >
                {item.stack.join(' · ')}
              </p>
            </div>
            <div className='flex items-end justify-between gap-4 sm:col-start-2 lg:col-start-auto lg:flex-col lg:items-start'>
              <div>
                <p className='font-code text-[10px] uppercase text-neutral-500'>
                  {item.category}
                </p>
                <p className='mt-1 text-sm text-neutral-700 dark:text-neutral-300'>
                  {item.role.join(' / ')}
                </p>
              </div>
              {compact ? (
                <Link
                  href={`/work#${item.slug}`}
                  className='inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400'
                >
                  View work
                  <FiArrowUpRight aria-hidden='true' />
                </Link>
              ) : (
                <span className='text-xs text-neutral-500'>
                  Documentation in progress
                </span>
              )}
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
};

export default WorkList;
