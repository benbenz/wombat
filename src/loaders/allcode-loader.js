
module.exports = async function (source) {

  const COMPILER_KEY = { key : '__allcode_compiler__' }

  const cache  = new WeakMap()

  let compiler = cache.get(COMPILER_KEY)

  if(!compiler) {

    const remarkParse = await import('remark-parse')
    const remarkGfm = await import('remark-gfm')
    const remarkMath = await import ('remark-math')
    const remarkRehype = await import ('remark-rehype')
    const rehypeKatex = await import('rehype-katex')
    const rehypeHighlight = await import('rehype-highlight')

    function rehypeHighlightWrapper(options) {
      return rehypeHighlight.default({...options,detect:true,
                    subset:['c','cpp','h','hpp','julia','python','php','javascript','R']}) ;
    }
        
    // same chain
    const {createProcessor} = await import('@mdx-js/mdx')
    const proc_options = {
      remarkPlugins: [
                      remarkParse.default,
                      remarkGfm.default,
                      remarkMath.default,
                      remarkRehype.default,
                    ],
      rehypePlugins: [
                      rehypeKatex,
                      rehypeHighlightWrapper
                    ],
      providerImportSource: "@mdx-js/react"
    }

    //console.log(rehypeHighlight.default) ;

    const mdxproc = createProcessor(proc_options)
    //mdxproc.use(rehypeHighlight.default,{detect:true}) ;

    compiler = mdxproc ;
    cache.set(COMPILER_KEY,compiler)

  }

  const _all_mdx = "```\n"+source+"\n```" ;
  let all_jsx = "" ;
  try {
    all_jsx = await compiler.process(_all_mdx)
  } catch(error) {
    console.error("\n\nERROR !!!!!!!!\n\n")
    console.error(error)
    console.error(_all_mdx)
  }

  return `${all_jsx}`
};
