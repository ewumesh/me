/** @type {import('next').NextConfig} */
const nextConfig = {
    // async redirects() {
    //     return [
    //       // Basic redirect
    //       {
    //         source: '/',
    //         destination: '/',
    //         permanent: true,
    //       },
    //       // Wildcard path matching
    //       {
    //         source: '/blogs',
    //         destination: '/news/:slug',
    //         permanent: true,
    //       },
    //     ]
    //   },

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'me-qk6unggyh-ewumeshs-projects.vercel.app',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
