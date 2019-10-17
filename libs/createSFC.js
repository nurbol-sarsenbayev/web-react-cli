const fs = require('fs');
const path = require('path');
const files = require('./files');
const helpers = require('./helpers');

function createSFC(componentDir, args, isPage = false) {
    const moduleName = args[0];
    const componentName = path.basename(componentDir);
    componentDir = path.dirname(componentDir);
    const dir = files.getBaseDir();
    const className = (moduleName ? moduleName + '-' : '') + helpers.camelCaseToDash(componentName);
 
    const replaces = { 
        '%component%': componentName,
        '%className%': className
    };
    
    const fileReplaces = { 
        'component.tsx': componentName + '.tsx',
        'component.scss': componentName + '.scss'
    };

    if (files.existsDirectory(`${componentDir}/components`)) {
        componentDir += '/components';
        const fileContent = `export { ${componentName} } from './${componentName}';\n`;
        fs.appendFileSync(`${componentDir}/index.ts`, fileContent);
    }
    componentDir += '/' + componentName;

    files.copyDir(`${dir}/templates/sfc`, componentDir, replaces, fileReplaces);

    return true;
}

module.exports = createSFC;