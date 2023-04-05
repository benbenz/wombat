import remarkGfm from 'remark-gfm'
import _withMDX from '@next/mdx';
import path from 'path'

const withMDX = _withMDX({ //require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    //providerImportSource: "@mdx-js/react",
  },
})

const withCustomLoader = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.mdx?$/,
        use: [{ loader: path.resolve('./src/loaders/mdx-wrapper.js') }],
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  });
};

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
    //       // loader: '@mdx-js/loader',  //Use your custom loader
    //       //   /** @type {import('@mdx-js/loader').Options} */
    //       // options: {}
    //       loader: '@mdx-js/loader' ,
    //       options: {
    //         // If you use remark-gfm, you'll need to use next.config.mjs
    //         // as the package is ESM only
    //         // https://github.com/remarkjs/remark-gfm#install
    //         remarkPlugins: [],
    //         rehypePlugins: [],
    //         // If you use `MDXProvider`, uncomment the following line.
    //         providerImportSource: "@mdx-js/react",
    //       },          
    //     }
    //   ]
    // })
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
    config.module.rules.push({
      test: /\.ipynb$/,
      exclude: /node_modules/,
      loader: path.resolve('./src/loaders/ipynb-loader.cjs'),
    })
    // config.module.rules.push({
    //   test: /\.mdx?$/,
    //   use: [{loader: require.resolve('./src/loaders/mdx-wrapper.js')}]
    // });      
    // config.module.rules.push({
    //   test: /\.mdx$/,
    //   use: [
    //     {
    //       loader: 'babel-loader',
    //     },
    //     {
    //       loader: '@next/mdx',
    //     },
    //     {
    //       loader: require.resolve('./src/loaders/mdx-wrapper.js'), // Add custom loader after the MDX loader
    //     },
    //   ]
    // });    
    return config
  }
}
// @next/mdx is only refreshing the right component with Fast Refresh
// if using @mdx-js/loader (commented above), a change in the file will cause a full refresh ...
// so we prefer the withMDX syntax
//module.exports = withMDX(nextConfig)
export default withCustomLoader(withMDX(nextConfig));
