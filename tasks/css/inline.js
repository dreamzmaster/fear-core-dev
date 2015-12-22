'use strict';

/**
 * @module tasks/css/inline
 */

/**
 * taskFactory
 * @param sources {Array} glob
 * @param destinations {Array} glob
 * @returns task {Function}
 */
module.exports = function taskFactory (sources, destinations) {

    return function task () {

        var gulp = require('gulp');
        var inlineSource = require('gulp-inline-source');
        var destinationsHelper = require('../helpers/build-destinations');

        var inlineSrcOpts = {
            'swallowErrors': false
        };

        return gulp.src(sources)
            .pipe(inlineSource(inlineSrcOpts))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
