/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // For GitHub Pages - update 'portfolio' to your repo name
  basePath: process.env.NODE_ENV === 'production' ? '/JC' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/JC/' : '',
};

export default nextConfig;
