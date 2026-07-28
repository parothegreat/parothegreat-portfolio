import Image from 'next/image';
import Link from 'next/link';
import {
  FiArrowRight,
  FiCheckCircle,
  FiCloud,
  FiCode,
  FiCpu,
  FiGitBranch,
  FiGithub,
  FiMail,
  FiShield,
  FiWifi,
} from 'react-icons/fi';

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
import WorkExplorer from '@/modules/work/components/WorkExplorer';

const CORE_TOOLS = TOOLS.filter((tool) => tool.featured).slice(0, 12);
const CAPABILITY_ICONS = {
  infrastructure: FiCloud,
  devops: FiGitBranch,
  networking: FiWifi,
  backend: FiCode,
  security: FiShield,
  iot: FiCpu,
} as const;

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
    <p className='signal-label'>{eyebrow}</p>
    <h2 className='mt-3 text-2xl font-medium leading-tight text-[var(--text-primary)] sm:text-3xl'>
      {title}
    </h2>
    {description ? (
      <p className='mt-3 text-base leading-7 text-[var(--text-secondary)]'>
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
        className='relative lg:grid lg:grid-cols-[minmax(0,1.2fr)_340px] lg:items-start lg:gap-12'
      >
        <div className='border-l-2 border-[var(--line-strong)] pl-5 sm:pl-7'>
          <p className='signal-label'>Systems / GMT+7</p>
          <h1
            id='home-heading'
            className='mt-4 text-4xl font-medium leading-[1.12] text-[var(--text-primary)] sm:text-5xl lg:text-[52px]'
          >
            {PROFILE.headline}
          </h1>
          <p className='mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8'>
            {PROFILE.shortBio}
          </p>
          <div className='mt-7 flex flex-col gap-3 min-[420px]:flex-row'>
            <Link
              href='/work'
              className='inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md bg-[var(--circuit-500)] px-5 text-sm font-medium text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] motion-reduce:transition-none'
            >
              View selected work
              <FiArrowRight aria-hidden='true' />
            </Link>
            <Link
              href='/about'
              className='inline-flex min-h-[46px] items-center justify-center rounded-md border border-[var(--line-default)] px-5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--line-strong)] hover:bg-[var(--surface-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] motion-reduce:transition-none'
            >
              About me
            </Link>
          </div>
          <p className='mt-6 flex items-start gap-2 text-sm leading-6 text-[var(--text-secondary)]'>
            <FiCheckCircle
              aria-hidden='true'
              className='mt-1 shrink-0 text-[var(--telemetry-500)]'
            />
            {PROFILE.availability}
          </p>
        </div>

        <aside
          aria-label='Profile and current status'
          className='mt-10 overflow-hidden rounded-md border border-[var(--line-default)] bg-[var(--surface-1)] lg:mt-0'
        >
          <div className='relative aspect-[5/4] border-b border-[var(--line-default)] bg-[var(--bg-layer)]'>
            <Image
              src={PROFILE.profileImage}
              alt={`${PROFILE.name} at Google for Developers`}
              fill
              sizes='(min-width: 1024px) 340px, (min-width: 640px) 50vw, calc(100vw - 40px)'
              className='object-cover object-top'
              fetchPriority='high'
              priority
            />
          </div>
          <div className='p-5'>
            <div className='flex items-center justify-between gap-4'>
              <p className='font-code text-xs font-medium uppercase text-[var(--text-primary)]'>
                Current status
              </p>
              <span className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                Profile / 01
              </span>
            </div>
            <dl className='mt-4 divide-y divide-[var(--line-soft)] border-t border-[var(--line-default)]'>
              {PROFILE_STATUS.map((item) => (
                <div
                  key={item.label}
                  className='grid grid-cols-[92px_minmax(0,1fr)] gap-3 py-3 text-sm last:pb-0'
                >
                  <dt className='text-[var(--text-tertiary)]'>{item.label}</dt>
                  <dd className='min-w-0 break-words text-[var(--text-primary)]'>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>

      <section aria-label='Practical experience'>
        <ul className='grid grid-cols-2 border-y border-[var(--line-default)] sm:grid-cols-4'>
          {PROOF_POINTS.map((point, index) => (
            <li
              key={point}
              className={`flex min-h-[88px] items-center px-3 py-4 text-sm leading-5 text-[var(--text-secondary)] sm:px-4 ${
                index % 2 === 0 ? 'border-r border-[var(--line-default)]' : ''
              } ${index < 2 ? 'border-b border-[var(--line-default)] sm:border-b-0' : ''} ${
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
            className='inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-medium text-[var(--circuit-500)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
          >
            View all work
            <FiArrowRight aria-hidden='true' />
          </Link>
        </div>
        <div className='mt-7'>
          <WorkExplorer items={FEATURED_WORK} compact />
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
          {CAPABILITIES.map((capability, index) => {
            const Icon =
              CAPABILITY_ICONS[capability.id as keyof typeof CAPABILITY_ICONS];

            return (
              <li
                key={capability.id}
                className='grid grid-cols-[40px_minmax(0,1fr)] gap-4 border-t border-[var(--line-default)] py-6'
              >
                <div className='flex flex-col items-center gap-2'>
                  <Icon
                    aria-hidden='true'
                    className={`h-5 w-5 ${
                      capability.id === 'iot'
                        ? 'text-[var(--signal-500)]'
                        : 'text-[var(--circuit-500)]'
                    }`}
                  />
                  <span className='font-code text-[10px] text-[var(--text-tertiary)]'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3 className='font-medium text-[var(--text-primary)]'>
                    {capability.title}
                  </h3>
                  <p className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
                    {capability.description}
                  </p>
                  <p className='mt-3 font-code text-[11px] leading-5 text-[var(--text-tertiary)]'>
                    Evidence: {capability.evidence}
                  </p>
                </div>
              </li>
            );
          })}
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
            className='inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-medium text-[var(--circuit-500)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
          >
            Explore full toolkit
            <FiArrowRight aria-hidden='true' />
          </Link>
        </div>
        <ul className='mt-7 grid grid-cols-2 border-y border-[var(--line-default)] sm:grid-cols-3 lg:grid-cols-4'>
          {CORE_TOOLS.map((tool) => (
            <li
              key={tool.id}
              className='flex min-h-[72px] min-w-0 items-center gap-3 border-b border-r border-[var(--line-default)] px-3 py-4 last:border-b-0 sm:px-4'
            >
              <ToolIcon name={tool.icon} />
              <div className='min-w-0'>
                <p className='truncate text-sm font-medium text-[var(--text-primary)]'>
                  {tool.name}
                </p>
                <p className='mt-1 truncate font-code text-[10px] text-[var(--text-tertiary)]'>
                  {tool.domain}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby='activity-preview-heading'
        className='grid gap-8 border-y border-[var(--line-default)] py-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'
      >
        <div id='activity-preview-heading'>
          <SectionHeader
            eyebrow='Current activity'
            title='Work in progress, with public evidence'
            description='Live WakaTime and GitHub summaries are available without loading those integrations on the Home page.'
          />
          <Link
            href='/activity'
            className='mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--circuit-500)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
          >
            View activity
            <FiArrowRight aria-hidden='true' />
          </Link>
        </div>
        <dl className='divide-y divide-[var(--line-default)]'>
          {CURRENT_FOCUS.map((item) => (
            <div
              key={item.label}
              className='grid grid-cols-[100px_minmax(0,1fr)] gap-4 py-4 first:pt-0 last:pb-0'
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

      <section
        aria-labelledby='home-contact-heading'
        className='grid gap-6 border-y border-[var(--line-default)] py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end'
      >
        <div>
          <p className='signal-label'>Contact</p>
          <h2
            id='home-contact-heading'
            className='mt-3 text-2xl font-medium text-[var(--text-primary)]'
          >
            Let&apos;s build something reliable.
          </h2>
          <p className='mt-3 max-w-2xl text-base leading-7 text-[var(--text-secondary)]'>
            Infrastructure, DevOps, backend, security, and technical
            collaboration.
          </p>
        </div>
        <div className='flex flex-wrap gap-3'>
          <Link
            href='mailto:alvaroprayogo38@gmail.com'
            className='inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--circuit-500)] px-4 text-sm font-medium text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-1)]'
          >
            <FiMail aria-hidden='true' />
            Email me
          </Link>
          <Link
            href='https://github.com/parothegreat'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[var(--line-default)] px-4 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--line-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
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
