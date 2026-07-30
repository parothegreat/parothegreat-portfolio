import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Activity from '@/modules/activity/components/Activity';

jest.mock('@/modules/dashboard/components/CodingActive', () => () => (
  <section aria-label='WakaTime activity'>WakaTime activity</section>
));
jest.mock('@/modules/activity/components/GithubContributions', () => () => (
  <section aria-label='GitHub contributions'>GitHub contributions</section>
));

test('switches between WakaTime and GitHub activity on mobile', async () => {
  const user = userEvent.setup();
  render(<Activity />);

  expect(
    screen.getByRole('heading', { name: "What I'm working on now" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('region', { name: 'WakaTime activity' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'WakaTime' })).toHaveAttribute(
    'aria-selected',
    'true',
  );

  await user.click(screen.getByRole('tab', { name: 'GitHub' }));

  expect(screen.getByRole('tab', { name: 'GitHub' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  expect(screen.getByRole('tabpanel', { name: 'GitHub' })).not.toHaveClass(
    'hidden',
  );
});
