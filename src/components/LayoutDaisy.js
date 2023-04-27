import { useState , useRef } from 'react' ;
import { useRouter } from 'next/router';

import styles from '../styles/Layout.module.css';

import { BsArrowLeftShort , BsSearch , BsChevronDown } from 'react-icons/bs' 
import { AiFillEnvironment} from 'react-icons/ai' ;
import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from './MDXComponents.js';
import Menu from '../components/Menu.js';

const Layout = ({ children , title, menuItems }) => {
    const [open,setOpen] = useState(true)
    const router = useRouter();
    const checkbox = useRef();

    // this will bind the Drawer mechanics with our initial menu mechanics ...
    const handleChange = () => {
      setOpen(checkbox.current.checked)
    }

    const setMenuOpen = (bool) => {
      setOpen(bool) ;
      checkbox.current.checked = false ;
    }

    return (

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" onChange={handleChange} ref={checkbox}/>
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
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
        <div className={"drawer-side "+styles.leftbar+` ${open ? "w-72" : "w-20"}`}>
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <BsArrowLeftShort htmlFor="my-drawer" className={"drawer-button " + styles.menuarrow + ` ${!open && "rotate-180"}`} onClick={ ()=> setMenuOpen(!open) }/>
          <div className={styles.wrapper}>
            <AiFillEnvironment className={styles.logo+ ` ${!open && "rotate-[360deg]"}`}/>
            <Link href="/"><h1 className={styles.maintitle+ ` ${!open && "scale-0 width-0"}`}>{title}</h1></Link>
          </div>
          <div className={styles.searchitem+` ${!open?"px-2.5":"px-4"}`}>
            <BsSearch className={styles.searchicon+ ` ${open && "mr-2"}`}/>
            <input className={styles.searchinput+` ${!open && "hidden"}` } type={"search"} placeholder="Search"/>
          </div>
          <Menu open={open} menuItems={menuItems}/>
        </div>
      </div>      
    )
    {
      /*
      <div className="flex">
        <div className={styles.leftbar+` ${open ? "w-72" : "w-20"}`} >
        </div>
      </div>
    */
    }
} ;

export default Layout ;