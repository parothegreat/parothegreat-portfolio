import { render, screen } from '@testing-library/react';

import MenuItem from '@/common/components/sidebar/MenuItem';

jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/projects' }),
}));

test('uses a stable icon slot without pulse or rotation animations', () => {
  render(
    <MenuItem
      href='/projects'
      icon={<span data-testid='menu-icon' />}
      isExternal={false}
      title='Projects'
    />,
  );

  const iconSlot = screen.getByTestId('menu-icon').parentElement;

  expect(iconSlot).toHaveClass('h-5', 'w-5', 'transition-transform');
  expect(iconSlot).not.toHaveClass('animate-pulse', 'group-hover:-rotate-12');
});
