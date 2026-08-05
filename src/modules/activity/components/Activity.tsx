import clsx from 'clsx';
import { useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { SiWakatime } from 'react-icons/si';

import { CURRENT_FOCUS } from '@/data/activity';

import CodingActive from '@/modules/dashboard/components/CodingActive';

import GithubContributions from './GithubContributions';

type ActivitySource = 'wakatime' | 'github';

const Activity = () => {
  const [activeSource, setActiveSource] = useState<ActivitySource>('wakatime');
  const sources = [
    { id: 'wakatime' as const, label: 'WakaTime', icon: SiWakatime },
    { id: 'github' as const, label: 'GitHub', icon: BsGithub },
  ];

  return (
    <div className='space-y-16'>
      <section aria-labelledby='current-focus-heading'>
        <p className='font-code text-xs font-medium uppercase text-blue-600 dark:text-blue-400'>
          Current focus
        </p>
        <h2
          id='current-focus-heading'
          className='mt-3 text-2xl font-medium text-neutral-950 dark:text-neutral-100'
        >
          What I&apos;m working on now
        </h2>
        <dl className='mt-7 border-y border-neutral-200 dark:border-neutral-800'>
          {CURRENT_FOCUS.map((item) => (
            <div
              key={item.label}
              className='grid gap-2 border-b border-neutral-200 py-4 last:border-b-0 dark:border-neutral-800 sm:grid-cols-[120px_minmax(0,1fr)]'
            >
              <dt className='font-code text-xs uppercase text-neutral-500'>
                {item.label}
              </dt>
              <dd className='text-sm text-neutral-800 dark:text-neutral-200'>
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div>
        <div
          className='mb-8 grid grid-cols-2 gap-1 rounded-md bg-neutral-100 p-1 dark:bg-neutral-900 md:hidden'
          role='tablist'
          aria-label='Activity source'
        >
          {sources.map((source) => {
            const Icon = source.icon;
            const isActive = activeSource === source.id;

            return (
              <button
                key={source.id}
                id={`activity-tab-${source.id}`}
                type='button'
                role='tab'
                aria-selected={isActive}
                aria-controls={`activity-panel-${source.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveSource(source.id)}
                className={clsx(
                  'flex min-h-[44px] items-center justify-center gap-2 rounded-md px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 motion-reduce:transition-none',
                  isActive
                    ? 'bg-white text-neutral-950 shadow-sm dark:bg-neutral-800 dark:text-white'
                    : 'text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800',
                )}
              >
                <Icon aria-hidden='true' />
                {source.label}
              </button>
            );
          })}
        </div>

        <div
          id='activity-panel-wakatime'
          role='tabpanel'
          aria-labelledby='activity-tab-wakatime'
          className={clsx(activeSource !== 'wakatime' && 'hidden', 'md:block')}
        >
          <CodingActive />
        </div>

        <div
          id='activity-panel-github'
          role='tabpanel'
          aria-labelledby='activity-tab-github'
          className={clsx(
            activeSource !== 'github' && 'hidden',
            'md:mt-16 md:block',
          )}
        >
          <GithubContributions />
        </div>
      </div>

      <p className='border-t border-neutral-200 pt-5 text-xs leading-5 text-neutral-500 dark:border-neutral-800'>
        Activity data comes from WakaTime and GitHub. Temporary source issues
        are shown instead of being hidden.
      </p>
    </div>
  );
};

export default Activity;
