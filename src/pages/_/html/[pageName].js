// pages/page/[pageName].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//const path = require('path');
//const fs = require('fs')

const HtmlFragment = ({ pageName }) => {
    const [HtmlContent, setHtmlContent] = useState(false);
    useEffect(() => {
      if(!pageName)
        return
      const loadHtml = async () => {
        // mode without the extra loader
        //const module = await import(`../../html/${pageName}`)
        //setHtmlContent(module.default);
        
        // mode with the extra loader
        const htmlComponent = await import(`../../html/${pageName}`)
        setHtmlContent(() => htmlComponent.default)
      };
      loadHtml();

    }, [pageName]);
  
    if (!HtmlContent) {
      return <div>Loading...</div>;
    }
    return <HtmlContent/>
    // (
      // mode without the extra loader
      // <div
      //   dangerouslySetInnerHTML={{
      //     __html: htmlContent,
      //   }}
      // />
    // );
};

export default function Page(props) {
    const router = useRouter();
    const { pageName } = router.query;
    //const pageName = props.pageName

    return <HtmlFragment pageName={pageName} />;    
};

// export async function getStaticProps({ params }) {
//   const { pageName } = params;
//   //return { pageName }
//   const filePath = path.join(process.cwd() , 'src' , 'pages', 'html', `${pageName}`);
//   const html = fs.readFileSync(filePath, 'utf8');
//   //let html = await import(filePath)
//   return { props: { html } };
// }

// export async function getStaticPaths() {
//   const fs = require('fs');
//   const path = require('path');
//   const pagesDir = path.join(process.cwd(), 'src' , 'pages' , 'html');
//   const fileNames = fs.readdirSync(pagesDir).filter((file) => file.endsWith('.html') ) ;
//   const paths = fileNames.map((fileName) => ({
//     params: {
//       pageName: fileName
//     },
//   }));
//   //console.log(paths)
//   return {
//     paths,
//     fallback: false,
//   };
// }

