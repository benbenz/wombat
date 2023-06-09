module.exports = async function (source) {

  const COMPILER_KEY = { key : '__allcode_compiler__' }

  const cache  = new WeakMap()

  let compiler = cache.get(COMPILER_KEY)

  if(!compiler) {

    const remarkParse = await import('remark-parse')
    const remarkGfm = await import('remark-gfm')
    const remarkRehype = await import ('remark-rehype')
    const rehypeHighlight = await import('rehype-highlight')
    
    // same chain
    const {createProcessor} = await import('@mdx-js/mdx')
    const proc_options = {
      remarkPlugins: [
                      remarkParse.default,
                      remarkGfm.default,
                      remarkRehype.default,
                    ],
      rehypePlugins: [
                      // rehypeHighlight.default,
                    ],
      providerImportSource: "@mdx-js/react",
    }

    //console.log(rehypeHighlight.default) ;

    const mdxproc = createProcessor(proc_options)
    mdxproc.use(rehypeHighlight.default,{detect:true}) ;

    compiler = mdxproc ;
    cache.set(COMPILER_KEY,compiler)

  }

  const _all_mdx = "```cpp\n"+source+"\n```" ;

  try {
    all_jsx = await compiler.process(_all_mdx)
  } catch(error) {
    console.error("\n\nERROR !!!!!!!!\n\n")
    console.error(error)
    console.error(_all_mdx)
  }

  return `${all_jsx}`
};
