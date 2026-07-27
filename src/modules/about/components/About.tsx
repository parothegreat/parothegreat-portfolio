import Image from 'next/image';
import Link from 'next/link';
import { FiChevronDown, FiFileText, FiMail } from 'react-icons/fi';

import { EDUCATION } from '@/data/education';
import { EXPERIENCE } from '@/data/experience';
import {
  PROFILE,
  WORKING_PRINCIPLES,
} from '@/data/profile';

const formatMonth = (value: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}-01T00:00:00Z`));

const About = () => {
  const quickFacts = [
    PROFILE.location,
    'Industrial Electronics Engineering',
    'DevOps, Systems, Security',
    'Primary environment: Linux',
    'Open to junior opportunities',
  ];

  return (
    <div className='space-y-16'>
      <section
        id='intro'
        aria-labelledby='about-intro-heading'
        className='grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]'
      >
        <div>
          <Image
            src={PROFILE.profileImage}
            alt={`${PROFILE.name} portrait`}
            width={240}
            height={300}
            className='aspect-[4/5] w-full max-w-[240px] rounded-lg object-cover object-top'
            priority
          />
          <ul className='mt-6 border-y border-neutral-200 py-2 dark:border-neutral-800'>
            {quickFacts.map((fact) => (
              <li
                key={fact}
                className='border-b border-neutral-200 py-3 text-sm leading-5 text-neutral-600 last:border-b-0 dark:border-neutral-800 dark:text-neutral-400'
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className='font-code text-xs font-medium uppercase text-blue-600 dark:text-blue-400'>
            Introduction
          </p>
          <h2
            id='about-intro-heading'
            className='mt-3 text-2xl font-medium leading-tight text-neutral-950 dark:text-neutral-100'
          >
            Practical systems, built with operational context.
          </h2>
          <div className='mt-6 space-y-5 text-base leading-7 text-neutral-700 dark:text-neutral-300'>
            <p>
              I&apos;m {PROFILE.fullName}, also known online as{' '}
              <span className='font-medium'>@{PROFILE.username}</span>. I study
              Industrial Electronics Engineering in Bekasi and focus on system
              administration, DevOps, networking, backend services, and
              cybersecurity.
            </p>
            <p>
              My work sits around Linux infrastructure, network fundamentals,
              automation, operational APIs, and controlled security testing. I
              prefer systems that are understandable, observable, and
              repairable under real constraints.
            </p>
            <p>
              At IT Mitra Industri Vocational High School, I contribute to
              infrastructure, networking, backend, network security, and DevOps
              work. My internship at Denso Manufacturing added practical
              experience with network monitoring, troubleshooting, and daily IT
              operations.
            </p>
            <p>
              I&apos;m looking for junior opportunities where I can keep
              learning while contributing to infrastructure, operations,
              backend, or security work.
            </p>
          </div>
          <blockquote className='mt-8 border-l-2 border-blue-600 pl-5 text-lg leading-8 text-neutral-800 dark:border-blue-400 dark:text-neutral-200'>
            Infrastructure only becomes useful when it is understandable,
            observable, and defensible.
          </blockquote>
        </div>
      </section>

      <section aria-labelledby='principles-heading'>
        <p className='font-code text-xs font-medium uppercase text-blue-600 dark:text-blue-400'>
          Working principles
        </p>
        <h2
          id='principles-heading'
          className='mt-3 text-2xl font-medium text-neutral-950 dark:text-neutral-100'
        >
          How I approach technical work
        </h2>
        <ol className='mt-7 grid gap-x-10 md:grid-cols-2'>
          {WORKING_PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className='grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-t border-neutral-200 py-6 dark:border-neutral-800'
            >
              <span className='font-code text-xs text-blue-600 dark:text-blue-400'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className='font-medium text-neutral-950 dark:text-neutral-100'>
                  {principle.title}
                </h3>
                <p className='mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
                  {principle.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id='experience' aria-labelledby='experience-heading'>
        <p className='font-code text-xs font-medium uppercase text-blue-600 dark:text-blue-400'>
          Experience
        </p>
        <h2
          id='experience-heading'
          className='mt-3 text-2xl font-medium text-neutral-950 dark:text-neutral-100'
        >
          Roles and operational context
        </h2>
        <ol className='mt-8 ml-3 border-l border-neutral-300 dark:border-neutral-700'>
          {EXPERIENCE.map((item) => (
            <li key={item.id} className='relative pb-10 pl-8 last:pb-0'>
              <span
                aria-hidden='true'
                className='absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full bg-blue-600 ring-4 ring-[var(--background)] dark:bg-blue-400'
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
                      <h3 className='font-medium text-neutral-950 dark:text-neutral-100'>
                        {item.role}
                      </h3>
                      <p className='mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
                        {item.organization}
                      </p>
                    </div>
                  </div>
                  <p className='shrink-0 font-code text-xs leading-5 text-neutral-500'>
                    {formatMonth(item.startDate)} –{' '}
                    {item.endDate ? formatMonth(item.endDate) : 'Present'}
                  </p>
                </div>

                <p className='mt-4 text-sm text-neutral-500'>
                  {item.type[0].toUpperCase() + item.type.slice(1)} ·{' '}
                  {item.workMode
                    ? item.workMode[0].toUpperCase() + item.workMode.slice(1)
                    : ''}
                  {' · '}
                  {item.location}
                </p>
                {item.technologies?.length ? (
                  <p className='mt-3 font-code text-[11px] leading-5 text-neutral-500'>
                    {item.technologies.join(' · ')}
                  </p>
                ) : null}
                <details className='group mt-4'>
                  <summary className='flex min-h-[44px] w-fit cursor-pointer list-none items-center gap-2 text-sm font-medium text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400'>
                    Responsibilities
                    <FiChevronDown
                      aria-hidden='true'
                      className='transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none'
                    />
                  </summary>
                  <ul className='mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
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
        <p className='font-code text-xs font-medium uppercase text-blue-600 dark:text-blue-400'>
          Education
        </p>
        <h2
          id='education-heading'
          className='mt-3 text-2xl font-medium text-neutral-950 dark:text-neutral-100'
        >
          Technical foundation
        </h2>
        <ol className='mt-8 border-y border-neutral-200 dark:border-neutral-800'>
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
                    className='font-medium text-neutral-950 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-neutral-100 dark:hover:text-blue-400'
                  >
                    {item.school}
                  </Link>
                ) : (
                  <h3 className='font-medium'>{item.school}</h3>
                )}
                <p className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                  {item.program}
                </p>
              </div>
              <p className='font-code text-xs leading-5 text-neutral-500'>
                {item.startYear} – {item.endYear ?? 'Present'}
                <br />
                {item.location}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className='grid gap-8 border-t border-neutral-200 pt-10 dark:border-neutral-800 sm:grid-cols-2'>
        <div>
          <p className='font-code text-xs font-medium uppercase text-neutral-500'>
            Resume
          </p>
          <h2 className='mt-3 text-xl font-medium text-neutral-950 dark:text-neutral-100'>
            Resume available on request
          </h2>
          <p className='mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
            No public PDF is currently published, so there is no download link
            that can become stale.
          </p>
          <Link
            href='mailto:alvaroprayogo38@gmail.com?subject=Resume%20Request'
            className='mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-md border border-neutral-300 px-4 text-sm font-medium text-neutral-800 hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-600'
          >
            <FiFileText aria-hidden='true' />
            Request resume
          </Link>
        </div>
        <div>
          <p className='font-code text-xs font-medium uppercase text-neutral-500'>
            Next step
          </p>
          <h2 className='mt-3 text-xl font-medium text-neutral-950 dark:text-neutral-100'>
            Discuss a technical opportunity
          </h2>
          <p className='mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
            I&apos;m open to junior infrastructure, DevOps, system
            administration, backend, and security opportunities.
          </p>
          <Link
            href='/contact'
            className='mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:hover:text-neutral-950'
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
