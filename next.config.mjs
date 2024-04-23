/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
  i18n: {
    locales: ['en', 'ca', 'uk', 'de', 'au', 'jp', 'fr', 'at', 'it', 'kr', 'th'],
    defaultLocale: 'en'
  },
  async rewrites() {
    return [
      {
        source: '/:locale/api/:path*',
        destination: '/api/:path*',
        locale: false
      },
      {
        source: '/:locale/:pathname*',
        destination: '/_resolver'
      }
    ]
  }
}

export default nextConfig
