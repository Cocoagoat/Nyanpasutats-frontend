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
    domains: [
      "cdn.myanimelist.net",
      // "cdn.imgchest.com",
      "i.imgur.com",
      "imgur.com",
    ],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "i.imgur.com", port: "", pathname: "*" },
      { protocol: "https", hostname: "imgur.com" },
      // {
      //   protocol: "https",
      //   hostname: "cdn.imgchest.com",
      //   port: "",
      //   pathname: "*",
      // },
    ],
  },
};

module.exports = nextConfig;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

process.on("unhandledRejection", (reason, promise) => {
  if (reason.message.includes("Cookies can only be modified")) {
    // Ignore the cookie modification warning
    return;
  }
  // console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
