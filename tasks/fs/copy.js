'use strict';

/**
 * @module tasks/fs/copy
 */

/**
 * taskFactory
 * @param sources {Array}
 * glob
 * @param destination {Array}
 * glob
 * @param prefix {int}
 * @returns task {Function}
 */
module.exports = function taskFactory (sources, destination, prefix) {

    return function task () {

        var gulp = require('gulp');
        var copy = require('gulp-copy');
        var gutil = require('gulp-util');

        var copyOpts = {
            prefix: prefix
        };

        return gulp.src(sources)
            .pipe(copy(destination, copyOpts))
            .pipe(gutil.noop());
    };
};
