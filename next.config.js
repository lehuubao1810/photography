/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost','photographyhb.vercel.app'],
  },
}

module.exports = nextConfig
// const withEnv = require('next-env')
// const dotenvLoad = require('dotenv-load')

// dotenvLoad()

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['localhost'],
//   },
// }

// module.exports = withEnv(nextConfig)

