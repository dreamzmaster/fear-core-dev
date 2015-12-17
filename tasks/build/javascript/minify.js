'use strict';

module.exports = function taskFactory(toMinify, destinations) {

    return function task() {

        var gulp = require('gulp');
        var uglify = require('gulp-uglify');
        var destinationsHelper = require('../../helpers/build-destinations');

        return gulp.src(toMinify)
            .pipe(uglify({
                mangle: true
            }))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
