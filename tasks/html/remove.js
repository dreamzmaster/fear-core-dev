'use strict';

/**
 * @module tasks/html/remove
 */

/**
 * taskFactory
 * @param sources {Array} glob
 * @param destinations {Array} glob
 * @returns task {Function}
 */
module.exports = function taskFactory(sources, destinations) {

    return function task() {

        var gulp = require('gulp');
        var removeCode = require('gulp-remove-code');
        var destinationsHelper = require('../helpers/build-destinations');

        var removeCodeOpts = {
            production: true
        };

        return gulp.src(sources)
            .pipe(removeCode(removeCodeOpts))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
