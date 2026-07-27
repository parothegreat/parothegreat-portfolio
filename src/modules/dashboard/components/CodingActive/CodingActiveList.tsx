import clsx from 'clsx';
import { useState } from 'react';

import Progress from './Progress';

interface ItemProps {
  name: string;
  percent?: number;
}

interface CodingActiveListProps {
  data?: {
    languages?: ItemProps[];
    categories?: ItemProps[];
  };
}

const CodingActiveList = ({ data }: CodingActiveListProps) => {
  const [activePanel, setActivePanel] = useState('Languages');
  const categories = data?.categories ?? [];
  const codingCategoryNames = ['AI Coding', 'Coding'];
  const visibleCategories = [
    {
      name: 'Total Coding',
      percent: categories
        .filter((item) => codingCategoryNames.includes(item.name))
        .reduce((total, item) => total + (item.percent ?? 0), 0),
    },
    ...categories.filter((item) => !codingCategoryNames.includes(item.name)),
  ];

  const actives = [
    {
      title: 'Languages',
      data: data?.languages?.filter(({ percent = 0 }) => Math.round(percent)),
    },
    {
      title: 'Categories',
      data: visibleCategories.filter(({ percent = 0 }) => Math.round(percent)),
    },
  ];

  if (!data) {
    return null;
  }

  return (
    <div className='mt-10'>
      <div
        className='mb-6 grid grid-cols-2 gap-1 rounded-md bg-neutral-100 p-1 dark:bg-neutral-900 sm:hidden'
        role='group'
        aria-label='Coding statistics breakdown'
      >
        {actives.map((item) => {
          const isActive = activePanel === item.title;

          return (
            <button
              key={item.title}
              type='button'
              aria-pressed={isActive}
              onClick={() => setActivePanel(item.title)}
              className={clsx(
                'min-h-[44px] rounded-md px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 motion-reduce:transition-none',
                isActive
                  ? 'bg-white text-neutral-950 shadow-sm dark:bg-neutral-800 dark:text-white'
                  : 'text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800',
              )}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div className='grid gap-10 sm:grid-cols-2 sm:gap-8'>
        {actives.map((item) => (
          <section
            key={item.title}
            aria-label={`${item.title} breakdown`}
            className={clsx(
              'min-w-0 border-t border-neutral-200 pt-5 dark:border-neutral-800',
              activePanel === item.title ? 'block' : 'hidden sm:block',
            )}
          >
            <h3 className='text-base font-medium text-neutral-950 dark:text-neutral-100'>
              {item.title}
            </h3>

            {item.data?.length ? (
              <ul className='mt-5 flex flex-col gap-4'>
                {item.data.map((subItem) => (
                  <li key={subItem.name}>
                    <Progress data={subItem} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className='mt-4 text-sm text-neutral-500'>
                No breakdown data available.
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default CodingActiveList;
