
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pixabay.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rhin-blog-production.s3.eu-west-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.elephant-world.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'concepto.de',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.savingthesurvivors.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imagenes.elpais.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.sciencenews.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.dw.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' ,
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.kastatic.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
