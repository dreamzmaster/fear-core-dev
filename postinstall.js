'use strict';

var appRoot = require('app-root-path');
var moduleRoot = process.cwd();

var fs = require('fs-extra');
var chalk = require('chalk');

var karmaConf = 'karma.conf.js';
var karmaConfSrc = moduleRoot+'/'+karmaConf;
var karmaConfDst = appRoot+'/'+karmaConf;

var fearCoreTasks = chalk.cyan('FEAR Core tasks:');

try {

    fs.copySync(karmaConfSrc, karmaConfDst, { clobber: false });

    console.log(fearCoreTasks+' copied default '+chalk.green(karmaConf)+' to project root\n');

} catch (e) {

    if (e.message === 'EEXIST') {

        console.log(fearCoreTasks+' skipped copying default '+chalk.green(karmaConf)+'\nFile already exists in project root\n');

    } else {

        console.log(fearCoreTasks+chalk.red(' cannot copy '+karmaConf)+'\nError: '+e.message+'\n');
    }

}
