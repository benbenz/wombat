
// pages/page/[pageName].js
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/resetContent.module.css';
import Head from 'next/head';

const MyComponent = ({ pageName }) => {
  const [Component, setComponent] = useState(null);
  useEffect(() => {
    if (!pageName) return;
    const loadComponent = async () => {
      const NoteBook = await import(`../../ipynb/${pageName}`);
      console.log(NoteBook)
      setComponent(() => NoteBook);
    };
    loadComponent();
  }, [pageName]);

  if (!Component) {
    return <div>Loading...</div>;
  }

  return (
    <>
     <Head>
    </Head>
    <div className={styles.resetContent+' normalizedSection reset'}>
      <Component />
    </div>
    </>
  );
};

const Page = () => {
    const router = useRouter();
    const { pageName } = router.query;
    return <MyComponent pageName={pageName}/>;    
};

export default Page;
