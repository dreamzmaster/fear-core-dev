'use strict';

module.exports = function taskFactory (filesToCopy, destination) {

    return function task () {

        var gulp = require('gulp');
        var copy = require('gulp-copy');
        var gutil = require('gulp-util');

        var copyOpts = {
            prefix: 1
        };

        return gulp.src(filesToCopy)
            .pipe(copy(destination, copyOpts))
            .pipe(gutil.noop());
    };
};
