const fs = require('fs');
const path = require('path');
const files = require('./files');

function createService(serviceDir) {
    const serviceName = path.basename(serviceDir);
    serviceDir = path.dirname(serviceDir);
    const dir = files.getBaseDir();
 
    const replaces = { 
        '%service%': serviceName
    };
    
    const fileReplaces = { 
        'service.ts': serviceName + '.ts'
    };

    if (files.existsDirectory(`${serviceDir}/services`)) {
        serviceDir += '/services';
        const fileContent = `export { ${serviceName} } from './${serviceName}';\n`;
        fs.appendFileSync(`${serviceDir}/index.ts`, fileContent);
    }

    files.copyDir(`${dir}/templates/service`, serviceDir, replaces, fileReplaces, true);

    return true;
}

module.exports = createService;