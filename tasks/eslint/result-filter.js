'use strict';

var getArgs = require('minimist');
var TransformStream = require('stream').Transform;

var messageFilter = require('./message-filter');

var argv = getArgs(process.argv.slice(2));

module.exports = function filterResults () {

    var stream = new TransformStream({ objectMode: true });

    stream._transform = function (file, enc, cb) {
        if (file.eslint && (argv.rule || argv.keyword)) {
            file.eslint = messageFilter(file.eslint, argv.rule, argv.keyword);
        }
        cb(null, file);
    };

    return stream;
};
