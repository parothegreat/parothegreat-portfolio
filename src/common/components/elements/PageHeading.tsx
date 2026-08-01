import { ReactNode } from 'react';

interface PageHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: ReactNode;
}

const PageHeading = ({
  title,
  description,
  eyebrow,
  action,
}: PageHeadingProps) => {
  return (
    <header className='mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end'>
      <div className='max-w-2xl'>
        {eyebrow ? (
          <p className='mb-3 font-code text-xs font-medium uppercase text-blue-600 dark:text-blue-400'>
            {eyebrow}
          </p>
        ) : null}
        <h1 className='text-[28px] font-medium leading-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl'>
          {title}
        </h1>
        {description ? (
          <p className='mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400'>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className='shrink-0'>{action}</div> : null}
    </header>
  );
};

export default PageHeading;
