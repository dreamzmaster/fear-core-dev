'use strict';

/**
 * @module tasks/javascript/timestamp
 */

/**
 * taskFactory
 * @param sources {Array} glob
 * @param destinations {Array} glob
 * @returns {Function}
 * gulp stream
 */
module.exports = function taskFactory (sources, destinations) {

    return function task () {

        var gulp = require('gulp');
        var header = require('gulp-header');
        var headerComment = '/*Generated on:' + new Date() + '*/';
        var destinationsHelper = require('../helpers/build-destinations');

        return gulp.src(sources)
            .pipe(header(headerComment))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
