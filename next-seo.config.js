const canonicalUrl = 'https://parothegreat.site';
const metaImage = 'https://parothegreat.site/images/profile/pfp.jpeg';
const metaDescription =
  'Personal website of Alvaro Prayogo, a SysAdmin, DevOps engineer, penetration testing enthusiast, and Industrial Electronics Engineering student.';

const defaultSEOConfig = {
  defaultTitle: 'Alvaro Prayogo - Personal Website',
  description: metaDescription,
  canonical: canonicalUrl,
  openGraph: {
    canonical: canonicalUrl,
    title: 'Alvaro Prayogo - Personal Website',
    description: metaDescription,
    type: 'website',
    images: [
      {
        url: metaImage,
        alt: 'Alvaro Prayogo profile image',
        width: 800,
        height: 600,
      },
      {
        url: metaImage,
        alt: 'Alvaro Prayogo profile image',
        width: 1200,
        height: 630,
      },
      {
        url: metaImage,
        alt: 'Alvaro Prayogo profile image',
        width: 1600,
        height: 900,
      },
    ],
    site_name: 'parothegreat.site',
  },
  twitter: {
    handle: '@parothegreat',
    site: '@parothegreat',
    cardType: 'summary_large_image',
  },
};

export default defaultSEOConfig;
