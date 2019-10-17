const { exec } = require('child_process');

function gitRebase(branch, message) {
    const command = ``;
    exec('git status', function(error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
         }
         console.log('stdout: ' + stdout);
         console.log('stderr: ' + stderr);
    });
}

module.exports = gitRebase;