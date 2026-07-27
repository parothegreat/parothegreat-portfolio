import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiGithub, FiMail } from 'react-icons/fi';

import { CURRENT_FOCUS } from '@/data/activity';
import {
  CAPABILITIES,
  PROFILE,
  PROFILE_STATUS,
  PROOF_POINTS,
} from '@/data/profile';
import { TOOLS } from '@/data/tools';
import { FEATURED_WORK } from '@/data/work';

import ToolIcon from '@/modules/toolkit/components/ToolIcon';
import WorkList from '@/modules/work/components/WorkList';

const CORE_TOOLS = TOOLS.filter((tool) => tool.featured).slice(0, 12);

const SectionHeader = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => (
  <header className='max-w-2xl'>
    <p className='font-code text-xs font-medium uppercase text-blue-600 dark:text-blue-400'>
      {eyebrow}
    </p>
    <h2 className='mt-3 text-2xl font-medium leading-tight text-neutral-950 dark:text-neutral-100 sm:text-3xl'>
      {title}
    </h2>
    {description ? (
      <p className='mt-3 text-base leading-7 text-neutral-600 dark:text-neutral-400'>
        {description}
      </p>
    ) : null}
  </header>
);

const Home = () => {
  return (
    <div className='space-y-16 sm:space-y-20'>
      <section
        aria-labelledby='home-heading'
        className='relative lg:grid lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.85fr)] lg:items-center lg:gap-12'
      >
        <div className='border-l-2 border-blue-600 pl-5 dark:border-blue-400 sm:pl-7'>
          <p className='font-code text-xs font-medium uppercase text-blue-600 dark:text-blue-400'>
            DevOps · Systems · Security
          </p>
          <h1
            id='home-heading'
            className='mt-4 text-4xl font-medium leading-[1.12] text-neutral-950 dark:text-white sm:text-5xl lg:text-[52px]'
          >
            {PROFILE.headline}
          </h1>
          <p className='mt-5 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300 sm:text-lg sm:leading-8'>
            {PROFILE.shortBio}
          </p>
          <div className='mt-7 flex flex-col gap-3 min-[420px]:flex-row'>
            <Link
              href='/work'
              className='inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:bg-blue-500 dark:hover:bg-blue-400 dark:hover:text-neutral-950'
            >
              View selected work
              <FiArrowRight aria-hidden='true' />
            </Link>
            <Link
              href='/about'
              className='inline-flex min-h-[46px] items-center justify-center rounded-md border border-neutral-300 px-5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-400 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 motion-reduce:transition-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:bg-neutral-900'
            >
              About me
            </Link>
          </div>
          <p className='mt-6 flex items-start gap-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
            <FiCheckCircle
              aria-hidden='true'
              className='mt-1 shrink-0 text-emerald-600 dark:text-emerald-400'
            />
            {PROFILE.availability}
          </p>
        </div>

        <aside
          aria-label='Current status'
          className='mt-10 rounded-lg border border-neutral-200 bg-[var(--surface-raised)] p-5 shadow-sm dark:border-neutral-800 lg:mt-0'
        >
          <p className='font-code text-xs font-medium uppercase text-neutral-500'>
            Current status
          </p>
          <dl className='mt-4 divide-y divide-neutral-200 dark:divide-neutral-800'>
            {PROFILE_STATUS.map((item) => (
              <div
                key={item.label}
                className='grid grid-cols-[92px_minmax(0,1fr)] gap-3 py-3 text-sm first:pt-0 last:pb-0'
              >
                <dt className='text-neutral-500'>{item.label}</dt>
                <dd className='min-w-0 break-words text-neutral-800 dark:text-neutral-200'>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section aria-label='Practical experience'>
        <ul className='grid grid-cols-2 border-y border-neutral-200 dark:border-neutral-800 sm:grid-cols-4'>
          {PROOF_POINTS.map((point, index) => (
            <li
              key={point}
              className={`flex min-h-[88px] items-center px-3 py-4 text-sm leading-5 text-neutral-700 dark:text-neutral-300 sm:px-4 ${
                index % 2 === 0
                  ? 'border-r border-neutral-200 dark:border-neutral-800'
                  : ''
              } ${index < 2 ? 'border-b border-neutral-200 dark:border-neutral-800 sm:border-b-0' : ''} ${
                index === 1 ? 'sm:border-r' : ''
              }`}
            >
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby='selected-work-heading'>
        <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-end'>
          <div id='selected-work-heading'>
            <SectionHeader
              eyebrow='Selected work'
              title='Systems built around real operational needs'
              description='A selection of infrastructure, backend, and IoT work currently being operated or documented.'
            />
          </div>
          <Link
            href='/work'
            className='inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400'
          >
            View all work
            <FiArrowRight aria-hidden='true' />
          </Link>
        </div>
        <div className='mt-7'>
          <WorkList items={FEATURED_WORK} compact />
        </div>
      </section>

      <section aria-labelledby='capabilities-heading'>
        <div id='capabilities-heading'>
          <SectionHeader
            eyebrow='Capabilities'
            title='Where I work across the system'
          />
        </div>
        <ol className='mt-7 grid gap-x-10 md:grid-cols-2'>
          {CAPABILITIES.map((capability, index) => (
            <li
              key={capability.id}
              className='grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-t border-neutral-200 py-6 dark:border-neutral-800'
            >
              <span className='font-code text-xs text-blue-600 dark:text-blue-400'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className='font-medium text-neutral-950 dark:text-neutral-100'>
                  {capability.title}
                </h3>
                <p className='mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
                  {capability.description}
                </p>
                <p className='mt-3 font-code text-[11px] leading-5 text-neutral-500'>
                  Evidence: {capability.evidence}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby='toolkit-preview-heading'>
        <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-end'>
          <div id='toolkit-preview-heading'>
            <SectionHeader
              eyebrow='Core toolkit'
              title='Tools used to build and operate'
            />
          </div>
          <Link
            href='/toolkit'
            className='inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400'
          >
            Explore full toolkit
            <FiArrowRight aria-hidden='true' />
          </Link>
        </div>
        <ul className='mt-7 grid grid-cols-2 border-y border-neutral-200 dark:border-neutral-800 sm:grid-cols-3 lg:grid-cols-4'>
          {CORE_TOOLS.map((tool) => (
            <li
              key={tool.id}
              className='flex min-h-[72px] min-w-0 items-center gap-3 border-b border-r border-neutral-200 px-3 py-4 last:border-b-0 dark:border-neutral-800 sm:px-4'
            >
              <ToolIcon name={tool.icon} />
              <div className='min-w-0'>
                <p className='truncate text-sm font-medium text-neutral-900 dark:text-neutral-100'>
                  {tool.name}
                </p>
                <p className='mt-1 truncate font-code text-[10px] text-neutral-500'>
                  {tool.domain}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby='activity-preview-heading'
        className='grid gap-8 border-y border-neutral-200 py-8 dark:border-neutral-800 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'
      >
        <div id='activity-preview-heading'>
          <SectionHeader
            eyebrow='Current activity'
            title='Work in progress, with public evidence'
            description='Live WakaTime and GitHub summaries are available without loading those integrations on the Home page.'
          />
          <Link
            href='/activity'
            className='mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400'
          >
            View activity
            <FiArrowRight aria-hidden='true' />
          </Link>
        </div>
        <dl className='divide-y divide-neutral-200 dark:divide-neutral-800'>
          {CURRENT_FOCUS.map((item) => (
            <div
              key={item.label}
              className='grid grid-cols-[100px_minmax(0,1fr)] gap-4 py-4 first:pt-0 last:pb-0'
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

      <section
        aria-labelledby='home-contact-heading'
        className='rounded-lg border border-neutral-200 bg-[var(--surface-raised)] p-6 shadow-sm dark:border-neutral-800 sm:p-8'
      >
        <h2
          id='home-contact-heading'
          className='text-2xl font-medium text-neutral-950 dark:text-neutral-100'
        >
          Let&apos;s build something reliable.
        </h2>
        <p className='mt-3 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400'>
          I&apos;m open to infrastructure, DevOps, backend, security, and
          technical collaboration opportunities.
        </p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <Link
            href='mailto:alvaroprayogo38@gmail.com'
            className='inline-flex min-h-[44px] items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:hover:text-neutral-950'
          >
            <FiMail aria-hidden='true' />
            Email me
          </Link>
          <Link
            href='https://github.com/parothegreat'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex min-h-[44px] items-center gap-2 rounded-md border border-neutral-300 px-4 text-sm font-medium text-neutral-800 hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-600'
          >
            <FiGithub aria-hidden='true' />
            View GitHub
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
