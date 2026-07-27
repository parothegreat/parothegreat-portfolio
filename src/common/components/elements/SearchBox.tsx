import { useContext } from 'react';
import { BiCommand as CommandIcon } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';

import { CommandPaletteContext } from '@/common/context/CommandPaletteContext';

const SearchBox = () => {
  const { setIsOpen } = useContext(CommandPaletteContext);

  const handleOpenCommandPalette = () => setIsOpen(true);

  return (
    <button
      type='button'
      onClick={handleOpenCommandPalette}
      className='flex min-h-[44px] w-full items-center gap-3 rounded-md border border-neutral-300 bg-neutral-50 px-3 text-left text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 motion-reduce:transition-none dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600 dark:hover:text-neutral-200'
    >
      <FiSearch aria-hidden='true' className='h-5 w-5 shrink-0' />
      <span className='w-full text-sm'>
        Search
      </span>
      <span className='flex items-center gap-0.5 rounded bg-neutral-200 px-1.5 py-0.5 text-xs dark:bg-neutral-800'>
        <CommandIcon aria-hidden='true' className='mt-0.5' />
        <span>k</span>
      </span>
    </button>
  );
};

export default SearchBox;
