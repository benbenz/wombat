// pages/page/[pageName].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
const path = require('path');

const HtmlFragment = ({ pageName }) => {
    const [htmlContent, setHtmlContent] = useState(false);
    useEffect(() => {
      if(!pageName)
        return
      const loadHtml = async () => {
        const module = await import(`../../html/${pageName}`)
        setHtmlContent(module.default);
      };
      loadHtml();

    }, [pageName]);
  
    if (!htmlContent) {
      return <div>Loading...</div>;
    }

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: htmlContent,
        }}
      />
    );
};

const Page = () => {
    const router = useRouter();
    const { pageName } = router.query;
  
    return <HtmlFragment pageName={pageName} />;    
};

// const Page = ({htmlContent}) => {
//     const router = useRouter();
//     const { pageName } = router.query;
  
//     return (
//       <div
//         dangerouslySetInnerHTML={{
//           __html: htmlContent,
//         }}
//       />
//     );
// };

//export async function getStaticProps({ params }) {
// export async function getServerSideProps({ params }) {

//     const filePath = path.join(process.cwd(), 'public', `${params.pageName}`);// `${params.pageName}.html`);
//     //const filePath = `../../../public/${params.pageName}`
//     let htmlContent = await import(filePath)

//   return {
//     props: {
//       htmlContent,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const fs = require('fs');
//   const path = require('path');
//   const pagesDir = path.join(process.cwd(), 'public');
//   const fileNames = fs.readdirSync(pagesDir).filter((file) => file.endsWith('.html') || 
//                                                               file.endsWith('.mdx')  ||
//                                                               file.endsWith('.md')  ||
//                                                               file.endsWith('.md'));

//   const paths = fileNames.map((fileName) => ({
//     params: {
//       pageName: fileName 
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export default Page;
