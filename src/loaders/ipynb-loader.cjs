// loaders/ipynb-loader.js
const fs = require('fs');
const notebookjs = require('notebookjs');
const hljs = require('highlight');

module.exports = function (source) {
  const notebook = notebookjs.parse(source);
  notebook.styles = `
    ${notebookjs.styles}
    ${hljs.getStyleSheet('default')}
  `;

  notebook.on('code', (code) => {
    const highlightedCode = hljs.highlight('python', code).value;
    return highlightedCode;
  });

  const html = notebook.render().outerHTML;
  return `export default () => <div dangerouslySetInnerHTML={{ __html: \`${html}\` }} />`;
};
