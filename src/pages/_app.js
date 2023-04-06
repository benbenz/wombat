import '@/styles/globals.css'
import '@/styles/ipynbStyle.css'
import { useState } from 'react' ;
import { BsFillImageFill, BsReverseLayoutTextSidebarReverse, BsPerson} from 'react-icons/bs' ;
import { AiOutlineFileText, AiOutlineBarChart, AiOutlineMail, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai' ;
import Layout from '../components/Layout.js'


export default function App({ Component, pageProps }) {
  const menuItems = [
    { title: "Intro" , link: "intro.html"} ,
    { title: "Docs" , link: "/jsx/documents" , icon: <AiOutlineFileText/>} ,
    { title: "Medias" , link: "/jsx/medias?reset=1" , icon: <BsFillImageFill/> , spacing: true } ,
    {
      title: "Examples" ,
      icon : <BsReverseLayoutTextSidebarReverse/>,
      submenu: true ,
      submenuItems : [
        // this one will go through the mdxwrapper loader (it's supposed to wrap in a CSS reset - doesnt work right now because it comes FIRST !!!)
        { title: "example1.mdx (thru)" , link: "/mdx/example1" } , 
        // this one will go through the mdx proxy (same file)
        { title: "example1.mdx (proxy)" , link: "example1.mdx" } , 
        { title: "example2.mdx (thru)" , link: "/mdx/example2" } , 
        { title: "example3.md (thru)" , link: "/mdx/example3" } , 
        { title: "notebooks.ipynb (thru)" , link: "/ipynb/notebooks" } ,
        { title: "ols.ipynb (thru)" , link: "/ipynb/ols" } ,
        { title: "Other" , link: "/"}
      ]
    } ,
    { title: "Analytics" , link: "/html/analytics" , icon: <AiOutlineBarChart/> },
    { title: "Inbox" , icon: <AiOutlineMail/> },
    { title: "Profile" , icon: <BsPerson/>, spacing: true },
    { title: "Settings" , icon: <AiOutlineSetting/> },
    { title: "Logout" , icon: <AiOutlineLogout/> },

  ]  

  const title = "Econ 2023" ;

  return <Layout menuItems={menuItems} title={title}><Component {...pageProps} /></Layout>
}
