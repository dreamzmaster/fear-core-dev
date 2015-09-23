'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var getArgs = require('minimist');
var TransformStream = require('stream').Transform;

var messageFilter = require('./helper/linting/message-filter');

var argv = getArgs(process.argv.slice(2));

function filterResults () {
    var stream = new TransformStream({ objectMode: true });

    stream._transform = function (file, enc, cb) {
        if (file.eslint && argv.rule) {
            file.eslint = messageFilter(file.eslint, argv.rule);
        }
        cb(null, file);
    };

    return stream;
}

module.exports = function taskFactory (src, bail) {

    return function task () {
        return gulp.src(src)
            .pipe(eslint())
            .pipe(filterResults())
            .pipe(eslint.format())
            .pipe(bail ? eslint.failOnError() : eslint.failAfterError());
    };

};
