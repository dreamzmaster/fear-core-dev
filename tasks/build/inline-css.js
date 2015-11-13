'use strict';

var gulp = require('gulp');
var inlinesource = require('gulp-minify-css');

module.exports = function taskFactory (sourceFolder) {

    var inlineSrcOpts = {
        'swallowErrors': false
    };

    return gulp.src(sourceFolder + '/*.html')
        .pipe(inlinesource(inlineSrcOpts))
        .pipe(gulp.dest(sourceFolder));
};
