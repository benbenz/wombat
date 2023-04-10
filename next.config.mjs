import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
// this adds a lot of compilation time !!!
import remarkPrism from 'remark-prism'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import rehypeDocument from 'rehype-document'
import _withMDX from '@next/mdx';
import path from 'path'

const withMDX = _withMDX({ //require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install

    // !!! remarkPrism adds lots of compilation time
    
    remarkPlugins: [remarkGfm,remarkMath,remarkPrism,remarkRehype],
    rehypePlugins: [rehypeKatex,rehypeHighlight],//,rehypeDocument],
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
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts', 'html' , 'ipynb'],

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
      test: /\.html$/,
      exclude: /node_modules/,
      use: [
        // {
        //   loader: 'html-loader',  
        //     /** @type {import('html/loader').Options} */
        //   options: {}
        // },
        {
          loader: path.resolve('./src/loaders/html-jsx-loader.js'),
          options: {}
        } 
      ]
    })
    config.module.rules.push({
      test: /\.ipynb$/,
      exclude: /node_modules/,
      loader: path.resolve('./src/loaders/ipynb-loader.js'),
    })  
    return config
  }
}
// @next/mdx is only refreshing the right component with Fast Refresh
// if using @mdx-js/loader (commented above), a change in the file will cause a full refresh ...
// so we prefer the withMDX syntax
//module.exports = withMDX(nextConfig)
export default withMDX(nextConfig);

// with custom MDX wrapper (to add the CSS reset), the reload is also full ... not elegent enough
// we'll handle this business logic at the router/views level
//export default withCustomLoader(withMDX(nextConfig));

