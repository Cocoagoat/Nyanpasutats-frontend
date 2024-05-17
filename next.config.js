/** @type {import('next').NextConfig} */
const nextConfig = {
  cssModules: true,
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["cdn.myanimelist.net"],
  },
};

module.exports = nextConfig;
