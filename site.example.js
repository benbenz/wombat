import { BsFillImageFill, BsReverseLayoutTextSidebarReverse, BsPerson} from 'react-icons/bs' ;
import { AiOutlineFileText, AiOutlineBarChart, AiOutlineMail, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai' ;

const SiteConfig = {
    
  menuItems:
  [
    { title: "Intro" , link: "intro.html"} ,
    { title: "Docs" , link: "/content/documents" , icon: <AiOutlineFileText/>} ,
    { title: "Medias" , link: "/content/medias" , icon: <BsFillImageFill/> , spacing: true } ,
    {
      title: "Examples" ,
      icon : <BsReverseLayoutTextSidebarReverse/>,
      submenu: true ,
      submenuItems : [
        // this one will go through the mdxwrapper loader (it's supposed to wrap in a CSS reset - doesnt work right now because it comes FIRST !!!)
        { title: "example1.mdx (thru)" , link: "/content/example1" } , 
        // this one will go through the mdx proxy (same file)
        { title: "example1.mdx (proxy)" , link: "example1.mdx" } , 
        { title: "example2.mdx (thru)" , link: "/content/example2" } , 
        { title: "example2.mdx (proxy)" , link: "example2.mdx" } , 
        { title: "example3.md (thru)" , link: "/content/example3" } , 
        { title: "notebooks.ipynb (thru)" , link: "/content/notebooks" } ,
        { title: "notebooks.ipynb (proxy)" , link: "notebooks.ipynb" } ,
        { title: "ols.ipynb (thru)" , link: "/content/ols" } 
      ]
    } ,
    { title: "Analytics" , link: "/html/analytics" , icon: <AiOutlineBarChart/> },
    // { title: "Inbox" , icon: <AiOutlineMail/> },
    // { title: "Profile" , icon: <BsPerson/>, spacing: true },
    // { title: "Settings" , icon: <AiOutlineSetting/> },
    // { title: "Logout" , icon: <AiOutlineLogout/> },

  ]  
}

export default SiteConfig ;