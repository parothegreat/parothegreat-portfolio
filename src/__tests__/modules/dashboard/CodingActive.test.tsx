import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useSWR from 'swr';

import CodingActive from '@/modules/dashboard/components/CodingActive/CodingActive';

jest.mock('swr');

const mockedUseSWR = useSWR as jest.Mock;

describe('CodingActive range selector', () => {
  it('loads and announces the selected WakaTime range', async () => {
    mockedUseSWR.mockReturnValue({
      data: {
        last_update: '2026-07-27T00:00:00Z',
        start_date: '2026-06-27T00:00:00Z',
        end_date: '2026-07-27T00:00:00Z',
        human_readable_daily_average: '2 hrs',
        human_readable_total: '60 hrs',
        best_day: { date: '2026-07-20', text: '5 hrs' },
        languages: [{ name: 'TypeScript', percent: 75 }],
        categories: [{ name: 'Coding', percent: 100 }],
      },
      isValidating: false,
    });
    const user = userEvent.setup();

    render(<CodingActive />);

    expect(screen.getByRole('button', { name: '7 Days' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Period' }),
      'last_30_days',
    );

    expect(screen.getByRole('button', { name: '30 Days' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(mockedUseSWR).toHaveBeenLastCalledWith(
      '/api/read-stats?range=last_30_days',
      expect.any(Function),
      { keepPreviousData: true },
    );
    expect(screen.getByText('30-Day coding time')).toBeInTheDocument();
    expect(
      screen.getByText('Showing WakaTime statistics for 30 Days.'),
    ).toBeInTheDocument();
  });
});
