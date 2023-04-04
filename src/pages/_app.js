import '@/styles/globals.css'

import { useState } from 'react' ;
import { BsFillImageFill, BsReverseLayoutTextSidebarReverse, BsPerson} from 'react-icons/bs' ;
import { AiOutlineFileText, AiOutlineBarChart, AiOutlineMail, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai' ;
import Layout from '../components/Layout.js'


export default function App({ Component, pageProps }) {
  const menuItems = [
    { title: "Intro" , link: "/content/intro"} ,
    { title: "Pages" , icon: <AiOutlineFileText/>} ,
    { title: "Medias" , icon: <BsFillImageFill/> , spacing: true } ,
    {
      title: "Examples" ,
      icon : <BsReverseLayoutTextSidebarReverse/>,
      submenu: true ,
      submenuItems : [
        { title: "MarkDown" , linkMaterial: "example.mdx" } ,
        { title: "Jupyter" , linkMaterial: "ols.ipynb" } ,
        { title: "Static" , link: "/"}
      ]
    } ,
    { title: "Analytics" , icon: <AiOutlineBarChart/> },
    { title: "Inbox" , icon: <AiOutlineMail/> },
    { title: "Profile" , icon: <BsPerson/>, spacing: true },
    { title: "Settings" , icon: <AiOutlineSetting/> },
    { title: "Logout" , icon: <AiOutlineLogout/> },

  ]  

  const title = "Econ 2023" ;

  return <Layout menuItems={menuItems} title={title}><Component {...pageProps} /></Layout>
}
