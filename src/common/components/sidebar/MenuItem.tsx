import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { BsArrowRightShort as ExternalLinkIcon } from 'react-icons/bs';

import { MenuContext } from '@/common/context/MenuContext';
import { MenuItemProps } from '@/common/types/menu';

const MenuItem = ({
  title,
  href,
  icon,
  onClick,
  className = '',
  children,
  hideIcon = false,
}: MenuItemProps) => {
  const { hideNavbar } = useContext(MenuContext);
  const isExternalUrl = href?.includes('http');
  const isHashLink = href === '#';
  const router = useRouter();
  const isActiveRoute =
    href === '/'
      ? router.pathname === '/'
      : !isExternalUrl && router.pathname.startsWith(href);

  const activeClasses = `group relative flex min-h-[48px] items-center gap-3 rounded-md px-3 text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] motion-reduce:transition-none lg:min-h-[44px] lg:text-[15px] ${
    isActiveRoute ? 'bg-[var(--surface-3)] text-[var(--text-primary)]' : ''
  }`;

  const handleClick = () => {
    hideNavbar();
    if (onClick) onClick();
  };

  const elementProps = {
    className: `${activeClasses} ${className}`,
  };

  const itemComponent = () => {
    return (
      <div {...elementProps}>
        {isActiveRoute ? (
          <span
            aria-hidden='true'
            className='absolute inset-y-2 left-0 w-0.5 rounded-full bg-[var(--circuit-500)]'
          />
        ) : null}
        {!hideIcon && (
          <div className='flex h-5 w-5 shrink-0 transform-gpu items-center justify-center transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none'>
            {icon}
          </div>
        )}
        <div className='ml-0.5 flex-grow'>{title}</div>
        {children && <>{children}</>}
        {isExternalUrl && (
          <ExternalLinkIcon
            aria-hidden='true'
            size={22}
            className='shrink-0 translate-x-1 -rotate-45 text-gray-500 opacity-0 transition duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none'
          />
        )}
      </div>
    );
  };

  return isHashLink ? (
    <button
      className='w-full cursor-pointer'
      onClick={handleClick}
      type='button'
    >
      {itemComponent()}
    </button>
  ) : (
    <Link
      href={href}
      target={isExternalUrl ? '_blank' : ''}
      rel={isExternalUrl ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      aria-current={isActiveRoute ? 'page' : undefined}
    >
      {itemComponent()}
    </Link>
  );
};

export default MenuItem;
