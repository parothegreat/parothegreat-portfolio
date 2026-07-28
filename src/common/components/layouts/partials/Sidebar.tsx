import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useContext, useEffect, useState } from 'react';
import { FiMoon, FiSearch, FiSun } from 'react-icons/fi';

import { PROFILE } from '@/data/profile';

import { MENU_ITEMS } from '@/common/constant/menu';
import { CommandPaletteContext } from '@/common/context/CommandPaletteContext';

import Dock, { DockItemData } from '../../elements/Dock';

const Sidebar = () => {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { setIsOpen } = useContext(CommandPaletteContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';
  const navigationItems: DockItemData[] = MENU_ITEMS.filter(
    (item) => item.isShow,
  ).map((item) => ({
    icon: item.icon,
    label: item.title,
    active:
      item.href === '/'
        ? router.pathname === '/'
        : router.pathname.startsWith(item.href),
    onClick: () => router.push(item.href),
  }));
  const items: DockItemData[] = [
    ...navigationItems,
    {
      icon: <FiSearch className='h-5 w-5' />,
      label: 'Search',
      onClick: () => setIsOpen(true),
      separatorBefore: true,
    },
    {
      icon: isDark ? (
        <FiSun className='h-5 w-5' />
      ) : (
        <FiMoon className='h-5 w-5' />
      ),
      label: isDark ? 'Light mode' : 'Dark mode',
      onClick: () => setTheme(isDark ? 'light' : 'dark'),
    },
  ];

  return (
    <aside
      id='sidebar'
      className='sticky top-0 flex h-screen flex-col items-center py-8'
      aria-label='Desktop navigation'
    >
      <Link
        href='/'
        aria-label={`${PROFILE.name} home`}
        className='flex flex-col items-center rounded-md px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
      >
        <span className='relative'>
          <Image
            src={PROFILE.profileImage}
            alt={`${PROFILE.name} portrait`}
            width={48}
            height={48}
            className='h-12 w-12 rounded-full object-cover'
            priority
          />
          <span
            aria-hidden='true'
            className='absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[var(--background)] bg-[var(--telemetry-500)]'
          />
        </span>
        <span className='mt-3 whitespace-nowrap text-sm font-medium text-[var(--text-primary)]'>
          {PROFILE.name}
        </span>
        <span className='mt-0.5 text-xs text-[var(--text-tertiary)]'>
          @{PROFILE.username}
        </span>
      </Link>
      <span className='sr-only'>{PROFILE.availability}</span>
      <div className='mt-8'>
        <Dock items={items} />
      </div>
    </aside>
  );
};

export default Sidebar;
