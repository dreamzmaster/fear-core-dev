'use strict';

/**
 * @module tasks/css/minify
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
        var minifyCss = require('gulp-minify-css');
        var destinationsHelper = require('../helpers/build-destinations');

        return gulp.src(sources)
            .pipe(minifyCss())
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
