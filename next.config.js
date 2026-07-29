const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/activity',
        permanent: true,
      },
      {
        source: '/projects/:path*',
        destination: '/work',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
