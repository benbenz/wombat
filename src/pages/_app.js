import '@/styles/ipynbStyle.css'
/*
Order here is really important
- some stuff override prism in global.css
- Layout3.js imports DaisyMenuHack.module.css which also adds important overrides to globals >> tailwind/daisyui
*/
//import 'prismjs/themes/prism.css';
//import 'highlight.js/styles/github.css';
import 'highlight.js/styles/atom-one-light.css';
import '@/styles/globals.css'
import Layout from '../components/LayoutDrawer.js'
import SiteConfig from '../../site.js' ;

export default function App({ Component, pageProps }) {
  

  const title = "Econ" ;
  const title_extra = "2023"

  return <Layout menuItems={SiteConfig.menuItems} title={title} title_extra={title_extra}><Component {...pageProps} /></Layout>
}
