import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const MyComponent = ({ pageName }) => {
  const [Component, setComponent] = useState(null);
  useEffect(() => {
    if(!pageName) return;
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
