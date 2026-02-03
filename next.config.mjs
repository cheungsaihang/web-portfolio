/** @type {import('next').NextConfig} */
import { withPigment } from '@pigment-css/nextjs-plugin';
import pigmentConfig from './pigment.config.mjs';

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/restaurant', // the route you want to remove
        destination: '/', // redirect to a 404 page or '/'
        permanent: true,
      },
      {
        source: '/login', // the route you want to remove
        destination: '/', // redirect to a 404 page or '/'
        permanent: true,
      },
      {
        source: '/hiking', // the route you want to remove
        destination: '/', // redirect to a 404 page or '/'
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
      },
    ],
  }
};

export default withPigment(nextConfig,pigmentConfig);