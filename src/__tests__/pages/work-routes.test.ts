import { WORK_ITEMS } from '@/data/work';

import { getStaticPaths, getStaticProps } from '@/pages/work/[slug]';

describe('work case-study routes', () => {
  test('pre-renders every registered project route', async () => {
    const result = await getStaticPaths({} as never);

    expect(result).toEqual({
      paths: WORK_ITEMS.map((project) => ({
        params: { slug: project.slug },
      })),
      fallback: false,
    });
  });

  test('returns not found for an unknown project', async () => {
    const result = await getStaticProps({
      params: { slug: 'unknown-project' },
    } as never);

    expect(result).toEqual({ notFound: true });
  });
});
