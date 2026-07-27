import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TOOLS } from '@/data/tools';

import ToolsSection from '@/modules/toolkit/components/ToolsSection';

describe('ToolsSection', () => {
  test('reveals tools progressively and opens one mobile detail at a time', async () => {
    const user = userEvent.setup();
    render(<ToolsSection />);

    const results = screen.getByRole('list', { name: 'Tool results' });
    const goButton = screen.getByRole('button', {
      name: /^Go Development Core$/i,
    });
    const ginButton = screen.getByRole('button', {
      name: /^Gin Development Project$/i,
    });

    expect(results.children).toHaveLength(6);
    expect(
      screen.getByText(`${TOOLS.filter((tool) => tool.featured).length} tools`),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('list', { name: 'Core stack tools' }).children,
    ).toHaveLength(TOOLS.filter((tool) => tool.featured).length);

    await user.click(goButton);
    expect(goButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(ginButton);
    expect(goButton).toHaveAttribute('aria-expanded', 'false');
    expect(ginButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: 'See more' }));
    expect(results.children).toHaveLength(12);

    await user.click(screen.getByRole('button', { name: 'Show less' }));
    expect(results.children).toHaveLength(6);
  });

  test('filters by domain and announces the active state', async () => {
    const user = userEvent.setup();
    render(<ToolsSection />);

    const allFilter = screen.getByRole('button', { name: 'All' });
    const securityFilter = screen.getByRole('button', { name: 'Security' });

    expect(allFilter).toHaveAttribute('aria-pressed', 'true');
    await user.click(securityFilter);
    expect(securityFilter).toHaveAttribute('aria-pressed', 'true');
    expect(allFilter).toHaveAttribute('aria-pressed', 'false');
    expect(
      screen.getByText(
        `${TOOLS.filter((tool) => tool.domain === 'security').length} security tools`,
      ),
    ).toBeInTheDocument();
  });

  test('searches project references and clears with Escape', async () => {
    const user = userEvent.setup();
    render(<ToolsSection />);

    const search = screen.getByRole('searchbox', {
      name: 'Search tools, domains, or projects',
    });

    await user.type(search, 'RFID Door Access');
    expect(
      within(screen.getByRole('list', { name: 'Tool results' })).getByRole(
        'button',
        {
          name: /^MFRC522 IoT & Hardware Project$/i,
        },
      ),
    ).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(search).toHaveValue('');
    expect(screen.getByText(`${TOOLS.length} tools`)).toBeInTheDocument();
  });

  test('clear search restores all results without changing the domain', async () => {
    const user = userEvent.setup();
    render(<ToolsSection />);

    await user.click(screen.getByRole('button', { name: 'Infrastructure' }));
    const search = screen.getByRole('searchbox', {
      name: 'Search tools, domains, or projects',
    });
    await user.type(search, 'Docker');
    await user.click(screen.getByRole('button', { name: 'Clear tool search' }));

    expect(search).toHaveValue('');
    expect(
      screen.getByRole('button', { name: 'Infrastructure' }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  test('shows an empty state and resets it from the keyboard', async () => {
    const user = userEvent.setup();
    render(<ToolsSection />);

    const search = screen.getByRole('searchbox', {
      name: 'Search tools, domains, or projects',
    });
    await user.type(search, 'definitely-not-a-tool');

    expect(
      screen.getByRole('heading', { name: 'No matching tools' }),
    ).toBeInTheDocument();

    const reset = screen.getByRole('button', { name: 'Reset filters' });
    reset.focus();
    await user.keyboard('{Enter}');

    expect(search).toHaveValue('');
    expect(screen.getByText(`${TOOLS.length} tools`)).toBeInTheDocument();
  });
});
