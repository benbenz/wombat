import { useState } from 'react' ;
import { RiDashboardFill } from 'react-icons/ri' ;
import Link from 'next/link';
import React from 'react';
import styles from '../styles/DaisyMenuHack.module.css';

function MenuLink({children,menu,className,onMenuItemClick}) {
    className = className || "" ;
    if(menu.link) {
        if(menu.link.endsWith(".html"))
            return <Link href={"/_/html/"+menu.link} onClick={onMenuItemClick} className={className}>{children}</Link>
        else if(menu.link.endsWith(".md") || menu.link.endsWith(".mdx"))
            return <Link href={"/_/mdx/"+menu.link} onClick={onMenuItemClick} className={className}>{children}</Link>
        else if(menu.link.endsWith(".ipynb"))
            return <Link href={"/_/ipynb/"+menu.link} onClick={onMenuItemClick} className={className}>{children}</Link>
        else
            return <Link href={menu.link} onClick={onMenuItemClick} className={className}>{children}</Link>

    } else {
        if(menu.submenu) {
            return <a className={className}>{children}</a>
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


    const className  = props.forMobile ? "menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-min" :
                                       "menu menu-horizontal px-1" ;
    const aClassName = "" ;//props.forMobile ? "justify-between" : "" ;
    const submenuClassName = "p-2"

    let tabIndex = 100*(props.menuIndex+1);

    return (
        <ul className={styles.menu+' '+className}>
        {props.menuItems.map((menu,index) => (
            <li key={props.menuIndex+"."+index} tabIndex={tabIndex++}>
                <MenuLink menu={menu} onMenuItemClick={handleMenuItemClick} className={menu.submenu && aClassName}>
                { menu.icon ? menu.icon : <RiDashboardFill/> }
                {menu.title}
                {menu.submenu && props.forMobile && (
                    <svg className="fill-current justify-between" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                )}
                {menu.submenu && !props.forMobile && (
                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                )}
                </MenuLink>
                {menu.submenu && (
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