/* eslint no-console: 0 */

'use strict';

var appRoot = require('app-root-path');
var moduleRoot = process.cwd();

var fs = require('fs-extra');
var chalk = require('chalk');

var execSync = require('child_process').execSync;

execSync('node ./node_modules/gulp-protractor/node_modules/protractor/bin/webdriver-manager update; sudo gem install scss_lint -v 0.43.2', {
    stdio: 'inherit'
});

var fearCoreTasks = chalk.cyan('FEAR Core tasks:');

copyDefaultToAppRoot('editorconfig', '.editorconfig');
copyDefaultToAppRoot('eslintrc', '.eslintrc');
copyDefaultToAppRoot('eslintignore', '.eslintignore');
copyDefaultToAppRoot('gitignore', '.gitignore');

function copyDefaultToAppRoot (srcFilename, dstFilename) {

    var src = moduleRoot+'/defaults/'+srcFilename;
    var dst = appRoot+'/'+dstFilename;

    try {

        // clobber: false means fs-extra will throw an error if the dst exists
        fs.copySync(src, dst, { clobber: false });

        logCopyOk(dstFilename);

    } catch (err) {

        if (err.message === 'EEXIST') {
            logFileSkipped(dstFilename);
        } else {
            logCopyError(dstFilename, err);
        }

    }
}

function logCopyOk (filename) {
    console.log(fearCoreTasks+' copied default '+chalk.green(filename)+' to project root\n');
}

function logFileSkipped (filename) {
    console.log(fearCoreTasks+' skipped copying default '+chalk.green(filename)+'\nFile already exists in project root\n');
}

function logCopyError (filename, err) {
    console.log(fearCoreTasks+chalk.red(' cannot copy '+filename)+'\nError: '+err.message+'\n');
}
