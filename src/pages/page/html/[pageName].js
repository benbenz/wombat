// pages/page/[pageName].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
const path = require('path');
import dynamic from 'next/dynamic';

//import html from "../../../public/intro.html";

// PAGE 1

// const Page = () => {
//   const router = useRouter();
//   const { pageName } = router.query;
//   const { pagePath } = path.resolve(__dirname, '..' , '..' , '..' , pageName)
//   const [htmlContent, setHtmlContent] = useState('');

//   useEffect(() => {
//     if (pageName) {
//       fetch(`/${pageName}`)
//         .then((response) => response.text())
//         .then((data) => setHtmlContent(data));
//     }
//   }, [pageName]);

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:9999');

//     ws.onmessage = (event) => {
//       if (event.data.startsWith('html-update')) {
//         let thePage = event.data.replace('html-update:','')
//         console.log("PAGE="+thePage,"VS",pagePath)
//         if(thePage===pagePath) {
//             fetch(`/${pageName}`)
//             .then((response) => response.text())
//             .then((data) => setHtmlContent(data));
//         }
//       }
//     };

//     return () => {
//       ws.close();
//     };
//   }, [pageName]);

//   return (
//     <div
//       dangerouslySetInnerHTML={{
//         __html: htmlContent,
//       }}
//     />
//   );
// };

// PAGE 2

// const Page = ({ htmlContent }) => {
//   return (
//     <div
//       dangerouslySetInnerHTML={{
//         __html: htmlContent,
//       }}
//     />
//   );
// };

// export async function getStaticProps({ params }) {
//   const fs = require('fs');
//   const path = require('path');
//   const filePath = path.join(process.cwd(), 'public', `${params.pageName}`);// `${params.pageName}.html`);
//   const htmlContent = fs.readFileSync(filePath, 'utf8');

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
//   const fileNames = fs.readdirSync(pagesDir).filter((file) => file.endsWith('.html'));

//   const paths = fileNames.map((fileName) => ({
//     params: {
//       pageName: fileName //.replace(/\.html$/, ''),
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// PAGE 3


const HtmlFragment = ({ pageName }) => {
    const [htmlContent, setHtmlContent] = useState(null);
  
    useEffect(() => {
      const loadHtml = async () => {
        const module = await import(`../../../../public/${pageName}`);
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
//   return (
//     <div
//       dangerouslySetInnerHTML={{
//         __html: htmlContent,
//       }}
//     />
//   );
};

// export async function getStaticProps({ params }) {

//     const filePath = path.join(process.cwd(), 'public', `${params.pageName}`);// `${params.pageName}.html`);
//     let htmlContent = await import(filePath)
//     let htmlContent = html

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
//   const fileNames = fs.readdirSync(pagesDir).filter((file) => file.endsWith('.html'));

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

// export async function getServerSideProps({ params }) {
//     const dynamicImport = async (pageName) => {
//       const filePath = path.join(process.cwd(), 'public', `${pageName}`);
//       const module = await import(filePath);
//       return module.default;
//     };
//     const htmlContent = await dynamicImport(params.pageName);
  
//     return {
//       props: {
//         htmlContent,
//       },
//     };
//   }

export default Page;
