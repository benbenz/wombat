import { visit } from 'unist-util-visit';

const remarkSpecialCharacters = () => {
  return (tree) => {
    visit(tree, 'text', (node) => {
      const replacements = {
        '\\(c\\)': '©',
        '\\(C\\)': '©',
        '\\(r\\)': '®',
        '\\(R\\)': '®',
        '\\(tm\\)': '™',
        '\\(TM\\)': '™',
        '\\(p\\)': '§',
        '\\(P\\)': '§',
        '\\+\\-': '±',
      };

      for (const [pattern, replacement] of Object.entries(replacements)) {
        const regex = new RegExp(pattern, 'g');
        node.value = node.value.replace(regex, replacement);
      }
    });
  };
}

export default remarkSpecialCharacters;
