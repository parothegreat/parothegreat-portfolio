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
        {eyebrow ? <p className='signal-label mb-3'>{eyebrow}</p> : null}
        <h1 className='text-[28px] font-medium leading-tight text-[var(--text-primary)] sm:text-4xl'>
          {title}
        </h1>
        {description ? (
          <p className='mt-4 text-base leading-7 text-[var(--text-secondary)]'>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className='shrink-0'>{action}</div> : null}
    </header>
  );
};

export default PageHeading;
