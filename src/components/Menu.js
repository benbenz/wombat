import { BsArrowLeftShort , BsSearch , BsChevronDown } from 'react-icons/bs' 
import { RiDashboardFill } from 'react-icons/ri' ;

import { useState } from 'react' ;
import styles from '../styles/Menu.module.css';
import Link from 'next/link';
import React from 'react'

function MenuLink({children,menu,submenuOpen,setSubmenuOpen}) {
    if(menu.link) {
        if(menu.link.endsWith(".html"))
            return <Link href={"/proxy/html/"+menu.link}>{children}</Link>
        else if(menu.link.endsWith(".md") || menu.link.endsWith(".mdx"))
            return <Link href={"/proxy/mdx/"+menu.link}>{children}</Link>
        else
            return <Link href={menu.link}>{children}</Link>

    } else {
        if(menu.submenu) {
            return <span onClick={()=>setSubmenuOpen(!submenuOpen)}>{children}</span>
        } else {
            return <>{children}</>
        }
    }
}

export default function Menu(props) {
    const [submenuOpen,setSubmenuOpen] = useState(false)
    return (
        <ul className={styles.menuitems}>
        {props.menuItems.map((menu,index) => (
            <React.Fragment key={index}>
            <MenuLink menu={menu} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen}>
            <li className={styles.menuitem+` ${menu.spacing?"mt-9":"mt-2"}`}>
                <span className={styles.menuitemicon}>
                { menu.icon ? menu.icon : <RiDashboardFill/> }
                </span>

                <span className={styles.menuitemtext+` ${!props.open && "hidden"}`}>{menu.title}</span>
                {menu.submenu && props.open && (
                    <BsChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={()=>setSubmenuOpen(!submenuOpen)}/>
                )
                }
            </li>
            </MenuLink>
            {menu.submenu && submenuOpen && props.open && (
                <ul>
                    {menu.submenuItems.map((submenuItem,index2) => (
                    <MenuLink key={`${index}.${index2}`} menu={submenuItem}>
                    <li className={styles.submenuitem+` ${menu.spacing?"mt-9":"mt-2"}`}>
                        {submenuItem.title}
                    </li>
                    </MenuLink>
                    )
                    )}
                </ul>
            )
            }
            </React.Fragment>
        ))}
        </ul>
    )
}