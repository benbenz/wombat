import { BsFillImageFill, BsReverseLayoutTextSidebarReverse } from 'react-icons/bs' ;
import { AiOutlineFileText, AiOutlineBarChart, AiOutlineMail, AiOutlineSetting } from 'react-icons/ai' ;

const SiteConfig = {
  title : "Econ" ,
  title_extra : "2023" ,
  
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
        { title: "ols.ipynb (thru)" , link: "/content/ols" } ,
        { title: "myclass.cpp (proxy)" , link: "myclass.cpp" } ,
        { title: "functions.jl (proxy)" , link: "functions.jl" } 
      ]
    } ,
    { title: "Analytics" , link: "/html/analytics" , icon: <AiOutlineBarChart/> },
    { title: "Messages" , icon: <AiOutlineMail/> },
    // { title: "Profile" , icon: <BsPerson/>, spacing: true },
    // { title: "Settings" , icon: <AiOutlineSetting/> },
    // { title: "Logout" , icon: <AiOutlineLogout/> },

  ]  
}

export default SiteConfig ;