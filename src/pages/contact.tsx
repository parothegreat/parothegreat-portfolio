import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import Contact from '@/modules/contact';

const PAGE_TITLE = 'Contact';
const PAGE_DESCRIPTION =
  'Get in touch about infrastructure, DevOps, backend, security, and technical collaboration.';

const ContactPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - Alvaro Prayogo`}
        description={PAGE_DESCRIPTION}
        canonical='https://parothegreat.site/contact'
      />
      <Container>
        <PageHeading
          eyebrow='Get in touch'
          title={PAGE_TITLE}
          description={PAGE_DESCRIPTION}
        />
        <Contact />
      </Container>
    </>
  );
};

export default ContactPage;
