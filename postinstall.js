'use strict';

var appRoot = require('app-root-path');
var moduleRoot = process.cwd();

var fs = require('fs-extra');

var karmaConfSrc = moduleRoot+'/karma.conf.js';
var karmaConfDst = appRoot+'/karma.conf.js';

try {

    fs.copySync(karmaConfSrc, karmaConfDst, { clobber: false }, function (err) {
        if (err) return console.error(err);
        console.log('copied file', karmaConfSrc, 'to', karmaConfDst);
    });

} catch (e) {

    if (e.message === 'EEXIST') {

        console.log('karma.conf.js already exists in project root');

    } else {

        console.log('cannot copy karma.conf.js', e.message);
    }

}
