const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');

function getBaseDir() {
    const dir = path.dirname(fs.realpathSync(__filename));
    const arr = dir.split(path.sep);
    arr.pop();
    return arr.join(path.sep);
}

function existsDirectory(filePath) {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
}

function traverseDir(dir, callback = () => true) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (callback(file, filePath)) {
            if (existsDirectory(filePath)) {
                traverseDir(filePath, callback);
            }
        }
    });
}

function removeFiles(fileNames = []) {
    traverseDir('.', (fileName, filePath) => {
        if (fileNames.indexOf(fileName) >= 0) {
            console.log(chalk.red(`removed: ${filePath}`));
            rimraf.sync(filePath);
            return false;
        }
        return true;
    });
}

function copyDir(dir, newDir, replaces = {}, fileReplaces = {}, hasDirectory = false) {
    if (!hasDirectory) {
        createDirectory(newDir);        
    }
    walkDir(dir, null, [newDir], replaces, fileReplaces);
}

function walkDir(dir, baseDir, parentDirs, replaces, fileReplaces) {
    baseDir && (dir = `${baseDir}/${dir}`);
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        let fileName = fileReplaces[file];
        if (fileName === false) { 
            console.log(chalk.red(file));
            return;
        } else if (fileName === true || !fileName){
            fileName = file;
        }

        const filePath = parentDirs.join('/') + '/' + fileName;
        const space = parentDirs.reduce((result, item) => result + '  ', '');

        if (existsDirectory(`${dir}/${file}`)) {
            console.log(space + fileName);
            fs.mkdirSync(filePath);
            walkDir(file, dir, [ ...parentDirs, file], replaces, fileReplaces);
        } else {
            console.log(chalk.green(space + fileName));
            let content = fs.readFileSync(`${dir}/${file}`, 'utf8');
            for (let prop in replaces) {
                content = content.replace(new RegExp(prop, 'g'), replaces[prop]);            
            }
            fs.writeFileSync(filePath, content);
        }
    });
}

function createDirectory(folderName) {
    if (!existsDirectory(folderName)) {
        fs.mkdirSync(folderName);
        return true;
    }
    console.log(chalk.red(`Error!!! ${folderName} exists.`));
    return false;    
}

module.exports = {
    getBaseDir,
    createDirectory,
    existsDirectory,
    copyDir,
    removeFiles
}
