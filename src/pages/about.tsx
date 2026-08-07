import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import About from '@/modules/about';

const PAGE_TITLE = 'About';
const PAGE_DESCRIPTION =
  'My background, working principles, technical experience, and education.';

const AboutPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - Alvaro Prayogo`}
        description={PAGE_DESCRIPTION}
        canonical='https://parothegreat.site/about'
      />
      <Container>
        <PageHeading
          eyebrow='Profile'
          title={PAGE_TITLE}
          description={PAGE_DESCRIPTION}
        />
        <About />
      </Container>
    </>
  );
};

export default AboutPage;
