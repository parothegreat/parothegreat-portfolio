import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import ToolsSection from '@/modules/toolkit';

const ToolkitPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title='Toolkit - Alvaro Prayogo'
        description='A project-backed toolkit shaped by Linux infrastructure, backend systems, networking, security research, observability, and IoT work.'
        canonical='https://parothegreat.site/toolkit'
      />
      <Container>
        <PageHeading
          eyebrow='Technical toolkit'
          title='Tools I use to build, operate, and secure systems'
          description='A practical stack shaped by school infrastructure, self-hosted services, backend systems, network operations, security research, and IoT projects.'
        />
        <ToolsSection />
      </Container>
    </>
  );
};

export default ToolkitPage;
