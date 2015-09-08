'use strict';

var appRoot = require('app-root-path');
var moduleRoot = process.cwd();

var fs = require('fs-extra');
var chalk = require('chalk');

var fearCoreTasks = chalk.cyan('FEAR Core tasks:');

var karmaConf = 'karma.conf.js';
var karmaConfSrc = moduleRoot+'/'+karmaConf;
var karmaConfDst = appRoot+'/'+karmaConf;

try {

    fs.copySync(karmaConfSrc, karmaConfDst, { clobber: false });

    logCopyOk(karmaConf);

} catch (err) {

    if (err.message === 'EEXIST') {
        logFileSkipped(karmaConf);
    } else {
        logCopyError(karmaConf, err);
    }

}

var editorConfig = '.editorConfig';
var editorConfigSrc = moduleRoot+'/'+editorConfig;
var editorConfigDst = appRoot+'/'+editorConfig;

try {

    fs.copySync(editorConfigSrc, editorConfigDst, { clobber: false });

    logCopyOk(editorConfig);

} catch (err) {

    if (err.message === 'EEXIST') {
        logFileSkipped(editorConfig);
    } else {
        logCopyError(editorConfig, err);
    }

}

function logCopyOk (file) {
    return console.log(fearCoreTasks+' copied default '+chalk.green(file)+' to project root\n');
}

function logFileSkipped (file) {
    console.log(fearCoreTasks+' skipped copying default '+chalk.green(file)+'\nFile already exists in project root\n');
}

function logCopyError (file, err) {
    console.log(fearCoreTasks+chalk.red(' cannot copy '+file)+'\nError: '+err.message+'\n');
}
