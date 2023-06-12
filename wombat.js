const path = require('path');
function install(directory) {
    installdir = path.resolve($directory) ;
}

if($argv[2]=="example")
    install('./example') ;
else if($argv[2]=="install") 
    install(argv[3]) ;
