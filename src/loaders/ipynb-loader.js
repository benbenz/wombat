// loaders/ipynb-loader.js
React = require('react');
ReactDOM = require( 'react-dom' );
ReactDOMServer = require( 'react-dom/server' );
// const fs = require('fs');
// const hljs = require('highlight');


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
const rehypeHighlight = await import ('rehype-highlight')
const rehypeStringify = await import('rehype-stringify')
const rehypeKatex = await import('rehype-katex')
const rehypeDocument = await import('rehype-document')
//const lang_python = await import('highlight/lib/vendor/highlight.js/languages/python.js')

const processChain = unified()
.use(remarkParse.default,{fragment:true})
.use(remarkGfm.default)
.use(remarkMath.default)
.use(remarkRehype.default)
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
.use(rehypeHighlight.default,{detect:true})
.use(rehypeKatex.default)
.use(rehypeStringify.default)

  const nbJson = JSON.parse(source);
  let all_html = ""
  for(nbCell of nbJson.cells) { 
      switch(nbCell.cell_type) {
        case 'markdown' :
          //mdxSourceJsx = mdx.runSync(nbCell.source.join(''))
          //mdxSource = mdx.compileSync(nbCell.source.join(''))
          //console.log(mdxSourceJsx)
          //mdxSource    = React.createElement(mdxSourceJsx.default)
          const html_md = await processChain.process(nbCell.source.join('\n'))
          all_html = all_html + `<div class="ipynb_markdown">${String(html_md)}</div>`
        break
        case 'code':
          const sourceCode = "```python\n"+nbCell.source.join('\n')+"\n```"
          const html_code = await processChainCode.process(sourceCode)
          all_html = all_html + `<div class="ipynb_code"><code class="ipynb_code">${String(html_code)}</code></div>`
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
  const jsx_string = `import React from "react";
  import Head from 'next/head';
  import resetStyle from '../../styles/resetContent.module.css';
  //import ipynbStyle from '../../styles/ipynbStyle.module.css';
  const html = \`${all_html.replace(/`/g, '\\`')}\`;
  function ipynbComponent(props) {
    return React.createElement('div', {
      className: resetStyle.resetContent + ' ipynb_notebook', 
      dangerouslySetInnerHTML: { __html: html },
    });
  };
  ipynbComponent.displayName = 'ipynbComponent';
  //export default React.memo(ipynbComponent);
  export default ipynbComponent;
  `
  //console.log(jsx_string)
  return jsx_string
};
