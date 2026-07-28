import { Combobox, Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Fragment, useContext, useEffect, useState } from 'react';
import {
  BiMoon as DarkModeIcon,
  BiSearch as SearchIcon,
  BiSun as LightModeIcon,
} from 'react-icons/bi';
import { useDebounce } from 'usehooks-ts';

import {
  EXTERNAL_LINKS,
  MENU_ITEMS,
  SOCIAL_MEDIA,
} from '@/common/constant/menu';
import { CommandPaletteContext } from '@/common/context/CommandPaletteContext';
import useIsMobile from '@/common/hooks/useIsMobile';
import { MenuItemProps } from '@/common/types/menu';
import QueryNotFound from '@/modules/cmdpallete/components/QueryNotFound';

interface MenuOptionItemProps extends MenuItemProps {
  click?: () => void;
  closeOnSelect: boolean;
}

interface MenuOptionProps {
  title: string;
  children: MenuOptionItemProps[];
}

const CommandPalette = () => {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const router = useRouter();
  const isMobile = useIsMobile();
  const { isOpen, setIsOpen } = useContext(CommandPaletteContext);
  const { resolvedTheme, setTheme } = useTheme();
  const queryDebounce = useDebounce(query, 500);

  const placeholders = [
    'Search anything...',
    'Press Cmd + K anytime to access this command pallete',
  ];

  const placeholder = placeholders[placeholderIndex];

  const menuOptions: MenuOptionProps[] = [
    {
      title: 'PAGES',
      children: MENU_ITEMS?.map((menu) => ({
        ...menu,
        closeOnSelect: true,
      })),
    },
    {
      title: 'SOCIALS',
      children: SOCIAL_MEDIA?.map((menu) => ({
        ...menu,
        closeOnSelect: true,
      })),
    },
    {
      title: 'EXTERNAL LINKS',
      children: EXTERNAL_LINKS?.map((menu) => ({
        ...menu,
        closeOnSelect: true,
      })),
    },
    {
      title: 'APPEARANCE',
      children: [
        {
          icon:
            resolvedTheme === 'dark' ? (
              <LightModeIcon size={20} />
            ) : (
              <DarkModeIcon size={20} />
            ),
          title: `Switch to ${
            resolvedTheme === 'dark' ? 'Light' : 'Dark'
          } Mode`,
          click: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
          href: '#',
          isExternal: false,
          closeOnSelect: false,
        },
      ],
    },
  ];

  const filterMenuOptions: MenuOptionProps[] = queryDebounce
    ? menuOptions.map((menu) => ({
        ...menu,
        children: menu.children.filter((item) =>
          item.title.toLowerCase().includes(queryDebounce.toLowerCase()),
        ),
      }))
    : menuOptions;

  const handleSelect = (menu: MenuOptionItemProps) => {
    setQuery('');

    if (menu.closeOnSelect) setIsOpen(false);

    menu.click?.();

    if (menu.isExternal) {
      window.open(menu.href, '_blank');
    } else {
      router.push(menu?.href as string);
    }
  };

  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setQuery(value);

  const handleFindGoogle = () => {
    const url =
      'https://www.google.com/search?q=' +
      queryDebounce +
      '&ref=parothegreat.site';
    window.open(url, '_blank');
  };

  const isActiveRoute = (href: string) => {
    return router.pathname === href;
  };

  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        setPlaceholderIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [placeholderIndex, isMobile]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      } else if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        onClose={setIsOpen}
        className='fixed inset-0 z-[999] overflow-y-auto p-4 pt-[25vh]'
      >
        <Transition.Child
          as={Fragment}
          enter='transition-opacity duration-200 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-100 ease-in'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-black/70' />
        </Transition.Child>

        <Dialog.Panel>
          <Transition.Child
            as={Fragment}
            enter='transition-transform duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='transition-transform duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Combobox
              onChange={(menu: MenuOptionItemProps) => handleSelect(menu)}
              as='div'
              className='relative mx-auto max-w-xl overflow-hidden rounded-lg border border-[var(--line-strong)] bg-[var(--surface-1)]'
            >
              <div className='flex items-center gap-3 border-b border-[var(--line-default)] px-4 text-[var(--text-tertiary)]'>
                <SearchIcon size={22} />
                <Combobox.Input
                  onChange={handleSearch}
                  className='h-14 w-full border-0 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-0'
                  placeholder={placeholder}
                />
              </div>

              <div className='max-h-80 overflow-y-auto px-1 py-2'>
                {filterMenuOptions.map((menu) => (
                  <div
                    key={menu.title}
                    className={clsx(
                      menu?.children?.length === 0 && 'hidden',
                      'py-1',
                    )}
                  >
                    <div className='my-2 px-5 font-code text-[10px] font-medium uppercase text-[var(--text-tertiary)]'>
                      {menu?.title}
                    </div>
                    <Combobox.Options static className='space-y-1'>
                      {menu?.children?.map((child, index) => (
                        <Combobox.Option key={index.toString()} value={child}>
                          {({ active }) => (
                            <div
                              className={clsx(
                                active || isActiveRoute(child?.href)
                                  ? 'bg-[var(--surface-3)] text-[var(--text-primary)]'
                                  : 'text-[var(--text-secondary)]',
                                'group mx-2 flex cursor-pointer items-center justify-between gap-3 rounded-md px-4 py-2',
                                'hover:bg-[var(--surface-2)]',
                              )}
                            >
                              <div className='flex items-center gap-5'>
                                {child?.icon && (
                                  <div
                                    className={clsx(
                                      'text-[var(--text-tertiary)]',
                                      isActiveRoute(child?.href) &&
                                        'text-[var(--text-primary)]',
                                    )}
                                  >
                                    {child?.icon}
                                  </div>
                                )}
                                <span className=''>
                                  {child?.title} {active}
                                </span>
                              </div>
                              <>
                                {isActiveRoute(child?.href) ? (
                                  <span className='text-xs text-[var(--text-tertiary)]'>
                                    You are here
                                  </span>
                                ) : (
                                  <>
                                    {child?.type && (
                                      <div className='rounded border border-[var(--line-default)] px-1.5 py-0.5 font-code text-[10px] text-[var(--text-tertiary)]'>
                                        {child?.type}
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            </div>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                ))}
              </div>

              {queryDebounce &&
                filterMenuOptions.every(
                  (item) => item.children.length === 0,
                ) && (
                  <QueryNotFound
                    query={queryDebounce}
                    onFindGoogle={handleFindGoogle}
                  />
                )}
            </Combobox>
          </Transition.Child>
        </Dialog.Panel>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandPalette;
