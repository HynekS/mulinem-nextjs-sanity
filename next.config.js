/** @type {import('next').NextConfig} */

// const withPreact = require("next-plugin-preact");

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
