import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useInView, useReducedMotion } from 'framer-motion';

import { getWorkBySlug } from '@/data/work';

import ArchitectureExplorer from '@/modules/work/components/ArchitectureExplorer';

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  useInView: jest.fn(() => true),
  useReducedMotion: jest.fn(() => false),
}));

const project = getWorkBySlug('team-it-work-order');
if (!project) throw new Error('Missing Team IT Work Order test fixture');
const mockUseInView = useInView as jest.MockedFunction<typeof useInView>;
const mockUseReducedMotion = useReducedMotion as jest.MockedFunction<
  typeof useReducedMotion
>;

describe('ArchitectureExplorer', () => {
  beforeEach(() => {
    mockUseInView.mockReturnValue(true);
    mockUseReducedMotion.mockReturnValue(false);
  });

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
    expect(
      screen.getByText(/Browser to Nginx: Data over HTTPS/i),
    ).toBeInTheDocument();
  });

  test('renders semantic paths and visible-only packets', () => {
    const { unmount } = render(<ArchitectureExplorer project={project} />);

    expect(
      document.querySelector('[data-architecture-edge="browser-nginx"]'),
    ).toHaveAttribute('data-semantic', 'data');
    expect(
      document.querySelectorAll('.architecture-packet').length,
    ).toBeGreaterThan(0);

    unmount();
    mockUseInView.mockReturnValue(false);
    render(<ArchitectureExplorer project={project} />);
    expect(document.querySelectorAll('.architecture-packet')).toHaveLength(0);
  });

  test('removes repeated packet motion for reduced-motion users', () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<ArchitectureExplorer project={project} />);

    expect(document.querySelectorAll('.architecture-packet')).toHaveLength(0);
    expect(
      document.querySelector('[data-architecture-edge="browser-nginx"]'),
    ).toBeInTheDocument();
  });
});
