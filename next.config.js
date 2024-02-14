/** @type {import('next').NextConfig} */
const nextConfig = {
  cssModules: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      // {
      //   source: "/:username+/history",
      //   destination: "/history",
      //   permanent: true,
      // },
    ];
  },
  images: {
    domains: ["cdn.myanimelist.net"],
  },
};

module.exports = nextConfig;
