// loaders/ipynb-loader.js
// const React = require('react');
// const ReactDOM = require( 'react-dom' );
// const ReactDOMServer = require( 'react-dom/server' );
// const Prism = require('prismjs');
//require('prismjs/components/prism-python');
// const fs = require('fs');
// const hljs = require('highlight');
//const hljs = require('highlight.js');
// const shiki = require('shiki')
const { Buffer } = require('node:buffer');
// const runtime = require('react/jsx-runtime')
// const { renderToString , renderToStaticMarkup} = require('react-dom/server');
//const jsxToString = require('jsx-to-string')

// used by rehype-react
//const mdx_loader = require('@mdx-js/loader/lib/index.js')

// http://ipython.org/ipython-doc/3/notebook/nbformat.html


module.exports = async function (source) {
  
  //   const importReact = 'import React from "react";\n';
   // const resetStyle = "import styles from '../../styles/resetContent.module.css';\n";
  //   const wrappedExport = `
  // export default function WrappedComponent(props) {
  //   return React.createElement(
  //     'div',
  //     { className: styles.resetContent },
  //     "toto"
  //   );
  // }
  // `;
  
  //   // Return the modified source
  //   return importReact + importStyles + wrappedExport;

  // const file = await unified()
  //   .use(remarkParse.default)
  //   .use(remarkGfm.default)
  //   .use(remarkRehype.default)
  //   .use(rehypeStringify.default)
  //   .process('# Hi\n\n*Hello*, world!')

  //   console.log(String(file))

  //   return String(file)
  const mdx = await import('@mdx-js/mdx');
  const remarkParse = await import('remark-parse')
  const remarkGfm = await import('remark-gfm')
  const { unified } = await import ('unified')
  const remarkMath = await import ('remark-math')
  const remarkRehype = await import ('remark-rehype')
  const remarkPrism = await import ('remark-prism')
  const remarkDirective = await import ('remark-directive')
  const rehypeStringify = await import('rehype-stringify')
  const rehypeKatex = await import('rehype-katex')
  const rehypeReact = await import('rehype-react')
  const remarkSpecials = await import('../plugins/remark-specials.mjs')
  const mdxProviderWrapper = require('../plugins/mdx-provider-wrapper.js')
  const { MDXProvider } = await import('@mdx-js/react');
  const {visit} = await import('unist-util-visit');
  const {h} = await import('hastscript');


function myRemarkPlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const data = node.data || (node.data = {})
        const hast = h(node.name, node.attributes)

        data.hName = hast.tagName
        data.hProperties = hast.properties
      }
    }) ;
    return tree
  }
}
  
  // same chain
  const {createProcessor} = await import('@mdx-js/mdx')
  const proc_options = {
    remarkPlugins: [remarkGfm.default,remarkDirective.default,myRemarkPlugin,remarkMath.default,remarkPrism.default,remarkRehype.default,remarkSpecials.default],
    rehypePlugins: [rehypeKatex.default],//,mdxProviderWrapper],//,rehypeHighlight],//,rehypeDocument],
    providerImportSource: "@mdx-js/react",
    //outputFormat: 'function-body',
    //useDynamicImport: true
  }
  const mdxproc = createProcessor(proc_options)

  const nbJson = JSON.parse(source);
  let all_jsx = ""
  let _all_mdx = "" 
  const language = nbJson.metadata.kernelspec.language ? nbJson.metadata.kernelspec.language : "python"

  for(nbCell of nbJson.cells) { 
      switch(nbCell.cell_type) {
        case 'markdown' :
          _all_mdx += nbCell.source.join('\n')
        break
        case 'code':
          _all_mdx += "\n:::div{.ipynbcode}\n```"+language+"\n"+nbCell.source.join('\n')+"\n```\n:::\n"
          if(nbCell.outputs) {
            for(output of nbCell.outputs) {
              switch(output.output_type) {
                case "stream":
                    _all_mdx += "\n:::div{.ipynb_ouput .ipynb_text}\n```console\n"+output.text.join('\n')+"\n```\n:::\n"
                break
                case "display_data":
                case "execute_result":
                    if(output.data['text/plain']) {
                      let display_text = output.data['text/plain'].join('\n') ;
                      _all_mdx += "\n:::div{.ipynb_ouput .ipynb_display_result}\n```console\n"+display_text+"\n```\n:::\n"
                    }
                    else if(output.data['text/html']) {
                      let display_html = output.data['text/html'].join('\n') ;
                      _all_mdx += "\n:::div{.ipynb_ouput .ipynb_display_result}\n"+display_html+"\n:::\n"
                    }
                    else if(output.data['image/png']) {
                      let img_html = `<img src="data:image/png;base64,${output.data['image/png']}"/>`
                      _all_mdx += "\n![image](data:image/png;base64,"+output.data['image/png']+")\n" ;
                    }
                break
                case "raw":

                break
              }
            }
          }
        break
        case 'raw':

        break
      }
  }

  try {
    const buf = Buffer.from(_all_mdx, 'utf8');
    console.log(_all_mdx)
    all_jsx = String(await mdxproc.process(buf))
  } catch(error) {
    console.error("\n\nERROR !!!!!!!!\n\n")
    console.error(error)
  }

  const jsx_string = `import prismCss from 'prismjs/themes/prism.css';
${all_jsx}
`
  return jsx_string
};
