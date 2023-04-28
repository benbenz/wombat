/**
 * @typedef {import('@mdx-js/mdx').CompileOptions} CompileOptions
 * @typedef {import('vfile').VFileCompatible} VFileCompatible
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile-message').VFileMessage} VFileMessage
 * @typedef {import('webpack').LoaderContext<unknown>} LoaderContext
 * @typedef {import('webpack').Compiler} WebpackCompiler
 */

/**
 * @typedef {Pick<CompileOptions, 'SourceMapGenerator'>} Defaults
 * @typedef {Omit<CompileOptions, 'SourceMapGenerator'>} Options
 *   Configuration.
 *
 * @callback Process
 *   Process.
 * @param {VFileCompatible} vfileCompatible
 *   Input.
 * @returns {Promise<VFile>}
 *   File.
 */

import {createHash} from 'node:crypto'
import path from 'node:path'
import {SourceMapGenerator} from 'source-map'
import {createFormatAwareProcessors} from '@mdx-js/mdx/lib/util/create-format-aware-processors.js'

const own = {}.hasOwnProperty

// http://ipython.org/ipython-doc/3/notebook/nbformat.html

// const { Buffer }   = require('node:buffer');
// import { Buffer } from 'node:buffer'
// import { unified } from 'unified'
// import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import remarkPrism from 'remark-prism'
import remarkDirective from 'remark-directive'
import rehypeKatex from 'rehype-katex'
// import rehypePrism from 'rehype-prism'
// import rehypeStringify from 'rehype-stringify'
// import rehypeReact from 'rehype-react'
import remarkSpecials from '../plugins/remark-specials.mjs'
import {visit} from 'unist-util-visit';
import {h} from 'hastscript';
import {createProcessor} from '@mdx-js/mdx'

    /*
    This remark plugin adds the attributes (classes and ids)
    To the elements added by remark-directive
    */

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
  //const {createProcessor} = await import('@mdx-js/mdx')
  const proc_options = {
    remarkPlugins: [
                    //remarkParse,
                    remarkGfm,
                    remarkDirective,
                    myRemarkPlugin, // adds classes and ids to DIVs etc.
                    remarkMath,
                    remarkPrism,
                    remarkRehype,
                    //rehypePrism,
                    remarkSpecials
                  ],
    rehypePlugins: [
                    //rehypePrism,
                    rehypeKatex
                  ],
    providerImportSource: "@mdx-js/react",
    //outputFormat: 'function-body',
    //useDynamicImport: true
  }

  const mdxproc = createProcessor(proc_options)

// you have to load css manual
// import 'prismjs/themes/prism-coy.css'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
// import 'prismjs/components/prism-python'

//module.exports = async function (source) {
//const IpynbLoader = async function(source) {
//const IpynbLoader = async function (source,data) {
/**
 * A Webpack (5+) loader for MDX.
 * See `webpack.cjs`, which wraps this, because Webpack loaders must currently
 * be CommonJS.
 *
 * @this {LoaderContext}
 * @param {string} value
 * @param {LoaderContext['callback']} callback
 */
export function loader(source, callback) {

  const COMPILER_KEY = { key : '__ipynb_compiler__' } ;

  const cache  = new WeakMap()

  let compiler = cache.get(COMPILER_KEY) ;

  if(!compiler) {

    console.log("STARTED BUILDING COMPILER") ;

    // const { unified } = await import ('unified')
    // const remarkParse = await import('remark-parse')
    // const remarkGfm = await import('remark-gfm')
    // const remarkMath = await import ('remark-math')
    // const remarkRehype = await import ('remark-rehype')
    // const remarkPrism = await import ('remark-prism')
    // const remarkDirective = await import ('remark-directive')
    // const rehypeKatex = await import('rehype-katex')
    // const rehypePrism = await import('rehype-prism')
    // const rehypeStringify = await import('rehype-stringify')
    // const rehypeReact = await import('rehype-react')
    // const remarkSpecials = await import('../plugins/remark-specials.mjs')
    // const {visit} = await import('unist-util-visit');
    // const {h} = await import('hastscript');

    compiler = mdxproc ;
    cache.set(COMPILER_KEY,compiler)

    console.log("ENDED BUILDING COMPILER") ;

  }
  const nbJson = JSON.parse(source);
  let _all_mdx = "" 
  const language = nbJson.metadata.kernelspec.language ? nbJson.metadata.kernelspec.language : "python"

  for(let nbCell of nbJson.cells) { 
      switch(nbCell.cell_type) {
        case 'markdown' :
          _all_mdx += nbCell.source.join('\n')
        break
        case 'code':
          _all_mdx += "\n:::div{.ipynbcode}\n```"+language+"\n"+nbCell.source.join('\n')+"\n```\n:::\n"
          if(nbCell.outputs) {
            for(let output of nbCell.outputs) {
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
                      //let img_html = `<img src="data:image/png;base64,${output.data['image/png']}"/>`
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

  compiler.process(_all_mdx).then(  ( all_jsx ) => {

  const jsx_string = `import prismCss from 'prismjs/themes/prism.css';
${all_jsx}
`
  //return jsx_string
  callback(null, jsx_string);
}).catch( (error) => {
  console.error("\n\nERROR !!!!!!!!\n\n")
  console.error(error)
  callback(error,"")
});

}


// export default IpynbLoader ;