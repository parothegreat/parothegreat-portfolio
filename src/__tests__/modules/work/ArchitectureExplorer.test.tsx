import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { WORK_ITEMS } from '@/data/work';

import ArchitectureExplorer from '@/modules/work/components/ArchitectureExplorer';

const project = WORK_ITEMS[0];

describe('ArchitectureExplorer', () => {
  test('pins a node and exposes its technical description', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer project={project} />);

    const nginx = screen.getByRole('button', {
      name: /Nginx: Routes web traffic/i,
    });
    await user.click(nginx);

    expect(nginx).toHaveAttribute('aria-pressed', 'true');
    const status = screen.getByRole('status');
    expect(
      within(status).getByText(
        'Routes web traffic to the frontend and API service boundary.',
      ),
    ).toBeInTheDocument();
  });

  test('clears a pinned node with Escape', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer project={project} />);

    const nginx = screen.getByRole('button', {
      name: /Nginx: Routes web traffic/i,
    });
    await user.click(nginx);
    await user.keyboard('{Escape}');

    expect(nginx).toHaveAttribute('aria-pressed', 'false');
    const status = screen.getByRole('status');
    expect(
      within(status).getByText(
        'Requester and operator interface for creating and updating work orders.',
      ),
    ).toBeInTheDocument();
  });

  test('keeps a textual architecture fallback in the document', () => {
    render(<ArchitectureExplorer project={project} />);

    expect(screen.getByText('Architecture text view')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /Rust Tracker: Learning prototype/i,
      }),
    ).toBeInTheDocument();
  });
});
