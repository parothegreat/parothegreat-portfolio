import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Dock from '@/common/components/elements/Dock';

test('renders an accessible vertical dock and activates an item', async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  render(
    <Dock
      items={[
        {
          icon: <span>H</span>,
          label: 'Home',
          onClick,
          active: true,
        },
      ]}
    />,
  );

  expect(
    screen.getByRole('navigation', { name: 'Primary navigation' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('toolbar')).toHaveAttribute(
    'aria-orientation',
    'vertical',
  );
  expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute(
    'aria-current',
    'page',
  );

  await user.click(screen.getByRole('button', { name: 'Home' }));
  expect(onClick).toHaveBeenCalledTimes(1);
});
