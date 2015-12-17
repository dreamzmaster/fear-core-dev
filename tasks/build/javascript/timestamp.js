'use strict';

module.exports = function taskFactory (toTimesatmp, destinations) {

    return function task () {

        var gulp = require('gulp');
        var header = require('gulp-header');
        var headerComment = '/*Generated on:' + new Date() + '*/';
        var destinationsHelper = require('../../helpers/build-destinations');

        return gulp.src(toTimesatmp)
            .pipe(header(headerComment))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
