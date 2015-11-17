'use strict';

module.exports = function taskFactory (sourceFolder) {

    return function task () {

        var gulp = require('gulp');
        var inlinesource = require('gulp-inline-source');

        var inlineSrcOpts = {
            'swallowErrors': false
        };

        return gulp.src(sourceFolder + '/*.html')
            .pipe(inlinesource(inlineSrcOpts))
            .pipe(gulp.dest(sourceFolder));
    };
};
