import Image from 'next/image';
import Link from 'next/link';
import { FiChevronDown, FiFileText, FiMail } from 'react-icons/fi';

import { EDUCATION } from '@/data/education';
import { EXPERIENCE } from '@/data/experience';
import { PROFILE, WORKING_PRINCIPLES } from '@/data/profile';

const formatMonth = (value: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}-01T00:00:00Z`));

const About = () => {
  const quickFacts = [
    { label: 'Location', value: PROFILE.location },
    { label: 'Education', value: 'Industrial Electronics Engineering' },
    { label: 'Focus', value: 'DevOps, Systems, Security' },
    { label: 'Environment', value: 'Linux' },
    { label: 'Availability', value: 'Open to junior opportunities' },
  ];

  return (
    <div className='space-y-16'>
      <section
        id='intro'
        aria-labelledby='about-intro-heading'
        className='grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]'
      >
        <aside>
          <p className='font-code text-xs font-medium uppercase text-[var(--text-primary)]'>
            At a glance
          </p>
          <dl className='mt-4 border-y border-[var(--line-default)]'>
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className='border-b border-[var(--line-default)] py-3 last:border-b-0'
              >
                <dt className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
                  {fact.label}
                </dt>
                <dd className='mt-1 text-sm leading-5 text-[var(--text-secondary)]'>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>

        <div>
          <p className='signal-label'>Introduction</p>
          <h2
            id='about-intro-heading'
            className='mt-3 text-2xl font-medium leading-tight text-[var(--text-primary)]'
          >
            Practical systems, built with operational context.
          </h2>
          <div className='mt-6 space-y-5 text-base leading-7 text-[var(--text-secondary)]'>
            <p>
              I&apos;m {PROFILE.fullName}, also known online as{' '}
              <span className='font-medium'>@{PROFILE.username}</span>. I study
              Industrial Electronics Engineering in Bekasi and work across
              Linux, DevOps, networking, backend services, and cybersecurity.
            </p>
            <p>
              My school work covers infrastructure, network operations, backend
              systems, and DevOps. An internship at Denso Manufacturing added
              practical experience in monitoring, troubleshooting, and daily IT
              operations.
            </p>
            <p>
              I prefer systems that are understandable, observable, and
              repairable under real constraints, and I&apos;m looking for junior
              opportunities where I can keep building that discipline.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby='principles-heading'>
        <p className='signal-label'>Working principles</p>
        <h2
          id='principles-heading'
          className='mt-3 text-2xl font-medium text-[var(--text-primary)]'
        >
          How I approach technical work
        </h2>
        <ol className='mt-7 grid gap-x-10 md:grid-cols-2'>
          {WORKING_PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className='grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-t border-[var(--line-default)] py-6'
            >
              <span className='font-code text-xs text-[var(--circuit-500)]'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className='font-medium text-[var(--text-primary)]'>
                  {principle.title}
                </h3>
                <p className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
                  {principle.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id='experience' aria-labelledby='experience-heading'>
        <p className='signal-label'>Experience</p>
        <h2
          id='experience-heading'
          className='mt-3 text-2xl font-medium text-[var(--text-primary)]'
        >
          Roles and operational context
        </h2>
        <ol className='ml-3 mt-8 border-l border-[var(--line-strong)]'>
          {EXPERIENCE.map((item) => (
            <li key={item.id} className='relative pb-10 pl-8 last:pb-0'>
              <span
                aria-hidden='true'
                className='absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full bg-[var(--signal-500)] ring-4 ring-[var(--background)]'
              />
              <article>
                <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                  <div className='flex min-w-0 items-start gap-4'>
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={`${item.organization} logo`}
                        width={48}
                        height={48}
                        className='h-12 w-12 shrink-0 rounded-md bg-white object-contain p-1'
                      />
                    ) : null}
                    <div className='min-w-0'>
                      <h3 className='font-medium text-[var(--text-primary)]'>
                        {item.role}
                      </h3>
                      <p className='mt-1 text-sm leading-6 text-[var(--text-secondary)]'>
                        {item.organization}
                      </p>
                    </div>
                  </div>
                  <p className='shrink-0 font-code text-xs leading-5 text-[var(--text-tertiary)]'>
                    {formatMonth(item.startDate)} –{' '}
                    {item.endDate ? formatMonth(item.endDate) : 'Present'}
                  </p>
                </div>

                <p className='mt-4 text-sm text-[var(--text-tertiary)]'>
                  {item.type[0].toUpperCase() + item.type.slice(1)} ·{' '}
                  {item.workMode
                    ? item.workMode[0].toUpperCase() + item.workMode.slice(1)
                    : ''}
                  {' · '}
                  {item.location}
                </p>
                {item.technologies?.length ? (
                  <p className='mt-3 font-code text-[11px] leading-5 text-[var(--text-tertiary)]'>
                    {item.technologies.join(' · ')}
                  </p>
                ) : null}
                <details className='group mt-4'>
                  <summary className='flex min-h-[44px] w-fit cursor-pointer list-none items-center gap-2 text-sm font-medium text-[var(--circuit-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'>
                    Responsibilities
                    <FiChevronDown
                      aria-hidden='true'
                      className='transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none'
                    />
                  </summary>
                  <ul className='mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--text-secondary)]'>
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </details>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section id='education' aria-labelledby='education-heading'>
        <p className='signal-label'>Education</p>
        <h2
          id='education-heading'
          className='mt-3 text-2xl font-medium text-[var(--text-primary)]'
        >
          Technical foundation
        </h2>
        <ol className='mt-8 border-y border-[var(--line-default)]'>
          {EDUCATION.map((item) => (
            <li
              key={item.id}
              className='flex flex-col gap-4 py-6 sm:flex-row sm:items-center'
            >
              {item.logo ? (
                <Image
                  src={item.logo}
                  alt={`${item.school} logo`}
                  width={56}
                  height={56}
                  className='h-14 w-14 shrink-0 rounded-md bg-white object-contain p-1'
                />
              ) : null}
              <div className='min-w-0 flex-1'>
                {item.schoolUrl ? (
                  <Link
                    href={item.schoolUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-medium text-[var(--text-primary)] hover:text-[var(--circuit-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
                  >
                    {item.school}
                  </Link>
                ) : (
                  <h3 className='font-medium'>{item.school}</h3>
                )}
                <p className='mt-1 text-sm text-[var(--text-secondary)]'>
                  {item.program}
                </p>
              </div>
              <p className='font-code text-xs leading-5 text-[var(--text-tertiary)]'>
                {item.startYear} – {item.endYear ?? 'Present'}
                <br />
                {item.location}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className='grid gap-8 border-t border-[var(--line-default)] pt-10 sm:grid-cols-2'>
        <div>
          <p className='font-code text-xs font-medium uppercase text-[var(--text-tertiary)]'>
            Resume
          </p>
          <h2 className='mt-3 text-xl font-medium text-[var(--text-primary)]'>
            Resume available on request
          </h2>
          <p className='mt-3 text-sm leading-6 text-[var(--text-secondary)]'>
            No public PDF is currently published, so there is no download link
            that can become stale.
          </p>
          <Link
            href='mailto:alvaroprayogo38@gmail.com?subject=Resume%20Request'
            className='mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[var(--line-default)] px-4 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--line-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
          >
            <FiFileText aria-hidden='true' />
            Request resume
          </Link>
        </div>
        <div>
          <p className='font-code text-xs font-medium uppercase text-[var(--text-tertiary)]'>
            Next step
          </p>
          <h2 className='mt-3 text-xl font-medium text-[var(--text-primary)]'>
            Discuss a technical opportunity
          </h2>
          <p className='mt-3 text-sm leading-6 text-[var(--text-secondary)]'>
            I&apos;m open to junior infrastructure, DevOps, system
            administration, backend, and security opportunities.
          </p>
          <Link
            href='/contact'
            className='mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--circuit-500)] px-4 text-sm font-medium text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]'
          >
            <FiMail aria-hidden='true' />
            Contact me
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
