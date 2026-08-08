import { NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { FiGithub } from 'react-icons/fi';

import { WORK_ITEMS } from '@/data/work';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import WorkList from '@/modules/work';

const WorkPage: NextPage = () => {
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
          title='Systems, infrastructure, and technical experiments'
          description='Selected systems, infrastructure work, backend services, security tooling, and technical experiments.'
        />

        <aside className='mb-10 border-l-2 border-blue-600 pl-4 dark:border-blue-400'>
          <h2 className='font-medium text-neutral-950 dark:text-neutral-100'>
            Case studies are being documented.
          </h2>
          <p className='mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-400'>
            The systems are real; the detailed write-ups are still in progress.
            Explore the work index or review the public repositories.
          </p>
          <Link
            href='https://github.com/parothegreat'
            target='_blank'
            rel='noopener noreferrer'
            className='mt-3 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400'
          >
            <FiGithub aria-hidden='true' />
            Review public repositories
          </Link>
        </aside>

        <WorkList items={WORK_ITEMS} />
      </Container>
    </>
  );
};

export default WorkPage;
