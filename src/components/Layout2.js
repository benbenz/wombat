import { useState } from 'react' ;
import Menu from '../components/Menu.js';
import { BsArrowLeftShort , BsSearch , BsChevronDown } from 'react-icons/bs' 
import { AiFillEnvironment, AiOutlineMenu} from 'react-icons/ai' ;
import styles from '../styles/Layout.module.css';
import Link from 'next/link';

import { MDXProvider } from '@mdx-js/react';
import MDXComponents from './MDXComponents.js';


const Layout = ({ children , title, menuItems }) => {
    const [open,setOpen] = useState(true)

    const handleMenuItemClick = (event) => {
      const isMobile = parseInt(getComputedStyle(event.target).getPropertyValue('--is-mobile'));
      if (isMobile) {
        setOpen(false)
      }      
    };

    return (
    <div className={"l2_container flex "+ (open?"open":"closed")}>
    
    <div className={"leftbar " + styles.leftbar} >
        <BsArrowLeftShort className={'menuarrow ' + styles.menuarrow + ` ${!open && "rotate-180"}`} onClick={()=>setOpen(!open)}/>
       <div className={styles.wrapper}>
         <AiOutlineMenu className={styles.logo+ ` ${!open && "rotate-[360deg]"}`} onClick={()=>setOpen(!open)}/>
         <Link href="/"><h1 className={'mainTitle ' + styles.maintitle+ ` ${!open && "scale-0 width-0"}`}>{title}</h1></Link>
       </div>
       {/*
       <div className={styles.searchitem+` ${!open?"px-2.5":"px-4"}`}>
          <BsSearch className={styles.searchicon+ ` ${open && "mr-2"}`}/>
          <input className={styles.searchinput+` ${!open && "hidden"}` } type={"search"} placeholder="Search"/>
        </div>
       */}

        <Menu open={open} menuItems={menuItems} onMenuItemClick={handleMenuItemClick} />

      </div>{/* leftbar */}
    
      <main className={styles.main+" "}>
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