import Menu from './MenuDaisy.js';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from './MDXComponents.js';
import Link from 'next/link';

const Layout = ({ children , title, menuItems }) => {

  const checkMobile = (element) => {
    return parseInt(getComputedStyle(element).getPropertyValue('--is-mobile'));      
  }

  /*
  useEffect(() => {
    if(checkMobile(document.documentElement))
      setOpen(false)
  });
  */

  const handleMenuItemClick = (event) => {
    event.target.blur();
    document.getElementById('mainContent').focus();
  };

  return (

    <div className="container_v3">
      <div className="navcontainer">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div id="the_dropdown" className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <Menu 
                menuIndex={0}
                menuItems={menuItems}
                onMenuItemClick={handleMenuItemClick}
                forMobile={true}/>
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-xl">{title}</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <Menu
                menuIndex={1}
                menuItems={menuItems}
                onMenuItemClick={handleMenuItemClick}
                orientation="horizontal"
                forMobile={false}/>
        </div>
        <div className="navbar-end">
          {/*<a className="btn">Get started</a>*/}
        </div>
      </div>
      </div>{/* navcontainer */}
      <main id="mainContent">
          <div className="p-7">
            <div>
                <MDXProvider components={MDXComponents}>
                  {children}
                </MDXProvider>
            </div>
          </div>
      </main>
    
    </div>
  )
} ;

export default Layout ;