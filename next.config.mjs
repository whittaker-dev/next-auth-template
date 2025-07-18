/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.discordapp.com'
      // },
      {
        protocol: 'https',
        hostname: '**'
      }
    ],
  },
  // experimental: {
  //   ppr: true,
  // },
};

export default nextConfig;
