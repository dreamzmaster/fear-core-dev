'use strict';

var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');

module.exports = function taskFactory () {

    return gulp.src('.tmp/css/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('.tmp/css'));
};
