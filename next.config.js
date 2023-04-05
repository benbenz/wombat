const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts', 'html'],

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      exclude: /node_modules/,  //Exclude files in the node_modules folder
      use: [
        {
          // loader: '@mdx-js/loader',  //Use your custom loader
          //   /** @type {import('@mdx-js/loader').Options} */
          // options: {}
          loader: '@mdx-js/loader' ,
          options: {
            // If you use remark-gfm, you'll need to use next.config.mjs
            // as the package is ESM only
            // https://github.com/remarkjs/remark-gfm#install
            remarkPlugins: [],
            rehypePlugins: [],
            // If you use `MDXProvider`, uncomment the following line.
            providerImportSource: "@mdx-js/react",
          },          
        }
      ]
    })
    config.module.rules.push({
      test: /\.html?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'html-loader',  
            /** @type {import('html/loader').Options} */
          options: {}
        }
      ]
    })
    return config
  }
}

module.exports = nextConfig ;//withMDX(nextConfig)
