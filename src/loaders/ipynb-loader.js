// loaders/ipynb-loader.js
React = require('react');
ReactDOM = require( 'react-dom' );
ReactDOMServer = require( 'react-dom/server' );
const Prism = require('prismjs');
require('prismjs/components/prism-python');
// const fs = require('fs');
// const hljs = require('highlight');
//const hljs = require('highlight.js');
const shiki = require('shiki')
const { Buffer } = require('node:buffer');
const runtime = require('react/jsx-runtime')

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
//const rehypeHighlight = await import ('rehype-highlight')
const rehypeStringify = await import('rehype-stringify')
const rehypeKatex = await import('rehype-katex')
const remarkSpecials = await import('../plugins/remark-specials.mjs')
const mdxProviderWrapper = require('../plugins/mdx-provider-wrapper.js')
//const rehypeDocument = await import('rehype-document')
//const lang_python = await import('highlight/lib/vendor/highlight.js/languages/python.js')
const shikiHighlighter = await shiki.getHighlighter({theme: 'dark-plus'})

// same chain
const {createProcessor} = await import('@mdx-js/mdx')
const proc_options = {
  remarkPlugins: [remarkGfm,remarkMath,remarkPrism,remarkRehype,remarkSpecials],
  rehypePlugins: [rehypeKatex],//,mdxProviderWrapper],//,rehypeHighlight],//,rehypeDocument],
  providerImportSource: "@mdx-js/react",
  outputFormat: 'function-body',
  //useDynamicImport: true
}
const mdxproc = createProcessor(proc_options)
//console.log(mdxproc)

const processChain = unified()
.use(remarkParse.default,{fragment:true})
.use(remarkGfm.default)
.use(remarkMath.default)
.use(remarkSpecials.default)
.use(remarkRehype.default,{ allowDangerousHtml: true })
//.use(mdxProviderWrapper)
.use(rehypeKatex.default)
// .use(rehypeDocument.default, {
//     css: 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css'
// })
.use(rehypeStringify.default)

const processChainCode = unified()
.use(remarkParse.default,{fragment:true})
//.use(remarkPrism.default)
.use(remarkGfm.default)
.use(remarkMath.default)
.use(remarkRehype.default)
//.use(rehypeHighlight.default,{detect:true})
.use(rehypeKatex.default)
.use(rehypeStringify.default)

const nbJson = JSON.parse(source);
let all_html = ""
let all_jsx = ""
let mdx_block_counter = 1
var jsx_block = ''
const language = nbJson.metadata.kernelspec.language ? nbJson.metadata.kernelspec.language : "python"
  for(nbCell of nbJson.cells) { 
      switch(nbCell.cell_type) {
        case 'markdown' :
          try {
            const buf = Buffer.from(nbCell.source.join('\n'), 'utf8');
            jsx_block = String(await mdxproc.process(buf))
            jsx_block = jsx_block.replace(/const\s*{.*}\s*=\s*arguments\[0\]\s*;/g,'')
            jsx_block = jsx_block.replace(/export default MDXContent;/g,'')
            jsx_block = jsx_block.replace(/return\s*{\s*default\s*:\s*MDXContent\s*}\s*;/g,'')
            jsx_block = jsx_block.replace(/MDXContent/g,`MDXContent${mdx_block_counter}`)
            jsx_block = jsx_block.replace(/_createMdxContent/g,`_createMdxContent${mdx_block_counter}`)
            //jsx_block = `\n{\n${jsx_block}\n}\n`
            mdx_block_counter++
            //console.log("\n============== NEW COMP =================\n");
            //console.log(jsx_block)
            all_jsx = all_jsx + jsx_block
            //var MDXComponent = await mdxproc.run(jsx_block,runtime)
            //console.log(MDXComponent)
          } catch(err) {
            console.error(err)
          }
          //mdxSourceJsx = mdx.runSync(nbCell.source.join(''))
          //mdxSource = mdx.compileSync(nbCell.source.join(''))
          //console.log(mdxSourceJsx)
          //mdxSource    = React.createElement(mdxSourceJsx.default)
          const html_md = await processChain.process(nbCell.source.join('\n'))
          all_html = all_html + `<div class="ipynb_markdown">${String(html_md)}</div>`
        break
        case 'code':

          // processChain
          //const sourceCode = "```"+language+"\n"+nbCell.source.join('\n')+"\n```"
          // PrismJS + ShikiJS
          const sourceCode = nbCell.source.join('\n')
          //const html_code = await processChainCode.process(sourceCode)
          //const html_code = hljs.highlight(sourceCode,{language:language})
          const html_code = Prism.highlight(sourceCode, Prism.languages[language], language);
          //const html_code = shikiHighlighter.codeToHtml(sourceCode,{lang:language})
          // processChain
          //all_html = all_html + `<div class="ipynb_code"><code class="ipynb_code">${String(html_code)}</code></div>`
          // PrismJS
          inner_pre = `<pre class="language-${language}><code class="language-${language}">${String(html_code)}</code></pre>`
          all_html = all_html + `<div class="ipynb_code">${inner_pre}</div>`

          jsx_block = `
          function MDXContent${mdx_block_counter}(props) {
            const html = \`${inner_pre.replace(/`/g, '\\`')}\`;
            return React.createElement('div', {
              className: 'ipynb_code',
              dangerouslySetInnerHTML: { __html: html },
            });
          };        
          `;
          mdx_block_counter++
          all_jsx = all_jsx + jsx_block

          // ShikiJS
          //all_html = all_html + `<div class="ipynb_code">${String(html_code)}</div>`
          if(nbCell.outputs) {
            for(output of nbCell.outputs) {
              switch(output.output_type) {
                case "stream":
                    all_html = all_html + `<div class="ipynb_ouput ipynb_text">${output.text.join('\n')}</div>`
                break
                case "display_data":
                case "execute_result":
                    let display_html = output.data['text/plain'] ? output.data['text/plain'].join('\n') : ''
                    if(output.data['image/png']) {
                      let img_html = `<img src="data:image/png;base64,${output.data['image/png']}"/>`
                      display_html += '\n' + img_html
                    }
                    all_html = all_html + `<div class="ipynb_ouput ipynb_display_result">${display_html}</div>`
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
  //console.log("ALL HTML FINAL =",all_html)
  //all_html = `<div className="ipynb_notebook resetContent">${all_html}</div>`
  
  //let mainContainer = React.createElement("div", { className: "ipynb_notebook" },elements);  
  // notebook.styles = `
  //   ${hljs.getStyleSheet('default')}
  // `;

  // notebook.on('code', (code) => {
  //   const highlightedCode = hljs.highlight('python', code).value;
  //   return highlightedCode;
  // });
  //const allhtml = ReactDOMServer.renderToString(mainContainer) //ReactDOM.render(mainContainer);
  //return `export default function (props) { return return React.createElement(<div dangerouslySetInnerHTML={{ __html: \`${html}\` }}/>) }`;

  var mdxCompsArray = 'const _all_components = [' ;
  for(let i=1 ; i<mdx_block_counter ; i++)
      mdxCompsArray += (i>1 ? ', ' : '') + `MDXContent${i}()` ;
  mdxCompsArray += "];"
  
  const jsx_string = `import React from "react";
  import Head from 'next/head';
  //import resetStyle from '../../styles/resetContent.module.css';
  //import ipynbStyle from '../../styles/ipynbStyle.module.css';
  // needed by the elements added by the MDXProviderWrapper
  import { MDXProvider } from '@mdx-js/react';
  import MDXComponents from '../../components/MDXComponents';
  import prismCss from 'prismjs/themes/prism.css';
  import {Fragment as _Fragment , jsxDEV as _jsxDEV , jsx as _jsx, jsxs as _jsxs} from 'react/jsx-dev-runtime';
  import {useMDXComponents as _provideComponents} from '@mdx-js/react';
  const html = \`${all_html.replace(/`/g, '\\`')}\`;

  ${all_jsx}

  // function WrappedIpynbComponent(props) {
  // ${mdxCompsArray}
  // return React.createElement(MDXProvider, { children: _all_components });    
  // }
  // WrappedIpynbComponent.displayName = 'WrappedIpynbComponent';
  // export default WrappedIpynbComponent;

  function IpynbComponent(props) {
    return React.createElement('div', {
      //className: resetStyle.resetContent + ' ipynb_notebook', 
      className: 'ipynb_notebook',
      dangerouslySetInnerHTML: { __html: html },
    });
  };
  IpynbComponent.displayName = 'ipynbComponent';
  export default IpynbComponent;

  // const WrappedIpynbComponent = (props) => (
  //   <MDXProvider components={MDXComponents}>
  //     <IpynbComponent {...props} />
  //   </MDXProvider>
  // );
  
  // WrappedIpynbComponent.displayName = 'WrappedIpynbComponent';
  // export default WrappedIpynbComponent;
  `
  console.log(jsx_string)
  return jsx_string
};
