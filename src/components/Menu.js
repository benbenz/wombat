import { BsArrowLeftShort , BsSearch , BsChevronDown } from 'react-icons/bs' 
import { RiDashboardFill } from 'react-icons/ri' ;

import { useState } from 'react' ;
import styles from '../styles/Menu.module.css';
import Link from 'next/link';

function MenuLink({menu}) {
    if(menu.link) {
        if(menu.link.endsWith(".html"))
            return <Link href={"/page/html/"+menu.link}>{menu.title}</Link>
        else
            return <Link href={menu.link}>{menu.title}</Link>

    } else
        return menu.title
}

export default function Menu(props) {
    const [submenuOpen,setSubmenuOpen] = useState(false)
    return (
        <ul className={styles.menuitems}>
        {props.menuItems.map((menu,index) => (
            <>
            <li key={index} className={styles.menuitem+` ${menu.spacing?"mt-9":"mt-2"}`}>
                <span className={styles.menuitemicon}>
                { menu.icon ? menu.icon : <RiDashboardFill/> }
                </span>

                <span className={styles.menuitemtext+` ${!props.open && "hidden"}`}><MenuLink menu={menu}/></span>
                {menu.submenu && props.open && (
                    <BsChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={()=>setSubmenuOpen(!submenuOpen)}/>
                )
                }
            </li>
            {menu.submenu && submenuOpen && props.open && (
                <ul>
                    {menu.submenuItems.map((submenuItem,index2) => (
                    <li key={`${index}.${index2}`} className={styles.submenuitem+` ${menu.spacing?"mt-9":"mt-2"}`}>
                        {submenuItem.title}
                    </li>
                    )
                    )}
                </ul>
            )
            }
            </>
        ))}
        </ul>
    )
}