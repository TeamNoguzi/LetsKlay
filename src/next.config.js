/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")(["../common"]);

const nextConfig = withTM({
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
  env: { FACTORY_ADDR: "0xe6930d4C48A6667da344B1EEd4935Dc944DD5c02" },
});

module.exports = nextConfig;
