import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FiMail, FiMenu, FiX } from 'react-icons/fi';

import { PROFILE } from '@/data/profile';
import { SOCIAL_LINKS, SocialLinkIcon } from '@/data/social-links';

import { MENU_ITEMS } from '@/common/constant/menu';
import { MenuContext } from '@/common/context/MenuContext';

import Navigation from './Navigation';
import SearchBox from '../elements/SearchBox';
import ThemeToggleButton from '../elements/ThemeToggleButton';

const SOCIAL_ICONS: Record<SocialLinkIcon, React.ComponentType> = {
  email: FiMail,
  github: BsGithub,
  linkedin: BsLinkedin,
  instagram: FiMail,
};

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const activeItem = MENU_ITEMS.find((item) =>
    item.href === '/'
      ? router.pathname === '/'
      : router.pathname.startsWith(item.href),
  );
  const routeTitle = router.pathname === '/' ? PROFILE.name : activeItem?.title;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 4);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MenuContext.Provider value={{ hideNavbar: () => setIsOpen(false) }}>
      <div
        className={clsx(
          'fixed inset-x-0 top-0 z-40 h-16 border-b bg-[var(--background)] transition-colors duration-200 motion-reduce:transition-none',
          isScrolled ? 'border-[var(--border-subtle)]' : 'border-transparent',
        )}
      >
        <div className='flex h-full items-center justify-between px-5'>
          <div className='flex min-w-0 items-center gap-3'>
            <Image
              src={PROFILE.profileImage}
              alt=''
              aria-hidden='true'
              width={36}
              height={36}
              className='h-9 w-9 shrink-0 rounded-full object-cover'
              priority
            />
            <span className='truncate text-[15px] font-medium text-[var(--text-primary)]'>
              {routeTitle ?? PROFILE.name}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <ThemeToggleButton />
            <button
              type='button'
              aria-expanded={isOpen}
              aria-controls='mobile-navigation'
              aria-label='Open navigation'
              className='flex h-11 w-11 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] motion-reduce:transition-none'
              onClick={() => setIsOpen(true)}
            >
              <FiMenu aria-hidden='true' className='h-6 w-6' />
            </button>
          </div>
        </div>
      </div>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50 lg:hidden'
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity duration-200'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/60' aria-hidden='true' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='transition-transform duration-200 ease-out'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leave='transition-transform duration-150 ease-in'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <Dialog.Panel
              id='mobile-navigation'
              className='fixed inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto border-l border-[var(--line-default)] bg-[var(--background)] px-5 pb-6 pt-4'
            >
              <div className='flex min-h-[48px] items-center justify-between'>
                <Dialog.Title className='text-sm font-medium text-[var(--text-tertiary)]'>
                  Navigation
                </Dialog.Title>
                <button
                  type='button'
                  aria-label='Close navigation'
                  className='flex h-11 w-11 items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
                  onClick={() => setIsOpen(false)}
                >
                  <FiX aria-hidden='true' className='h-6 w-6' />
                </button>
              </div>

              <div className='mt-5 flex items-center gap-4'>
                <Image
                  src={PROFILE.profileImage}
                  alt={`${PROFILE.name} portrait`}
                  width={56}
                  height={56}
                  className='h-14 w-14 rounded-full object-cover'
                />
                <div>
                  <p className='font-medium text-[var(--text-primary)]'>
                    {PROFILE.name}
                  </p>
                  <p className='mt-1 text-sm text-[var(--text-tertiary)]'>
                    @{PROFILE.username}
                  </p>
                </div>
              </div>

              <div className='mt-6'>
                <SearchBox />
              </div>
              <nav className='mt-5' aria-label='Mobile navigation'>
                <Navigation />
              </nav>

              <div className='mt-8 border-t border-[var(--line-default)] pt-6'>
                <div className='flex items-start gap-3 text-sm leading-6 text-[var(--text-secondary)]'>
                  <span
                    aria-hidden='true'
                    className='mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--telemetry-500)]'
                  />
                  <span>{PROFILE.availability}</span>
                </div>
                <div className='mt-5 flex items-center gap-2'>
                  {SOCIAL_LINKS.filter((item) => item.visible).map((item) => {
                    const Icon = SOCIAL_ICONS[item.icon];
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        aria-label={item.label}
                        className='flex h-11 w-11 items-center justify-center rounded-md border border-[var(--line-default)] text-[var(--text-secondary)] hover:border-[var(--line-strong)] hover:text-[var(--circuit-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]'
                        target={
                          item.href.startsWith('http') ? '_blank' : undefined
                        }
                        rel={
                          item.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                      >
                        <Icon aria-hidden='true' />
                      </a>
                    );
                  })}
                </div>
                <div className='mt-5'>
                  <ThemeToggleButton showLabel />
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </MenuContext.Provider>
  );
};

export default Profile;
