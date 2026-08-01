import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const ThemeToggleButton = ({ showLabel = false }: { showLabel?: boolean }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () =>
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type='button'
      aria-label={label}
      className={`flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-neutral-300 text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 motion-reduce:transition-none dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100 ${
        showLabel ? 'w-full px-3' : 'w-11'
      }`}
      onClick={toggleTheme}
      title={label}
    >
      {isDark ? (
        <FiSun aria-hidden='true' className='h-5 w-5' />
      ) : (
        <FiMoon aria-hidden='true' className='h-5 w-5' />
      )}
      {showLabel ? <span className='text-sm'>{label}</span> : null}
    </button>
  );
};

export default ThemeToggleButton;
