import { useState , useRef } from 'react' ;
import { useRouter } from 'next/router';

import styles from '../styles/Layout.module.css';

import { BsArrowLeftShort , BsSearch , BsChevronDown } from 'react-icons/bs' 
import { AiFillEnvironment, AiOutlineMenu } from 'react-icons/ai' ;
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from './MDXComponents.js';
import Menu from './MenuDaisy.js';
import Link from 'next/link';

const Layout = ({ children , title, menuItems }) => {
    const [open,setOpen] = useState(true)
    const router = useRouter();
    const checkbox = useRef();

    // this will bind the Drawer mechanics with our initial menu mechanics ...
    const handleChange = (event) => {
      setOpen(event.target.checked)
    }

    const handleMenuItemClick = (event) => {
      event.target.blur();
      document.getElementById('mainContent').focus();
      setOpen(false)
    };

    return (

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" onChange={handleChange} checked={open}/>
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
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
        {/*<div className={"drawer-side "+styles.leftbar+` ${open ? "w-72" : "w-20"}`}>*/}
        <div className={"drawer-side"}>
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          {/*
            <AiOutlineMenu className={styles.logo+ ` ${!open && "rotate-[360deg]"}`} onClick={()=>setOpen(!open)}/>
            <Link href="/"><h1 className={styles.maintitle+ ` ${!open && "scale-0 width-0"}`}>{title}</h1></Link>
          */}
          <Menu className={"w-80"}
                menuIndex={1}
                menuItems={menuItems}
                onMenuItemClick={handleMenuItemClick}
                orientation="vertical"
                forMobile={false}/>                
        </div>
      </div>      
    )
} ;

export default Layout ;