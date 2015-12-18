'use strict';

/**
 * @module tasks/javascript/minify
 */

/**
 * taskFactory
 * @param toMinify {Array}
 * source globs
 * @param destinations {Array}
 * destination globs
 * @returns {Function}
 * gulp stream
 */
module.exports = function taskFactory(toMinify, destinations) {

    return function task() {

        var gulp = require('gulp');
        var uglify = require('gulp-uglify');
        var destinationsHelper = require('../helpers/build-destinations');

        return gulp.src(toMinify)
            .pipe(uglify({
                mangle: true
            }))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
