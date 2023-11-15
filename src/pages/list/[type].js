import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation' ;
import Link from 'next/link';

//import fs from 'fs';

/*
var _getAllFilesFromFolder = function(dir) {

    var results = [];

    fs.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push(file);

    });

    return results;

};

const MyListComponent = ({ type }) => {
  const [Component, setComponent] = useState(null);
  useEffect(() => {
    if(!type) return;
    console.log("TYPE ="+type) ;
    const loadComponent = async () => {
      //const PageModule = await import(`../content/${pageName}`);
      //setComponent(() => PageModule.default);
    };
    loadComponent();
  }, [type]);

  if (!Component) {
    return <div>No files...</div>;
  }
  return <Component/>
};

const ListPage = () => {
    const searchParams = useSearchParams()
    const type = searchParams.get('type')
    return <MyListComponent type={type}/>;    
};

export default ListPage;
*/

// pages/index.js

import listFilesInDirectory from '../../lib/listFiles';
import path from 'path';

export async function getStaticProps({ params }) {
  //const searchParams = useSearchParams()
  //const fileType = searchParams.get('type')
  //const fileType = '.mdx'; // replace with your desired file type
  const fileType = params.type!=="_all" ? "."+params.type : null ;
  const directoryPath = path.join(process.cwd(), 'src/pages/content'); // replace with your directory path
  //console.log(fileType,directoryPath);
  const fileList = listFilesInDirectory(directoryPath, fileType);

  return {
    props: { fileList },
  };
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { type: 'mdx' } }, 
      { params: { type: 'md' } }, 
      { params: { type: 'ipynb' } }, 
      { params: { type: 'html' } }, 
      { params: { type: 'jl' } }, 
      { params: { type: 'c' } }, 
      { params: { type: 'cpp' } }, 
      { params: { type: 'h' } }, 
      { params: { type: 'hpp' } }, 
      { params: { type: 'c' } }, 
      { params: { type: 'py' } }, 
      { params: { type: '_all' } }, 
    ],
    fallback: false,
  }
}

const IndexPage = ({ fileList }) => {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-2xl font-semibold">File List</h1>
      <ul>
        {fileList.map((file, index) => (
          <li key={index}><Link href={"/_/"+file}>{file}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;


