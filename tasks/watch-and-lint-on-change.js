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
    if (results[0].errorCount > 0) {
        gutil.log('linting error');
    } else {
        gutil.log('linting OK', results[0].filePath);
    }
}

module.exports = function taskFactory (src) {
    return function task () {
        gulp.watch(src).on('change', lint);
    };
};
