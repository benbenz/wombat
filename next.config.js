/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts', 'html'],

  webpack: (config, { isServer }) => {
    // config.module.rules.push({
    //   test: /\.mdx?$/,
    //   exclude: /node_modules/,  //Exclude files in the node_modules folder
    //   use: [
    //     {
    //       loader: '@mdx-js/loader',  //Use your custom loader
    //         /** @type {import('@mdx-js/loader').Options} */
    //       options: {}
    //     }
    //   ]
    // })
    config.module.rules.push({
      test: /\.html?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'html-loader',  
            /** @type {import('@mdx-js/loader').Options} */
          options: {}
        }
      ]
    })
    return config
  }
}

module.exports = nextConfig
