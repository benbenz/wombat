import { useState } from 'react' ;
import { useRouter } from 'next/router' ;
import { RiDashboardFill } from 'react-icons/ri' ;
import Link from 'next/link';
import React from 'react';
import styles from '../styles/DaisyMenuHack.module.css';

function MenuLink({children,menu,className,onMenuItemClick,index,handleSubmenuToggle}) {
    className = className || "" ;
    const router = useRouter() ;
    if(menu.link) {
        let the_link = menu.link ;
        if(menu.link.endsWith(".html"))
            the_link = "/_/"+menu.link 
        else if(menu.link.endsWith(".md") || menu.link.endsWith(".mdx"))
            the_link = "/_/"+menu.link 
        else if(menu.link.endsWith(".ipynb"))
            the_link = "/_/"+menu.link 

        if(router.asPath==the_link)
            className += ' active' ;
        return <Link href={the_link} onClick={onMenuItemClick} className={className}>{children}</Link>
    } else {
        if(menu.submenu) {
            return <a className={className} onClick={() => handleSubmenuToggle(index)}>{children}</a>
        } else {
            return <a className={className}>{children}</a>
        }
    }
}

export default function Menu(props) {

    const handleMenuItemClick = (event) => {
        //console.log(event)
        props.onMenuItemClick && props.onMenuItemClick(event);
      };

    const [submenuOpen,setSubmenuOpen] = useState({}) // object
    const handleSubmenuToggle = (index) => {
        setSubmenuOpen({ ...submenuOpen, [index]: !submenuOpen[index] });
    };      

    const thestring = props.orientation==="vertical" ? "menu menu-vertical px-1" : "menu menu-horizontal px-1";

    const className  = ( props.forMobile ? "menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-min" :
                                       thestring ) + (props.className ? ` ${props.className}` : "" ) ;
                                       
    const aClassName = "" ;//props.forMobile ? "justify-between" : "" ;
    const submenuClassName = "p-2"

    let tabIndex = 100*(props.menuIndex+1);

    return (
        <ul className={styles.menu+' '+className}>
            {props.title &&(<Link href="/" className="text-center p-4" onClick={handleMenuItemClick}>{props.title}</Link>)}
        {props.menuItems.map((menu,index) => (
            <li key={props.menuIndex+"."+index} tabIndex={tabIndex++}>
                <MenuLink menu={menu}
                          onMenuItemClick={handleMenuItemClick}
                          index={index}
                          handleSubmenuToggle={handleSubmenuToggle}
                          className={menu.submenu && aClassName}>
                { menu.icon ? menu.icon : <RiDashboardFill/> }
                {menu.title}
                {menu.submenu && props.forMobile && (
                    <svg className="fill-current justify-between" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                )}
                {menu.submenu && !props.forMobile && (
                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                )}
                </MenuLink>
                {menu.submenu && submenuOpen[index] && (
                <ul className={submenuClassName}>
                    {menu.submenuItems.map((submenuItem,index2) => (
                    <li key={`${props.menuIndex}.${index}.${index2}`} tabIndex={tabIndex++}>
                    <MenuLink menu={submenuItem} onMenuItemClick={handleMenuItemClick}>
                        {submenuItem.title}
                    </MenuLink>
                    </li>
                    )
                    )}
                </ul>
                )
                }
            </li>
        ))}
        </ul>
    )
}