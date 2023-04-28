// loaders/ipynb-loader.js
// http://ipython.org/ipython-doc/3/notebook/nbformat.html

const { Buffer }   = require('node:buffer');

module.exports = async function (source) {

  const COMPILER_KEY = { key : '__ipynb_compiler__' } ;

  const cache  = new WeakMap()

  let compiler = cache.get(COMPILER_KEY) ;

  if(!compiler) {

    console.log("STARTED BUILDING COMPILER") ;

    const { unified } = await import ('unified')
    const remarkParse = await import('remark-parse')
    const remarkGfm = await import('remark-gfm')
    const remarkMath = await import ('remark-math')
    const remarkRehype = await import ('remark-rehype')
    const remarkPrism = await import ('remark-prism')
    const remarkDirective = await import ('remark-directive')
    const rehypeKatex = await import('rehype-katex')
    const rehypeStringify = await import('rehype-stringify')
    const rehypeReact = await import('rehype-react')
    const remarkSpecials = await import('../plugins/remark-specials.mjs')
    const {visit} = await import('unist-util-visit');
    const {h} = await import('hastscript');

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
    const {createProcessor} = await import('@mdx-js/mdx')
    const proc_options = {
      remarkPlugins: [
                      remarkGfm.default,
                      remarkDirective.default,
                      myRemarkPlugin, // adds classes and ids to DIVs etc.
                      remarkMath.default,
                      //remarkPrism.default,
                      remarkRehype.default,
                      remarkSpecials.default
                    ],
      rehypePlugins: [
                      rehypeKatex.default
                    ],
      providerImportSource: "@mdx-js/react",
      //outputFormat: 'function-body',
      //useDynamicImport: true
    }

    const mdxproc = createProcessor(proc_options)

    compiler = mdxproc ;
    cache.set(COMPILER_KEY,compiler)

    console.log("ENDED BUILDING COMPILER") ;

  }

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

  try {
    all_jsx = await compiler.process(_all_mdx)
  } catch(error) {
    console.error("\n\nERROR !!!!!!!!\n\n")
    console.error(error)
  }

  const jsx_string = `import prismCss from 'prismjs/themes/prism.css';
${all_jsx}
`
  return jsx_string
};
