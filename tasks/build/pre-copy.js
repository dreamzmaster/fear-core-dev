'use strict';

var gulp = require('gulp');
var copy = require('gulp-copy');
var gutil = require('gulp-util');

module.exports = function taskFactory (filesToCopy, destination) {

    function buildCopy(filesToCopy, destination) {

        var copyOpts = {
            prefix: 1
        };

        return gulp.src(filesToCopy)
            .pipe(copy(destination, copyOpts))
            .pipe(gutil.noop());
    }

    return buildCopy(filesToCopy, destination);
};
