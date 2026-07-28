import Link from 'next/link';
import { CSSProperties } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
} from 'react-icons/fi';

import {
  DOCUMENTATION_LEVEL_LABELS,
  WORK_ACCENT_COLORS,
  WORK_STATUS_LABELS,
  WorkItem,
} from '@/data/work';

import ArchitectureExplorer, { ArchitectureMap } from './ArchitectureExplorer';

interface CaseStudyProps {
  project: WorkItem;
  previous?: WorkItem;
  next?: WorkItem;
}

const CHAPTERS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'build', label: 'Build' },
  { id: 'operations', label: 'Operations' },
  { id: 'security', label: 'Security' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'lessons', label: 'Lessons' },
] as const;

const CaseStudy = ({ project, previous, next }: CaseStudyProps) => {
  const accent = WORK_ACCENT_COLORS[project.accent];
  const context = project.sections.find((section) => section.id === 'context');
  const problem = project.sections.find((section) => section.id === 'problem');
  const build = project.sections.find((section) => section.id === 'build');

  return (
    <article className='pb-20'>
      <Link
        href='/work'
        className='inline-flex min-h-[44px] items-center gap-2 text-sm text-[var(--text-secondary)] outline-none hover:text-[var(--circuit-500)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
      >
        <FiArrowLeft aria-hidden='true' />
        Work index
      </Link>

      <div
        id='overview'
        className='instrument-surface mt-5 scroll-mt-24 overflow-hidden rounded-lg'
        style={{ '--project-accent': accent } as CSSProperties}
      >
        <div className='grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.82fr)]'>
          <header className='p-6 sm:p-8 lg:p-10'>
            <p className='signal-label'>
              {`${String(project.index).padStart(2, '0')} / ${project.category}`}
            </p>
            <h1 className='mt-4 text-3xl font-medium leading-tight text-[var(--text-primary)] sm:text-5xl'>
              {project.title}
            </h1>
            <p className='mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8'>
              {project.outcome}
            </p>

            <dl className='mt-8 grid gap-4 border-t border-[var(--line-default)] pt-6 sm:grid-cols-2'>
              <div>
                <dt className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                  Status
                </dt>
                <dd className='mt-2 inline-flex items-center gap-2 text-sm text-[var(--text-primary)]'>
                  <span
                    aria-hidden='true'
                    className='h-2 w-2 rounded-sm'
                    style={{ backgroundColor: accent }}
                  />
                  {WORK_STATUS_LABELS[project.status]}
                </dd>
              </div>
              <div>
                <dt className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                  Documentation
                </dt>
                <dd className='mt-2 text-sm text-[var(--text-primary)]'>
                  {DOCUMENTATION_LEVEL_LABELS[project.documentationLevel]}
                </dd>
              </div>
              <div>
                <dt className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                  Role
                </dt>
                <dd className='mt-2 text-sm text-[var(--text-primary)]'>
                  {project.role.join(' / ')}
                </dd>
              </div>
              <div>
                <dt className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                  Environment
                </dt>
                <dd className='mt-2 text-sm leading-6 text-[var(--text-primary)]'>
                  {project.environment.join(' · ')}
                </dd>
              </div>
            </dl>

            <p className='mt-6 break-words font-code text-[11px] leading-5 text-[var(--text-tertiary)]'>
              {project.stack.join(' · ')}
            </p>
            {project.liveUrl || project.repositoryUrl ? (
              <div className='mt-6 flex flex-wrap gap-3'>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--circuit-500)] px-4 text-sm font-medium text-[var(--bg-void)] outline-none hover:bg-[var(--circuit-400)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
                  >
                    Live site
                    <FiArrowUpRight aria-hidden='true' />
                  </a>
                ) : null}
                {project.repositoryUrl ? (
                  <a
                    href={project.repositoryUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[var(--line-strong)] px-4 text-sm font-medium text-[var(--text-primary)] outline-none hover:bg-[var(--surface-2)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
                  >
                    GitHub repository
                    <FiArrowUpRight aria-hidden='true' />
                  </a>
                ) : null}
              </div>
            ) : null}
          </header>

          <div className='relative min-h-[260px] border-t border-[var(--line-default)] bg-[var(--bg-layer)] lg:border-l lg:border-t-0'>
            <span
              aria-hidden='true'
              className='absolute inset-x-0 top-0 z-10 h-0.5'
              style={{ backgroundColor: accent }}
            />
            <ArchitectureMap
              accent={accent}
              architecture={project.architecture}
              variant='preview'
            />
          </div>
        </div>
      </div>

      <nav
        aria-label='Case study chapters'
        className='sticky top-16 z-20 -mx-5 mt-8 overflow-x-auto border-y border-[var(--line-default)] bg-[var(--background)] px-5 scrollbar-hide sm:-mx-8 sm:px-8 lg:top-0 lg:mx-0 lg:px-0'
      >
        <div className='flex w-max min-w-full'>
          {CHAPTERS.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className='inline-flex min-h-[48px] shrink-0 items-center border-b-2 border-transparent px-3 font-code text-[11px] uppercase text-[var(--text-tertiary)] outline-none transition-colors hover:border-[var(--circuit-500)] hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)] motion-reduce:transition-none'
            >
              {chapter.label}
            </a>
          ))}
        </div>
      </nav>

      {context ? (
        <section
          className='scroll-mt-24 py-16'
          aria-labelledby='context-heading'
        >
          <div className='grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]'>
            <div>
              <p className='signal-label'>{context.eyebrow}</p>
              <h2
                id='context-heading'
                className='mt-3 text-2xl font-medium text-[var(--text-primary)]'
              >
                Project context
              </h2>
            </div>
            <div>
              <h3 className='max-w-2xl text-2xl font-medium leading-snug text-[var(--text-primary)] sm:text-3xl'>
                {context.title}
              </h3>
              <div className='mt-5 max-w-3xl space-y-4 text-base leading-7 text-[var(--text-secondary)]'>
                {context.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {context.points?.length ? (
                <ul className='mt-7 grid gap-3 sm:grid-cols-2'>
                  {context.points.map((point) => (
                    <li
                      key={point}
                      className='flex gap-3 border-t border-[var(--line-soft)] pt-3 text-sm leading-6 text-[var(--text-secondary)]'
                    >
                      <FiCheck
                        aria-hidden='true'
                        className='mt-1 shrink-0 text-[var(--telemetry-500)]'
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {problem ? (
        <section
          id='problem'
          className='scroll-mt-24 border-y border-[var(--line-default)] py-16'
          aria-labelledby='problem-heading'
        >
          <p className='signal-label'>{problem.eyebrow}</p>
          <div className='mt-3 grid gap-6 lg:grid-cols-2 lg:gap-12'>
            <h2
              id='problem-heading'
              className='text-2xl font-medium leading-snug text-[var(--text-primary)] sm:text-3xl'
            >
              {problem.title}
            </h2>
            <div className='space-y-4 text-base leading-7 text-[var(--text-secondary)]'>
              {problem.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className='scroll-mt-24 py-16'
        aria-labelledby='responsibility-heading'
      >
        <p className='signal-label'>Responsibility</p>
        <h2
          id='responsibility-heading'
          className='mt-3 text-2xl font-medium text-[var(--text-primary)] sm:text-3xl'
        >
          Ownership and operating boundaries
        </h2>
        <div className='mt-8 grid gap-8 md:grid-cols-3'>
          {[
            { label: 'Owned', items: project.ownership.owned },
            {
              label: 'Contributed',
              items: project.ownership.contributed,
            },
            {
              label: 'Boundaries',
              items: project.ownership.boundaries,
            },
          ].map((group) => (
            <div
              key={group.label}
              className='border-t border-[var(--line-default)] pt-4'
            >
              <h3 className='font-code text-xs uppercase text-[var(--text-tertiary)]'>
                {group.label}
              </h3>
              <ul className='mt-4 space-y-3'>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className='text-sm leading-6 text-[var(--text-secondary)]'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <ArchitectureExplorer project={project} />

      {build ? (
        <section
          id='build'
          className='scroll-mt-24 py-16'
          aria-labelledby='build-heading'
        >
          <div className='grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'>
            <div>
              <p className='signal-label'>{build.eyebrow}</p>
              <h2
                id='build-heading'
                className='mt-3 text-2xl font-medium leading-snug text-[var(--text-primary)] sm:text-3xl'
              >
                {build.title}
              </h2>
            </div>
            <div className='space-y-4 text-base leading-7 text-[var(--text-secondary)]'>
              {build.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className='mt-12'>
            <p className='font-code text-xs uppercase text-[var(--signal-500)]'>
              Decision log
            </p>
            <div className='mt-4 border-t border-[var(--line-default)]'>
              {project.decisions.map((decision, index) => (
                <article
                  key={decision.title}
                  className='grid gap-5 border-b border-[var(--line-default)] py-7 lg:grid-cols-[42px_minmax(0,0.8fr)_minmax(0,1fr)]'
                >
                  <span className='font-code text-[10px] text-[var(--text-tertiary)]'>
                    D{String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className='font-medium text-[var(--text-primary)]'>
                      {decision.title}
                    </h3>
                    <p className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
                      {decision.why}
                    </p>
                  </div>
                  <div>
                    <p className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                      Trade-off
                    </p>
                    <p className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
                      {decision.tradeOff}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className='border-y border-[var(--line-default)] py-16'
        aria-labelledby='timeline-heading'
      >
        <p className='signal-label'>Build timeline</p>
        <h2
          id='timeline-heading'
          className='mt-3 text-2xl font-medium text-[var(--text-primary)] sm:text-3xl'
        >
          From problem to current state
        </h2>
        <ol className='ml-2 mt-8 border-l border-[var(--line-strong)]'>
          {project.timeline.map((item) => (
            <li key={item.title} className='relative pb-8 pl-7 last:pb-0'>
              <span
                aria-hidden='true'
                className='absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full ring-4 ring-[var(--background)]'
                style={{
                  backgroundColor:
                    item.state === 'issue'
                      ? 'var(--signal-500)'
                      : item.state === 'current'
                        ? 'var(--telemetry-500)'
                        : accent,
                }}
              />
              <p className='font-medium text-[var(--text-primary)]'>
                {item.title}
              </p>
              <p className='mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]'>
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <div className='grid gap-16 py-16 lg:grid-cols-2 lg:gap-12'>
        <section
          id='operations'
          className='scroll-mt-24'
          aria-labelledby='operations-heading'
        >
          <p className='signal-label'>Operational view</p>
          <h2
            id='operations-heading'
            className='mt-3 text-2xl font-medium text-[var(--text-primary)]'
          >
            How the system is operated
          </h2>
          <dl className='mt-7 border-t border-[var(--line-default)]'>
            {project.operations.map((fact) => (
              <div
                key={fact.label}
                className='border-b border-[var(--line-default)] py-4'
              >
                <dt className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                  {fact.label}
                </dt>
                <dd className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          id='security'
          className='scroll-mt-24'
          aria-labelledby='security-heading'
        >
          <p className='font-code text-xs font-medium uppercase text-[var(--signal-500)]'>
            Security view
          </p>
          <h2
            id='security-heading'
            className='mt-3 text-2xl font-medium text-[var(--text-primary)]'
          >
            Real controls and known assumptions
          </h2>
          <dl className='mt-7 border-t border-[var(--line-default)]'>
            {project.security.map((fact) => (
              <div
                key={fact.label}
                className='border-b border-[var(--line-default)] py-4'
              >
                <dt className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                  {fact.label}
                </dt>
                <dd className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section
        id='evidence'
        className='scroll-mt-24 border-y border-[var(--line-default)] py-16'
        aria-labelledby='evidence-heading'
      >
        <p className='signal-label'>Evidence</p>
        <h2
          id='evidence-heading'
          className='mt-3 text-2xl font-medium text-[var(--text-primary)] sm:text-3xl'
        >
          Published technical artifacts
        </h2>
        <div className='mt-8 grid gap-4 sm:grid-cols-2'>
          {project.evidence.map((item) => (
            <a
              key={item.id}
              href={item.source}
              className='instrument-surface group rounded-lg p-5 outline-none transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] motion-reduce:transform-none motion-reduce:transition-none'
            >
              <p className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                {item.type}
                {item.redacted ? ' · sanitized' : ''}
              </p>
              <h3 className='mt-3 font-medium text-[var(--text-primary)] group-hover:text-[var(--circuit-500)]'>
                {item.title}
              </h3>
              {item.description ? (
                <p className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
                  {item.description}
                </p>
              ) : null}
              <span className='mt-4 inline-flex items-center gap-2 text-sm text-[var(--circuit-500)]'>
                View artifact
                <FiArrowUpRight aria-hidden='true' />
              </span>
            </a>
          ))}
        </div>
        <p className='mt-5 max-w-2xl text-xs leading-5 text-[var(--text-tertiary)]'>
          Additional screenshots, logs, and configuration excerpts are added
          only after hostnames, addresses, credentials, and operational data
          have been sanitized.
        </p>
      </section>

      <section
        id='lessons'
        className='scroll-mt-24 py-16'
        aria-labelledby='lessons-heading'
      >
        <div className='grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]'>
          <div>
            <p className='signal-label'>Current state</p>
            <h2
              id='lessons-heading'
              className='mt-3 text-2xl font-medium text-[var(--text-primary)] sm:text-3xl'
            >
              Outcome and lessons
            </h2>
            <p className='mt-5 text-base leading-7 text-[var(--text-secondary)]'>
              {project.currentState}
            </p>
          </div>
          <ol className='border-t border-[var(--line-default)]'>
            {project.lessons.map((lesson, index) => (
              <li
                key={lesson}
                className='grid grid-cols-[34px_minmax(0,1fr)] gap-3 border-b border-[var(--line-default)] py-5'
              >
                <span className='font-code text-[10px] text-[var(--signal-500)]'>
                  L{index + 1}
                </span>
                <p className='text-sm leading-6 text-[var(--text-secondary)]'>
                  {lesson}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <nav
        aria-label='Project pagination'
        className='grid border-y border-[var(--line-default)] sm:grid-cols-2'
      >
        {previous ? (
          <Link
            href={`/work/${previous.slug}`}
            className='group min-h-[112px] border-b border-[var(--line-default)] p-5 outline-none hover:bg-[var(--surface-1)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)] sm:border-b-0 sm:border-r'
          >
            <span className='inline-flex items-center gap-2 font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
              <FiArrowLeft aria-hidden='true' />
              Previous
            </span>
            <span className='mt-3 block font-medium text-[var(--text-primary)] group-hover:text-[var(--circuit-500)]'>
              {previous.title}
            </span>
          </Link>
        ) : (
          <span className='hidden sm:block' />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className='group min-h-[112px] p-5 text-right outline-none hover:bg-[var(--surface-1)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]'
          >
            <span className='inline-flex items-center gap-2 font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
              Next
              <FiArrowRight aria-hidden='true' />
            </span>
            <span className='mt-3 block font-medium text-[var(--text-primary)] group-hover:text-[var(--circuit-500)]'>
              {next.title}
            </span>
          </Link>
        ) : (
          <Link
            href='/work'
            className='group min-h-[112px] p-5 text-right outline-none hover:bg-[var(--surface-1)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]'
          >
            <span className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
              Return
            </span>
            <span className='mt-3 block font-medium text-[var(--text-primary)] group-hover:text-[var(--circuit-500)]'>
              Work index
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
};

export default CaseStudy;
