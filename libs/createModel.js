const fs = require('fs');
const path = require('path');
const files = require('./files');

function createModel(modelDir) {
    const modelName = path.basename(modelDir);
    modelDir = path.dirname(modelDir);
    const dir = files.getBaseDir();
 
    const replaces = { 
        '%model%': modelName
    };
    
    const fileReplaces = { 
        'model.ts': modelName + '.ts'
    };

    if (files.existsDirectory(`${modelDir}/models`)) {
        modelDir += '/models';
        const fileContent = `export { ${modelName} } from './${modelName}';\n`;
        fs.appendFileSync(`${modelDir}/index.ts`, fileContent);
    }

    files.copyDir(`${dir}/templates/model`, modelDir, replaces, fileReplaces, true);

    return true;
}

module.exports = createModel;