// pages/page/[pageName].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
const path = require('path');

const Page = () => {
  const router = useRouter();
  const { pageName } = router.query;
  const { pagePath } = path.resolve(__dirname, '..' , '..' , '..' , pageName)
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (pageName) {
      fetch(`/${pageName}`)
        .then((response) => response.text())
        .then((data) => setHtmlContent(data));
    }
  }, [pageName]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:9999');

    ws.onmessage = (event) => {
      if (event.data.startsWith('html-update')) {
        let thePage = event.data.replace('html-update:','')
        console.log("PAGE="+thePage,"VS",pagePath)
        if(thePage===pagePath) {
            fetch(`/${pageName}`)
            .then((response) => response.text())
            .then((data) => setHtmlContent(data));
        }
      }
    };

    return () => {
      ws.close();
    };
  }, [pageName]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
    />
  );
};

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


export default Page;
