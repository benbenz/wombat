module.exports = function (source) {
    console.log(source)
    return source
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