import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { WORK_ITEMS } from '@/data/work';

import WorkExplorer from '@/modules/work/components/WorkExplorer';

const items = WORK_ITEMS.slice(0, 2);

describe('WorkExplorer', () => {
  test('updates the desktop preview on hover and keyboard focus', async () => {
    const user = userEvent.setup();
    render(<WorkExplorer items={items} />);

    const firstLink = screen.getByRole('link', {
      name: `Open ${items[0].title} case study`,
    });
    const secondLink = screen.getByRole('link', {
      name: `Open ${items[1].title} case study`,
    });

    expect(firstLink).toHaveAttribute('aria-current', 'true');
    await user.hover(secondLink);
    expect(secondLink).toHaveAttribute('aria-current', 'true');
    expect(await screen.findByText(items[1].outcome)).toBeInTheDocument();

    await user.tab();
    await waitFor(() =>
      expect(firstLink).toHaveAttribute('aria-current', 'true'),
    );
    expect(await screen.findByText(items[0].outcome)).toBeInTheDocument();
  });

  test('expands a mobile preview and exposes an explicit case-study link', async () => {
    const user = userEvent.setup();
    render(<WorkExplorer items={items} />);

    const trigger = screen.getByRole('button', {
      name: new RegExp(items[0].title),
    });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const panel = document.getElementById(
      trigger.getAttribute('aria-controls') as string,
    );
    expect(panel).not.toBeNull();
    expect(
      within(panel as HTMLElement).getByRole('link', {
        name: 'Open documentation',
      }),
    ).toHaveAttribute('href', `/work/${items[0].slug}`);
  });

  test('supports keyboard expansion without relying on hover', async () => {
    const user = userEvent.setup();
    render(<WorkExplorer items={items} />);
    const trigger = screen.getByRole('button', {
      name: new RegExp(items[1].title),
    });

    trigger.focus();
    await user.keyboard('{Enter}');

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});
