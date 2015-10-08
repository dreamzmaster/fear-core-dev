'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sasslint = require('gulp-scss-lint');

module.exports = function taskFactory (options) {
    return function lintChanged (files) {
        return gulp.src(files)
            .pipe(sasslint(options))
            .pipe(sasslint.failReporter());
    }
};
