'use strict';

var appRoot = require('app-root-path');
var moduleRoot = process.cwd();

var fs = require('fs-extra');
var chalk = require('chalk');

var karmaConfSrc = moduleRoot+'/karma.conf.js';
var karmaConfDst = appRoot+'/karma.conf.js';

try {

    fs.copySync(karmaConfSrc, karmaConfDst, { clobber: false });

} catch (e) {

    if (e.message === 'EEXIST') {

        console.log(chalk.cyan('FEAR Core tasks:')+' skipped copying default '+chalk.green('karma.conf.js')+', already exists in project root\n');

    } else {

        console.log(chalk.cyan('FEAR Core tasks:')+chalk.red(' cannot copy karma.conf.js'), e.message, '\n');
    }

}
