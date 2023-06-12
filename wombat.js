const path    = require('path');
const fs      = require('fs');
const process = require('process');

function install(directory) {
    installdir   = path.resolve(directory) ;
    dest_site    = path.join('.','site.js') ;
    dest_indexjs = path.join('src','pages','index.js') ;
    dest_content = path.join('src','pages','content') ;
    fs.unlink(dest_site,(err)=>{});
    fs.unlink(dest_indexjs,(err)=>{});
    fs.unlink(dest_content,(err)=>{});
    fs.symlinkSync(path.join(installdir,'site.js'),dest_site,'file') ;
    fs.symlinkSync(path.join(installdir,'index.js'),dest_indexjs,'file') ;
    fs.symlinkSync(path.join(installdir,'content'),dest_content,'dir') ;
}

if(process.argv[2]==="example")
    install('./example') ;
else if(process.argv[2]==="install") 
    install(process.argv[3]) ;
