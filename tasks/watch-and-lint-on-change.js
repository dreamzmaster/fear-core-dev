'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');

function lint (file) {
    gulp.src([file.path])
        .pipe(eslint())
        .pipe(eslint.format(fileReport))
        .pipe(eslint.format());
}

function fileReport (results) {
    var isError = results[0].errorCount > 0;
    var file = results[0].filePath;
    if (isError) {
        gutil.log('linting ' + gutil.colors.red('error'));
    } else {
        gutil.log('linting ' + gutil.colors.green('OK'), file);
    }
}

module.exports = function taskFactory (src) {
    return function task () {
        gulp.watch(src).on('change', lint);
    };
};
