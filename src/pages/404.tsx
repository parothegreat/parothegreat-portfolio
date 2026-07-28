import { NextPage } from 'next';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

import Container from '@/common/components/elements/Container';

const Custom404: NextPage = () => {
  return (
    <Container className='flex min-h-[75vh] items-center'>
      <div className='max-w-xl border-l-2 border-[var(--signal-500)] pl-6 sm:pl-8'>
        <p className='font-code text-xs uppercase text-[var(--signal-500)]'>
          Signal lost / 404
        </p>
        <h1 className='mt-4 text-4xl font-medium text-[var(--text-primary)] sm:text-5xl'>
          This route is not connected.
        </h1>
        <p className='mt-5 text-base leading-7 text-[var(--text-secondary)]'>
          The page may have moved, or the address does not match an active
          route.
        </p>
        <Link
          href='/'
          className='mt-7 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--circuit-500)] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
        >
          <FiArrowLeft aria-hidden='true' />
          Return home
        </Link>
      </div>
    </Container>
  );
};

export default Custom404;
