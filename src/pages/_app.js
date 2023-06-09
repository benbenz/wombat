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
import SiteConfigDefault from '/site.js' ;
import path from 'path' ;
import App from 'next/app' ;


export default function MyApp({ Component, pageProps }) {

  return <Layout  menuItems={SiteConfigDefault.menuItems}
                  title={SiteConfigDefault.title}
                  title_extra={SiteConfigDefault.title_extra}>
            <Component {...pageProps} />
        </Layout>
}

/*
class MyApp extends App {
  static async getInitialProps(appContext) {
    // Call the original getInitialProps
    const appProps = await App.getInitialProps(appContext);
    // Get the dynamic content path from npm args
    let dynamicPath = process.env.npm_config_content ?
                      path.join(path.resolve(process.env.npm_config_content),'site.js')
                      : null ;
    // load the settings
    let SiteConfigDyn = null ;
    if(dynamicPath)
      SiteConfigDyn = await import(__dirname+'/../../') ;

    // Pass SiteConfig to the page
    if(SiteConfigDyn)
      return { ...appProps, SiteConfig: SiteConfigDyn.default }
    else
      return { ...appProps, SiteConfig: SiteConfigDefault }
  }

  render() {
    const { Component, pageProps, SiteConfig } = this.props ;
    return <Layout  menuItems={SiteConfig.menuItems}
                  title={SiteConfig.title}
                  title_extra={SiteConfig.title_extra}>
              <Component {...pageProps} />
            </Layout>
  }
}

export default MyApp;
*/