'use strict';

var appRoot = require('app-root-path');
var moduleRoot = process.cwd();

var fs = require('fs-extra');
var chalk = require('chalk');

var fearCoreTasks = chalk.cyan('FEAR Core tasks:');

copyDefaultToAppRoot('karma.conf.js');
copyDefaultToAppRoot('.editorConfig');

function copyDefaultToAppRoot (file) {
    var src = moduleRoot+'/defaults/'+file;
    var dst = appRoot+'/'+file;

    try {

        fs.copySync(src, dst, { clobber: false });

        logCopyOk(file);

    } catch (err) {

        if (err.message === 'EEXIST') {
            logFileSkipped(file);
        } else {
            logCopyError(file, err);
        }

    }
}

function logCopyOk (file) {
    console.log(fearCoreTasks+' copied default '+chalk.green(file)+' to project root\n');
}

function logFileSkipped (file) {
    console.log(fearCoreTasks+' skipped copying default '+chalk.green(file)+'\nFile already exists in project root\n');
}

function logCopyError (file, err) {
    console.log(fearCoreTasks+chalk.red(' cannot copy '+file)+'\nError: '+err.message+'\n');
}
