import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { isArray } from 'util';

const MyComponent = ({ pageName }) => {
  const [Component, setComponent] = useState(null);
  useEffect(() => {
    if(!pageName) return;
    if(isArray(pageName))
      pageName = pageName.join('/');
    console.log("PAGE NAME =",pageName) ;
    const loadComponent = async () => {
      const PageModule = await import(`../content/${pageName}`);
      setComponent(() => PageModule.default);
    };
    loadComponent();
  }, [pageName]);

  if (!Component) {
    return <div>Loading...</div>;
  }
  return <Component/>
};

const Page = () => {
    const router = useRouter();
    const { pageName } = router.query;
    return <MyComponent pageName={pageName}/>;    
};

export default Page;
