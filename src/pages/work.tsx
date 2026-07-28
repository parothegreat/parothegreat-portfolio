import { NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';

import { DOCUMENTATION_LEVEL_LABELS, WORK_ITEMS } from '@/data/work';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import WorkExplorer from '@/modules/work';

const WorkPage: NextPage = () => {
  const documentationCounts = WORK_ITEMS.reduce(
    (counts, item) => {
      counts[item.documentationLevel] += 1;
      return counts;
    },
    {
      'quick-brief': 0,
      'case-study': 0,
      'deep-dive': 0,
    },
  );

  return (
    <>
      <NextSeo
        title='Work - Alvaro Prayogo'
        description='Selected systems, infrastructure work, backend services, security tooling, and technical experiments by Alvaro Prayogo.'
        canonical='https://parothegreat.site/work'
      />
      <Container>
        <PageHeading
          eyebrow='Work index'
          title='Explore the systems behind the work'
          description='Infrastructure, backend services, security workflows, networks, and IoT projects documented through real operating context.'
          action={
            <Link
              href='https://github.com/parothegreat'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--text-secondary)] outline-none hover:text-[var(--circuit-500)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
            >
              <FiGithub aria-hidden='true' />
              Public repositories
              <FiArrowUpRight aria-hidden='true' />
            </Link>
          }
        />

        <dl className='mb-10 grid grid-cols-3 border-y border-[var(--line-default)]'>
          <div className='border-r border-[var(--line-default)] px-3 py-4 sm:px-5'>
            <dt className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
              Systems
            </dt>
            <dd className='mt-2 text-lg font-medium text-[var(--text-primary)]'>
              {WORK_ITEMS.length}
            </dd>
          </div>
          <div className='border-r border-[var(--line-default)] px-3 py-4 sm:px-5'>
            <dt className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
              Case studies
            </dt>
            <dd className='mt-2 text-lg font-medium text-[var(--text-primary)]'>
              {documentationCounts['case-study']}
            </dd>
          </div>
          <div className='px-3 py-4 sm:px-5'>
            <dt className='font-code text-[10px] uppercase text-[var(--text-tertiary)]'>
              Briefs
            </dt>
            <dd
              className='mt-2 text-lg font-medium text-[var(--text-primary)]'
              title={DOCUMENTATION_LEVEL_LABELS['quick-brief']}
            >
              {documentationCounts['quick-brief']}
            </dd>
          </div>
        </dl>

        <WorkExplorer items={WORK_ITEMS} />
      </Container>
    </>
  );
};

export default WorkPage;
