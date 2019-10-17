const files = require('./files');

function createModule(moduleName, args) {
    const dir = files.getBaseDir();
    files.copyDir(`${dir}/templates/module`, moduleName, { '%module%': moduleName });
    return true;
}

module.exports = createModule;