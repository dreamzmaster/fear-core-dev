'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');

function fileReport (results) {
    var passed = results[0].errorCount === 0 && results[0].warningCount === 0;
    if (passed) {
        gutil.log('linting ' + gutil.colors.green('OK'), results[0].filePath);
    }
}

module.exports = function lintChanged (files) {
    return gulp.src(files)
        .pipe(eslint())
        .pipe(eslint.format(fileReport))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
};
