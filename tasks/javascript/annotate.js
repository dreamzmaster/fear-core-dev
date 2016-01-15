'use strict';

/**
 * @module tasks/javascript/annotate
 */

/**
 * taskFactory
 * @param sources {Array} glob
 * @param destinations {Array} glob
 * @returns {Function}
 * gulp stream
 */
module.exports = function taskFactory(toAnnotate, destinations) {

    return function task() {

        var gulp = require('gulp');
        var ngAnnotate = require('gulp-ng-annotate');
        var destinationsHelper = require('../helpers/build-destinations');

        return gulp.src(toAnnotate)
            .pipe(ngAnnotate({
                add: true,
                single_quotes: true // eslint-disable-line camelcase
            }))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
