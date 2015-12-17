'use strict';

module.exports = function taskFactory(toMinify, destinations) {

    return function task() {

        var gulp = require('gulp');
        var ngAnnotate = require('gulp-ng-annotate');
        var destinationsHelper = require('../../helpers/build-destinations');

        return gulp.src(toMinify)
            .pipe(ngAnnotate({
                add: true,
                single_quotes: true // eslint-disable-line camelcase
            }))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
