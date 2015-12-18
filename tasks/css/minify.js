'use strict';

module.exports = function taskFactory(toMinify, destinations) {

    return function task() {

        var gulp = require('gulp');
        var minifyCss = require('gulp-minify-css');
        var destinationsHelper = require('../helpers/build-destinations');

        return gulp.src(toMinify)
            .pipe(minifyCss())
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
