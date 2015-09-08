'use strict';

var appRoot = require('app-root-path');
var moduleRoot = process.cwd();

var fs = require('fs-extra');

var karmaConfSrc = moduleRoot+'/.karma.conf.js';
var karmaConfDst = appRoot+'/karma.conf.js';

fs.copySync(karmaConfSrc, karmaConfDst, { clobber: false }, function (err) {
    if (err) return console.error(err);
    console.log('copied file', karmaConfSrc, 'to', karmaConfDst);
});
