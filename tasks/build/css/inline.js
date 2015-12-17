'use strict';

module.exports = function taskFactory (toInline, destinations) {

    return function task () {

        var gulp = require('gulp');
        var inlineSource = require('gulp-inline-source');
        var destinationsHelper = require('../../helpers/build-destinations');

        var inlineSrcOpts = {
            'swallowErrors': false
        };

        return gulp.src(toInline)
            .pipe(inlineSource(inlineSrcOpts))
            .pipe(gulp.dest(function (file) {
                return destinationsHelper.getDestinations(destinations, file.path);
            }));
    };
};
