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
    domains: ["cdn.myanimelist.net", "i.imgur.com", "imgur.com"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "i.imgur.com", port: "", pathname: "*" },
      { protocol: "https", hostname: "imgur.com" },
    ],
  },
};

module.exports = nextConfig;
