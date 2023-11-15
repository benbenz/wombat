const path    = require('path');
const fs      = require('fs');
const process = require('process');

function listFilesInDirectory(dir, fileList = [], parentPath = '') {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    let newdict = null ;
    if (stat.isDirectory()) {
      newdict = { title: file , submenu: true , submenuItems: [] } ;
      listFilesInDirectory(filePath, newdict['submenuItems'], path.join(parentPath, file));
      fileList.push(newdict) ;
    } else {
      newdict = { title: file , link: path.join(parentPath, file) } ;
      //fileList.push(path.join(parentPath, file));
      fileList.push(newdict)
    }
  });

  return fileList;
}

function checkIfSubDir (parent, dir) {
    const relative = path.relative(path.resolve(parent),path.resolve(dir)) ;
    return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
}

function install(directory) {
    installdir   = path.resolve(directory) ;
    dest_site    = path.join('.','site.json') ;
    dest_indexjs = path.join('src','pages','index.js') ;
    dest_content = path.join('src','pages','content') ;

    const siteFilePath = path.join(installdir,'site.json') ;
    if(!fs.existsSync(siteFilePath)) {
        const contentDir = path.join(installdir,'content') ;
        siteJson = {
            'title' : 'My Site' ,
            'title_extra' : 'V1' ,
            'menuItems' : [
                {
                    'title' : 'ALL FILES' ,
                    'link' : '/list/_all'
                }
            ]
        }
        listFilesInDirectory(contentDir,siteJson['menuItems']) ;
        fs.writeFileSync(siteFilePath,JSON.stringify(siteJson,null,4))
    }

    fs.unlink(dest_site,(err)=>{});
    fs.unlink(dest_indexjs,(err)=>{});
    fs.unlink(dest_content,(err)=>{});
    fs.symlinkSync(path.join(installdir,'site.json'),dest_site,'file') ;
    fs.symlinkSync(path.join(installdir,'index.js'),dest_indexjs,'file') ;
    fs.symlinkSync(path.join(installdir,'content'),dest_content,'dir') ;
    if(!checkIfSubDir('.',directory)) {
        fs.writeFileSync('.wombat',directory);
    } else {
        fs.writeFileSync('.wombat','');
    }
}

if(process.argv[2]==="example")
    install('./example') ;
else if(process.argv[2]==="install") 
    install(process.argv[3]) ;
