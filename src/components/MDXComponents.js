import React from 'react';

const MDXComponents = {
  h1: (props) => <h1 className="text-4xl font-bold my-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold my-4" {...props} />,
  h3: (props) => <h3 className="text-2xl font-bold my-4" {...props} />,
  h4: (props) => <h4 className="text-xl font-bold my-4" {...props} />,
  h5: (props) => <h4 className="text-lg font-bold my-4" {...props} />,
  p: (props) => <p className="text-base" {...props} />,
  ul: (props) => <ul className="list-disc list-inside my-4 pl-4 leading-tight" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside my-4 pl-4 leading-tight" {...props} />,
  li: (props) => <li className="my-2 leading-tight" {...props} />,
  a: (props) => (
    <a
      className="text-blue-600 hover:text-blue-800 transition duration-150"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-gray-100 p-4 rounded-lg overflow-auto my-4"
      {...props}
    />
  ),
  code: (props) => <code className="text-sm" {...props} />,
  table: (props) => (
    <table className="min-w-full divide-y divide-gray-200 border-solid border" {...props} />
  ),
  thead: (props) => <thead className="bg-gray-50" {...props} />,
  tbody: (props) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
  tr: (props) => <tr {...props} />,
  th: (props) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      {...props}
    />
  ),
  td: (props) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" {...props} />
  ),  
};

export default MDXComponents;