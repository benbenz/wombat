module.exports = function (source) {

  const importReact = 'import React from "react";\n';

  const modifiedSource = source.replace(
    "export default MDXContent;",
    "export const OriginalComponent = MDXContent;"
  );
      // Import React and the necessary components
    //const importReact = 'import React from "react";\n';
  
    // Create a new export that wraps the original export
  //   const wrappedExport = `
  // export default function WrappedComponent(props) {
  //   return (
  //     <div className="resetContent">
  //       <OriginalComponent {...props} />
  //     </div>
  //   );
  // }`;

    // Create a new export that wraps the named export
  const wrappedExport = `
import styles from '../../styles/resetContent.module.css';

export default function WrappedComponent(props) {
  return React.createElement(
    'div',
    { className: styles.resetContent + ' normalizedSection meyerreset' },
    React.createElement(OriginalComponent, props)
  );
}
  `;

  // Return the modified source
  return importReact + modifiedSource + wrappedExport;

    // Return the modified source
    return modifiedSource + wrappedExport;
    console.log(source)
    //return source
    return "<div class=\"resetContent\">"+source+"</div>"
    const wrappedSource = `const CustomWrapper = (props) => {
      return (
        <div className="your-custom-css-reset">
          ${source}
        </div>
      );
    };

    export default CustomWrapper;`;

   return wrappedSource;    
    // // Your custom processing goes here.
    // // Wrap the content, reset CSS, or add MDXProvider options.
    // const processedSource = source ;
    
    // return "<div class=\"reset_css\">"+processedSource+"</div>"
  };