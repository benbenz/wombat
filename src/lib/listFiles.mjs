const fs = require('fs');
const path = require('path');

const listFilesInDirectory = (dir, fileType, fileList = [], parentPath = '') => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      listFilesInDirectory(filePath, fileType, fileList, path.join(parentPath, file));
    } else if (!fileType || path.extname(file) === fileType) {
      fileList.push(path.join(parentPath, file));
    }
  });

  return fileList;
};

export default listFilesInDirectory;