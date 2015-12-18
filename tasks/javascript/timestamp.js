'use strict';

/**
 * @module tasks/javascript/timestamp
 */

/**
 * taskFactory
 * @param toTimestamp {Array}
 * source globs
 * @param destinations {Array}
 * destination globs
 * @returns {Function}
 * gulp stream
 */
module.exports = function taskFactory (toTimestamp, destinations) {

    return function task () {

        var gulp = require('gulp');
        var header = require('gulp-header');
        var headerComment = '/*Generated on:' + new Date() + '*/';
        var destinationsHelper = require('../../helpers/build-destinations');

        return gulp.src(toTimestamp)
            .pipe(header(headerComment))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
