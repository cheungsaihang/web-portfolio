/** @type {import('next').NextConfig} */
import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';
import pigmentConfig from './pigment.config.mjs';

const nextConfig = {
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