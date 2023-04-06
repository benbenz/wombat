import { useState } from 'react' ;
import Menu from '../components/Menu.js';
import { BsArrowLeftShort , BsSearch , BsChevronDown } from 'react-icons/bs' 
import { AiFillEnvironment} from 'react-icons/ai' ;
import styles from '../styles/Layout.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import resetStyle from '../styles/resetContent.module.css';

const Layout = ({ children , title, menuItems }) => {
    const [open,setOpen] = useState(true)
    const router = useRouter();
    let doReset = false 
    if(    router.pathname.startsWith('/mdx/')
        || router.query['reset']
      ) {
      doReset = true
    } 
    return (
    <div className="flex">
    
    <div className={styles.leftbar+` ${open ? "w-72" : "w-20"}`} >
            <BsArrowLeftShort className={styles.menuarrow + ` ${!open && "rotate-180"}`} onClick={ ()=> setOpen(!open) }/>
       <div className={styles.wrapper}>
         <AiFillEnvironment className={styles.logo+ ` ${!open && "rotate-[360deg]"}`}/>
         <Link href="/"><h1 className={styles.maintitle+ ` ${!open && "scale-0 width-0"}`}>{title}</h1></Link>
       </div>
       <div className={styles.searchitem+` ${!open?"px-2.5":"px-4"}`}>
          <BsSearch className={styles.searchicon+ ` ${open && "mr-2"}`}/>
          <input className={styles.searchinput+` ${!open && "hidden"}` } type={"search"} placeholder="Search"/>
        </div>

        <Menu open={open} menuItems={menuItems}/>

        </div>{/* wrapper */}
    
        <main className={styles.main+" "}>
            <div className="p-7">
              <div className={doReset ? resetStyle.resetContent : undefined}>
                  {children}
              </div>
            </div>
        </main>
    
    </div>
    )
} ;

export default Layout ;