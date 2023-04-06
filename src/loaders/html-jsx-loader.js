// module.exports = function HTMLJSXLoader(source) {
//       // Create a new export that wraps the named export
//     const wrappedExport = `import React from "react";
//     const html = \`${source.replaceAll('`','\\`')}\`;

//     function HTMLJSXComponent(props) {
//         return React.createElement('div', {dangerouslySetInnerHTML: { __html: html }},);
//     }
//     export default HTMLJSXComponent;`;
  
//     // Return the modified source
//     return wrappedExport;

// }

module.exports = function HTMLJSXLoader(source) {
    // Create a new export that wraps the named export
    const wrappedExport = `import React from "react";
  const html = \`${source.replace(/`/g, '\\`')}\`;
  function HTMLJSXComponent(props) {
    return React.createElement('div', {
        className: '', 
        dangerouslySetInnerHTML: { __html: html },
      });
    }
  export default HTMLJSXComponent;`;
  
    // Return the modified source
    return wrappedExport;
  };