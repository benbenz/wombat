// loaders/ipynb-loader.js
// http://ipython.org/ipython-doc/3/notebook/nbformat.html

const { Buffer }   = require('node:buffer');
const escape = require('escape-html'); 

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
    const rehypeHighlight = await import('rehype-highlight')
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
                      remarkParse.default,
                      remarkGfm.default,
                      remarkDirective.default,
                      myRemarkPlugin, // adds classes and ids to DIVs etc.
                      remarkMath.default,
                      //remarkPrism.default,
                      remarkRehype.default,
                      remarkSpecials.default
                    ],
      rehypePlugins: [
                      rehypeHighlight.default,
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
  const language = nbJson.metadata.kernelspec.language ? nbJson.metadata.kernelspec.language : "python" ;

  //_all_mdx += `import Tabs from '../../components/Tabs.js';\n` ;
  _all_mdx += `import Tabs from '../../components/TabsJS.js';\n\n` ;

  for(nbCell of nbJson.cells) { 
      switch(nbCell.cell_type) {
        case 'markdown' :
          _all_mdx += nbCell.source.join('\n')
          _all_mdx += '\n' 
        break
        case 'code':
          _all_mdx += "\n:::div{.ipynb-code}\n```"+language+"\n"+nbCell.source.join('\n')+"\n```\n:::\n"
          if(nbCell.outputs) {
            let tabs_names   = []
            let tabs_content = [] 
            let tab_index    = 0 
            let img_index    = 0 
            let term_index   = 0 
            for(output of nbCell.outputs) {
              switch(output.output_type) {
                case "stream":
                  tabs_names[tab_index] = "Output #" + term_index 
                  tabs_content[tab_index] = "\n:::div{.ipynb-output .ipynb-text}\n```console\n"+output.text.join('\n')+"\n```\n:::\n"
                  term_index++ 
                  tab_index++ 
                break
                case "display_data":
                case "execute_result":
                  if(output.data['image/png']) {
                    //let img_html = `<img src="data:image/png;base64,${output.data['image/png']}"/>`
                    tabs_names[tab_index] = "Image #" + img_index
                    img_index++ ; 
                    tabs_content[tab_index] = "\n![image](data:image/png;base64,"+output.data['image/png']+")\n" ;
                  }
                  else if(output.data['text/html']) {
                    let display_html = output.data['text/html'].join('\n') ;
                    tabs_content[tab_index] = "\n:::div{.ipynb-output .ipynb-display-result}\n"+display_html+"\n:::\n"
                  }

                  if(output.data['text/plain']) {
                    let display_text = escape(output.data['text/plain'].join('\n')) ;
                    tabs_content[tab_index] += "\n:::div{.ipynb-output .ipynb-display-label}\n"+display_text+"\n:::\n"
                  }

                  tab_index++ ;
                    
                break
                case "raw":

                break
              }
            }
            _all_mdx += "\n<Tabs>\n"
            for(let i=0 ; i<tabs_names.length ; i++) {
              _all_mdx += "<div label=\"" +tabs_names[i]+"\">\n" ;
              _all_mdx += tabs_content[i] ;
              _all_mdx += "</div>\n" ;
            }
            _all_mdx += "\n</Tabs>\n"
            _all_mdx += '\n' 
          }
        break
        case 'raw':

        break
      }
  }

  console.log(_all_mdx) ;

  try {
    all_jsx = await compiler.process(_all_mdx)
  } catch(error) {
    console.error("\n\nERROR !!!!!!!!\n\n")
    console.error(error)
    console.error(_all_mdx)
  }

//   const jsx_string = `import prismCss from 'prismjs/themes/prism.css';
// ${all_jsx}
// `
//   return jsx_string
  return `${all_jsx}`
};
