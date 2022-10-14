/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")(["../common"]);

const nextConfig = withTM({
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:5000/uploads/:path*",
      },
    ];
  },
  env: { FACTORY_ADDR: "0xe53B4Ee339a75EAc8b02d7FcBeE7300d0954A291" },
});

module.exports = nextConfig;
