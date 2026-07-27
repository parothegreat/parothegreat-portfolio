import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CodingActiveList from '@/modules/dashboard/components/CodingActive/CodingActiveList';

test('combines coding categories and switches the mobile breakdown', async () => {
  const user = userEvent.setup();

  render(
    <CodingActiveList
      data={{
        languages: [{ name: 'TypeScript', percent: 75 }],
        categories: [
          { name: 'AI Coding', percent: 60 },
          { name: 'Coding', percent: 30 },
          { name: 'Writing Docs', percent: 10 },
          { name: 'Building', percent: 0.1 },
        ],
      }}
    />,
  );

  expect(screen.queryByText('AI Coding')).not.toBeInTheDocument();
  expect(screen.getByText('Total Coding')).toBeInTheDocument();
  expect(screen.getByText('90%')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Languages' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  await user.click(screen.getByRole('button', { name: 'Categories' }));

  expect(screen.getByRole('button', { name: 'Categories' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  expect(
    screen.getByRole('progressbar', { name: 'Total Coding activity' }),
  ).toHaveAttribute('aria-valuenow', '90');
  expect(screen.queryByText('Building')).not.toBeInTheDocument();
  expect(screen.getByLabelText('Languages breakdown')).toHaveClass(
    'hidden',
    'sm:block',
  );
});
