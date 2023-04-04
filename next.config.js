/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // webpack: (config, { isServer }) => {
  //   config.module.rules.push({
  //     test: /\.mdx?$/,
  //     exclude: /node_modules/, // Exclude files in the node_modules folder
  //     use: [
  //       {
  //         loader: '@mdx-js/loader', // Use your custom loader
             /** @type {import('@mdx-js/loader').Options} */
  //         options: {}
  //       }
  //     ]
  //   })
  // }
}

module.exports = nextConfig
