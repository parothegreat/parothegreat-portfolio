import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';

import { getWorkBySlug, WORK_ITEMS, WorkItem } from '@/data/work';

import Container from '@/common/components/elements/Container';
import CaseStudy from '@/modules/work/components/CaseStudy';

interface WorkParams extends ParsedUrlQuery {
  slug: string;
}

interface WorkCaseStudyPageProps {
  project: WorkItem;
  previous: WorkItem | null;
  next: WorkItem | null;
}

const WorkCaseStudyPage = ({
  project,
  previous,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title={`${project.title} - Alvaro Prayogo`}
        description={project.shortDescription}
        canonical={`https://parothegreat.site/work/${project.slug}`}
        openGraph={{
          title: `${project.title} - Alvaro Prayogo`,
          description: project.shortDescription,
          url: `https://parothegreat.site/work/${project.slug}`,
          type: 'article',
        }}
      />
      <Container className='lg:py-10'>
        <CaseStudy
          next={next ?? undefined}
          previous={previous ?? undefined}
          project={project}
        />
      </Container>
    </>
  );
};

export default WorkCaseStudyPage;

export const getStaticPaths: GetStaticPaths<WorkParams> = async () => ({
  paths: WORK_ITEMS.map((project) => ({
    params: { slug: project.slug },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<
  WorkCaseStudyPageProps,
  WorkParams
> = async ({ params }) => {
  const project = params?.slug ? getWorkBySlug(params.slug) : undefined;
  if (!project) return { notFound: true };

  const index = WORK_ITEMS.findIndex((item) => item.id === project.id);

  return {
    props: {
      project,
      previous: index > 0 ? WORK_ITEMS[index - 1] : null,
      next: index < WORK_ITEMS.length - 1 ? WORK_ITEMS[index + 1] : null,
    },
  };
};
