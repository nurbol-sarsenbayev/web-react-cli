const [,, command, entity, name, ...args] = process.argv;

function getModulePaths(filePaths) {
    const modulePathSet = {};

    for (const filePath of filePaths) {
        const pieces = filePath.split('/');
        const index = pieces.findIndex((piece) => piece.startsWith('web-'));
        const modulePath = pieces.slice(0, index + 1).join('/');
        modulePathSet[modulePath] = '';
    }

    process.stdout.write(Object.keys(modulePathSet).join('\n'));
}

module.exports = getModulePaths;