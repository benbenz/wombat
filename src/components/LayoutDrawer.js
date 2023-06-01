import { useState , useRef } from 'react' ;
import { useRouter } from 'next/router';

import styles from '../styles/Layout.module.css';

import { BsArrowLeftShort , BsSearch , BsChevronDown } from 'react-icons/bs' 
import { AiFillEnvironment, AiOutlineMenu } from 'react-icons/ai' ;
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from './MDXComponents.js';
import Menu from './MenuDaisy.js';
import Link from 'next/link';

const Layout = ({ children , title, title_extra, menuItems }) => {
    const [open,setOpen] = useState(false)
    const router = useRouter();
    const checkbox = useRef();

    // this will bind the Drawer mechanics with our initial menu mechanics ...
    const handleChange = (event) => {
      setOpen(event.target.checked)
    }

    const handleMenuItemClick = (event) => {
      let closeMenu = router.asPath=="/" ;
    
      if(closeMenu) {
        event.target.blur();
        document.getElementById('mainContent').focus();
        setOpen(false)
      }
    };

    return (

      <div className={"bg-base-100 drawer "+(router.asPath!="/"?"drawer-mobile":"")}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" onChange={handleChange} checked={open}/>
        <div className="drawer-content scroll-smooth scroll-pt-5rem">
          {/*<label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>*/}
          <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 text-primary-content">
            <div className={"navbar w-full flex flex-1 md:gap-1 lg:gap-2 "+styles.navbar}>
              <div className={"navbar-start "+(router.asPath!="/"?"lg:hidden":"")}>
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button ">
                  {/*<AiOutlineMenu className={styles.logo2+` inline-block h-5 w-5 stroke-current md:h-6 md:w-6 ${!open && "rotate-[360deg]"}`} onClick={()=>setOpen(!open)}/>*/}
                    <AiOutlineMenu className={styles.logo2+` inline-block h-5 w-5 stroke-current md:h-6 md:w-6 ${!open && "rotate-[360deg]"}`}/>
                </label>
                {/*<Link href="/" className="btn btn-ghost normal-case text-4xl">{title}</Link>*/}
                <Link href="/" aria-current="page" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
                  <div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                    <span className="lowercase">{title}</span>
                    {title_extra &&(<span className="text-base-content uppercase">{title_extra}</span>)}
                  </div>
                </Link>
              </div>
              <div className="navbar-center">
              </div>
            </div>
          </div>
          <div className="px-6 xl:pr-2 pb-16">
            <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
              <div className="prose w-full max-w-8xl flex-grow">
                <main id="mainContent" className={styles.main+" "}>
                  <div className="p-7">
                    <div>
                        <MDXProvider components={MDXComponents}>
                          {children}
                        </MDXProvider>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div> 
        {/*<div className={"drawer-side "+styles.leftbar+` ${open ? "w-72" : "w-20"}`}>*/}
        <div className="drawer-side scroll-smooth scroll-pt-5rem">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <aside className="bg-base-200 w-80">
            <div className="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex shadow-sm">
              <Link href="/" aria-current="page" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
                <div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                  <span className="lowercase">{title}</span>
                  {title_extra &&(<span className="text-base-content uppercase">{title_extra}</span>)}
                </div>
              </Link>
              {/*
              <a href="/docs/changelog" className="link link-hover font-mono text-xs text-opacity-50">
                <div data-tip="Changelog" className="tooltip tooltip-bottom">2.52.0</div>
              </a>
              */}
            </div>
            <div className="h-4"></div>
            <Menu className={"menu menu-compact flex flex-col p-0 px-4"}
                  menuIndex={1}
                  menuItems={menuItems}
                  onMenuItemClick={handleMenuItemClick}
                  orientation="vertical"
                  forMobile={false}
                  title={false}/>       
            <div className="from-base-200 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent"></div>
          </aside>
        </div>
      </div>      
    )
} ;

export default Layout ;