// lib/mdx-wrapper-plugin.js
const mdxProviderWrapperPlugin = () => {
    return (tree) => {
      //console.log(tree)
      // const importNode = {
      //   type: 'import',
      //   value: "import { MDXProvider } from '@mdx-js/react';"
      // };
  
      // const importComponentsNode = {
      //   type: 'import',
      //   value: "import MDXComponents from '../components/MDXComponents';"
      // };
  
      const wrapperStartNode = {
        type: 'jsx',
        value: '<MDXProvider components={MDXComponents}>'
      };
  
      const wrapperEndNode = {
        type: 'jsx',
        value: '</MDXProvider>'
      };
  
      //tree.children.unshift(importNode, importComponentsNode, wrapperStartNode);
      tree.children.unshift(wrapperStartNode);
      tree.children.push(wrapperEndNode);
  
      return tree;
    };
};

  
module.exports = mdxProviderWrapperPlugin;
  