/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@tabler/icons-react'],
  },
};

export default nextConfig;
