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
        <p className='signal-label'>Current focus</p>
        <h2
          id='current-focus-heading'
          className='mt-3 text-2xl font-medium text-[var(--text-primary)]'
        >
          What I&apos;m working on now
        </h2>
        <dl className='mt-7 border-y border-[var(--line-default)]'>
          {CURRENT_FOCUS.map((item) => (
            <div
              key={item.label}
              className='grid gap-2 border-b border-[var(--line-default)] py-4 last:border-b-0 sm:grid-cols-[120px_minmax(0,1fr)]'
            >
              <dt className='font-code text-xs uppercase text-[var(--text-tertiary)]'>
                {item.label}
              </dt>
              <dd className='text-sm text-[var(--text-primary)]'>
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div>
        <div
          className='mb-8 grid grid-cols-2 gap-1 rounded-md bg-[var(--surface-1)] p-1 md:hidden'
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
                  'flex min-h-[44px] items-center justify-center gap-2 rounded-md px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] motion-reduce:transition-none',
                  isActive
                    ? 'bg-[var(--surface-3)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)]',
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

      <p className='border-t border-[var(--line-default)] pt-5 text-xs leading-5 text-[var(--text-tertiary)]'>
        Activity data comes from WakaTime and GitHub. Temporary source issues
        are shown instead of being hidden.
      </p>
    </div>
  );
};

export default Activity;
