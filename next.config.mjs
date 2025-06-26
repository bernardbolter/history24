/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["digitalcityseries.com"],
    },
    webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  // Enable static file serving for target images and videos
  async headers() {
    return [
      {
        source: '/targets/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
