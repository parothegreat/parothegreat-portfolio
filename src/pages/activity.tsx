import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import Activity from '@/modules/activity';

const ActivityPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title='Activity - Alvaro Prayogo'
        description='A public view of my coding time from WakaTime and contribution activity from GitHub.'
        canonical='https://parothegreat.site/activity'
      />
      <Container>
        <PageHeading
          eyebrow='Public activity'
          title='Activity'
          description='A public view of my coding time from WakaTime and contribution activity from GitHub.'
        />
        <Activity />
      </Container>
    </>
  );
};

export default ActivityPage;
