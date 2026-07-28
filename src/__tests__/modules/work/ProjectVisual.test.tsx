import { render, screen } from '@testing-library/react';

import { getWorkBySlug } from '@/data/work';

import ProjectVisual from '@/modules/work/components/ProjectVisual';

describe('ProjectVisual', () => {
  test('renders registered real media when it exists', () => {
    const project = getWorkBySlug('smart-green-hub');
    if (!project) throw new Error('Missing Smart Green Hub test fixture');

    render(<ProjectVisual project={project} />);

    expect(
      screen.getByRole('img', {
        name: /Smart Green Hub dashboard with hydroponic readings/i,
      }),
    ).toHaveAttribute('src', expect.stringContaining('main-dashboard.png'));
  });

  test('renders an honest branded placeholder when media is pending', () => {
    const project = getWorkBySlug('team-it-work-order');
    if (!project) throw new Error('Missing Team IT Work Order test fixture');

    render(<ProjectVisual project={project} />);

    expect(
      screen.getByRole('img', {
        name: /Team IT Work Order System. interface capture pending/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('INTERFACE CAPTURE PENDING')).toBeInTheDocument();
  });
});
