/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

module.exports = nextConfig;
