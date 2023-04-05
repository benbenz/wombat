import '@/styles/globals.css'

import { useState } from 'react' ;
import { BsFillImageFill, BsReverseLayoutTextSidebarReverse, BsPerson} from 'react-icons/bs' ;
import { AiOutlineFileText, AiOutlineBarChart, AiOutlineMail, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai' ;
import Layout from '../components/Layout.js'


export default function App({ Component, pageProps }) {
  const menuItems = [
    { title: "Intro" , link: "intro.html"} ,
    { title: "Docs" , link: "/jsx/documents" , icon: <AiOutlineFileText/>} ,
    { title: "Medias" , link: "/jsx/medias" , icon: <BsFillImageFill/> , spacing: true } ,
    {
      title: "Examples" ,
      icon : <BsReverseLayoutTextSidebarReverse/>,
      submenu: true ,
      submenuItems : [
        // this one will go through the mdxwrapper loader (it's supposed to wrap in a CSS reset - doesnt work right now because it comes FIRST !!!)
        { title: "MD direct thru" , link: "/mdx/example" } , 
        // this one will go through the mdx proxy (same file)
        { title: "MD with proxy" , link: "example.md" } , 
        { title: "MDX direct thru" , link: "/mdx/example2" } , 
        { title: "MDX with proxy" , link: "example2.mdx" } , 
        { title: "Jupyter" , link: "notebooks.ipynb" } ,
        { title: "Jupyter" , link: "ols.ipynb" } ,
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
