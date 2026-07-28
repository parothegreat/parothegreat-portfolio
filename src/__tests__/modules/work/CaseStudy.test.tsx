import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getWorkBySlug } from '@/data/work';

import CaseStudy from '@/modules/work/components/CaseStudy';

const project = getWorkBySlug('smart-green-hub');
if (!project) throw new Error('Missing Smart Green Hub test fixture');

describe('CaseStudy', () => {
  test('marks the current chapter and updates it from chapter navigation', async () => {
    const user = userEvent.setup();
    render(<CaseStudy project={project} />);

    const overview = screen.getByRole('link', { name: 'Overview' });
    const architecture = screen.getByRole('link', { name: 'Architecture' });

    expect(overview).toHaveAttribute('aria-current', 'location');
    await user.click(architecture);
    expect(architecture).toHaveAttribute('aria-current', 'location');
  });

  test('renders registered evidence and only verified project links', () => {
    render(<CaseStudy project={project} />);

    expect(
      screen.getByRole('img', {
        name: /Smart Green Hub warning interface/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /GitHub repository/i }),
    ).toHaveAttribute('href', 'https://github.com/VARR-git/Smart-Green-Hub');
    expect(
      screen.queryByRole('link', { name: /Live site/i }),
    ).not.toBeInTheDocument();
  });
});
