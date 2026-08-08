import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import Home from '@/modules/home';

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo title='Alvaro Prayogo - Personal Website' />
      <Container>
        <Home />
      </Container>
    </>
  );
};

export default HomePage;
