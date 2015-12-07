'use strict';

module.exports = function taskFactory(toRemove, destinations) {

    return function task() {

        var gulp = require('gulp');
        var removeCode = require('gulp-remove-code');
        var destinationsHelper = require('../helpers/build-destinations');

        var removeCodeOpts = {
            production: true
        };

        return gulp.src(toRemove)
            .pipe(removeCode(removeCodeOpts))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
