/** @type {import('next').NextConfig} */
export default {
  output: 'export',
  images: { unoptimized: true },
  turbopack: { root: import.meta.dirname },
};
