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
  env: { FACTORY_ADDR: "0x01ab8dF2a20e426DB4ce352E0b00242CdC72B822" },
});

module.exports = nextConfig;
