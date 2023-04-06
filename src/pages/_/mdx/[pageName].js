// pages/page/[pageName].js
import { useRouter } from 'next/router';
import React, { useState, useEffect , useRef } from 'react';
import styles from '../../../styles/resetContent.module.css';
import NormalizedSection from '../../../styles/normalize.module.css'
import MeyerReset from '../../../styles/meyerreset.module.css'
import Head from 'next/head';

const MyComponent = ({ pageName }) => {
  const [Component, setComponent] = useState(null);
  const [addWrapper, setAddWrapper] = useState(true);
  // const ref = useRef(null);
  useEffect(() => {
    if (!pageName) return;
    // if(ref.current.classList.contains('resetContent')) { 
    //   setAddWrapper(false)
    // }
    const loadComponent = async () => {
      const module = await import(`../../mdx/${pageName}`);
      setComponent(() => module.default);
    };
    loadComponent();
  }, [pageName]);

  if (!Component) {
    return <div>Loading...</div>;
  }
  if(addWrapper) {
    return (
      <>
      <Head>
        {/* <NormalizedSection/>
        <MeyerReset/> */}
      </Head>
      <div className={styles.resetContent+' normalizedSection meyerreset'}>
        <Component/>
      </div>
      </>
    );
  } else {
    return (
      <Component/>
    ) ;
  }
};

const Page = () => {
    const router = useRouter();
    const { pageName } = router.query;
    return <MyComponent pageName={pageName}/>;    
};

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