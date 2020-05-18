const fs = require('fs');
const path = require('path');
const files = require('./files');
const helpers = require('./helpers');

function createComponent(componentDir, args, isPage = false) {
    const componentName = path.basename(componentDir);
    componentDir = path.dirname(componentDir);
    const dir = files.getBaseDir();
 
    let hasServices = !helpers.includes(args, '-s', '--services', '-sh', '--short'),
        hasModels = !helpers.includes(args, '-m', '--models', '-sh', '--short'),
        hasComponents = !helpers.includes(args, '-c', '--components', '-sh', '--short'),
        hasPages = isPage && !helpers.includes(args, '-p', '--pages', '-sh', '--short');

    const replaces = { 
        '%component%': componentName,
    };
    
    const fileReplaces = { 
        'component.tsx': `${componentName}.tsx`,
        'component.scss': `${componentName}.scss`,
        'component-store.ts': `${componentName}Store.ts`,
        'i-component-store.ts': `I${componentName}Store.ts`,
        'i-component-parent-store.ts': `I${componentName}ParentStore.ts`,
        'components': hasComponents,
        'services': hasServices,
        'models': hasModels,
        'pages': hasPages
    };

    const folderName = isPage ? 'pages' : 'components'

    if (files.existsDirectory(`${componentDir}/${folderName}`)) {
        componentDir += '/' + folderName;
        const fileContent = `export { ${componentName} } from './${componentName}';\n`;
        fs.appendFileSync(`${componentDir}/index.ts`, fileContent);
    }
    componentDir += '/' + componentName;

    files.copyDir(`${dir}/templates/component`, componentDir, replaces, fileReplaces);

    return true;
}

module.exports = createComponent;